/**
 * WordPress订单查询工具（通过自定义REST API）
 * 使用Application Password作为管理员身份查询订单
 * 
 * 需要安装WordPress插件: zibll-order-api
 */

/**
 * 通过WordPress REST API查询订单
 */
export async function getWordPressOrder(orderNumber: string) {
  const config = useRuntimeConfig()
  const wpUrl = config.wordpressUrl as string
  const username = config.wordpressUsername as string
  const appPassword = config.wordpressAppPassword as string
  
  // 移除空格的Application Password
  const cleanPassword = appPassword.replace(/\s+/g, '')
  const auth = Buffer.from(`${username}:${cleanPassword}`).toString('base64')
  
  try {
    console.log('[WordPress API] 查询订单:', orderNumber)
    
    // 使用自定义REST API端点
    const response = await fetch(`${wpUrl}/wp-json/zibll/v1/order/${orderNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log('[WordPress API] 订单不存在')
        return null
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('[WordPress API] 找到订单:', JSON.stringify(data, null, 2))
    return data
  } catch (error: any) {
    console.error('[WordPress API] 查询订单失败:', error.message)
    throw error
  }
}

/**
 * 验证订单是否有效
 */
export async function validateWordPressOrder(orderNumber: string, productId: number) {
  try {
    const order = await getWordPressOrder(orderNumber)
    
    if (!order) {
      return {
        valid: false,
        message: '订单不存在'
      }
    }
    
    // 检查订单状态（子比主题使用status字段，1=已支付）
    const status = order.pay_status || order.status
    if (status !== '1' && status !== 1) {
      return {
        valid: false,
        message: `订单未支付或已关闭（状态：${status}）`
      }
    }
    
    // 检查商品ID必须匹配
    const orderProductId = parseInt(order.product_id || '0')
    
    if (productId > 0 && orderProductId !== productId) {
      return {
        valid: false,
        message: `订单商品不匹配（订单商品ID：${orderProductId}，要求商品ID：${productId}）`
      }
    }
    
    console.log(`[WordPress] ✅ 订单验证通过：已支付且商品ID匹配 (${orderProductId})`)
    
    return {
      valid: true,
      message: '订单验证成功',
      order: order
    }
  } catch (error: any) {
    console.error('[WordPress API] 订单验证失败:', error)
    return {
      valid: false,
      message: `验证失败: ${error.message}`
    }
  }
}

/**
 * 从订单中提取授权信息
 */
export function extractLicenseInfo(order: any) {
  const productName = order.product_name || order.name || '标准版'
  const payTime = order.pay_time || order.create_time || new Date().toISOString()
  
  // 从商品名称中提取授权时长
  let duration = 365 // 默认1年
  if (productName.includes('月')) {
    const match = productName.match(/(\d+)个?月/)
    if (match) duration = parseInt(match[1]) * 30
  } else if (productName.includes('年')) {
    const match = productName.match(/(\d+)年/)
    if (match) duration = parseInt(match[1]) * 365
  }
  
  // 计算到期日期
  const activatedAt = new Date(payTime)
  const expiryDate = new Date(activatedAt.getTime() + duration * 24 * 60 * 60 * 1000)
  
  // 提取版本信息
  let edition = '标准版'
  if (productName.includes('企业版') || productName.includes('Enterprise')) {
    edition = '企业版'
  } else if (productName.includes('专业版') || productName.includes('Professional')) {
    edition = '专业版'
  }
  
  return {
    orderId: order.order_id || order.ID || 0,
    orderNumber: order.order_num || order.order_number || '',
    customerEmail: order.user_email || order.email || '',
    customerName: order.user_name || order.name || order.user_id || '',
    activatedAt: activatedAt.toISOString(),
    expiryDate: expiryDate.toISOString().split('T')[0],
    duration,
    edition,
    price: parseFloat(order.order_price || order.total || '0')
  }
}
