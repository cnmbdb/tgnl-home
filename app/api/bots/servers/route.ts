import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'

type ServerRow = {
  ip: string
  last_seen: Date
  calls: number
  calls_24h: number
}

type ServerConfigRow = {
  ip: string
  remark: string | null
}

type BotInfo = {
  api_username: string
  bot_username: string | null
}

type BotConfigRow = {
  bot_username: string
  config_content: string
}

export async function GET() {
  try {
    // 可选表：服务器备注配置（不存在也不报错）
    let serverConfigMap = new Map<string, string | null>()
    try {
      const conf = await pool.query<ServerConfigRow>('SELECT ip, remark FROM server_configs')
      serverConfigMap = new Map(conf.rows.map((r) => [r.ip, r.remark]))
    } catch {
      // ignore
    }

    // 查询所有历史记录，按 IP 分组（不再限制24小时）
    const serverResult = await pool.query<ServerRow>(
      `SELECT
         ip,
         MAX(created_at) AS last_seen,
         COUNT(*)::int AS calls,
         COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours')::int AS calls_24h
       FROM client_logs
       GROUP BY ip
       ORDER BY last_seen DESC`
    )

    // 获取每个服务器上的机器人信息（查询所有历史记录）
    const data = await Promise.all(
      serverResult.rows.map(async (server) => {
        // 对于每个 api_username，选择最新的非 null 的 bot_username（查询所有历史记录）
        const botResult = await pool.query<BotInfo>(
          `SELECT DISTINCT ON (api_username)
             api_username,
             bot_username
           FROM client_logs
           WHERE ip = $1
             AND api_username IS NOT NULL
           ORDER BY api_username, 
                    CASE WHEN bot_username IS NOT NULL THEN 0 ELSE 1 END,
                    created_at DESC`,
          [server.ip]
        )

        // 获取每个机器人的配置信息，检查是否为官方版本
        const bots = await Promise.all(
          botResult.rows.map(async (bot) => {
            let isOfficial: boolean | null = null
            
            if (bot.bot_username) {
              // 查询 bot_configs 表获取配置内容
              const configResult = await pool.query<BotConfigRow>(
                'SELECT config_content FROM bot_configs WHERE bot_username = $1 LIMIT 1',
                [bot.bot_username]
              )
              
              if (configResult.rows.length > 0) {
                const configContent = configResult.rows[0].config_content
                // 检查是否包含官方版本标识（精确匹配整行，避免误判）
                // 检查是否包含完整的 "Versionidentifier=APP_VERSION" 行（不包含其他字符）
                const lines = configContent.split('\n')
                isOfficial = lines.some(line => line.trim() === 'Versionidentifier=APP_VERSION')
              }
            }
            
            return {
              apiUsername: bot.api_username,
              botUsername: bot.bot_username || null,
              isOfficial,
            }
          })
        )

        return {
          ip: server.ip,
          remark: serverConfigMap.get(server.ip) ?? null,
          lastSeen: server.last_seen.toISOString(),
          calls: Number(server.calls || 0), // 总调用次数
          calls24h: Number((server as any).calls_24h || 0), // 最近24小时调用次数
          bots,
        }
      })
    )

    const res: ApiResponse<typeof data> = { success: true, data }
    return NextResponse.json(res)
  } catch (e) {
    console.error('获取服务器调用信息失败:', e)
    const res: ApiResponse<null> = { success: false, error: '获取服务器调用信息失败' }
    return NextResponse.json(res, { status: 500 })
  }
}

