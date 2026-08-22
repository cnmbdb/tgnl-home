import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'
import pool from '@/lib/db'

// 成本计算公式：sun价格 × 0.065 + 0.1 = TRX 成本
function calculateCostTrx(sunPrice: number): number {
  return sunPrice * 0.065 + 0.1
}

export type UpstreamInfo = {
  energyPoolId: string
  balanceTrx: number
  upstreamUsername: string | null
  price1HourSun: number | null
  price1DaySun: number | null
  price3DaySun: number | null
  price30DaySun: number | null
  priceBishuTrx: number | null
  cost1HourTrx: number | null
  cost1DayTrx: number | null
  cost3DayTrx: number | null
  cost30DayTrx: number | null
  lastConsumptionTime: string | null
  updatedAt: string
}

// GET: 获取上游信息（从数据库读取缓存）
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const energyPoolId = url.searchParams.get('energyPoolId') || 'EP001'

    const res = await pool.query(
      `SELECT 
        energy_pool_id, balance_trx, upstream_username,
        price_1hour_sun, price_1day_sun, price_3day_sun, price_30day_sun,
        price_bishu_trx, cost_1hour_trx, cost_1day_trx, cost_3day_trx, cost_30day_trx,
        last_consumption_time, updated_at
       FROM upstream_info 
       WHERE energy_pool_id = $1`,
      [energyPoolId]
    )

    if (res.rowCount === 0) {
      const out: ApiResponse<null> = { success: false, error: '暂无上游信息，请先刷新' }
      return NextResponse.json(out, { status: 404 })
    }

    const row = res.rows[0]
    const data: UpstreamInfo = {
      energyPoolId: row.energy_pool_id,
      balanceTrx: parseFloat(row.balance_trx),
      upstreamUsername: row.upstream_username,
      price1HourSun: row.price_1hour_sun,
      price1DaySun: row.price_1day_sun,
      price3DaySun: row.price_3day_sun,
      price30DaySun: row.price_30day_sun,
      priceBishuTrx: row.price_bishu_trx ? parseFloat(row.price_bishu_trx) : null,
      cost1HourTrx: row.cost_1hour_trx ? parseFloat(row.cost_1hour_trx) : null,
      cost1DayTrx: row.cost_1day_trx ? parseFloat(row.cost_1day_trx) : null,
      cost3DayTrx: row.cost_3day_trx ? parseFloat(row.cost_3day_trx) : null,
      cost30DayTrx: row.cost_30day_trx ? parseFloat(row.cost_30day_trx) : null,
      lastConsumptionTime: row.last_consumption_time ? row.last_consumption_time.toISOString() : null,
      updatedAt: row.updated_at.toISOString(),
    }

    return NextResponse.json({ success: true, data })
  } catch (e) {
    console.error('获取上游信息失败:', e)
    return NextResponse.json({ success: false, error: '获取上游信息失败' }, { status: 500 })
  }
}

// POST: 刷新上游信息（从上游 API 查询并保存）
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const energyPoolId = body.energyPoolId || 'EP001'

    // 获取能量池配置
    const poolRes = await pool.query(
      `SELECT provider_base_url, provider_username, provider_password
       FROM energy_pools WHERE id = $1`,
      [energyPoolId]
    )

    if (poolRes.rowCount === 0) {
      return NextResponse.json({ success: false, error: '能量池不存在' }, { status: 404 })
    }

    const poolRow = poolRes.rows[0]
    const baseUrl = poolRow.provider_base_url || process.env.ZP_BASE_URL || 'https://zhangpu.online'
    const username = poolRow.provider_username
    const password = poolRow.provider_password

    if (!username || !password) {
      return NextResponse.json({ success: false, error: '该能量池尚未配置上游账号' }, { status: 400 })
    }

    // 查询上游 API
    const upstreamUrl = new URL('/v1/get_user_info', baseUrl)
    upstreamUrl.searchParams.set('username', username)
    upstreamUrl.searchParams.set('password', password)

    const upstreamRes = await fetch(upstreamUrl.toString(), { cache: 'no-store' })
    const text = await upstreamRes.text()

    if (!upstreamRes.ok) {
      return NextResponse.json(
        { success: false, error: `上游请求失败: ${upstreamRes.status}`, message: text },
        { status: 502 }
      )
    }

    let json: Record<string, unknown>
    try {
      json = JSON.parse(text)
    } catch {
      return NextResponse.json(
        { success: false, error: '上游返回不是有效 JSON', message: text },
        { status: 502 }
      )
    }

    // 解析上游返回的数据
    const balanceTrx = Number(json['当前余额(TRX)']) || 0
    const price1HourSun = Number(json['1小时单价(sun)']) || null
    const price1DaySun = Number(json['1天单价(sun)']) || null
    const price3DaySun = Number(json['3天单价(sun)']) || null
    const price30DaySun = Number(json['30天单价(sun)']) || null
    const priceBishuTrx = Number(json['笔数单价(TRX)']) || null
    const upstreamUsername = String(json['用户名'] || username)
    const lastConsumptionTimeStr = json['最后消费时间'] as string | null

    // 计算成本价格
    // 1小时、1天：直接用公式
    const cost1HourTrx = price1HourSun ? calculateCostTrx(price1HourSun) : null
    const cost1DayTrx = price1DaySun ? calculateCostTrx(price1DaySun) : null
    // 3天、30天：在原公式基础上乘以天数
    const cost3DayTrx = price3DaySun ? calculateCostTrx(price3DaySun) * 3 : null
    const cost30DayTrx = price30DaySun ? calculateCostTrx(price30DaySun) * 30 : null

    // 解析最后消费时间
    let lastConsumptionTime: Date | null = null
    if (lastConsumptionTimeStr) {
      lastConsumptionTime = new Date(lastConsumptionTimeStr)
      if (isNaN(lastConsumptionTime.getTime())) {
        lastConsumptionTime = null
      }
    }

    // 保存到数据库（UPSERT）
    await pool.query(
      `INSERT INTO upstream_info (
        energy_pool_id, balance_trx, upstream_username,
        price_1hour_sun, price_1day_sun, price_3day_sun, price_30day_sun,
        price_bishu_trx, cost_1hour_trx, cost_1day_trx, cost_3day_trx, cost_30day_trx,
        last_consumption_time, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
      ON CONFLICT (energy_pool_id) DO UPDATE SET
        balance_trx = $2,
        upstream_username = $3,
        price_1hour_sun = $4,
        price_1day_sun = $5,
        price_3day_sun = $6,
        price_30day_sun = $7,
        price_bishu_trx = $8,
        cost_1hour_trx = $9,
        cost_1day_trx = $10,
        cost_3day_trx = $11,
        cost_30day_trx = $12,
        last_consumption_time = $13,
        updated_at = NOW()`,
      [
        energyPoolId,
        balanceTrx,
        upstreamUsername,
        price1HourSun,
        price1DaySun,
        price3DaySun,
        price30DaySun,
        priceBishuTrx,
        cost1HourTrx,
        cost1DayTrx,
        cost3DayTrx,
        cost30DayTrx,
        lastConsumptionTime,
      ]
    )

    // 如果下游成本配置开启了跟随上游，自动更新下游成本
    const followCheck = await pool.query(
      `SELECT auto_follow_upstream FROM downstream_pricing WHERE energy_pool_id = $1`,
      [energyPoolId]
    )
    
    if (followCheck.rows.length > 0 && followCheck.rows[0].auto_follow_upstream) {
      const margin = 0.1 // 固定加价 0.1 TRX
      await pool.query(
        `UPDATE downstream_pricing SET
          cost_1hour_trx = $1,
          cost_1day_trx = $2,
          cost_3day_trx = $3,
          cost_30day_trx = $4,
          cost_bishu_trx = $5,
          updated_at = NOW()
        WHERE energy_pool_id = $6`,
        [
          cost1HourTrx ? cost1HourTrx + margin : 0,
          cost1DayTrx ? cost1DayTrx + margin : 0,
          cost3DayTrx ? cost3DayTrx + margin : 0,
          cost30DayTrx ? cost30DayTrx + margin : 0,
          priceBishuTrx ? priceBishuTrx + margin : 0,
          energyPoolId,
        ]
      )
      console.log(`[upstream-info] 已自动更新下游成本（跟随上游 + 0.1 TRX）: ${energyPoolId}`)
    }

    const data: UpstreamInfo = {
      energyPoolId,
      balanceTrx,
      upstreamUsername,
      price1HourSun,
      price1DaySun,
      price3DaySun,
      price30DaySun,
      priceBishuTrx,
      cost1HourTrx,
      cost1DayTrx,
      cost3DayTrx,
      cost30DayTrx,
      lastConsumptionTime: lastConsumptionTime?.toISOString() || null,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, data, message: '上游信息已更新' })
  } catch (e) {
    console.error('刷新上游信息失败:', e)
    return NextResponse.json({ success: false, error: '刷新上游信息失败' }, { status: 500 })
  }
}
