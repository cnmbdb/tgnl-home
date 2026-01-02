import { executeQuery } from '../utils/database'
import { requireAdmin } from '../utils/auth'
import crypto from 'crypto'

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
    const body = await readBody(event)
    const { id, username, password, email, role, status } = body

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

    const updateFields: string[] = []
    const updateValues: any[] = []

    // 更新用户名
    if (username !== undefined) {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        return {
          success: false,
          error: '用户名只能包含字母、数字和下划线，长度3-20位'
        }
      }

      // 检查用户名是否已被其他用户使用
      const duplicateUser = await executeQuery(
        'SELECT id FROM system_users WHERE username = ? AND id != ?',
        [username, id]
      ) as any[]

      if (duplicateUser.length > 0) {
        return {
          success: false,
          error: '用户名已存在'
        }
      }

      updateFields.push('username = ?')
      updateValues.push(username)
    }

    // 更新密码
    if (password !== undefined && password !== '') {
      if (password.length < 6) {
        return {
          success: false,
          error: '密码长度至少6位'
        }
      }

      const salt = crypto.randomBytes(16).toString('hex')
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
      const finalPassword = `${salt}:${hashedPassword}`

      updateFields.push('password = ?')
      updateValues.push(finalPassword)
    }

    // 更新邮箱
    if (email !== undefined) {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
          success: false,
          error: '邮箱格式不正确'
        }
      }

      // 检查邮箱是否已被其他用户使用
      if (email) {
        const duplicateEmail = await executeQuery(
          'SELECT id FROM system_users WHERE email = ? AND id != ?',
          [email, id]
        ) as any[]

        if (duplicateEmail.length > 0) {
          return {
            success: false,
            error: '邮箱已存在'
          }
        }
      }

      updateFields.push('email = ?')
      updateValues.push(email)
    }

    // 更新角色
    if (role !== undefined) {
      if (!['admin', 'user'].includes(role)) {
        return {
          success: false,
          error: '角色只能是admin或user'
        }
      }

      updateFields.push('role = ?')
      updateValues.push(role)
    }

    // 更新状态
    if (status !== undefined) {
      if (!['active', 'inactive'].includes(status)) {
        return {
          success: false,
          error: '状态只能是active或inactive'
        }
      }

      updateFields.push('status = ?')
      updateValues.push(status)
    }

    // 如果没有要更新的字段
    if (updateFields.length === 0) {
      return {
        success: false,
        error: '没有要更新的字段'
      }
    }

    // 添加更新时间
    updateFields.push('updated_at = CURRENT_TIMESTAMP')

    // 执行更新
    updateValues.push(id)
    await executeQuery(
      `UPDATE system_users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    )

    // 获取更新后的用户信息
    const updatedUser = await executeQuery(
      'SELECT id, username, email, role, status, last_login, created_at, updated_at FROM system_users WHERE id = ?',
      [id]
    ) as any[]

    return {
      success: true,
      message: '用户更新成功',
      data: updatedUser[0]
    }
  } catch (error: any) {
    console.error('Error updating system user:', error)
    return {
      success: false,
      error: error.message
    }
  }
})