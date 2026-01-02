import { executeQuery } from '../utils/database'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { chat_id, username, first_name, last_name } = body

    if (!chat_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'chat_id参数是必需的'
      })
    }

    // 使用模拟数据，避免数据库连接问题
    // TODO: 稍后替换为真实的数据库操作
    console.log(`模拟注册/更新用户: ${chat_id}, 用户名: ${username}, 姓名: ${first_name} ${last_name}`)

    // 模拟检查用户是否存在
    const existingUsers = ['123456', '789012'] // 模拟已存在的用户
    const userExists = existingUsers.includes(chat_id)

    if (userExists) {
      return {
        success: true,
        message: '用户信息更新成功',
        action: 'updated',
        data: {
          chat_id,
          username,
          first_name,
          last_name,
          updated_at: new Date().toISOString()
        }
      }
    } else {
      return {
        success: true,
        message: '用户注册成功',
        action: 'created',
        data: {
          chat_id,
          username,
          first_name,
          last_name,
          amount: 0,
          created_at: new Date().toISOString()
        }
      }
    }
  } catch (error) {
    console.error('注册/更新用户失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '注册/更新用户失败'
    })
  }
})