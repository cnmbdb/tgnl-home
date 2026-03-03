import pool from '@/lib/db'

/**
 * 通知机器人系统 API 账号余额变动
 * 当 API 账号余额发生任何变动时（充值、扣费、手动调整），都应该通知对应的机器人系统
 */
export async function notifyBalanceChange({
  apiUsername,
  changeType,
  amountTrx,
  newBalanceTrx,
  orderId,
  txHash,
  telegramChatId,
  telegramMessageId,
}: {
  apiUsername: string
  changeType: 'recharge' | 'deduct' | 'adjust' | 'other'
  amountTrx: number
  newBalanceTrx: number
  orderId?: string
  txHash?: string
  telegramChatId?: number | null
  telegramMessageId?: number | null
}) {
  try {
    // 查找该 API 用户对应的机器人通知地址
    const result = await pool.query(
      `SELECT bot_notify_url, bot_username 
       FROM bot_configs 
       WHERE api_username = $1 
         AND bot_notify_url IS NOT NULL 
         AND bot_notify_url != ''
       ORDER BY updated_at DESC 
       LIMIT 1`,
      [apiUsername]
    )

    let botNotifyUrl: string | null = null

    if (result.rows.length > 0) {
      botNotifyUrl = result.rows[0].bot_notify_url
      // 直接使用机器人上报的回调地址（建议配置为可从能量池服务器访问到的 IP/域名）
      console.log(`找到机器人通知地址: API用户=${apiUsername}, 机器人=${result.rows[0].bot_username}, 地址=${botNotifyUrl}`)
    } else {
      // 如果数据库中没有找到，尝试使用环境变量的默认配置
      const defaultUrl = process.env.BOT_NOTIFY_URL
      const urlMap = process.env.BOT_NOTIFY_URL_MAP

      if (urlMap) {
        const map: Record<string, string> = {}
        urlMap.split(',').forEach(item => {
          const [key, value] = item.split(':').map(s => s.trim())
          if (key && value) {
            map[key] = value
          }
        })
        botNotifyUrl = map[apiUsername] || defaultUrl || null
      } else {
        botNotifyUrl = defaultUrl || null
      }

      if (!botNotifyUrl) {
        console.warn(`未找到 API 用户 ${apiUsername} 对应的机器人通知地址，跳过通知`)
        return
      }

      console.log(`使用环境变量配置的通知地址: API用户=${apiUsername}, 地址=${botNotifyUrl}`)
    }

    if (!botNotifyUrl) {
      console.warn(`未找到 API 用户 ${apiUsername} 对应的机器人通知地址，跳过通知`)
      return
    }

    // 构建通知数据
    // 注意：机器人系统期望 newBalanceTrx 为字符串或数字，这里转换为字符串以确保兼容性
    const notificationData: any = {
      apiUsername,
      changeType,
      amountTrx,
      newBalanceTrx: typeof newBalanceTrx === 'number' ? newBalanceTrx.toFixed(6) : String(newBalanceTrx),
    }

    // 如果是充值，包含订单信息
    if (changeType === 'recharge') {
      if (orderId) notificationData.orderId = orderId
      if (txHash) notificationData.txHash = txHash
      if (telegramChatId) notificationData.telegramChatId = telegramChatId
      if (telegramMessageId) notificationData.telegramMessageId = telegramMessageId
    }

    // 通知机器人系统
    console.log(`[通知发送] 准备发送通知到: ${botNotifyUrl}`)
    console.log(`[通知发送] 通知数据:`, JSON.stringify(notificationData, null, 2))
    
    try {
      const botResponse = await fetch(botNotifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData),
        // 设置超时，避免长时间等待
        signal: AbortSignal.timeout(10000), // 10秒超时
      })

      if (!botResponse.ok) {
        const errorText = await botResponse.text().catch(() => '')
        console.error(`[通知发送] ❌ 通知机器人失败 (${botNotifyUrl}): HTTP ${botResponse.status} ${botResponse.statusText}`)
        console.error(`[通知发送] 错误响应内容: ${errorText}`)
        return
      }

      const responseText = await botResponse.text().catch(() => '')
      console.log(`[通知发送] ✅ 余额变动通知已发送: API用户=${apiUsername}, 类型=${changeType}, 金额=${amountTrx} TRX, 新余额=${notificationData.newBalanceTrx} TRX`)
      console.log(`[通知发送] 机器人响应: ${responseText}`)
    } catch (fetchError: any) {
      if (fetchError.name === 'AbortError' || fetchError.name === 'TimeoutError') {
        console.error(`[通知发送] ❌ 通知机器人超时 (${botNotifyUrl}): 10秒内未收到响应`)
      } else if (fetchError.code === 'ECONNREFUSED' || fetchError.code === 'ENOTFOUND') {
        console.error(`[通知发送] ❌ 无法连接到机器人 (${botNotifyUrl}): ${fetchError.message}`)
      } else {
        console.error(`[通知发送] ❌ 通知机器人异常:`, fetchError)
      }
      throw fetchError // 重新抛出，让调用方知道通知失败
    }
  } catch (error: any) {
    console.error(`通知机器人系统余额变动失败:`, error)
  }
}
