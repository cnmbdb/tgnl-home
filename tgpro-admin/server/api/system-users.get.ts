import { executeQuery } from '../utils/database'
import { requireAuth } from '../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证用户登录状态
  const user = await requireAuth(event)
  if (!user) {
    return {
      success: false,
      error: '未授权访问'
    }
  }
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const search = query.search as string || ''
    const status = query.status as string || ''
    const role = query.role as string || ''
    
    const offset = (page - 1) * limit
    
    // 构建WHERE条件
    let whereConditions = []
    let params: any[] = []
    
    if (search) {
      whereConditions.push('(username LIKE ? OR email LIKE ?)')
      params.push(`%${search}%`, `%${search}%`)
    }
    
    if (status) {
      whereConditions.push('status = ?')
      params.push(status)
    }
    
    if (role) {
      whereConditions.push('role = ?')
      params.push(role)
    }
    
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : ''
    
    // 获取总数
    const countQuery = `SELECT COUNT(*) as total FROM system_users ${whereClause}`
    const countResult = await executeQuery(countQuery, params) as any[]
    const total = countResult[0].total
    
    // 获取用户列表
    const usersQuery = `
      SELECT id, username, email, role, status, last_login, created_at, updated_at 
      FROM system_users 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `
    const users = await executeQuery(usersQuery, params) as any[]
    
    // 获取统计数据
    const statsQuery = `
      SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admin_count,
        SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as user_count,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_count,
        SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_count
      FROM system_users
    `
    const stats = await executeQuery(statsQuery) as any[]
    
    return {
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        stats: stats[0]
      }
    }
  } catch (error: any) {
    console.error('Error fetching system users:', error)
    return {
      success: false,
      error: error.message
    }
  }
})