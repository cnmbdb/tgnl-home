import { executeQuery } from '../utils/database'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { orderId } = body

    if (!orderId) {
      return {
        success: false,
        error: '订单ID不能为空'
      }
    }

    // 删除订单
    const deleteQuery = 'DELETE FROM orders WHERE order_id = ?'
    await executeQuery(deleteQuery, [orderId])

    return {
      success: true,
      message: '订单删除成功'
    }
  } catch (error) {
    console.error('删除订单失败:', error)
    return {
      success: false,
      error: '删除订单失败'
    }
  }
})