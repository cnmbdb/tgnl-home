import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import pool from '@/lib/db'
import { verifyCaptcha } from '@/lib/captcha'
import { generateSecureToken, logSecurityEvent, sanitizeForLog } from '@/lib/auth-security'

// 简单的速率限制存储（生产环境应使用 Redis）
const loginAttempts = new Map<string, { count: number; resetTime: number }>()
const MAX_ATTEMPTS = 5 // 最大尝试次数
const LOCKOUT_TIME = 15 * 60 * 1000 // 锁定时间：15分钟

/**
 * 检查是否超过速率限制
 */
function checkRateLimit(ip: string): { allowed: boolean; remainingTime?: number } {
  const now = Date.now()
  const record = loginAttempts.get(ip)
  
  if (!record) {
    return { allowed: true }
  }
  
  // 如果已过锁定时间，重置
  if (now > record.resetTime) {
    loginAttempts.delete(ip)
    return { allowed: true }
  }
  
  // 如果超过最大尝试次数，拒绝
  if (record.count >= MAX_ATTEMPTS) {
    const remainingTime = Math.ceil((record.resetTime - now) / 1000 / 60) // 剩余分钟数
    return { allowed: false, remainingTime }
  }
  
  return { allowed: true }
}

/**
 * 记录失败的登录尝试
 */
function recordFailedAttempt(ip: string) {
  const now = Date.now()
  const record = loginAttempts.get(ip)
  
  if (!record || now > record.resetTime) {
    loginAttempts.set(ip, {
      count: 1,
      resetTime: now + LOCKOUT_TIME,
    })
  } else {
    record.count++
    loginAttempts.set(ip, record)
  }
}

/**
 * 清除成功的登录记录
 */
function clearAttempts(ip: string) {
  loginAttempts.delete(ip)
}

export async function POST(request: Request) {
  try {
    // 获取客户端 IP（考虑代理情况）
    const headers = new Headers(request.headers)
    const ip = headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               headers.get('x-real-ip') ||
               'unknown'
    
    // 速率限制检查
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      logSecurityEvent('LOGIN_RATE_LIMIT', {
        ip,
        remainingTime: rateLimit.remainingTime,
      })
      return NextResponse.json(
        {
          success: false,
          error: '登录尝试次数过多，请稍后再试',
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { username, password, captchaId, captchaAnswer } = body

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: '请输入账号和密码',
        },
        { status: 400 }
      )
    }

    // 验证验证码
    if (!captchaId || captchaAnswer === undefined || captchaAnswer === null || captchaAnswer === '') {
      recordFailedAttempt(ip)
      return NextResponse.json(
        {
          success: false,
          error: '请输入验证码',
        },
        { status: 400 }
      )
    }

    const captchaAnswerNum = parseInt(String(captchaAnswer), 10)
    if (isNaN(captchaAnswerNum)) {
      recordFailedAttempt(ip)
      return NextResponse.json(
        {
          success: false,
          error: '验证码格式错误',
        },
        { status: 400 }
      )
    }

    if (!verifyCaptcha(captchaId, captchaAnswerNum)) {
      recordFailedAttempt(ip)
      return NextResponse.json(
        {
          success: false,
          error: '验证码错误，请重新输入',
        },
        { status: 400 }
      )
    }

    // 从数据库查询用户
    const result = await pool.query(
      'SELECT id, username, password FROM users WHERE username = $1',
      [username.trim()]
    )

    if (result.rows.length === 0) {
      recordFailedAttempt(ip)
      // 延迟响应，防止用户名枚举攻击
      await new Promise(resolve => setTimeout(resolve, 500))
      return NextResponse.json(
        {
          success: false,
          error: '账号或密码错误',
        },
        { status: 401 }
      )
    }

    const user = result.rows[0]

    // 验证密码（去除空格后比较）
    const dbPassword = (user.password || '').trim()
    const inputPassword = (password || '').trim()

    if (dbPassword !== inputPassword) {
      recordFailedAttempt(ip)
      // 延迟响应，防止暴力破解
      await new Promise(resolve => setTimeout(resolve, 500))
      logSecurityEvent('LOGIN_FAILED', {
        ip,
        username: username.trim(),
        reason: 'password_mismatch',
      })
      return NextResponse.json(
        {
          success: false,
          error: '账号或密码错误',
        },
        { status: 401 }
      )
    }

    // 登录成功，清除失败记录
    clearAttempts(ip)

    // 生成安全的 token
    const token = generateSecureToken(user.id, user.username)
    
    // 设置 cookie
    // secure: 如果使用 HTTPS，通过环境变量 ENABLE_HTTPS=true 启用
    const isSecure = process.env.ENABLE_HTTPS === 'true' || process.env.NODE_ENV === 'production'
    const cookieStore = await cookies()
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: isSecure, // HTTPS 环境下启用
      sameSite: 'strict', // 改为 strict，更安全
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: '/',
    })

    // 记录成功登录（不记录敏感信息）
    logSecurityEvent('LOGIN_SUCCESS', {
      ip,
      username: username.trim(),
    })

    return NextResponse.json({
      success: true,
      message: '登录成功',
    })
  } catch (error) {
    const headers = new Headers(request.headers)
    const ip = headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               headers.get('x-real-ip') ||
               'unknown'
    
    logSecurityEvent('LOGIN_ERROR', {
      ip,
      error: error instanceof Error ? error.message : 'unknown',
    })
    
    // 不泄露具体错误信息
    return NextResponse.json(
      {
        success: false,
        error: '登录失败，请稍后重试',
      },
      { status: 500 }
    )
  }
}

