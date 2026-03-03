import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { validateApiUser } from '@/app/v1/_lib/auth'
import { logClientCall } from '@/app/v1/_lib/client-log'
import { handleOptions, jsonWithCors } from '@/app/v1/_lib/cors'

// 处理 CORS 预检请求
export async function OPTIONS() {
  return handleOptions()
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const username = url.searchParams.get('username') || undefined
  const password = url.searchParams.get('password') || undefined
  const botUsername = url.searchParams.get('bot_username') || undefined

  // 记录调用日志（在鉴权之前记录，即使鉴权失败也能看到调用记录）
  await logClientCall({ request, apiUsername: username, endpoint: '/v1/get_api_user_info', botUsername })

  const ok = await validateApiUser(username, password)
  if (!ok) {
    return jsonWithCors({ error: 'invalid api username/password' }, { status: 401 })
  }

  const res = await pool.query(
    'SELECT username, balance_micro, status, created_at FROM api_users WHERE username = $1 LIMIT 1',
    [username]
  )

  if (res.rowCount === 0) {
    return jsonWithCors({ error: 'api user not found' }, { status: 404 })
  }

  const row = res.rows[0] as any
  const balanceMicro = Number(row.balance_micro || 0)

  // 返回结构尽量贴近机器人原先的展示习惯：包含中文字段
  return jsonWithCors({
    '用户名': row.username,
    '状态': row.status,
    '创建时间': row.created_at?.toISOString?.() || row.created_at,
    '当前余额(TRX)': Number((balanceMicro / 1e6).toFixed(6)),
  })
}





