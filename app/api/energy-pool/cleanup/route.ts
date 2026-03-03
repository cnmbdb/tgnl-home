import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'
import pool from '@/lib/db'

export async function POST() {
  try {
    // 仅保留最早创建的一个能量池，其余全部删除
    // 如果你想按“已配置上游的那个”保留，需要再调整条件
    const keepRes = await pool.query(
      'SELECT id FROM energy_pools ORDER BY created_at ASC LIMIT 1'
    )

    if (keepRes.rowCount === 0) {
      const res: ApiResponse<null> = { success: true, message: '没有能量池可清理' }
      return NextResponse.json(res)
    }

    const keepId = keepRes.rows[0].id as string

    await pool.query('DELETE FROM energy_pools WHERE id <> $1', [keepId])

    const res: ApiResponse<{ keepId: string }> = {
      success: true,
      data: { keepId },
      message: `已删除其它能量池，仅保留 ${keepId}`,
    }
    return NextResponse.json(res)
  } catch (e) {
    console.error('清理能量池失败:', e)
    const res: ApiResponse<null> = { success: false, error: '清理能量池失败' }
    return NextResponse.json(res, { status: 500 })
  }
}


