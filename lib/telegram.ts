/**
 * Telegram Bot API 工具函数
 */

const TELEGRAM_API_URL = 'https://api.telegram.org/bot'

export interface TelegramBotConfig {
  token: string
}

export interface SendMessageParams {
  chatId: string | number
  text: string
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2'
}

/**
 * 发送消息到 Telegram
 */
export async function sendTelegramMessage(
  config: TelegramBotConfig,
  params: SendMessageParams
): Promise<boolean> {
  try {
    const response = await fetch(
      `${TELEGRAM_API_URL}${config.token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: params.chatId,
          text: params.text,
          parse_mode: params.parseMode,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Telegram API error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to send Telegram message:', error)
    return false
  }
}

/**
 * 设置 Webhook
 */
export async function setWebhook(
  config: TelegramBotConfig,
  url: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${TELEGRAM_API_URL}${config.token}/setWebhook`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Telegram API error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Failed to set webhook:', error)
    return false
  }
}

/**
 * 获取 Bot 信息
 */
export async function getBotInfo(
  config: TelegramBotConfig
): Promise<any | null> {
  try {
    const response = await fetch(
      `${TELEGRAM_API_URL}${config.token}/getMe`
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.result
  } catch (error) {
    console.error('Failed to get bot info:', error)
    return null
  }
}

