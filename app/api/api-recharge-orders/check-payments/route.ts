import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { notifyBalanceChange } from '@/app/v1/_lib/notify-balance-change';
import TronWeb from 'tronweb';

// 检查充值订单的支付状态（由定时任务调用）
// 这个API会检查待支付的订单，查询区块链上的转账记录
export async function POST(request: NextRequest) {
  try {
    // 获取所有待支付的订单（包括已过期但未处理的订单，最多检查最近1小时的订单）
    const pendingOrders = await pool.query(
      `SELECT * FROM api_recharge_orders 
       WHERE status = 'pending' 
       AND created_at > NOW() - INTERVAL '1 hour'
       ORDER BY created_at DESC
       LIMIT 50`
    );

    if (pendingOrders.rows.length === 0) {
      return NextResponse.json({
        success: true,
        message: '没有待支付的订单',
        data: [],
      });
    }

    const RECHARGE_PAYMENT_ADDRESS = 'TJdtCWfm4iaqcQVMJchrobkbP5Y9yqNpPf';
    const TRON_API_KEY = process.env.TRON_API_KEY || '93ed8c29-bd1c-4940-ad6c-7eb53bf58bcb';
    
    const processedOrders: any[] = [];

    // 检查每个订单的支付状态
    for (const order of pendingOrders.rows) {
      try {
        console.log(`[DEBUG] 开始检查订单 ${order.id}, 金额: ${order.amount_trx} TRX`);
        
        // 查询该地址最近的TRX转账记录（TransferContract类型）
        const response = await fetch(
          `https://api.trongrid.io/v1/accounts/${RECHARGE_PAYMENT_ADDRESS}/transactions?only_confirmed=true&limit=50`,
          {
            headers: {
              'TRON-PRO-API-KEY': TRON_API_KEY,
            },
          }
        );

        if (!response.ok) {
          console.log(`[DEBUG] 订单 ${order.id}: API 请求失败: ${response.status}`);
          continue;
        }

        const data = await response.json();
        const transactions = data.data || [];
        
        console.log(`[DEBUG] 订单 ${order.id}: 查询到 ${transactions.length} 笔交易`);

        // 查找匹配的转账（金额匹配，时间在订单创建之后）
        for (const tx of transactions) {
          // 检查是否是TransferContract类型的TRX转账
          if (!tx.raw_data?.contract || tx.raw_data.contract.length === 0) {
            console.log(`[DEBUG] 订单 ${order.id}: 交易 ${tx.txID} 没有 contract`);
            continue;
          }
          
          const contract = tx.raw_data.contract[0];
          if (contract.type !== 'TransferContract') {
            console.log(`[DEBUG] 订单 ${order.id}: 交易 ${tx.txID} 类型不是 TransferContract: ${contract.type}`);
            continue;
          }
          
          const parameter = contract.parameter?.value;
          if (!parameter) {
            console.log(`[DEBUG] 订单 ${order.id}: 交易 ${tx.txID} 没有 parameter.value`);
            continue;
          }
          
          // 检查收款地址是否匹配
          // TronGrid API 返回的地址是十六进制格式，需要转换为 base58
          const toAddressHex = parameter.to_address;
          if (!toAddressHex) continue;
          
          let toAddressBase58: string;
          try {
            // 如果地址已经是 base58 格式（T开头），直接使用
            // 否则转换为 base58
            if (toAddressHex.startsWith('T')) {
              toAddressBase58 = toAddressHex;
            } else {
              // 使用 TronWeb 的工具函数进行地址转换
              toAddressBase58 = TronWeb.utils.address.fromHex(toAddressHex);
            }
          } catch (e) {
            console.error(`地址转换失败: ${toAddressHex}`, e);
            continue;
          }
          
          if (toAddressBase58 !== RECHARGE_PAYMENT_ADDRESS) {
            console.log(`[DEBUG] 订单 ${order.id}: 交易 ${tx.txID} 地址不匹配: ${toAddressBase58} !== ${RECHARGE_PAYMENT_ADDRESS}`);
            continue;
          }
          
          const txAmount = Number(parameter.amount) / 1e6; // TRX是6位小数（sun）
          const orderAmount = Number(order.amount_trx);
          
          console.log(`[DEBUG] 订单 ${order.id}: 交易 ${tx.txID} 金额检查: txAmount=${txAmount} TRX, orderAmount=${orderAmount} TRX, 差值=${Math.abs(txAmount - orderAmount)}`);
          
          // 金额匹配（允许0.01 TRX的误差）
          if (Math.abs(txAmount - orderAmount) < 0.01) {
            // 检查交易时间是否在订单创建之后
            const txTime = tx.block_timestamp || tx.raw_data.timestamp;
            const orderTime = new Date(order.created_at).getTime();
            
            console.log(`[DEBUG] 检查订单 ${order.id}: 交易金额=${txAmount} TRX, 订单金额=${orderAmount} TRX, 交易时间=${txTime} (${new Date(txTime).toISOString()}), 订单时间=${orderTime} (${new Date(orderTime).toISOString()})`);
            
            if (txTime >= orderTime) {
              // 检查订单是否已处理
              if (order.tx_hash) {
                console.log(`[DEBUG] 订单 ${order.id} 已处理，跳过`);
                continue;
              }

              const txHash = tx.txID || tx.txid;
              
              console.log(`[DEBUG] 找到匹配的订单: ${order.id}, 交易哈希: ${txHash}`);

              // 更新订单状态为已支付
              // txTime 是毫秒时间戳，需要转换为秒
              const txTimeSeconds = Math.floor(txTime / 1000);
              await pool.query(
                `UPDATE api_recharge_orders 
                 SET status = 'paid', 
                     tx_hash = $1, 
                     paid_at = TO_TIMESTAMP($2),
                     updated_at = NOW()
                 WHERE id = $3`,
                [txHash, txTimeSeconds, order.id]
              );

              // 给API用户余额充值
              const rechargeAmountMicro = Math.round(orderAmount * 1e6);
              
              await pool.query(
                `UPDATE api_users 
                 SET balance_micro = balance_micro + $1,
                     updated_at = NOW()
                 WHERE username = $2`,
                [rechargeAmountMicro, order.api_username]
              );

              // 获取更新后的余额
              const userResult = await pool.query(
                'SELECT balance_micro FROM api_users WHERE username = $1',
                [order.api_username]
              );

              const newBalance = userResult.rows[0]?.balance_micro || 0;
              const newBalanceTrx = (Number(newBalance) / 1e6).toFixed(6);

              processedOrders.push({
                orderId: order.id,
                apiUsername: order.api_username,
                amountTrx: orderAmount,
                txHash: txHash,
                newBalanceTrx,
                telegramChatId: order.telegram_chat_id,
                telegramMessageId: order.telegram_message_id,
              });

              // 通知机器人系统余额变动（使用统一的通知函数）
              await notifyBalanceChange({
                apiUsername: order.api_username,
                changeType: 'recharge',
                amountTrx: orderAmount,
                newBalanceTrx: parseFloat(newBalanceTrx),
                orderId: order.id.toString(),
                txHash: txHash,
                telegramChatId: order.telegram_chat_id,
                telegramMessageId: order.telegram_message_id,
              }).catch(err => {
                console.error(`通知机器人失败 (订单 ${order.id}):`, err);
              });

              console.log(`✅订单支付成功: ${order.id}, API用户: ${order.api_username}, 金额: ${orderAmount} TRX`);
              
              // 找到匹配的交易后，跳出循环，避免重复处理
              break;
            }
          }
        }
      } catch (error: any) {
        console.error(`检查订单 ${order.id} 失败:`, error);
        console.error(`错误堆栈:`, error.stack);
        continue;
      }
    }

    return NextResponse.json({
      success: true,
      message: `检查完成，处理了 ${processedOrders.length} 个订单`,
      data: processedOrders,
    });
  } catch (error: any) {
    console.error('检查支付状态失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '检查支付状态失败' },
      { status: 500 }
    );
  }
}

