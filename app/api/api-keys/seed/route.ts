import { NextResponse } from 'next/server'
import crypto from 'crypto'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex')
}

function makeApiKey() {
  const raw = crypto.randomBytes(32).toString('hex')
  const key = `sk_${raw}`
  const prefix = key.slice(0, 12)
  return { key, prefix, hash: sha256(key) }
}

export async function POST() {
  try {
    // 如果已经存在任何 key，则不再重复创建
    const existing = await pool.query('SELECT id FROM api_keys LIMIT 1')
    if (existing.rowCount && existing.rowCount > 0) {
      const res: ApiResponse<null> = { success: false, error: '已存在 API Key，请在列表中查看' }
      return NextResponse.json(res, { status: 400 })
    }

    const { key, prefix, hash } = makeApiKey()

    const inserted = await pool.query(
      'INSERT INTO api_keys (name, key_hash, key_prefix, status, permissions) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, key_prefix, status, permissions, created_at',
      ['默认 API Key', hash, prefix, 'active', ['read', 'write']]
    )

    const row = inserted.rows[0]
    const res: ApiResponse<any> = {
      success: true,
      data: {
        id: row.id,
        name: row.name,
        key,
        keyPrefix: row.key_prefix,
        status: row.status,
        permissions: row.permissions,
        createdAt: row.created_at.toISOString(),
      },
      message: '已生成 1 个默认 API Key（只显示一次）',
    }

    return NextResponse.json(res, { status: 201 })
  } catch (e) {
    console.error('生成默认 API Key 失败:', e)
    const res: ApiResponse<null> = { success: false, error: '生成默认 API Key 失败' }
    return NextResponse.json(res, { status: 500 })
  }
}

