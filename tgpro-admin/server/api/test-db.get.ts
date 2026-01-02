import { executeQuery } from '../utils/database'

export default defineEventHandler(async (event: any) => {
  try {
    // 测试数据库连接
    const result = await executeQuery('SELECT COUNT(*) as count FROM system_users')
    
    return {
      success: true,
      message: '数据库连接正常',
      data: {
        userCount: (result as any[])[0].count,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    console.error('Database test error:', {
      message: error.message,
      code: error.code,
      errno: error.errno
    })
    
    return {
      success: false,
      error: `数据库连接测试失败: ${error.message}`,
      details: {
        code: error.code,
        errno: error.errno
      }
    }
  }
})