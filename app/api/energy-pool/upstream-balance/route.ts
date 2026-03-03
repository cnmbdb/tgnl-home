import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'
import pool from '@/lib/db'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const energyPoolId = url.searchParams.get('energyPoolId') || 'EP001'

    const res = await pool.query(
      'SELECT provider_base_url as "providerBaseUrl", provider_username as "providerUsername", provider_password as "providerPassword" FROM energy_pools WHERE id = $1 LIMIT 1',
      [energyPoolId]
    )

    if (res.rowCount === 0) {
      const out: ApiResponse<null> = { success: false, error: '能量池不存在' }
      return NextResponse.json(out, { status: 404 })
    }

    const row = res.rows[0] as {
      providerBaseUrl: string | null
      providerUsername: string | null
      providerPassword: string | null
    }

    const baseUrl = row.providerBaseUrl || process.env.ZP_BASE_URL || 'https://zhangpu.online'
    const username = row.providerUsername

    if (!username) {
      const out: ApiResponse<null> = { success: false, error: '该能量池尚未配置上游账号' }
      return NextResponse.json(out, { status: 400 })
    }

    const upstreamUrl = new URL('/v1/get_user_info', baseUrl)
    upstreamUrl.searchParams.set('username', username)

    const upstreamRes = await fetch(upstreamUrl.toString(), { cache: 'no-store' })
    const text = await upstreamRes.text()

    if (!upstreamRes.ok) {
      const out: ApiResponse<null> = { success: false, error: `上游请求失败: ${upstreamRes.status}`, message: text }
      return NextResponse.json(out, { status: 502 })
    }

    // 上游返回字段为中文 key："当前余额(TRX)"
    let json: any
    try {
      json = JSON.parse(text)
    } catch {
      const out: ApiResponse<null> = { success: false, error: '上游返回不是有效 JSON', message: text }
      return NextResponse.json(out, { status: 502 })
    }

    const balanceKey = '当前余额(TRX)'
    const balanceTrx = Number(json?.[balanceKey])

    if (Number.isNaN(balanceTrx)) {
      const out: ApiResponse<null> = { success: false, error: `上游返回缺少余额字段: ${balanceKey}`, message: text }
      return NextResponse.json(out, { status: 502 })
    }

    const out: ApiResponse<{ energyPoolId: string; username: string; balanceTrx: number; capTrx: number }> = {
      success: true,
      data: {
        energyPoolId,
        username,
        balanceTrx,
        capTrx: 500,
      },
    }

    return NextResponse.json(out)
  } catch (e) {
    console.error('获取上游余额失败:', e)
    const out: ApiResponse<null> = { success: false, error: '获取上游余额失败' }
    return NextResponse.json(out, { status: 500 })
  }
}

