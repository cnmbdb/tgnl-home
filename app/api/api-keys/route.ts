import { NextResponse } from 'next/server'
import crypto from 'crypto'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

type ApiKeyRow = {
  id: string
  name: string
  key_prefix: string
  status: 'active' | 'inactive'
  permissions: string[]
  requests: number
  last_used_at: Date | null
  created_at: Date
}

function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex')
}

function makeApiKey() {
  const raw = crypto.randomBytes(32).toString('hex')
  const key = `sk_${raw}`
  const prefix = key.slice(0, 12)
  return { key, prefix, hash: sha256(key) }
}

export async function GET() {
  try {
    const result = await pool.query<ApiKeyRow>(
      'SELECT id, name, key_prefix, status, permissions, requests, last_used_at, created_at FROM api_keys ORDER BY created_at DESC'
    )

    const data = result.rows.map((r) => ({
      id: r.id,
      name: r.name,
      keyPrefix: r.key_prefix,
      status: r.status,
      permissions: r.permissions,
      requests: Number(r.requests || 0),
      lastUsedAt: r.last_used_at ? r.last_used_at.toISOString() : null,
      createdAt: r.created_at.toISOString(),
    }))

    const res: ApiResponse<typeof data> = { success: true, data }
    return NextResponse.json(res)
  } catch (e) {
    console.error('获取 API Key 列表失败:', e)
    const res: ApiResponse<null> = { success: false, error: '获取 API Key 列表失败' }
    return NextResponse.json(res, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      name?: string
      permissions?: string[]
    }

    const name = body.name?.trim() || '默认 API Key'
    const permissions = Array.isArray(body.permissions) && body.permissions.length > 0 ? body.permissions : ['read']

    const { key, prefix, hash } = makeApiKey()

    const inserted = await pool.query(
      'INSERT INTO api_keys (name, key_hash, key_prefix, status, permissions) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, key_prefix, status, permissions, requests, last_used_at, created_at',
      [name, hash, prefix, 'active', permissions]
    )

    const row = inserted.rows[0]

    // 仅在创建时返回明文 key（只显示一次）
    const data = {
      id: row.id,
      name: row.name,
      key,
      keyPrefix: row.key_prefix,
      status: row.status,
      permissions: row.permissions,
      requests: Number(row.requests || 0),
      lastUsedAt: row.last_used_at ? row.last_used_at.toISOString() : null,
      createdAt: row.created_at.toISOString(),
    }

    const res: ApiResponse<typeof data> = { success: true, data, message: 'API Key 创建成功' }
    return NextResponse.json(res, { status: 201 })
  } catch (e) {
    console.error('创建 API Key 失败:', e)
    const res: ApiResponse<null> = { success: false, error: '创建 API Key 失败' }
    return NextResponse.json(res, { status: 500 })
  }
}

