import { executeQuery } from './database'

export interface UserPayload {
  id: number
  username: string
  role: string
}

// 简单的基于session的认证（生产环境建议使用JWT）
export async function requireAuth(event: any): Promise<UserPayload | null> {
  try {
    // 从cookie中获取用户信息
    const userCookie = getCookie(event, 'userInfo') || parseCookies(event)['userInfo']
    
    if (!userCookie) {
      return null
    }
    
    const userInfo = typeof userCookie === 'string' ? JSON.parse(userCookie) : userCookie
    
    // 验证用户是否仍然存在且活跃
    const users = await executeQuery(
      'SELECT id, username, role, status FROM system_users WHERE id = ? AND status = "active"',
      [userInfo.id]
    ) as any[]
    
    if (users.length === 0) {
      return null
    }
    
    return users[0]
  } catch (error) {
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