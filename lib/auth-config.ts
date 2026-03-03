// 认证配置工具

// 获取登录路径（从环境变量读取，默认使用复杂路径）
export function getLoginPath(): string {
  return process.env.LOGIN_PATH || process.env.NEXT_PUBLIC_LOGIN_PATH || '/admin/auth/login'
}

// 获取应用端口
export function getAppPort(): number {
  return parseInt(process.env.PORT || '3000', 10)
}

// 是否要求域名访问登录页
export function requireDomainForLogin(): boolean {
  return process.env.REQUIRE_DOMAIN_FOR_LOGIN === 'true'
}

// 获取允许的域名列表
export function getAllowedDomains(): string[] {
  return process.env.ALLOWED_DOMAINS?.split(',').map(d => d.trim()).filter(Boolean) || []
}
