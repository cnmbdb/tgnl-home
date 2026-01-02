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

    // 设置用户信息到cookie
    const userInfo = {
      id: user.id,
      username: user.username,
      role: user.role,
      status: user.status
    }
    
    console.log('Setting cookies for user:', userInfo)
    
    // 设置登录状态cookie
    setCookie(event, 'isLoggedIn', 'true', {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7天
    })
    
    // 设置用户信息cookie
    setCookie(event, 'userInfo', JSON.stringify(userInfo), {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7天
    })
    
    console.log('Cookies set successfully')

    // 返回用户信息（不包含密码）
    return {
      success: true,
      message: '登录成功',
      data: userInfo
    }
  } catch (error: any) {
    console.error('Error during login:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      stack: error.stack
    })
    
    // 根据错误类型返回不同的错误信息
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      return {
        success: false,
        error: '数据库连接失败，请稍后重试'
      }
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      return {
        success: false,
        error: '数据库访问权限错误'
      }
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      return {
        success: false,
        error: '数据库不存在'
      }
    } else {
      return {
        success: false,
        error: `登录失败: ${error.message}`
      }
    }
  }
})