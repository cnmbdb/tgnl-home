import { executeQuery } from '../../utils/database'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证用户登录状态
  const user = await requireAuth(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: '未授权访问'
    })
  }

  try {
    // 从环境变量获取订单号
    const config = useRuntimeConfig()
    const orderNumber = config.ORDER_NUMBER as string || config.orderNumber as string

    if (!orderNumber) {
      // 没有配置订单号,返回未激活状态
      return {
        isActive: false,
        orderNumber: '未知',
        serverIp: config.SERVER_IP as string || 'localhost',
        authorizedIps: [],
        message: '未配置授权订单号'
      }
    }

    // 查询授权信息
    const licenseResult = await executeQuery(
      'SELECT * FROM licenses WHERE order_number = ? AND status = "active" LIMIT 1',
      [orderNumber]
    ) as any[]

    if (licenseResult.length === 0) {
      // 订单号存在但未激活
      return {
        isActive: false,
        orderNumber: '未激活',
        serverIp: config.SERVER_IP as string || 'localhost',
        authorizedIps: [],
        message: '授权未激活，请使用订单号激活'
      }
    }

    const license = licenseResult[0]

    // 获取当前服务器IP(优先使用配置,否则使用localhost)
    const serverIp = config.SERVER_IP as string || 'localhost'

    // 获取授权的IP列表(从WordPress获取)
    let authorizedIps: string[] = []
    try {
      const wpResponse: any = await $fetch(`${config.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.WORDPRESS_USERNAME}:${config.WORDPRESS_APP_PASSWORD}`).toString('base64')}`,
          'Content-Type': 'application/json'
        },
        body: {
          order_num: orderNumber,
          server_ip: serverIp
        }
      })

      if (wpResponse.success && wpResponse.data?.authorized_ips) {
        authorizedIps = wpResponse.data.authorized_ips
      }
    } catch (error) {
      console.error('Failed to fetch authorized IPs from WordPress:', error)
      // 如果无法从WP获取,使用本地记录的IP
      authorizedIps = serverIp ? [serverIp] : []
    }

    return {
      isActive: true,
      orderNumber: orderNumber,
      orderInfo: {
        orderId: license.order_id,
        customerEmail: license.customer_email,
        customerName: license.customer_name,
        edition: license.edition,
        activatedAt: license.activated_at,
        expiryDate: license.expiry_date
      },
      serverIp: serverIp,
      authorizedIps: authorizedIps,
      message: '授权已激活'
    }
  } catch (error: any) {
    console.error('获取授权信息失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '获取授权信息失败: ' + error.message
    })
  }
})

// 获取公网IP
async function getPublicIP(): Promise<string> {
  try {
    const response = await $fetch('https://api.ipify.org?format=json') as any
    return response.ip
  } catch (error) {
    console.error('Failed to get public IP:', error)
    return 'Unknown'
  }
}
