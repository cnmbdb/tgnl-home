import { NextResponse } from 'next/server'
import { getDefaultUpstreamProvider } from '@/app/v1/_lib/provider'
import { validateApiUser } from '@/app/v1/_lib/auth'
import { extractCredentialsFromRequest } from '@/app/v1/_lib/extract-credentials'
import { unauthorized } from '@/app/v1/_lib/response'
import { handleOptions, withCors, jsonWithCors } from '@/app/v1/_lib/cors'

// 处理 CORS 预检请求
export async function OPTIONS() {
  return handleOptions()
}

export async function GET(request: Request) {
  const provider = await getDefaultUpstreamProvider()

  // 调用方提供的是本系统 API 账号
  const creds = extractCredentialsFromRequest(request)
  const ok = await validateApiUser(creds.username, creds.password)
  if (!ok) return jsonWithCors({ error: 'invalid api username/password' }, { status: 401 })

  if (!provider.username) {
    return jsonWithCors({ error: 'upstream not configured for EP001' }, { status: 400 })
  }

  const upstreamUrl = new URL('/v1/get_user_info', provider.baseUrl)
  // 上游需要的是“上游账号 username”
  upstreamUrl.searchParams.set('username', provider.username)

  try {
    const res = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    })

    const text = await res.text()
    const response = new NextResponse(text, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    })
    return withCors(response)
  } catch {
    return jsonWithCors({ error: 'upstream request failed' }, { status: 502 })
  }
}
