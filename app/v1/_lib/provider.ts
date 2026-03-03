import pool from '@/lib/db'

export type UpstreamProvider = {
  baseUrl: string
  username?: string
  password?: string
}

/**
 * 方案1：固定使用 EP001 作为默认能量池。
 *
 * - 如果 EP001 配置了 provider_base_url/provider_username/provider_password，则使用数据库里的上游配置
 * - 如果没配置，则回退到默认 zhangpu.online（且不提供账号密码，由调用方传入/或由上游接口决定）
 */
export async function getDefaultUpstreamProvider(): Promise<UpstreamProvider> {
  const fallback: UpstreamProvider = {
    baseUrl: process.env.ZP_BASE_URL || 'https://zhangpu.online',
  }

  try {
    const res = await pool.query(
      'SELECT provider_base_url as "providerBaseUrl", provider_username as "providerUsername", provider_password as "providerPassword" FROM energy_pools WHERE id = $1 LIMIT 1',
      ['EP001']
    )

    if (res.rowCount === 0) {
      console.log(`[getDefaultUpstreamProvider] 能量池 EP001 不存在，使用默认配置: ${fallback.baseUrl}`)
      return fallback
    }

    const row = res.rows[0] as {
      providerBaseUrl: string | null
      providerUsername: string | null
      providerPassword: string | null
    }

    const result = {
      baseUrl: row.providerBaseUrl || fallback.baseUrl,
      username: row.providerUsername || undefined,
      password: row.providerPassword || undefined,
    }
    
    console.log(`[getDefaultUpstreamProvider] 读取配置: baseUrl=${result.baseUrl}, hasUsername=${!!result.username}, hasPassword=${!!result.password}`)
    
    return result
  } catch (error: any) {
    console.error(`[getDefaultUpstreamProvider] 查询数据库失败:`, error)
    return fallback
  }
}

