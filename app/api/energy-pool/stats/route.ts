import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

type EnergyPoolStats = {
  todayAllocations: number
  todayEnergy: number
}

export async function GET() {
  try {
    // 今日消费订单统计（视为“今日分配”）
    const result = await pool.query(
      `SELECT 
         COUNT(*) AS count,
         COALESCE(SUM(energy), 0) AS total_energy
       FROM api_consumption_orders
       WHERE DATE(created_at) = CURRENT_DATE
         AND status = 'completed'`
    )

    const row = result.rows[0] || { count: '0', total_energy: '0' }

    const data: EnergyPoolStats = {
      todayAllocations: parseInt(row.count || '0', 10),
      todayEnergy: Number(row.total_energy || 0),
    }

    const res: ApiResponse<EnergyPoolStats> = {
      success: true,
      data,
    }

    return NextResponse.json(res)
  } catch (error) {
    console.error('获取能量池统计失败:', error)
    const res: ApiResponse<null> = {
      success: false,
      error: '获取能量池统计失败',
    }
    return NextResponse.json(res, { status: 500 })
  }
}

