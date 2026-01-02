import { executeQuery } from './database'

export interface UserPayload {
  id: number
  username: string
  role: string
}

// 简单的基于session的认证（生产环境建议使用JWT）
export async function requireAuth(event: any): Promise<UserPayload | null> {
  try {
    console.log('[Auth] 开始验证用户认证')
    
    // 尝试多种方式获取cookie
    const headers = getHeaders(event)
    console.log('[Auth] 请求头Cookie:', headers.cookie)
    
    const userCookie = getCookie(event, 'userInfo')
    console.log('[Auth] getCookie结果:', userCookie ? '找到' : '未找到')
    
    const allCookies = parseCookies(event)
    console.log('[Auth] 所有cookies:', Object.keys(allCookies))
    
    const finalUserCookie = userCookie || allCookies['userInfo']
    
    if (!finalUserCookie) {
      console.log('[Auth] 未找到userInfo cookie')
      return null
    }
    
    const userInfo = typeof finalUserCookie === 'string' ? JSON.parse(finalUserCookie) : finalUserCookie
    console.log('[Auth] 用户信息:', { id: userInfo.id, username: userInfo.username })
    
    // 验证用户是否仍然存在且活跃
    const users = await executeQuery(
      'SELECT id, username, role, status FROM system_users WHERE id = ? AND status = "active"',
      [userInfo.id]
    ) as any[]
    
    if (users.length === 0) {
      console.log('[Auth] 用户不存在或已禁用')
      return null
    }
    
    console.log('[Auth] 认证成功:', users[0])
    return users[0]
  } catch (error) {
    console.error('[Auth] 认证错误:', error)
    return null
  }
}

export async function requireAdmin(event: any): Promise<UserPayload | null> {
  const user = await requireAuth(event)
  
  if (!user || user.role !== 'admin') {
    return null
  }
  
  return user
}