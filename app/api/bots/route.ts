import { NextResponse } from 'next/server'
import type { Bot, ApiResponse } from '@/types'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id, name, username, token, status, calls, last_active as "lastActive", created_at as "createdAt" FROM bots ORDER BY created_at DESC'
    )
    
    const bots: Bot[] = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      username: row.username,
      token: row.token ? '***' : '', // 隐藏真实 token
      status: row.status,
      calls: row.calls,
      lastActive: row.lastActive ? row.lastActive.toISOString() : new Date().toISOString(),
      createdAt: row.createdAt.toISOString(),
    }))

    const response: ApiResponse<Bot[]> = {
      success: true,
      data: bots,
    }
    return NextResponse.json(response)
  } catch (error) {
    console.error('获取机器人列表失败:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: '获取机器人列表失败',
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = `BOT${Date.now()}`
    const name = body.name || '新机器人'
    const username = body.username || '@new_bot'
    const token = body.token || ''

    const result = await pool.query(
      'INSERT INTO bots (id, name, username, token, status, calls) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, username, token, status, calls, last_active as "lastActive", created_at as "createdAt"',
      [id, name, username, token, 'offline', 0]
    )

    const newBot: Bot = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      username: result.rows[0].username,
      token: '***', // 隐藏真实 token
      status: result.rows[0].status,
      calls: result.rows[0].calls,
      lastActive: result.rows[0].lastActive ? result.rows[0].lastActive.toISOString() : new Date().toISOString(),
      createdAt: result.rows[0].createdAt.toISOString(),
    }

    const response: ApiResponse<Bot> = {
      success: true,
      data: newBot,
      message: '机器人注册成功',
    }
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('注册机器人失败:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: '注册机器人失败',
    }
    return NextResponse.json(response, { status: 500 })
  }
}

