import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// 能量池系统的支付通知接口（3000端口）
// 接收支付成功通知，然后转发给对应的机器人系统（根据 apiUsername 查找）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      orderId, 
      apiUsername, 
      amountTrx, 
      txHash, 
      newBalanceTrx,
      telegramChatId,
      telegramMessageId 
    } = body;

    if (!orderId || !apiUsername || !amountTrx || !txHash) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 根据 apiUsername 查找对应的机器人通知地址
    try {
      // 从 bot_configs 表中查找该 api_username 对应的 bot_notify_url
      const result = await pool.query(
        `SELECT bot_notify_url, bot_username 
         FROM bot_configs 
         WHERE api_username = $1 
           AND bot_notify_url IS NOT NULL 
           AND bot_notify_url != ''
         ORDER BY updated_at DESC 
         LIMIT 1`,
        [apiUsername]
      );

      let botNotifyUrl: string | null = null;

      if (result.rows.length > 0) {
        botNotifyUrl = result.rows[0].bot_notify_url;
        console.log(`找到机器人通知地址: API用户=${apiUsername}, 机器人=${result.rows[0].bot_username}, 地址=${botNotifyUrl}`);
      } else {
        // 如果数据库中没有找到，尝试使用环境变量的默认配置
        // 支持环境变量配置：BOT_NOTIFY_URL（单台）或 BOT_NOTIFY_URL_MAP（映射表）
        const defaultUrl = process.env.BOT_NOTIFY_URL;
        const urlMap = process.env.BOT_NOTIFY_URL_MAP; // 格式：api_user1:http://bot1:8080/api/recharge-notify,api_user2:http://bot2:8080/api/recharge-notify

        if (urlMap) {
          // 解析映射表
          const map: Record<string, string> = {};
          urlMap.split(',').forEach(item => {
            const [key, value] = item.split(':').map(s => s.trim());
            if (key && value) {
              map[key] = value;
            }
          });
          botNotifyUrl = map[apiUsername] || defaultUrl || null;
        } else {
          botNotifyUrl = defaultUrl || null;
        }

        if (!botNotifyUrl) {
          console.error(`未找到 API 用户 ${apiUsername} 对应的机器人通知地址`);
          return NextResponse.json({
            success: false,
            error: `未找到 API 用户 ${apiUsername} 对应的机器人通知地址`,
          }, { status: 404 });
        }

        console.log(`使用环境变量配置的通知地址: API用户=${apiUsername}, 地址=${botNotifyUrl}`);
      }

      // 确保 botNotifyUrl 不为 null（TypeScript 类型保护）
      if (!botNotifyUrl) {
        console.error(`未找到 API 用户 ${apiUsername} 对应的机器人通知地址`);
        return NextResponse.json({
          success: false,
          error: `未找到 API 用户 ${apiUsername} 对应的机器人通知地址`,
        }, { status: 404 });
      }

      const notificationData = {
        orderId,
        apiUsername,
        amountTrx,
        txHash,
        newBalanceTrx,
        telegramChatId,
        telegramMessageId,
      };

      // 通知对应的机器人系统（此时 botNotifyUrl 已确保不为 null）
      const botResponse = await fetch(botNotifyUrl as string, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData),
      });

      if (!botResponse.ok) {
        console.error(`转发通知给机器人失败 (${botNotifyUrl}): ${botResponse.status} ${botResponse.statusText}`);
        return NextResponse.json({
          success: false,
          error: `转发通知给机器人失败: ${botResponse.status} ${botResponse.statusText}`,
        }, { status: 500 });
      }

      console.log(`✅支付通知已转发给机器人: 订单 ${orderId}, API用户: ${apiUsername}, 机器人地址: ${botNotifyUrl}`);
      
      return NextResponse.json({
        success: true,
        message: '通知已接收并转发给对应的机器人系统',
        botNotifyUrl,
      });
    } catch (forwardError: any) {
      console.error('转发通知给机器人失败:', forwardError);
      return NextResponse.json({
        success: false,
        error: `转发通知失败: ${forwardError.message}`,
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('接收支付通知失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '接收通知失败' },
      { status: 500 }
    );
  }
}


