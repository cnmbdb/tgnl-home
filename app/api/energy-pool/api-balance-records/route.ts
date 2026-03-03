import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'
import pool from '@/lib/db'

type ApiConsumptionOrderRow = {
  id: string
  api_username: string
  order_type: string
  amount_trx: string | number
  energy: number | null
  day: number | null
  receiver_address: string | null
  status: string
  error_message: string | null
  created_at: string | Date
}

export type ApiBalanceRecords = {
  // 上游（zhangpu）委托产生的订单/扣费记录：来自本系统对上游接口的委托行为
  upstreamOrders: Array<{
    id: string
    apiUsername: string
    orderType: string
    amountTrx: number
    energy: number | null
    day: number | null
    receiverAddress: string | null
    status: string
    errorMessage: string | null
    createdAt: string
  }>
  meta: {
    upstreamBaseUrl: string
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limitRaw = searchParams.get('limit') || '10'
    const limit = Math.max(1, Math.min(50, Number(limitRaw) || 10))

    const upstreamCfg = await pool.query<{ provider_base_url: string }>(
      `SELECT provider_base_url
       FROM energy_pools
       WHERE id = $1
       LIMIT 1`,
      ['EP001']
    )
    const upstreamBaseUrl = upstreamCfg.rows[0]?.provider_base_url || 'https://zhangpu.online'

    const consumptionRes = await pool.query<ApiConsumptionOrderRow>(
      `SELECT id, api_username, order_type, amount_trx, energy, day, receiver_address, status, error_message, created_at
       FROM api_consumption_orders
       WHERE order_type IN ('delegate_meal', 'delegate_tran')
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    )

    const data: ApiBalanceRecords = {
      upstreamOrders: consumptionRes.rows.map((r) => ({
        id: r.id,
        apiUsername: r.api_username,
        orderType: r.order_type,
        amountTrx: Number(r.amount_trx),
        energy: r.energy ?? null,
        day: r.day ?? null,
        receiverAddress: r.receiver_address ?? null,
        status: r.status,
        errorMessage: r.error_message ?? null,
        createdAt: new Date(r.created_at).toISOString(),
      })),
      meta: { upstreamBaseUrl },
    }

    const out: ApiResponse<ApiBalanceRecords> = { success: true, data }
    return NextResponse.json(out)
  } catch (e) {
    console.error('获取上游订单/扣费记录失败:', e)
    const out: ApiResponse<null> = { success: false, error: '获取记录失败' }
    return NextResponse.json(out, { status: 500 })
  }
}

