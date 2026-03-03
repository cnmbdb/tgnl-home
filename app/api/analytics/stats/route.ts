import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || 'month' // today, week, month, year

    // 计算时间范围
    const now = new Date()
    let startDate: Date
    let previousStartDate: Date

    switch (range) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        previousStartDate = new Date(startDate)
        previousStartDate.setDate(previousStartDate.getDate() - 1)
        break
      case 'week':
        const dayOfWeek = now.getDay()
        startDate = new Date(now)
        startDate.setDate(now.getDate() - dayOfWeek)
        startDate.setHours(0, 0, 0, 0)
        previousStartDate = new Date(startDate)
        previousStartDate.setDate(previousStartDate.getDate() - 7)
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        break
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1)
        previousStartDate = new Date(now.getFullYear() - 1, 0, 1)
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        previousStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    }

    // 1. 活跃API用户数（当前时间段）
    const activeUsersResult = await pool.query(
      `SELECT COUNT(DISTINCT api_username) as count
       FROM (
         SELECT api_username FROM api_recharge_orders WHERE created_at >= $1
         UNION
         SELECT api_username FROM api_consumption_orders WHERE created_at >= $1
       ) AS active_users`,
      [startDate]
    )
    const activeUsers = parseInt(activeUsersResult.rows[0]?.count || '0')

    // 2. 上一时间段活跃用户数（用于计算增长率）
    const previousActiveUsersResult = await pool.query(
      `SELECT COUNT(DISTINCT api_username) as count
       FROM (
         SELECT api_username FROM api_recharge_orders 
         WHERE created_at >= $1 AND created_at < $2
         UNION
         SELECT api_username FROM api_consumption_orders 
         WHERE created_at >= $1 AND created_at < $2
       ) AS active_users`,
      [previousStartDate, startDate]
    )
    const previousActiveUsers = parseInt(previousActiveUsersResult.rows[0]?.count || '0')

    // 3. 订单统计（当前时间段）
    const ordersResult = await pool.query(
      `SELECT 
        COUNT(*) FILTER (WHERE type = 'recharge') as recharge_count,
        COUNT(*) FILTER (WHERE type = 'consumption') as consumption_count,
        SUM(amount_trx) FILTER (WHERE type = 'recharge') as recharge_amount,
        SUM(amount_trx) FILTER (WHERE type = 'consumption') as consumption_amount,
        COUNT(*) FILTER (WHERE type = 'recharge' AND status = 'paid') as completed_recharge,
        COUNT(*) FILTER (WHERE type = 'consumption' AND status = 'completed') as completed_consumption
       FROM (
         SELECT 'recharge' as type, amount_trx, status, created_at
         FROM api_recharge_orders
         WHERE created_at >= $1
         UNION ALL
         SELECT 'consumption' as type, amount_trx, status, created_at
         FROM api_consumption_orders
         WHERE created_at >= $1
       ) AS all_orders`,
      [startDate]
    )
    const orders = ordersResult.rows[0]

    // 4. 上一时间段订单统计（用于计算增长率）
    const previousOrdersResult = await pool.query(
      `SELECT 
        COUNT(*) FILTER (WHERE type = 'recharge') as recharge_count,
        COUNT(*) FILTER (WHERE type = 'consumption') as consumption_count,
        SUM(amount_trx) FILTER (WHERE type = 'recharge') as recharge_amount,
        SUM(amount_trx) FILTER (WHERE type = 'consumption') as consumption_amount
       FROM (
         SELECT 'recharge' as type, amount_trx, created_at
         FROM api_recharge_orders
         WHERE created_at >= $1 AND created_at < $2
         UNION ALL
         SELECT 'consumption' as type, amount_trx, created_at
         FROM api_consumption_orders
         WHERE created_at >= $1 AND created_at < $2
       ) AS all_orders`,
      [previousStartDate, startDate]
    )
    const previousOrders = previousOrdersResult.rows[0]

    // 5. 每日订单趋势（最近30天）
    const dailyTrendResult = await pool.query(
      `SELECT 
        DATE(created_at) as date,
        COUNT(*) FILTER (WHERE type = 'recharge') as recharge_count,
        COUNT(*) FILTER (WHERE type = 'consumption') as consumption_count,
        SUM(amount_trx) FILTER (WHERE type = 'recharge') as recharge_amount,
        SUM(amount_trx) FILTER (WHERE type = 'consumption') as consumption_amount
       FROM (
         SELECT 'recharge' as type, amount_trx, created_at
         FROM api_recharge_orders
         WHERE created_at >= NOW() - INTERVAL '30 days'
         UNION ALL
         SELECT 'consumption' as type, amount_trx, created_at
         FROM api_consumption_orders
         WHERE created_at >= NOW() - INTERVAL '30 days'
       ) AS all_orders
       GROUP BY DATE(created_at)
       ORDER BY date DESC
       LIMIT 30`,
      []
    )

    // 计算增长率
    const calculateGrowth = (current: number, previous: number): string => {
      if (previous === 0) return current > 0 ? '+100%' : '0%'
      const growth = ((current - previous) / previous) * 100
      return growth >= 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`
    }

    const totalOrders = parseInt(orders?.recharge_count || '0') + parseInt(orders?.consumption_count || '0')
    const previousTotalOrders = parseInt(previousOrders?.recharge_count || '0') + parseInt(previousOrders?.consumption_count || '0')

    const data = {
      range,
      activeUsers: {
        current: activeUsers,
        previous: previousActiveUsers,
        growth: calculateGrowth(activeUsers, previousActiveUsers),
      },
      orders: {
        total: totalOrders,
        previous: previousTotalOrders,
        growth: calculateGrowth(totalOrders, previousTotalOrders),
        recharge: {
          count: parseInt(orders?.recharge_count || '0'),
          amount: parseFloat(orders?.recharge_amount || '0').toFixed(2),
          completed: parseInt(orders?.completed_recharge || '0'),
        },
        consumption: {
          count: parseInt(orders?.consumption_count || '0'),
          amount: parseFloat(orders?.consumption_amount || '0').toFixed(2),
          completed: parseInt(orders?.completed_consumption || '0'),
        },
      },
      dailyTrend: dailyTrendResult.rows.map((row: any) => ({
        date: row.date.toISOString().split('T')[0],
        rechargeCount: parseInt(row.recharge_count || '0'),
        consumptionCount: parseInt(row.consumption_count || '0'),
        rechargeAmount: parseFloat(row.recharge_amount || '0').toFixed(2),
        consumptionAmount: parseFloat(row.consumption_amount || '0').toFixed(2),
      })),
    }

    const res: ApiResponse<typeof data> = { success: true, data }
    return NextResponse.json(res)
  } catch (error: any) {
    console.error('获取分析数据失败:', error)
    const res: ApiResponse<null> = { success: false, error: '获取分析数据失败' }
    return NextResponse.json(res, { status: 500 })
  }
}
