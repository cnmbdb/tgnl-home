import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

/**
 * 测试接口：插入一些消费订单测试数据
 * 仅在开发环境使用
 */
export async function POST(request: NextRequest) {
  // 仅在开发环境允许
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { success: false, error: '此接口仅在开发环境可用' },
      { status: 403 }
    )
  }

  try {
    // 获取一个 API 用户名（用于测试）
    const userResult = await pool.query('SELECT username FROM api_users LIMIT 1')
    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: '没有找到 API 用户，请先创建 API 用户' },
        { status: 400 }
      )
    }
    const apiUsername = userResult.rows[0].username

    // 插入一些测试消费订单
    const testOrders = [
      {
        api_username: apiUsername,
        order_type: 'delegate_meal',
        amount_trx: 2.865,
        energy: 10000,
        day: null,
        receiver_address: 'TKYp9dbDs6kHKtFhFR6srEJvDARNYkq9Qe',
        status: 'completed',
      },
      {
        api_username: apiUsername,
        order_type: 'delegate_meal',
        amount_trx: 2.865,
        energy: 20000,
        day: null,
        receiver_address: 'TKYp9dbDs6kHKtFhFR6srEJvDARNYkq9Qe',
        status: 'completed',
      },
      {
        api_username: apiUsername,
        order_type: 'delegate_tran',
        amount_trx: 6.7,
        energy: null,
        day: 1,
        receiver_address: 'TKYp9dbDs6kHKtFhFR6srEJvDARNYkq9Qe',
        status: 'completed',
      },
    ]

    const insertedOrders = []

    for (const order of testOrders) {
      const result = await pool.query(
        `INSERT INTO api_consumption_orders 
         (api_username, order_type, amount_trx, energy, day, receiver_address, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, created_at`,
        [
          order.api_username,
          order.order_type,
          order.amount_trx,
          order.energy,
          order.day,
          order.receiver_address,
          order.status,
        ]
      )
      insertedOrders.push({
        id: result.rows[0].id,
        ...order,
        created_at: result.rows[0].created_at,
      })
    }

    // 查询所有消费订单数量
    const countResult = await pool.query('SELECT COUNT(*) FROM api_consumption_orders')
    const totalCount = parseInt(countResult.rows[0].count, 10)

    const res: ApiResponse<{
      insertedCount: number
      totalCount: number
      orders: typeof insertedOrders
    }> = {
      success: true,
      data: {
        insertedCount: insertedOrders.length,
        totalCount,
        orders: insertedOrders,
      },
      message: `成功插入 ${insertedOrders.length} 条测试消费订单`,
    }

    return NextResponse.json(res)
  } catch (error: any) {
    console.error('插入测试消费订单失败:', error)
    return NextResponse.json(
      { success: false, error: error.message || '插入测试订单失败' },
      { status: 500 }
    )
  }
}
