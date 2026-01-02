import { executeQuery } from '../utils/database'
import { requireAdmin } from '../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证管理员权限
  const user = await requireAdmin(event)
  if (!user) {
    return {
      success: false,
      error: '需要管理员权限'
    }
  }
  try {
    const query = getQuery(event)
    const id = query.id as string

    // 验证必填字段
    if (!id) {
      return {
        success: false,
        error: '用户ID为必填项'
      }
    }

    // 检查用户是否存在
    const existingUser = await executeQuery(
      'SELECT * FROM system_users WHERE id = ?',
      [id]
    ) as any[]

    if (existingUser.length === 0) {
      return {
        success: false,
        error: '用户不存在'
      }
    }

    const user = existingUser[0]

    // 防止删除最后一个管理员
    if (user.role === 'admin') {
      const adminCount = await executeQuery(
        'SELECT COUNT(*) as count FROM system_users WHERE role = "admin" AND status = "active"'
      ) as any[]

      if (adminCount[0].count <= 1) {
        return {
          success: false,
          error: '不能删除最后一个管理员账户'
        }
      }
    }

    // 删除用户
    await executeQuery(
      'DELETE FROM system_users WHERE id = ?',
      [id]
    )

    return {
      success: true,
      message: '用户删除成功',
      data: {
        id: user.id,
        username: user.username
      }
    }
  } catch (error: any) {
    console.error('Error deleting system user:', error)
    return {
      success: false,
      error: error.message
    }
  }
})