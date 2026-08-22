import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * 获取访问配置
 * 返回允许的访问方式（IP 或域名）
 * 安全：不泄露敏感配置信息，只返回必要的访问信息
 */
export async function GET(request: NextRequest) {
  try {
    const requireDomain = process.env.REQUIRE_DOMAIN_FOR_LOGIN === 'true'
    const allowedDomains = process.env.ALLOWED_DOMAINS?.split(',').map(d => d.trim()).filter(Boolean) || []
    const loginPath = process.env.LOGIN_PATH || process.env.NEXT_PUBLIC_LOGIN_PATH || '/admin/auth/login'
    const defaultPort = process.env.PORT || '3000'
    
    // 从请求头获取当前访问信息（更安全）
    const host = request.headers.get('host') || `localhost:${defaultPort}`
    const forwardedProto = request.headers.get('x-forwarded-proto')
    const forwardedSsl = request.headers.get('x-forwarded-ssl')

    // 优先使用代理传递的协议，否则根据端口推断
    const protocol =
      forwardedProto ||
      (forwardedSsl === 'on' ? 'https' : undefined) ||
      (defaultPort === '443' ? 'https' : 'http')

    const hostname = host.split(':')[0]
    // Host 头里不带端口时，根据实际协议推断 80/443，避免对外展示 3000 这样的内部端口
    const currentPort =
      host.split(':')[1] ||
      (protocol === 'https' ? '443' : '80')
    
    // 构建访问 URL（基于当前请求）
    let domainUrl = ''
    let ipUrl = ''
    
    // 判断当前是 IP 还是域名
    const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || 
                 /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/.test(hostname) ||
                 /^\[([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}\]$/.test(hostname)
    
    if (isIP) {
      // 当前是 IP 访问
      ipUrl = `${protocol}://${hostname}${currentPort !== '80' && currentPort !== '443' ? `:${currentPort}` : ''}${loginPath}`
      // 如果有配置域名，提供域名访问方式
      if (allowedDomains.length > 0) {
        domainUrl = `${protocol}://${allowedDomains[0]}${currentPort !== '80' && currentPort !== '443' ? `:${currentPort}` : ''}${loginPath}`
      }
    } else {
      // 当前是域名访问
      domainUrl = `${protocol}://${hostname}${currentPort !== '80' && currentPort !== '443' ? `:${currentPort}` : ''}${loginPath}`
      // IP URL 不提供（需要用户手动输入，避免泄露服务器 IP）
      ipUrl = ''
    }

    // 安全：不返回完整的配置信息，只返回必要的访问 URL
    return NextResponse.json({
      success: true,
      data: {
        requireDomain,
        loginPath,
        domainUrl: domainUrl || null,
        ipUrl: ipUrl || null,
        // 不返回 allowedDomains 和 currentUrl，避免信息泄露
      },
    })
  } catch (error: any) {
    console.error('获取访问配置失败:', error)
    return NextResponse.json(
      { success: false, error: '获取访问配置失败' },
      { status: 500 }
    )
  }
}
