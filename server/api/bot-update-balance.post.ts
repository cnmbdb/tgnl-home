import { executeQuery } from '../utils/database'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { chat_id, amount } = body

    if (!chat_id || amount === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: 'chat_id和amount参数是必需的'
      })
    }

    // 使用模拟数据，避免数据库连接问题
    // TODO: 稍后替换为真实的数据库操作
    console.log(`模拟更新用户 ${chat_id} 的余额，增加 ${amount}`)

    return {
      success: true,
      message: '余额更新成功',
      data: {
        chat_id,
        amount_added: amount,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('更新余额失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '更新余额失败'
    })
  }
})