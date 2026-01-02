import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const projectRoot = process.cwd()
    const actualRoot = projectRoot.endsWith('.output') ? join(projectRoot, '..') : projectRoot
    const keywordRepliesPath = join(actualRoot, 'hf-tgpro', 'keyword_replies.json')
    
    if (!existsSync(keywordRepliesPath)) {
      // 如果文件不存在，返回默认的关键词回复配置
      const defaultReplies = {
        commands: {
          "/start": [
            {
              id: "start_text",
              type: "text",
              content: "您好，{username}\n欢迎使用自动充值会员机器人\n您的平台ID:{user_id}",
              order: 1
            },
            {
              id: "start_image_buttons",
              type: "image_text_buttons",
              image: "photo.jpg",
              content: "🟢 本机器人为您提供【24小时·Telegram会员】自助开通服务\n请选择下方按钮:",
              buttons: [
                [
                  { text: "🌟此账号开通", callback_data: "buy_myself" },
                  { text: "🎁为他人开通", callback_data: "buy_ship" }
                ],
                [
                  { text: "🔸会员价格🔸", callback_data: "buy_price" }
                ],
                [
                  { text: "🔸批量开会员🔸", callback_data: "buy_ship" }
                ]
              ],
              order: 2
            }
          ],
          "/help": [
            {
              id: "help_text",
              type: "text",
              content: "🤖 *机器人使用帮助*\n\n*可用命令：*\n/start - 开始使用机器人\n/help - 显示此帮助信息\n/buy - 购买会员\n/info - 查看账户信息\n/settings - 设置选项\n\n*功能说明：*\n• 🌟 购买Telegram会员\n• 🎁 为他人开通会员\n• 💰 查看价格和余额\n• 👩 联系客服支持\n\n如有问题，请联系客服！",
              order: 1
            }
          ],
          "/buy": [
            {
              id: "buy_image_buttons",
              type: "image_text_buttons",
              image: "photo.jpg",
              content: "🟢 本机器人为您提供【24小时·Telegram会员】自助开通服务\n请选择下方按钮:",
              buttons: [
                [
                  { text: "🌟此账号开通", callback_data: "buy_myself" },
                  { text: "🎁为他人开通", callback_data: "buy_ship" }
                ],
                [
                  { text: "🔸会员价格🔸", callback_data: "buy_price" }
                ],
                [
                  { text: "🔸批量开会员🔸", callback_data: "buy_ship" }
                ]
              ],
              order: 1
            }
          ],
          "/info": [
            {
              id: "info_text",
              type: "text",
              content: "📊 *账户信息*\n\n您的平台ID：{chat_id}\n当前余额：{balance} USDT\n\n如需充值，请点击下方按钮。",
              order: 1
            }
          ],
          "/settings": [
            {
              id: "settings_text_buttons",
              type: "text_buttons",
              content: "⚙️ *设置选项*\n\n请选择您要进行的操作：",
              buttons: [
                [
                  { text: "🔔 通知设置", callback_data: "settings_notifications" },
                  { text: "🌐 语言设置", callback_data: "settings_language" }
                ],
                [
                  { text: "🔙 返回主菜单", callback_data: "back_to_main" }
                ]
              ],
              order: 1
            }
          ]
        },
        buttons: {
          "🌟购买会员": [
            {
              id: "buy_member_image_buttons",
              type: "image_text_buttons",
              image: "photo.jpg",
              content: "🟢 本机器人为您提供【24小时·Telegram会员】自助开通服务\n请选择下方按钮:",
              buttons: [
                [
                  { text: "🌟此账号开通", callback_data: "buy_myself" },
                  { text: "🎁为他人开通", callback_data: "buy_ship" }
                ],
                [
                  { text: "🔸会员价格🔸", callback_data: "buy_price" }
                ],
                [
                  { text: "🔸批量开会员🔸", callback_data: "buy_ship" }
                ]
              ],
              order: 1
            }
          ],
          "👩联系客服": [
            {
              id: "contact_service_buttons",
              type: "text_buttons",
              content: "请点击下方按钮跳转：",
              buttons: [
                [
                  { text: "联系客服", url: "{CUSTOMER_SERVICE_ID}" }
                ]
              ],
              order: 1
            }
          ],
          "⚡️我要充值": [
            {
              id: "recharge_buttons",
              type: "text_buttons",
              content: "💰 请选择充值金额：",
              buttons: [
                [
                  { text: "20", callback_data: "20" },
                  { text: "40", callback_data: "40" },
                  { text: "60", callback_data: "60" },
                  { text: "80", callback_data: "80" },
                  { text: "100", callback_data: "100" }
                ],
                [
                  { text: "33", callback_data: "33" },
                  { text: "66", callback_data: "66" },
                  { text: "99", callback_data: "99" },
                  { text: "132", callback_data: "132" },
                  { text: "165", callback_data: "165" }
                ],
                [
                  { text: "49", callback_data: "49" },
                  { text: "98", callback_data: "98" },
                  { text: "147", callback_data: "147" },
                  { text: "196", callback_data: "196" },
                  { text: "245", callback_data: "245" }
                ]
              ],
              order: 1
            }
          ],
          "👤个人中心": [
            {
              id: "personal_center_text",
              type: "text",
              content: "👤 *个人中心*\n\n您的平台ID：{chat_id}\n当前余额：{balance} USDT\n注册时间：{register_time}\n\n感谢您的使用！",
              order: 1
            }
          ]
        }
      }
      
      return {
        success: true,
        data: defaultReplies
      }
    }
    
    const data = readFileSync(keywordRepliesPath, 'utf-8')
    const keywordReplies = JSON.parse(data)
    
    return {
      success: true,
      data: keywordReplies
    }
  } catch (error) {
    console.error('获取关键词回复失败:', error)
    return {
      success: false,
      error: '获取关键词回复失败'
    }
  }
})