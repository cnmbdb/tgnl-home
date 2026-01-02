import { executeQuery } from '../../utils/database'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    if (!id) {
      return {
        success: false,
        error: '用户ID为必填项'
      }
    }

    // 获取用户信息
    const user = await executeQuery(
      'SELECT id, username, email, role, status, last_login, created_at, updated_at FROM system_users WHERE id = ?',
      [id]
    ) as any[]

    if (user.length === 0) {
      return {
        success: false,
        error: '用户不存在'
      }
    }

    return {
      success: true,
      data: user[0]
    }
  } catch (error: any) {
    console.error('Error fetching system user:', error)
    return {
      success: false,
      error: error.message
    }
  }
})