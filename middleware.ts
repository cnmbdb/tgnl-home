import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 登录路径（从环境变量读取，默认使用复杂路径）
// 注意：Next.js 中间件中环境变量需要在构建时注入
const LOGIN_PATH = process.env.LOGIN_PATH || process.env.NEXT_PUBLIC_LOGIN_PATH || '/admin/auth/login'
const REQUIRE_DOMAIN = process.env.REQUIRE_DOMAIN_FOR_LOGIN === 'true'
const IS_DEV = process.env.NODE_ENV !== 'production'
const ALLOWED_DOMAINS = process.env.ALLOWED_DOMAINS?.split(',').map(d => d.trim()).filter(Boolean) || []

/**
 * 检查是否为 IP 地址（IPv4 和 IPv6）
 */
function isIPAddress(hostname: string): boolean {
  // IPv4 地址
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
  // IPv6 地址（简化检查）
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/
  // IPv6 带方括号
  const ipv6BracketedRegex = /^\[([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}\]$/
  
  return ipv4Regex.test(hostname) || ipv6Regex.test(hostname) || ipv6BracketedRegex.test(hostname)
}

/**
 * 检查域名是否在允许列表中（严格验证）
 */
function isAllowedDomain(hostname: string): boolean {
  if (ALLOWED_DOMAINS.length === 0) {
    return true // 如果没有配置允许的域名列表，则允许所有域名
  }
  
  // 规范化域名（转小写，去除端口）
  const normalizedHostname = hostname.toLowerCase().split(':')[0]
  
  return ALLOWED_DOMAINS.some(domain => {
    const normalizedDomain = domain.toLowerCase().trim()
    // 精确匹配
    if (normalizedHostname === normalizedDomain) {
      return true
    }
    // 子域名匹配（例如：admin.example.com 匹配 example.com）
    if (normalizedHostname.endsWith(`.${normalizedDomain}`)) {
      return true
    }
    return false
  })
}

/**
 * 验证 Host 头（防止 Host 头注入攻击）
 */
function validateHostHeader(host: string | null): { valid: boolean; hostname: string } {
  if (!host) {
    return { valid: false, hostname: '' }
  }
  
  // 提取 hostname（去除端口）
  const hostname = host.split(':')[0].trim()
  
  // 检查是否包含非法字符
  if (/[^a-zA-Z0-9.\-\[\]:]/.test(hostname)) {
    return { valid: false, hostname: '' }
  }
  
  return { valid: true, hostname }
}

/**
 * 记录安全事件日志（不泄露敏感信息）
 */
function logSecurityEvent(type: string, details: Record<string, any>, request: NextRequest) {
  const timestamp = new Date().toISOString()
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  // 清理敏感信息
  const sanitizedDetails = { ...details }
  delete sanitizedDetails.allowedDomains // 不记录允许的域名列表
  
  console.warn(`[SECURITY] [${timestamp}] ${type}:`, {
    ...sanitizedDetails,
    ip,
    userAgent,
    path: request.nextUrl.pathname,
  })
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')
  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === LOGIN_PATH
  const isApiAuth = pathname.startsWith('/api/auth')
  const isDashboard = pathname.startsWith('/dashboard')
  const isApiRoute = pathname.startsWith('/api/') || pathname.startsWith('/v1/')
  
  // 验证 Host 头
  const hostHeader = request.headers.get('host')
  const hostValidation = validateHostHeader(hostHeader)
  
  if (!hostValidation.valid) {
    logSecurityEvent('INVALID_HOST_HEADER', { host: hostHeader }, request)
    return NextResponse.json(
      { 
        success: false, 
        error: '访问被拒绝',
      },
      { status: 403 }
    )
  }
  
  const hostname = hostValidation.hostname

  // API 路由和根路径允许直接访问（不重定向，不暴露后台入口）
  // 但如果是认证相关的 API，需要进行域名验证
  if (pathname === '/' || (isApiRoute && !isApiAuth)) {
    return NextResponse.next()
  }

  // 如果开启了域名限制，对所有认证相关路由进行严格检查
  // 本地开发环境（NODE_ENV !== 'production'）默认放行，方便用 127.0.0.1/localhost 调试
  if (REQUIRE_DOMAIN && !IS_DEV && (isLoginPage || isApiAuth)) {
    // 如果是 IP 地址访问，拒绝访问
    if (isIPAddress(hostname)) {
      logSecurityEvent('IP_ACCESS_DENIED', { hostname, path: pathname }, request)
      return NextResponse.json(
        { 
          success: false, 
          error: '访问被拒绝',
          message: '请使用域名访问',
        },
        { status: 403 }
      )
    }
    
    // 如果配置了允许的域名列表，严格检查域名是否在允许列表中
    if (ALLOWED_DOMAINS.length > 0) {
      if (!isAllowedDomain(hostname)) {
        logSecurityEvent('DOMAIN_NOT_ALLOWED', { hostname, path: pathname }, request)
        return NextResponse.json(
          { 
            success: false, 
            error: '访问被拒绝',
            message: '域名未授权',
          },
          { status: 403 }
        )
      }
    }
  }

  // 如果访问登录页且已登录，重定向到仪表板
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 如果访问仪表板但未登录，重定向到登录页
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
  }

  // API 认证路由允许访问（已通过域名验证）
  if (isApiAuth) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

