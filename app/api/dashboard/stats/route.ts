import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

export async function GET() {
  try {
    // 1. API 用户统计
    const apiUsersResult = await pool.query(
      `SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'active') as active,
        SUM(balance_micro) as total_balance_micro
       FROM api_users`
    )
    const apiUsersStats = apiUsersResult.rows[0]

    // 2. 机器人统计
    const botsResult = await pool.query(
      `SELECT COUNT(DISTINCT bot_username) as total FROM bot_configs`
    )
    const botsCount = parseInt(botsResult.rows[0]?.total || '0')

    // 3. 今日充值订单统计
    const todayRechargeResult = await pool.query(
      `SELECT 
        COUNT(*) as count,
        SUM(amount_trx) as total_amount,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_count,
        SUM(amount_trx) FILTER (WHERE status = 'completed') as completed_amount
       FROM api_recharge_orders
       WHERE DATE(created_at) = CURRENT_DATE`
    )
    const todayRecharge = todayRechargeResult.rows[0]

    // 4. 今日消费订单统计
    const todayConsumptionResult = await pool.query(
      `SELECT 
        COUNT(*) as count,
        SUM(amount_trx) as total_amount
       FROM api_consumption_orders
       WHERE DATE(created_at) = CURRENT_DATE`
    )
    const todayConsumption = todayConsumptionResult.rows[0]

    // 5. 最近订单（最近10条）
    const recentOrdersResult = await pool.query(
      `(
        SELECT 
          id,
          api_username,
          amount_trx,
          status,
          created_at,
          'recharge' as order_type
        FROM api_recharge_orders
        ORDER BY created_at DESC
        LIMIT 5
      )
      UNION ALL
      (
        SELECT 
          id,
          api_username,
          amount_trx,
          status,
          created_at,
          'consumption' as order_type
        FROM api_consumption_orders
        ORDER BY created_at DESC
        LIMIT 5
      )
      ORDER BY created_at DESC
      LIMIT 10`
    )

    // 6. 数据库连接测试
    let dbStatus = 'normal'
    try {
      await pool.query('SELECT 1')
    } catch {
      dbStatus = 'error'
    }

    const data = {
      apiUsers: {
        total: parseInt(apiUsersStats?.total || '0'),
        active: parseInt(apiUsersStats?.active || '0'),
        totalBalanceTrx: (Number(apiUsersStats?.total_balance_micro || 0) / 1e6).toFixed(2),
      },
      bots: {
        total: botsCount,
      },
      todayRecharge: {
        count: parseInt(todayRecharge?.count || '0'),
        totalAmount: parseFloat(todayRecharge?.total_amount || '0').toFixed(2),
        completedCount: parseInt(todayRecharge?.completed_count || '0'),
        completedAmount: parseFloat(todayRecharge?.completed_amount || '0').toFixed(2),
      },
      todayConsumption: {
        count: parseInt(todayConsumption?.count || '0'),
        totalAmount: parseFloat(todayConsumption?.total_amount || '0').toFixed(2),
      },
      recentOrders: recentOrdersResult.rows.map((row: any) => ({
        id: row.id,
        apiUsername: row.api_username,
        amountTrx: parseFloat(row.amount_trx || 0).toFixed(2),
        status: row.status,
        orderType: row.order_type,
        createdAt: row.created_at.toISOString(),
      })),
      systemStatus: {
        database: dbStatus,
      },
    }

    const res: ApiResponse<typeof data> = { success: true, data }
    return NextResponse.json(res)
  } catch (error: any) {
    console.error('获取仪表盘统计失败:', error)
    const res: ApiResponse<null> = { success: false, error: '获取统计失败' }
    return NextResponse.json(res, { status: 500 })
  }
}
