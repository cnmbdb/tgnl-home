import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// 创建充值订单
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiUsername, paymentAddress, amountTrx, telegramChatId, telegramMessageId } = body;

    if (!apiUsername || !paymentAddress || !amountTrx) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 生成带后两位小数的金额（用户输入的整数 + 随机后两位小数）
    // 例如：用户输入100，生成100.23（23是随机数00-99）
    const baseAmount = Math.floor(Number(amountTrx));
    const randomDecimal = Math.floor(Math.random() * 100); // 00-99
    const finalAmount = baseAmount + randomDecimal / 100; // 例如：100.23

    // 计算过期时间（10分钟后）
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const result = await pool.query(
      `INSERT INTO api_recharge_orders 
       (api_username, payment_address, amount_trx, status, expires_at, telegram_chat_id, telegram_message_id)
       VALUES ($1, $2, $3, 'pending', $4, $5, $6)
       RETURNING id, created_at, expires_at`,
      [apiUsername, paymentAddress, finalAmount, expiresAt, telegramChatId || null, telegramMessageId || null]
    );

    const order = result.rows[0];

    // 注意：支付检测任务管理器会自动检测新订单并启动检测任务
    // 管理器每30秒检查一次订单状态，无需在此处手动触发
    console.log(`[订单创建] 订单已创建，管理器将自动检测并启动支付检测任务`);

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        apiUsername,
        paymentAddress,
        amountTrx: finalAmount, // 返回带后两位小数的金额
        expiresAt: order.expires_at,
        createdAt: order.created_at,
      },
    });
  } catch (error: any) {
    console.error('创建充值订单失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '创建订单失败' },
      { status: 500 }
    );
  }
}

// 查询充值订单
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const apiUsername = searchParams.get('apiUsername');
    const status = searchParams.get('status');

    let query = 'SELECT * FROM api_recharge_orders WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (orderId) {
      query += ` AND id = $${paramIndex}`;
      params.push(orderId);
      paramIndex++;
    }

    if (apiUsername) {
      query += ` AND api_username = $${paramIndex}`;
      params.push(apiUsername);
      paramIndex++;
    }

    if (status) {
      query += ` AND status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC LIMIT 100';

    const result = await pool.query(query, params);

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    console.error('查询充值订单失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '查询订单失败' },
      { status: 500 }
    );
  }
}

