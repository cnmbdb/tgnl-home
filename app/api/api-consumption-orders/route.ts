import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// 查询消费订单
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const apiUsername = searchParams.get('apiUsername');
    const orderType = searchParams.get('orderType');
    const status = searchParams.get('status');

    let query = 'SELECT * FROM api_consumption_orders WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (apiUsername) {
      query += ` AND api_username = $${paramIndex}`;
      params.push(apiUsername);
      paramIndex++;
    }

    if (orderType) {
      query += ` AND order_type = $${paramIndex}`;
      params.push(orderType);
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
    console.error('查询消费订单失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '查询订单失败' },
      { status: 500 }
    );
  }
}
