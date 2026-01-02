export default defineEventHandler(async (event) => {
  try {
    // 简单的健康检查，如果API能响应就说明服务正常
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      message: '服务运行正常'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: '服务不可用'
    })
  }
})