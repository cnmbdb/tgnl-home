// 简单的内存存储，实际项目中应该使用数据库或Redis
const progressStore = new Map()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const { sessionId } = query
    
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少会话ID'
      })
    }
    
    // 获取进度信息
    const progress = progressStore.get(sessionId as string) || {
      step: 'idle',
      progress: 0,
      status: '等待开始',
      logs: [],
      startTime: null,
      endTime: null
    }
    
    return {
      success: true,
      data: progress
    }
  } catch (error) {
    console.error('获取进度失败:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '获取进度失败'
    }
  }
})

// 导出进度更新函数供其他API使用
export function updateProgress(sessionId: string, step: string, progress: number, status: string, log?: string) {
  const current = progressStore.get(sessionId) || {
    step: 'idle',
    progress: 0,
    status: '等待开始',
    logs: [],
    startTime: null,
    endTime: null
  }
  
  const updated = {
    ...current,
    step,
    progress,
    status,
    lastUpdate: new Date().toISOString()
  }
  
  if (log) {
    updated.logs.push({
      timestamp: new Date().toISOString(),
      message: log
    })
  }
  
  if (progress === 0 && !current.startTime) {
    updated.startTime = new Date().toISOString()
  }
  
  if (progress === 100) {
    updated.endTime = new Date().toISOString()
  }
  
  progressStore.set(sessionId, updated)
}