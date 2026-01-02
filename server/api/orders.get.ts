import { executeQuery } from '../utils/database'
import { requireAuth } from '../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证用户登录状态(暂时注释以便调试)
  // const user = await requireAuth(event)
  // if (!user) {
  //   return {
  //     success: false,
  //     error: '未授权访问'
  //   }
  // }
  
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const offset = (page - 1) * limit
    
    console.log('查询订单数据, page:', page, 'limit:', limit)
    
    // 从数据库获取能量出租订单记录 - 使用字符串拼接而不是参数绑定
    const transactions = await executeQuery(`
      SELECT id, chat_id, user_nickname, username, amount, created_at, updated_at
      FROM transactions 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `) as any[]
    
    console.log('查询到订单数:', transactions.length)
    
    const totalResult = await executeQuery('SELECT COUNT(*) as count FROM transactions') as any[]
    const total = totalResult[0]?.count || 0
    
    console.log('订单总数:', total)
    
    // 转换为订单格式
    const orders = transactions.map(transaction => {
      const amountInSun = transaction.amount || 0
      const amountInTRX = amountInSun / 1000000
      
      return {
        id: transaction.id,
        orderNumber: `ORD-${String(transaction.id).padStart(6, '0')}`,
        chatId: transaction.chat_id,
        username: transaction.username || 'N/A',
        nickname: transaction.user_nickname || '未设置',
        amount: amountInTRX, // TRX金额
        amountSun: amountInSun, // Sun金额(原始值)
        status: amountInSun > 0 ? 'completed' : 'pending',
        createdAt: transaction.created_at,
        updatedAt: transaction.updated_at,
        type: 'energy_rental'
      }
    })
    
    return {
      success: true,
      data: orders,
      total: total,
      page: page,
      limit: limit
    }
  } catch (error) {
    console.error('读取订单数据失败:', error)
    return {
      success: false,
      error: '读取订单数据失败',
      data: [],
      total: 0
    }
  }
})