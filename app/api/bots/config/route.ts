import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'
import { handleOptions, jsonWithCors } from '@/app/v1/_lib/cors'

// 处理 CORS 预检请求
export async function OPTIONS() {
  return handleOptions()
}

// 接收机器人发送的 config.txt 内容
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { botUsername, apiUsername, configContent, botNotifyUrl } = body

    if (!botUsername || !configContent) {
      return jsonWithCors(
        { success: false, error: '缺少必要参数 botUsername 或 configContent' },
        { status: 400 }
      )
    }

    // 使用 UPSERT 逻辑：如果已存在则更新，否则插入
    // botNotifyUrl 是可选的，如果提供则保存，否则保持原有值
    // 检查 bot_notify_url 字段是否存在，如果不存在则不更新该字段
    try {
      await pool.query(
        `INSERT INTO bot_configs (bot_username, api_username, config_content, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (bot_username) 
         DO UPDATE SET 
           api_username = COALESCE($2, bot_configs.api_username),
           config_content = $3,
           updated_at = NOW()`,
        [botUsername, apiUsername || null, configContent]
      )
      
      // 如果提供了 bot_notify_url，尝试更新（字段可能不存在）
      if (botNotifyUrl !== undefined && botNotifyUrl !== null) {
        try {
          await pool.query(
            `UPDATE bot_configs SET bot_notify_url = $1 WHERE bot_username = $2`,
            [botNotifyUrl, botUsername]
          )
          console.log(`[配置同步] 已更新 bot_notify_url: ${botUsername} -> ${botNotifyUrl}`)
        } catch (err: any) {
          // 如果字段不存在，尝试添加字段
          if (err.code === '42703') {
            console.log('[配置同步] bot_notify_url 字段不存在，尝试添加...')
            try {
              await pool.query('ALTER TABLE bot_configs ADD COLUMN IF NOT EXISTS bot_notify_url VARCHAR(500)')
              await pool.query(
                `UPDATE bot_configs SET bot_notify_url = $1 WHERE bot_username = $2`,
                [botNotifyUrl, botUsername]
              )
              console.log(`[配置同步] 字段已添加并更新 bot_notify_url: ${botUsername} -> ${botNotifyUrl}`)
            } catch (err2) {
              console.error('[配置同步] 添加字段失败:', err2)
            }
          } else {
            console.error('[配置同步] 更新 bot_notify_url 失败:', err)
          }
        }
      }
    } catch (dbError: any) {
      console.error('数据库操作失败:', dbError)
      throw dbError
    }

    const res: ApiResponse<{ message: string }> = {
      success: true,
      data: { message: '配置已保存' },
    }
    return jsonWithCors(res)
  } catch (e) {
    console.error('保存机器人配置失败:', e)
    const res: ApiResponse<null> = { success: false, error: '保存机器人配置失败' }
    return jsonWithCors(res, { status: 500 })
  }
}

// 获取指定机器人的配置内容
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const botUsername = searchParams.get('botUsername')

    if (!botUsername) {
      return NextResponse.json(
        { success: false, error: '缺少参数 botUsername' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `SELECT bot_username, api_username, config_content, updated_at
       FROM bot_configs
       WHERE bot_username = $1`,
      [botUsername]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: '未找到该机器人的配置' },
        { status: 404 }
      )
    }

    const row = result.rows[0]
    const res: ApiResponse<{
      botUsername: string
      apiUsername: string | null
      configContent: string
      updatedAt: string
    }> = {
      success: true,
      data: {
        botUsername: row.bot_username,
        apiUsername: row.api_username,
        configContent: row.config_content,
        updatedAt: row.updated_at.toISOString(),
      },
    }
    return jsonWithCors(res)
  } catch (e) {
    console.error('获取机器人配置失败:', e)
    const res: ApiResponse<null> = { success: false, error: '获取机器人配置失败' }
    return jsonWithCors(res, { status: 500 })
  }
}
