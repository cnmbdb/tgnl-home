import pool from '@/lib/db'

function getClientIp(request: Request): string {
  // next dev / reverse proxy 下优先取 x-forwarded-for
  const xff = request.headers.get('x-forwarded-for') || request.headers.get('X-Forwarded-For')
  if (xff) {
    // xff 可能是 "client, proxy1, proxy2"
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }

  const xrip = request.headers.get('x-real-ip') || request.headers.get('X-Real-IP')
  if (xrip) return xrip.trim()

  // 兜底：在某些环境拿不到真实 IP
  return 'unknown'
}

export async function logClientCall(params: {
  request: Request
  apiUsername?: string
  endpoint: string
  botUsername?: string
}) {
  try {
    const ip = getClientIp(params.request)
    const ua = params.request.headers.get('user-agent')

    await pool.query(
      'INSERT INTO client_logs (api_username, ip, user_agent, endpoint, bot_username) VALUES ($1, $2, $3, $4, $5)',
      [params.apiUsername || null, ip, ua || null, params.endpoint, params.botUsername || null]
    )
  } catch {
    // 不影响主流程
  }
}

