export function extractCredentialsFromRequest(request: Request): { username?: string; password?: string } {
  const url = new URL(request.url)
  const username = url.searchParams.get('username') || undefined
  const password = url.searchParams.get('password') || undefined

  // 兼容 Authorization: Basic base64(username:password)
  const auth = request.headers.get('authorization') || request.headers.get('Authorization')
  if (auth && auth.toLowerCase().startsWith('basic ')) {
    try {
      const b64 = auth.slice(6).trim()
      const decoded = Buffer.from(b64, 'base64').toString('utf8')
      const idx = decoded.indexOf(':')
      if (idx > 0) {
        return { username: decoded.slice(0, idx), password: decoded.slice(idx + 1) }
      }
    } catch {
      // ignore
    }
  }

  return { username, password }
}

