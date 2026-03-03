import { NextResponse } from 'next/server'
import crypto from 'crypto'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'
import { handleOptions, jsonWithCors } from '@/app/v1/_lib/cors'

type ApiUserRow = {
  id: string
  username: string
  password: string
  status: 'active' | 'inactive'
  created_at: Date
  balance_micro: string | number
}

function randomString(len: number) {
  return crypto.randomBytes(len).toString('hex')
}

// 处理 CORS 预检请求
export async function OPTIONS() {
  return handleOptions()
}

export async function GET() {
  try {
    const result = await pool.query<ApiUserRow>(
      'SELECT id, username, password, status, balance_micro, created_at FROM api_users ORDER BY created_at DESC'
    )

    const data = result.rows.map((r) => ({
      id: r.id,
      username: r.username,
      password: r.password,
      status: r.status,
      balanceMicro: Number(r.balance_micro),
      balanceTrx: (Number(r.balance_micro) / 1e6).toFixed(6).replace(/\.?0+$/, ''),
      createdAt: r.created_at.toISOString(),
    }))

    const res: ApiResponse<typeof data> = { success: true, data }
    return jsonWithCors(res)
  } catch (e) {
    console.error('获取 API 用户失败:', e)
    const res: ApiResponse<null> = { success: false, error: '获取 API 用户失败' }
    return jsonWithCors(res, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      username?: string
    }

    const username = body.username?.trim() || `api_${randomString(4)}`
    const password = `pw_${randomString(12)}`

    const inserted = await pool.query(
      'INSERT INTO api_users (username, password, status, balance_micro) VALUES ($1, $2, $3, $4) RETURNING id, username, password, status, balance_micro, created_at',
      [username, password, 'active', 0]
    )

    const row = inserted.rows[0]

    // 仅创建时返回明文密码（只显示一次）
    const data = {
      id: row.id,
      username: row.username,
      password: row.password,
      status: row.status,
      balanceMicro: Number(row.balance_micro || 0),
      balanceTrx: (Number(row.balance_micro || 0) / 1e6).toFixed(6).replace(/\.?0+$/, ''),
      createdAt: row.created_at.toISOString(),
    }

    const res: ApiResponse<typeof data> = { success: true, data, message: 'API 用户创建成功' }
    return jsonWithCors(res, { status: 201 })
  } catch (e: any) {
    console.error('创建 API 用户失败:', e)
    const res: ApiResponse<null> = { success: false, error: '创建 API 用户失败' }
    return jsonWithCors(res, { status: 500 })
  }
}

