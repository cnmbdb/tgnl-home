import pool from '@/lib/db'

/**
 * 通知机器人系统能量下发失败
 * 当能量下发失败时（如余额不足），通知机器人系统
 */
export async function notifyEnergyDelegationFailure({
  apiUsername,
  errorMessage,
  energy,
  receiverAddress,
  orderType = 'delegate_meal',
}: {
  apiUsername: string
  errorMessage: string
  energy?: number
  receiverAddress?: string
  orderType?: string
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
      console.log(`[通知失败] 找到机器人通知地址: API用户=${apiUsername}, 机器人=${result.rows[0].bot_username}, 地址=${botNotifyUrl}`)
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
        console.warn(`[通知失败] 未找到 API 用户 ${apiUsername} 对应的机器人通知地址，跳过通知`)
        return
      }

      console.log(`[通知失败] 使用环境变量配置的通知地址: API用户=${apiUsername}, 地址=${botNotifyUrl}`)
    }

    if (!botNotifyUrl) {
      console.warn(`[通知失败] 未找到 API 用户 ${apiUsername} 对应的机器人通知地址，跳过通知`)
      return
    }

    // 获取当前余额
    const balanceResult = await pool.query(
      `SELECT balance_micro FROM api_users WHERE username = $1`,
      [apiUsername]
    )
    const currentBalanceMicro = balanceResult.rows.length > 0 ? Number(balanceResult.rows[0].balance_micro) : 0
    const currentBalanceTrx = currentBalanceMicro / 1e6

    // 构建通知数据
    const notificationData: any = {
      apiUsername,
      changeType: 'delegation_failed', // 新增类型：下发失败
      error: errorMessage,
      energy: energy || null,
      receiverAddress: receiverAddress || null,
      orderType,
      currentBalanceTrx: currentBalanceTrx.toFixed(6),
      timestamp: new Date().toISOString(),
    }

    // 通知机器人系统
    console.log(`[通知失败] 准备发送失败通知到: ${botNotifyUrl}`)
    console.log(`[通知失败] 通知数据:`, JSON.stringify(notificationData, null, 2))
    
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
        console.error(`[通知失败] ❌ 通知机器人失败 (${botNotifyUrl}): HTTP ${botResponse.status} ${botResponse.statusText}`)
        console.error(`[通知失败] 错误响应内容: ${errorText}`)
        return
      }

      const responseText = await botResponse.text().catch(() => '')
      console.log(`[通知失败] ✅ 能量下发失败通知已发送: API用户=${apiUsername}, 错误=${errorMessage}`)
      console.log(`[通知失败] 机器人响应: ${responseText}`)
    } catch (fetchError: any) {
      if (fetchError.name === 'AbortError' || fetchError.name === 'TimeoutError') {
        console.error(`[通知失败] ❌ 通知机器人超时 (${botNotifyUrl}): 10秒内未收到响应`)
      } else if (fetchError.code === 'ECONNREFUSED' || fetchError.code === 'ENOTFOUND') {
        console.error(`[通知失败] ❌ 无法连接到机器人 (${botNotifyUrl}): ${fetchError.message}`)
      } else {
        console.error(`[通知失败] ❌ 通知机器人异常:`, fetchError)
      }
      // 不抛出错误，避免影响主流程
    }
  } catch (error: any) {
    console.error(`[通知失败] 通知机器人系统能量下发失败异常:`, error)
    // 不抛出错误，避免影响主流程
  }
}
