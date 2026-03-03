import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

/**
 * 批量删除订单
 * 支持删除充值订单和消费订单
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderIds } = body as {
      orderIds: string[]
      orderTypes?: ('recharge' | 'consumption')[]
    }

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json(
        { success: false, error: '请选择要删除的订单' },
        { status: 400 }
      )
    }

    let deletedCount = 0
    const errors: string[] = []

    // 去重，并区分完整 UUID 与前缀（兼容旧前端可能只传前 8 位的情况）
    const uniqueIds = Array.from(new Set(orderIds.map((id) => String(id).trim()))).filter(Boolean)
    const fullIds = uniqueIds.filter((id) => id.length >= 32) // 基本认为是完整 UUID
    const shortIds = uniqueIds.filter((id) => id.length < 32)

    // 删除充值订单（支持完整 UUID 和前缀两种匹配方式）
    if (uniqueIds.length > 0) {
      try {
        const result = await pool.query(
          `
          DELETE FROM api_recharge_orders
          WHERE
            ($1::text[] IS NOT NULL AND id::text = ANY($1::text[]))
            OR ($2::text[] IS NOT NULL AND LEFT(id::text, 8) = ANY($2::text[]))
          `,
          [fullIds.length ? fullIds : null, shortIds.length ? shortIds : null]
        )
        deletedCount += result.rowCount || 0
      } catch (error: any) {
        errors.push(`删除充值订单失败: ${error.message}`)
      }
    }

    // 删除消费订单（同上）
    if (uniqueIds.length > 0) {
      try {
        const result = await pool.query(
          `
          DELETE FROM api_consumption_orders
          WHERE
            ($1::text[] IS NOT NULL AND id::text = ANY($1::text[]))
            OR ($2::text[] IS NOT NULL AND LEFT(id::text, 8) = ANY($2::text[]))
          `,
          [fullIds.length ? fullIds : null, shortIds.length ? shortIds : null]
        )
        deletedCount += result.rowCount || 0
      } catch (error: any) {
        errors.push(`删除消费订单失败: ${error.message}`)
      }
    }

    if (errors.length > 0 && deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: errors.join('; ') },
        { status: 500 }
      )
    }

    const res: ApiResponse<{ deletedCount: number; errors?: string[] }> = {
      success: true,
      data: {
        deletedCount,
        ...(errors.length > 0 && { errors }),
      },
      message: `成功删除 ${deletedCount} 条订单${errors.length > 0 ? `，部分失败: ${errors.join('; ')}` : ''}`,
    }

    return NextResponse.json(res)
  } catch (error: any) {
    console.error('批量删除订单失败:', error)
    return NextResponse.json(
      { success: false, error: error.message || '批量删除订单失败' },
      { status: 500 }
    )
  }
}
