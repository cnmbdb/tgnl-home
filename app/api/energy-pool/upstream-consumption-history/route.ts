import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

type UpstreamConsumptionOrder = {
  id: string
  apiUsername: string
  orderType: string
  amountTrx: string
  energy: number | null
  day: number | null
  receiverAddress: string | null
  status: string
  createdAt: string
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    // 预留参数，目前表结构里没有能量池字段，这里主要展示与上游 EP001 相关的消费
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '10', 10) || 10, 100)

    const result = await pool.query(
      `SELECT 
         id,
         api_username,
         order_type,
         amount_trx,
         energy,
         day,
         receiver_address,
         status,
         created_at
       FROM api_consumption_orders
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    )

    const orders: UpstreamConsumptionOrder[] = result.rows.map((row: any) => ({
      id: row.id,
      apiUsername: row.api_username,
      orderType: row.order_type,
      amountTrx: Number(row.amount_trx || 0).toFixed(2),
      energy: row.energy ?? null,
      day: row.day ?? null,
      receiverAddress: row.receiver_address ?? null,
      status: row.status,
      createdAt: row.created_at.toISOString(),
    }))

    const res: ApiResponse<UpstreamConsumptionOrder[]> = {
      success: true,
      data: orders,
    }

    return NextResponse.json(res)
  } catch (error) {
    console.error('获取上游扣费相关订单记录失败:', error)
    const res: ApiResponse<null> = {
      success: false,
      error: '获取上游扣费订单记录失败',
    }
    return NextResponse.json(res, { status: 500 })
  }
}

