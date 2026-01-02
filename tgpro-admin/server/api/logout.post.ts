export default defineEventHandler(async (event) => {
  try {
    // 注销逻辑主要在前端处理（清除cookie）
    // 这里可以添加服务端的注销逻辑，比如记录注销日志等
    
    return {
      success: true,
      message: '注销成功'
    }
  } catch (error: any) {
    console.error('Error during logout:', error)
    return {
      success: false,
      error: '注销过程中发生错误'
    }
  }
})