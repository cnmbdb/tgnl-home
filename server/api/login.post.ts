import { executeQuery } from '../utils/database'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body

    // 验证必填字段
    if (!username || !password) {
      return {
        success: false,
        error: '用户名和密码为必填项'
      }
    }

    // 查询用户
    const users = await executeQuery(
      'SELECT id, username, password, role, status FROM system_users WHERE username = ?',
      [username]
    ) as any[]

    if (users.length === 0) {
      return {
        success: false,
        error: '用户名或密码错误'
      }
    }

    const user = users[0]

    // 检查用户状态
    if (user.status !== 'active') {
      return {
        success: false,
        error: '账户已被禁用'
      }
    }

    // 验证密码
    const [salt, hashedPassword] = user.password.split(':')
    const inputHashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

    if (inputHashedPassword !== hashedPassword) {
      return {
        success: false,
        error: '用户名或密码错误'
      }
    }

    // 更新最后登录时间
    await executeQuery(
      'UPDATE system_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    )

    // 返回用户信息（不包含密码）
    return {
      success: true,
      message: '登录成功',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        status: user.status
      }
    }
  } catch (error: any) {
    console.error('Error during login:', error)
    return {
      success: false,
      error: '登录过程中发生错误'
    }
  }
})