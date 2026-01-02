/**
 * 子比主题（Zibll）订单 API 集成
 * 子比主题使用自己的商城系统，不基于 WooCommerce
 */

export interface ZibllConfig {
  wordpressUrl: string
  username: string
  appPassword?: string
  jwtToken?: string
  productId: string
}

interface ZibllOrderMeta {
  order_price: string
  order_status: string
  order_user_id: string
  order_product_id: string
  order_product_name: string
  order_type: string
  pay_time: string
  user_email: string
  user_name: string
  [key: string]: any
}

interface ZibllOrder {
  id: number
  title: string
  status: string
  date: string
  meta: ZibllOrderMeta
}

/**
 * 子比主题 REST API 客户端
 */
export class ZibllAPI {
  private config: ZibllConfig

  constructor(config: ZibllConfig) {
    this.config = config
  }

  /**
   * 获取认证头
   */
  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'User-Agent': 'TGPro-Admin/1.0'
    }

    if (this.config.jwtToken) {
      // JWT Token 认证
      headers['Authorization'] = `Bearer ${this.config.jwtToken}`
    } else if (this.config.username && this.config.appPassword) {
      // Application Password 认证
      const auth = Buffer.from(
        `${this.config.username}:${this.config.appPassword}`
      ).toString('base64')
      headers['Authorization'] = `Basic ${auth}`
    }

    return headers
  }

  /**
   * 发送 API 请求
   */
  private async request(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
    const url = `${this.config.wordpressUrl}/wp-json/wp/v2/${endpoint}`
    
    console.log(`[Zibll] API Request: ${method} ${url}`)
    
    try {
      const options: RequestInit = {
        method,
        headers: this.getAuthHeaders()
      }

      if (body && method !== 'GET') {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(url, options)
      
      console.log(`[Zibll] API Response: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }))
        console.error('[Zibll] API Error:', error)
        throw new Error(`WordPress API Error: ${error.message || response.statusText}`)
      }

      const data = await response.json()
      console.log(`[Zibll] API Data length:`, Array.isArray(data) ? data.length : 'object')
      
      return data
    } catch (error: any) {
      console.error('[Zibll] WordPress API request failed:', error)
      throw error
    }
  }

  /**
   * 通过订单号获取订单（子比主题订单存储在 posts 表中）
   */
  async getOrderByNumber(orderNumber: string | number): Promise<ZibllOrder | null> {
    try {
      console.log(`[Zibll] Searching for order: ${orderNumber}`)
      
      // 子比主题的订单是自定义文章类型 'shop_order'
      // 订单号可能存储在 post_title 或 meta 中
      const posts = await this.request(
        `posts?post_type=shop_order&search=${orderNumber}&per_page=10`
      )
      
      console.log(`[Zibll] Search result:`, JSON.stringify(posts, null, 2))

      if (!posts || posts.length === 0) {
        console.log('[Zibll] No posts found by search, trying meta query...')
        // 尝试通过 meta 查询
        const allOrders = await this.request(
          `posts?post_type=shop_order&per_page=100`
        )
        
        console.log(`[Zibll] Found ${allOrders.length} total orders`)
        
        for (const post of allOrders) {
          const meta = await this.getPostMeta(post.id)
          console.log(`[Zibll] Checking order ${post.id}, meta:`, JSON.stringify(meta, null, 2))
          
          if (meta.order_no === orderNumber || post.id.toString() === orderNumber.toString()) {
            console.log(`[Zibll] Found matching order: ${post.id}`)
            return {
              id: post.id,
              title: post.title?.rendered || '',
              status: post.status,
              date: post.date,
              meta: meta
            }
          }
        }
        
        console.log('[Zibll] No matching order found')
        return null
      }

      // 获取第一个匹配的订单
      const post = posts[0]
      const meta = await this.getPostMeta(post.id)
      
      console.log(`[Zibll] Found order by search:`, JSON.stringify(post, null, 2))
      console.log(`[Zibll] Order meta:`, JSON.stringify(meta, null, 2))

      return {
        id: post.id,
        title: post.title?.rendered || '',
        status: post.status,
        date: post.date,
        meta: meta
      }
    } catch (error: any) {
      console.error('[Zibll] Failed to get order:', error)
      return null
    }
  }

  /**
   * 获取文章的所有 meta 数据
   */
  private async getPostMeta(postId: number): Promise<any> {
    try {
      // WordPress REST API 可能不直接返回所有 meta
      // 需要通过自定义端点或直接数据库查询
      const post = await this.request(`posts/${postId}`)
      return post.meta || {}
    } catch (error) {
      console.error('Failed to get post meta:', error)
      return {}
    }
  }

  /**
   * 验证订单是否有效（子比主题版本）
   */
  async validateOrder(orderNumber: string | number, productId: number): Promise<{
    valid: boolean
    message: string
    order?: ZibllOrder
  }> {
    try {
      const order = await this.getOrderByNumber(orderNumber)

      if (!order) {
        return {
          valid: false,
          message: '订单不存在'
        }
      }

      // 检查订单状态
      // 子比主题的订单状态可能是：publish（已完成）、pending（待支付）等
      if (order.status !== 'publish' && order.meta.order_status !== 'completed') {
        return {
          valid: false,
          message: `订单状态无效: ${order.status}，必须是已完成状态`
        }
      }

      // 检查订单中的商品ID
      const orderProductId = parseInt(order.meta.order_product_id || '0')
      if (orderProductId !== productId) {
        return {
          valid: false,
          message: '订单中不包含指定的授权商品'
        }
      }

      return {
        valid: true,
        message: '订单验证成功',
        order
      }
    } catch (error: any) {
      console.error('Order validation failed:', error)
      
      return {
        valid: false,
        message: `验证失败: ${error.message}`
      }
    }
  }

  /**
   * 从订单中提取授权信息
   */
  getLicenseInfo(order: ZibllOrder) {
    const productName = order.meta.order_product_name || order.title
    const duration = this.getProductDuration(productName)
    const payTime = order.meta.pay_time || order.date
    const expiryDate = this.calculateExpiryDate(payTime, duration)

    return {
      orderId: order.id,
      orderNumber: order.id.toString(),
      customerId: order.meta.order_user_id,
      customerEmail: order.meta.user_email || '',
      customerName: order.meta.user_name || '',
      activatedAt: payTime,
      expiryDate,
      duration,
      edition: this.getEditionFromProduct(productName),
      price: parseFloat(order.meta.order_price || '0')
    }
  }

  /**
   * 从商品名称中获取授权时长
   */
  private getProductDuration(productName: string): number {
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
    return 365
  }

  /**
   * 计算到期日期
   */
  private calculateExpiryDate(startDate: string, durationDays: number): string {
    const start = new Date(startDate)
    const expiry = new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1000)
    return expiry.toISOString().split('T')[0]
  }

  /**
   * 从商品名称中获取版本信息
   */
  private getEditionFromProduct(productName: string): string {
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
}

/**
 * 创建子比主题 API 客户端
 */
export function createZibllClient(): ZibllAPI {
  const config = useRuntimeConfig()
  
  return new ZibllAPI({
    wordpressUrl: (config.wordpressUrl as string) || 'https://hfz.pw',
    username: (config.wordpressUsername as string) || '',
    appPassword: (config.wordpressAppPassword as string) || '',
    jwtToken: (config.wordpressJwtToken as string) || '',
    productId: (config.wordpressProductId as string) || '2101'
  })
}
