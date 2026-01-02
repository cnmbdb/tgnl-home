import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证用户登录状态
  const user = await requireAuth(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: '未授权访问'
    })
  }

  try {
    const body = await readBody(event)
    const { licenseKey } = body

    if (!licenseKey) {
      return {
        valid: false,
        message: '授权密钥不能为空'
      }
    }

    // 模拟密钥验证逻辑
    // 实际应用中应该：
    // 1. 验证密钥格式
    // 2. 检查密钥是否在黑名单中
    // 3. 连接到授权服务器验证
    // 4. 检查密钥是否已被使用

    // 简单的格式验证
    const isValidFormat = licenseKey.length >= 20 && licenseKey.includes('-')
    
    if (!isValidFormat) {
      return {
        valid: false,
        message: '授权密钥格式无效'
      }
    }

    // 模拟服务器验证（这里总是返回成功）
    return {
      valid: true,
      message: '授权密钥有效',
      info: {
        edition: '企业版',
        maxUsers: 100,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      }
    }
  } catch (error: any) {
    console.error('验证密钥失败:', error)
    return {
      valid: false,
      message: '验证失败: ' + error.message
    }
  }
})
