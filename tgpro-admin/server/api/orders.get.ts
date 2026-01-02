import { executeQuery } from '../utils/database'
// import { requireAuth } from '../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证用户登录状态
  // const user = await requireAuth(event)
  // if (!user) {
  //   return {
  //     success: false,
  //     error: '未授权访问'
  //   }
  // }

  try {
    // 从数据库读取订单数据
    const query = `
      SELECT 
        order_id as id,
        chat_id as chatId,
        username,
        product_type,
        amount,
        status,
        payment_method,
        transaction_hash,
        failure_reason,
        created_at as createdAt,
        updated_at as updatedAt,
        completed_at as completedAt,
        expires_at as expiresAt
      FROM orders 
      ORDER BY created_at DESC 
      LIMIT 100
    `
    
    const orders = await executeQuery(query)
    
    // 格式化订单数据
    const formattedOrders = orders.map((order: any) => ({
      id: order.id,
      chatId: order.chatId,
      username: order.username,
      productType: order.product_type,
      amount: parseFloat(order.amount),
      status: order.status,
      paymentMethod: order.payment_method,
      transactionHash: order.transaction_hash,
      failureReason: order.failure_reason,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      completedAt: order.completedAt,
      expiresAt: order.expiresAt,
      type: 'order'
    }))
    
    return {
      success: true,
      data: formattedOrders
    }
  } catch (error) {
    console.error('Error reading order data from database:', error)
    return {
      success: false,
      error: 'Failed to read order data from database'
    }
  }
})