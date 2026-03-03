import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'
import pool from '@/lib/db'

type ProviderType = 'zhangpu'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      energyPoolId?: string
      providerType?: ProviderType
      baseUrl?: string
      username?: string
      password?: string
    }

    if (!body.energyPoolId) {
      const res: ApiResponse<null> = { success: false, error: '缺少 energyPoolId' }
      return NextResponse.json(res, { status: 400 })
    }

    // 这里暂时只支持 zhangpu.online 这类上游
    const providerType: ProviderType = body.providerType || 'zhangpu'
    const baseUrl = body.baseUrl || 'https://zhangpu.online'

    if (!body.username || !body.password) {
      const res: ApiResponse<null> = { success: false, error: '缺少账号或密码' }
      return NextResponse.json(res, { status: 400 })
    }

    // ⚠️ 简化实现：明文保存（和你当前项目 users 表一致）。生产应加密/至少使用 KMS。
    // 需要数据库里 energy_pools 表先加 4 个字段：provider_type/provider_base_url/provider_username/provider_password

    console.log(`[保存上游配置] 准备保存: energyPoolId=${body.energyPoolId}, baseUrl=${baseUrl}, username=${body.username}`)
    
    const updateResult = await pool.query(
      `UPDATE energy_pools
       SET provider_type = $2,
           provider_base_url = $3,
           provider_username = $4,
           provider_password = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [body.energyPoolId, providerType, baseUrl, body.username, body.password]
    )

    console.log(`[保存上游配置] 更新结果: rowCount=${updateResult.rowCount}`)
    
    if (updateResult.rowCount === 0) {
      console.error(`[保存上游配置] ❌ 能量池 ${body.energyPoolId} 不存在`)
      const res: ApiResponse<null> = { success: false, error: `能量池 ${body.energyPoolId} 不存在` }
      return NextResponse.json(res, { status: 404 })
    }

    // 验证保存是否成功
    const verifyResult = await pool.query(
      `SELECT provider_base_url, provider_username, provider_password 
       FROM energy_pools 
       WHERE id = $1`,
      [body.energyPoolId]
    )
    
    if (verifyResult.rows.length > 0) {
      const row = verifyResult.rows[0]
      console.log(`[保存上游配置] ✅ 验证成功: baseUrl=${row.provider_base_url}, username=${row.provider_username}, hasPassword=${!!row.provider_password}`)
    }

    const res: ApiResponse<null> = { success: true, message: '上游能量池配置已保存' }
    return NextResponse.json(res)
  } catch (e) {
    console.error('保存上游能量池配置失败:', e)
    const res: ApiResponse<null> = { success: false, error: '保存上游能量池配置失败' }
    return NextResponse.json(res, { status: 500 })
  }
}


