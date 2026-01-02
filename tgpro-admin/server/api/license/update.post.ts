import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证管理员权限
  const user = await requireAdmin(event)
  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: '需要管理员权限'
    })
  }

  try {
    const body = await readBody(event)
    const { licenseKey } = body

    if (!licenseKey) {
      throw createError({
        statusCode: 400,
        statusMessage: '授权密钥不能为空'
      })
    }

    // 验证授权密钥格式
    if (licenseKey.length < 20) {
      throw createError({
        statusCode: 400,
        statusMessage: '授权密钥格式无效'
      })
    }

    // 模拟更新授权逻辑
    // 实际应用中应该：
    // 1. 连接到授权服务器验证密钥
    // 2. 解析密钥信息
    // 3. 更新数据库中的授权信息
    // 4. 记录授权历史

    return {
      success: true,
      message: '授权更新成功',
      license: {
        id: 'TGP-ENT-2024-' + Date.now(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  } catch (error: any) {
    console.error('更新授权失败:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '更新授权失败: ' + error.message
    })
  }
})
