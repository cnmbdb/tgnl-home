import { requireAdmin } from '../../utils/auth'
import { executeQuery } from '../../utils/database'

/**
 * 从WordPress REST API获取订单信息
 */
async function getWordPressOrder(orderNumber: string, productId: number) {
  const config = useRuntimeConfig()
  const wpUrl = config.wordpressUrl as string
  const username = config.wordpressUsername as string
  const appPassword = config.wordpressAppPassword as string

  try {
    // 使用子比主题API查询订单
    const auth = Buffer.from(`${username}:${appPassword}`).toString('base64')
    const response = await $fetch(`${wpUrl}/wp-json/zibll/v1/order/${orderNumber}`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('[WordPress API] 订单查询成功:', response)

    // 验证订单状态和商品ID
    const order = response as any
    if (order.pay_status !== '1') {
      throw new Error('订单未支付')
    }

    if (order.product_id !== productId) {
      throw new Error(`商品ID不匹配，期望${productId}，实际${order.product_id}`)
    }

    return order
  } catch (error: any) {
    console.error('[WordPress API] 订单查询失败:', error)
    throw error
  }
}

export default defineEventHandler(async (event) => {
  // 验证管理员权限
  const user = await requireAdmin(event)
  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: '需要管理员权限'
    })
  }

  try {
    const body = await readBody(event)
    const { orderNumber } = body

    if (!orderNumber) {
      throw createError({
        statusCode: 400,
        statusMessage: '订单号不能为空'
      })
    }

    // 检查订单号是否已经存在于数据库
    const existingLicense = await executeQuery(
      'SELECT * FROM licenses WHERE order_number = ?',
      [orderNumber]
    ) as any[]

    // 如果已存在,检查当前服务器IP是否在授权列表中
    if (existingLicense.length > 0) {
      console.log('[激活] 订单已激活,验证当前服务器IP是否已授权')
      
      const config = useRuntimeConfig()
      const currentServerIp = config.SERVER_IP as string || 'localhost'
      
      // 从WordPress获取授权IP列表
      try {
        const wpResponse: any = await $fetch(`${config.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(`${config.WORDPRESS_USERNAME}:${config.WORDPRESS_APP_PASSWORD}`).toString('base64')}`,
            'Content-Type': 'application/json'
          },
          body: {
            order_num: orderNumber,
            server_ip: currentServerIp
          }
        })
        
        if (wpResponse.status === 'success') {
          // IP已授权,返回成功
          return {
            success: true,
            message: '当前服务器已授权,无需重复激活',
            license: {
              id: existingLicense[0].order_id,
              orderNumber: orderNumber,
              edition: '标准版',
              expiryDate: existingLicense[0].expiry_date,
              activatedAt: existingLicense[0].activated_at
            }
          }
        }
      } catch (wpError: any) {
        // WordPress验证失败,说明IP未授权
        console.error('[WordPress] IP验证失败:', wpError)
        throw createError({
          statusCode: 403,
          statusMessage: '当前服务器IP未授权,请在WordPress个人资料中添加此服务器IP'
        })
      }
    }

    const config = useRuntimeConfig()
    const productId = parseInt((config.wordpressProductId as string) || '2101')

    // 使用WordPress REST API获取订单信息
    console.log('[激活] 正在查询订单:', orderNumber)
    const orderInfo = await getWordPressOrder(orderNumber, productId)

    if (!orderInfo) {
      throw createError({
        statusCode: 400,
        statusMessage: '订单不存在或验证失败'
      })
    }

    console.log('[激活] 订单验证成功:', orderInfo)

    // 计算授权时长和到期日期
    const productName = orderInfo.product_name || ''
    const duration = getProductDuration(productName)
    const payTime = orderInfo.pay_time || new Date().toISOString()
    const expiryDate = calculateExpiryDate(payTime, duration)
    const edition = getEditionFromProduct(productName)

    // 保存授权记录到数据库(使用现有表结构)
    await executeQuery(
      `INSERT INTO licenses (
        order_number, 
        order_id, 
        email, 
        customer_name, 
        product_info,
        license_type,
        expiry_date, 
        activated_at,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [
        orderNumber,
        orderInfo.order_id,
        orderInfo.user_email,
        orderInfo.user_name,
        JSON.stringify({
          product_name: orderInfo.product_name,
          edition: edition,
          duration_days: duration,
          price: orderInfo.pay_price
        }),
        duration >= 365 ? 'yearly' : 'monthly',
        expiryDate,
        payTime
      ]
    )

    // 记录授权历史
    await executeQuery(
      `INSERT INTO license_history (
        order_number,
        action,
        description,
        performed_by,
        created_at
      ) VALUES (?, 'activate', ?, ?, NOW())`,
      [
        orderNumber,
        `使用WordPress订单 #${orderInfo.order_id} 激活授权`,
        user.id
      ]
    )

    return {
      success: true,
      message: '授权激活成功',
      license: {
        id: orderInfo.order_id,
        orderNumber: orderNumber,
        edition: edition,
        expiryDate: expiryDate,
        activatedAt: new Date().toISOString()
      }
    }
  } catch (error: any) {
    console.error('订单激活失败:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '激活失败: ' + error.message
    })
  }
})

/**
 * 从商品名称中获取授权时长
 */
function getProductDuration(productName: string): number {
  if (productName.includes('月')) {
    const match = productName.match(/(\d+)个?月/)
    if (match) {
      return parseInt(match[1]) * 30
    }
  }
  if (productName.includes('年')) {
    const match = productName.match(/(\d+)年/)
    if (match) {
      return parseInt(match[1]) * 365
    }
  }
  return 365 // 默认1年
}

/**
 * 计算到期日期
 */
function calculateExpiryDate(startDate: string, durationDays: number): string {
  const start = new Date(startDate)
  const expiry = new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1000)
  return expiry.toISOString().split('T')[0]
}

/**
 * 从商品名称中获取版本信息
 */
function getEditionFromProduct(productName: string): string {
  if (productName.includes('企业版') || productName.includes('Enterprise')) {
    return '企业版'
  }
  if (productName.includes('专业版') || productName.includes('Professional')) {
    return '专业版'
  }
  if (productName.includes('基础版') || productName.includes('Basic')) {
    return '基础版'
  }
  return '标准版'
}
