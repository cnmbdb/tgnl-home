import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET - 获取下游成本配置
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const energyPoolId = searchParams.get('energyPoolId')

    if (!energyPoolId) {
      return NextResponse.json(
        { success: false, error: '缺少 energyPoolId 参数' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `SELECT 
        energy_pool_id as "energyPoolId",
        cost_1hour_trx as "cost1HourTrx",
        cost_1day_trx as "cost1DayTrx",
        cost_3day_trx as "cost3DayTrx",
        cost_30day_trx as "cost30DayTrx",
        cost_bishu_trx as "costBishuTrx",
        COALESCE(auto_follow_upstream, false) as "autoFollowUpstream",
        updated_at as "updatedAt"
      FROM downstream_pricing
      WHERE energy_pool_id = $1`,
      [energyPoolId]
    )

    if (result.rows.length === 0) {
      // 返回默认值
      return NextResponse.json({
        success: true,
        data: {
          energyPoolId,
          cost1HourTrx: 0,
          cost1DayTrx: 0,
          cost3DayTrx: 0,
          cost30DayTrx: 0,
          costBishuTrx: 0,
          autoFollowUpstream: false,
          updatedAt: null,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('获取下游成本配置失败:', error)
    return NextResponse.json(
      { success: false, error: '获取下游成本配置失败' },
      { status: 500 }
    )
  }
}

// POST - 保存下游成本配置
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      energyPoolId,
      cost1HourTrx,
      cost1DayTrx,
      cost3DayTrx,
      cost30DayTrx,
      costBishuTrx,
      autoFollowUpstream,
    } = body

    if (!energyPoolId) {
      return NextResponse.json(
        { success: false, error: '缺少 energyPoolId 参数' },
        { status: 400 }
      )
    }

    // 使用 UPSERT
    await pool.query(
      `INSERT INTO downstream_pricing (
        energy_pool_id, cost_1hour_trx, cost_1day_trx, cost_3day_trx, cost_30day_trx, cost_bishu_trx, auto_follow_upstream, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (energy_pool_id) DO UPDATE SET
        cost_1hour_trx = $2,
        cost_1day_trx = $3,
        cost_3day_trx = $4,
        cost_30day_trx = $5,
        cost_bishu_trx = $6,
        auto_follow_upstream = $7,
        updated_at = NOW()`,
      [
        energyPoolId,
        cost1HourTrx || 0,
        cost1DayTrx || 0,
        cost3DayTrx || 0,
        cost30DayTrx || 0,
        costBishuTrx || 0,
        autoFollowUpstream || false,
      ]
    )

    return NextResponse.json({
      success: true,
      data: {
        energyPoolId,
        cost1HourTrx: cost1HourTrx || 0,
        cost1DayTrx: cost1DayTrx || 0,
        cost3DayTrx: cost3DayTrx || 0,
        cost30DayTrx: cost30DayTrx || 0,
        costBishuTrx: costBishuTrx || 0,
        autoFollowUpstream: autoFollowUpstream || false,
      },
    })
  } catch (error) {
    console.error('保存下游成本配置失败:', error)
    return NextResponse.json(
      { success: false, error: '保存下游成本配置失败' },
      { status: 500 }
    )
  }
}
