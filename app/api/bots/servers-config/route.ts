import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS server_configs (
      ip VARCHAR(64) PRIMARY KEY,
      remark TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `)
}

export async function GET() {
  try {
    await ensureTable()
    const result = await pool.query(
      `SELECT ip, remark, created_at, updated_at
       FROM server_configs
       ORDER BY updated_at DESC`
    )
    const res: ApiResponse<any[]> = { success: true, data: result.rows }
    return NextResponse.json(res)
  } catch (e) {
    console.error('获取服务器配置失败:', e)
    const res: ApiResponse<null> = { success: false, error: '获取服务器配置失败' }
    return NextResponse.json(res, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureTable()
    const body = await request.json().catch(() => ({}))
    const ip = String(body.ip || '').trim()
    const remark = body.remark != null ? String(body.remark).trim() : null

    if (!ip) {
      const res: ApiResponse<null> = { success: false, error: '缺少 ip' }
      return NextResponse.json(res, { status: 400 })
    }

    await pool.query(
      `INSERT INTO server_configs (ip, remark, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (ip) DO UPDATE SET
         remark = EXCLUDED.remark,
         updated_at = NOW()`,
      [ip, remark]
    )

    const res: ApiResponse<{ ip: string; remark: string | null }> = {
      success: true,
      data: { ip, remark },
      message: '保存成功',
    }
    return NextResponse.json(res)
  } catch (e) {
    console.error('保存服务器配置失败:', e)
    const res: ApiResponse<null> = { success: false, error: '保存服务器配置失败' }
    return NextResponse.json(res, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await ensureTable()
    const { searchParams } = new URL(request.url)
    const ip = (searchParams.get('ip') || '').trim()
    const purgeLogs = (searchParams.get('purgeLogs') || '').trim() === 'true'

    if (!ip) {
      const res: ApiResponse<null> = { success: false, error: '缺少 ip' }
      return NextResponse.json(res, { status: 400 })
    }

    // 删除配置
    await pool.query('DELETE FROM server_configs WHERE ip = $1', [ip])

    // 可选：清空该 IP 的历史调用记录（client_logs）
    if (purgeLogs) {
      // client_logs 可能还没升级，容错处理
      try {
        await pool.query('DELETE FROM client_logs WHERE ip = $1', [ip])
      } catch (err) {
        // ignore
      }
    }

    const res: ApiResponse<{ ip: string; purged: boolean }> = {
      success: true,
      data: { ip, purged: purgeLogs },
      message: purgeLogs ? '删除成功（含历史记录）' : '删除成功',
    }
    return NextResponse.json(res)
  } catch (e) {
    console.error('删除服务器配置失败:', e)
    const res: ApiResponse<null> = { success: false, error: '删除服务器配置失败' }
    return NextResponse.json(res, { status: 500 })
  }
}

