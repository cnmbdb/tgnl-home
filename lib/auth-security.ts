import crypto from 'crypto'

/**
 * 安全工具函数
 */

/**
 * 生成安全的 token（使用 SHA-256 哈希）
 */
export function generateSecureToken(userId: number, username: string): string {
  const timestamp = Date.now()
  const randomBytes = crypto.randomBytes(32).toString('hex')
  const secret = process.env.AUTH_SECRET || 'default-secret-change-in-production'
  const data = `${userId}:${username}:${timestamp}:${randomBytes}:${secret}`
  return crypto.createHash('sha256').update(data).digest('base64')
}

/**
 * 验证 token 格式（简单验证，实际应该存储到数据库或 Redis）
 * 注意：当前实现是简单的存在性检查，生产环境应该实现完整的 token 验证
 */
export function validateTokenFormat(token: string): boolean {
  if (!token || token.length < 32) {
    return false
  }
  // 检查是否为 base64 格式
  try {
    const decoded = Buffer.from(token, 'base64')
    return decoded.length > 0
  } catch {
    return false
  }
}

/**
 * 记录安全事件
 */
export function logSecurityEvent(
  type: string,
  details: Record<string, any>
) {
  const timestamp = new Date().toISOString()
  
  // 清理敏感信息
  const sanitizedDetails = sanitizeForLog(details)
  
  console.warn(`[SECURITY] [${timestamp}] ${type}:`, sanitizedDetails)
}

/**
 * 清理敏感信息（防止日志泄露）
 */
export function sanitizeForLog(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data
  }
  
  const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth', 'credential']
  const sanitized = { ...data }
  
  for (const key in sanitized) {
    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
      sanitized[key] = '***REDACTED***'
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeForLog(sanitized[key])
    }
  }
  
  return sanitized
}
