import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { notifyBalanceChange } from '@/app/v1/_lib/notify-balance-change';

// 检查充值订单的支付状态
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentAddress, amount, txHash } = body;

    if (!paymentAddress || !amount || !txHash) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 查找匹配的待支付订单（金额匹配，状态为pending）
    // 注意：允许处理已过期的订单，因为用户可能在过期后支付
    const result = await pool.query(
      `SELECT * FROM api_recharge_orders 
       WHERE payment_address = $1 
       AND ABS(amount_trx - $2) < 0.01 
       AND status = 'pending'
       ORDER BY created_at DESC
       LIMIT 1`,
      [paymentAddress, amount]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({
        success: false,
        error: '未找到匹配的订单',
      });
    }

    const order = result.rows[0];

    // 检查订单是否已经处理过（避免重复处理）
    if (order.tx_hash) {
      return NextResponse.json({
        success: false,
        error: '订单已处理',
        data: { orderId: order.id, status: order.status },
      });
    }

    // 更新订单状态为已支付
    await pool.query(
      `UPDATE api_recharge_orders 
       SET status = 'paid', 
           tx_hash = $1, 
           paid_at = NOW(),
           updated_at = NOW()
       WHERE id = $2`,
      [txHash, order.id]
    );

    // 给API用户余额充值
    const rechargeAmountMicro = Math.round(Number(order.amount_trx) * 1e6);
    
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

    // 通知机器人系统余额变动
    await notifyBalanceChange({
      apiUsername: order.api_username,
      changeType: 'recharge',
      amountTrx: Number(order.amount_trx),
      newBalanceTrx: parseFloat(newBalanceTrx),
      orderId: order.id.toString(),
      txHash: txHash,
      telegramChatId: order.telegram_chat_id,
      telegramMessageId: order.telegram_message_id,
    }).catch(err => {
      console.error(`通知机器人失败 (订单 ${order.id}):`, err);
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        apiUsername: order.api_username,
        amountTrx: order.amount_trx,
        txHash,
        newBalanceMicro: Number(newBalance),
        newBalanceTrx,
        telegramChatId: order.telegram_chat_id,
        telegramMessageId: order.telegram_message_id,
      },
    });
  } catch (error: any) {
    console.error('检查支付状态失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '检查支付状态失败' },
      { status: 500 }
    );
  }
}














