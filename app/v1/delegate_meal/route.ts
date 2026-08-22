import { NextResponse } from 'next/server'
import { getDefaultUpstreamProvider } from '@/app/v1/_lib/provider'
import { validateApiUser } from '@/app/v1/_lib/auth'
import { safeJson } from '@/app/v1/_lib/parse-json'
import { unauthorized } from '@/app/v1/_lib/response'
import { logClientCall } from '@/app/v1/_lib/client-log'
import { deductApiUserBalance, deductApiUserBalanceForHour, recordFailedConsumptionOrder } from '@/app/v1/_lib/deduct-balance'
import { handleOptions, withCors, jsonWithCors } from '@/app/v1/_lib/cors'
import { notifyEnergyDelegationFailure } from '@/app/v1/_lib/notify-energy-delegation-failure'

type DelegateBody = {
  username?: string
  password?: string
  energy?: number
  day?: number
  receiver_address?: string
  bot_username?: string
}

// 处理 CORS 预检请求
export async function OPTIONS() {
  return handleOptions()
}

export async function POST(request: Request) {
  try {
    const provider = await getDefaultUpstreamProvider()
    console.log(`[delegate_meal] 获取上游服务配置:`, JSON.stringify({ baseUrl: provider.baseUrl, hasUsername: !!provider.username, hasPassword: !!provider.password }))

    const body = await safeJson<DelegateBody>(request)
    if (!body) {
      await logClientCall({ request, apiUsername: undefined, endpoint: '/v1/delegate_meal (invalid json)' })
      return jsonWithCors({ error: 'invalid json' }, { status: 400 })
    }

    const apiUsername = body.username
    const apiPassword = body.password
    const botUsername = body.bot_username

    await logClientCall({ request, apiUsername, endpoint: '/v1/delegate_meal', botUsername })

    const ok = await validateApiUser(apiUsername, apiPassword)
    if (!ok) {
      console.error(`[delegate_meal] ❌ API 用户认证失败: username=${apiUsername}`)
      return jsonWithCors({ error: 'invalid api username/password' }, { status: 401 })
    }

    if (!provider.username || !provider.password) {
      console.error(`[delegate_meal] ❌ 上游服务未配置: provider=${JSON.stringify(provider)}`)
      return jsonWithCors({ error: 'upstream not configured for EP001' }, { status: 400 })
    }
    
    console.log(`[delegate_meal] ✅ API 用户认证成功: username=${apiUsername}`)
    console.log(`[delegate_meal] ✅ 上游服务配置: baseUrl=${provider.baseUrl}, username=${provider.username}`)

    const { energy, day, receiver_address } = body

    // 在调用上游之前检查余额是否足够
    try {
      const pool = (await import('@/lib/db')).default
      const pricingResult = await pool.query(
        `SELECT cost_1hour_trx FROM downstream_pricing WHERE energy_pool_id = $1`,
        ['EP001']
      )

      if (pricingResult.rows.length > 0) {
        const costTrx = parseFloat(pricingResult.rows[0].cost_1hour_trx) || 0
        if (costTrx > 0) {
          const costMicro = Math.round(costTrx * 1e6)
          const balanceCheck = await pool.query(
            `SELECT balance_micro FROM api_users WHERE username = $1`,
            [apiUsername]
          )

          if (balanceCheck.rows.length > 0) {
            const currentBalanceMicro = Number(balanceCheck.rows[0].balance_micro)
            if (currentBalanceMicro < costMicro) {
              const currentBalanceTrx = currentBalanceMicro / 1e6
              const errorMsg = `insufficient balance: current=${currentBalanceTrx.toFixed(6)} TRX, required=${costTrx} TRX`
              console.error(
                `[delegate_meal] ❌ 余额不足: user=${apiUsername}, current=${currentBalanceTrx.toFixed(6)} TRX, required=${costTrx} TRX`
              )
              
              // 通知机器人系统能量下发失败（余额不足）
              if (apiUsername) {
                notifyEnergyDelegationFailure({
                  apiUsername,
                  errorMessage: errorMsg,
                  energy,
                  receiverAddress: receiver_address,
                  orderType: 'delegate_meal',
                }).catch((e) => {
                  console.error(`[delegate_meal] ❌ 发送失败通知失败: API用户=${apiUsername}`, e)
                })
              }
              
              return jsonWithCors(
                { error: errorMsg },
                { status: 402 }
              )
            }
          }
        }
      }
    } catch (balanceError: any) {
      console.error(`[delegate_meal] ❌ 余额检查失败:`, balanceError)
      return jsonWithCors({ error: `balance check failed: ${balanceError.message}` }, { status: 500 })
    }

    const upstreamUrl = new URL('/v1/delegate_meal', provider.baseUrl)

    try {
      console.log(`[delegate_meal] 准备委托能量: API用户=${apiUsername}, 能量=${energy}, 天数=${day}, 接收地址=${receiver_address}`)
      console.log(`[delegate_meal] 上游地址: ${upstreamUrl.toString()}`)
      console.log(`[delegate_meal] 上游账号: username=${provider.username}`)

      const fetchController = new AbortController()
      const timeoutId = setTimeout(() => fetchController.abort(), 30000) // 30秒超时

      let res: Response
      try {
        console.log(`[delegate_meal] 发送请求到上游: ${upstreamUrl.toString()}`)
        console.log(`[delegate_meal] 请求参数: energy=${energy}, day=${day}, receiver_address=${receiver_address}`)

        // 将 day=0 映射为 day=1 传给上游（上游不支持 day=0）
        const upstreamDay = day === 0 ? 1 : day
        console.log(`[delegate_meal] 请求参数: energy=${energy}, day=${day} -> upstreamDay=${upstreamDay}, receiver_address=${receiver_address}`)
        
        res = await fetch(upstreamUrl.toString(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            username: provider.username,
            password: provider.password,
            energy,
            day: upstreamDay,
            receiver_address,
          }),
          signal: fetchController.signal,
        })
        clearTimeout(timeoutId)
        console.log(`[delegate_meal] 上游响应状态: ${res.status} ${res.statusText}`)
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        console.error(`[delegate_meal] ❌ 上游请求异常:`, fetchError.name, fetchError.code, fetchError.message)
        if (fetchError.name === 'AbortError') {
          throw new Error('上游服务请求超时（30秒）')
        } else if (fetchError.code === 'ECONNREFUSED' || fetchError.code === 'ENOTFOUND') {
          throw new Error(`无法连接到上游服务: ${upstreamUrl.toString()} (${fetchError.message})`)
        } else {
          throw new Error(`上游服务请求失败: ${fetchError.message || fetchError.toString()}`)
        }
      }

      const text = await res.text()
      console.log(`[delegate_meal] 上游响应: status=${res.status}, body=${text.substring(0, 500)}`)
      
      // 尝试解析响应内容，检查是否实际成功（即使状态码不是 200）
      let responseData: any = null
      let hasSuccessIndicator = false
      try {
        responseData = JSON.parse(text)
        // 检查响应中是否包含成功标识
        hasSuccessIndicator = !!(responseData.success || responseData.tx_hash || responseData.txHash || responseData.message?.includes('成功') || responseData.message?.includes('success'))
        console.log(`[delegate_meal] 解析响应: hasSuccessIndicator=${hasSuccessIndicator}, success=${responseData.success}, tx_hash=${responseData.tx_hash || responseData.txHash}`)
      } catch {
        // 如果不是 JSON，检查文本中是否包含成功关键词
        const textLower = text.toLowerCase()
        hasSuccessIndicator = textLower.includes('success') || textLower.includes('成功') || textLower.includes('tx_hash') || textLower.includes('txhash')
        console.log(`[delegate_meal] 非JSON响应，检查文本: hasSuccessIndicator=${hasSuccessIndicator}`)
      }
      
      // 如果状态码不是 200，但响应内容显示成功，仍然视为成功
      if (!res.ok && !hasSuccessIndicator) {
        console.error(`[delegate_meal] ❌ 上游服务返回错误: status=${res.status}, body=${text.substring(0, 500)}`)
        // 尝试解析错误信息
        let errorMsg = `上游服务返回错误: HTTP ${res.status}`
        if (responseData) {
          errorMsg = responseData.error || responseData.message || errorMsg
        } else if (text) {
          errorMsg = text.substring(0, 200)
        }
        
        // 记录失败的消费订单（即使失败也要记录）
        if (apiUsername) {
          recordFailedConsumptionOrder({
            apiUsername,
            energyPoolId: 'EP001',
            orderType: 'delegate_meal',
            energy,
            receiverAddress: receiver_address,
            errorMessage: errorMsg,
          }).catch((e) => {
            console.error(`[delegate_meal] ❌ 记录失败订单失败: API用户=${apiUsername}`, e)
          })
        }
        
        return jsonWithCors({ error: errorMsg, upstream_status: res.status }, { status: 502 })
      }
      
      // 成功下发后的处理（包括状态码 200 或响应内容显示成功的情况）
      if (res.ok || hasSuccessIndicator) {
        console.log(`[delegate_meal] ✅ 能量委托成功: API用户=${apiUsername}, 能量=${energy}, 接收地址=${receiver_address}`)
        
        // 如果上游返回非 200 但实际成功，需要构造成功响应给机器人
        let successResponse: any = responseData || {}
        if (!res.ok && hasSuccessIndicator) {
          // 上游返回非 200 但实际成功，构造成功响应
          console.log(`[delegate_meal] ⚠️ 上游返回非 200 但实际成功，构造成功响应`)
          successResponse = {
            success: true,
            ...(responseData || {}),
            // 确保包含成功标识
            tx_hash: responseData?.tx_hash || responseData?.txHash || null,
            message: responseData?.message || '能量委托成功',
          }
        } else if (res.ok && responseData) {
          // 上游返回 200，直接使用响应数据
          successResponse = responseData
        }
        
        // 异步刷新上游信息（不阻塞响应）
        const selfUrl = process.env.ENERGY_POOL_API_URL || 'http://localhost:3000'
        fetch(`${selfUrl}/api/energy-pool/upstream-info`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ energyPoolId: 'EP001' }),
        }).catch((e) => console.error('刷新上游信息失败:', e))

        // 根据 day 参数按正确规则扣费：
        // - day === 0 或未传：按「1小时（单笔）」成本扣费
        // - day > 0：按天数映射到下游成本配置扣费（1天/3天/30天 等）
        if (apiUsername) {
          console.log(`[delegate_meal] 准备扣费: API用户=${apiUsername}, day=${day}`)

          const safeDay = typeof day === 'number' ? day : 0
          const deductPromise =
            safeDay > 0
              ? deductApiUserBalance({
                  apiUsername,
                  energyPoolId: 'EP001',
                  day: safeDay,
                  orderType: 'delegate_meal',
                  energy,
                  receiverAddress: receiver_address,
                })
              : deductApiUserBalanceForHour({
                  apiUsername,
                  energyPoolId: 'EP001',
                  orderType: 'delegate_meal',
                  energy,
                  receiverAddress: receiver_address,
                })

          deductPromise
            .then(cost => {
              console.log(
                `[delegate_meal] ✅ 扣费成功: API用户=${apiUsername}, day=${safeDay}, 扣费金额=${cost} TRX`
              )
            })
            .catch(e => {
              console.error(`[delegate_meal] ❌ 扣费失败: API用户=${apiUsername}, day=${safeDay}`, e)
            })
        }
        
        // 返回成功响应给机器人（始终返回 200 状态码，确保机器人能识别为成功）
        const response = new NextResponse(JSON.stringify(successResponse), {
          status: 200, // 始终返回 200，确保机器人识别为成功
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
        })
        return withCors(response)
      }

      // 如果确实失败，返回错误响应
      const response = new NextResponse(text, {
        status: res.status,
        headers: {
          'Content-Type': res.headers.get('content-type') || 'application/json; charset=utf-8',
        },
      })
      return withCors(response)
    } catch (error: any) {
      console.error(`[delegate_meal] ❌ 上游请求异常:`, error)
      console.error(`[delegate_meal] 错误详情:`, error.message, error.stack)
      console.error(`[delegate_meal] 错误类型:`, error.name, error.code, error.cause)
      
      // 检查是否是网络错误，但上游可能已经处理了请求
      // 如果错误是超时或连接错误，但能量可能已经下发，我们需要更谨慎地处理
      const isNetworkError = error.name === 'AbortError' || 
                            error.code === 'ECONNREFUSED' || 
                            error.code === 'ENOTFOUND' ||
                            error.message?.includes('timeout') ||
                            error.message?.includes('超时')
      
      if (isNetworkError) {
        console.warn(`[delegate_meal] ⚠️ 网络错误，但上游可能已处理请求: ${error.message}`)
        console.warn(`[delegate_meal] ⚠️ 建议手动检查能量是否已下发到地址: ${receiver_address}`)
      }
      
      // 记录失败的消费订单（即使请求异常也要记录）
      if (apiUsername) {
        const errorMsg = `upstream request failed: ${error.message || 'unknown error'}`
        recordFailedConsumptionOrder({
          apiUsername,
          energyPoolId: 'EP001',
          orderType: 'delegate_meal',
          energy,
          receiverAddress: receiver_address,
          errorMessage: errorMsg,
        }).catch((e) => {
          console.error(`[delegate_meal] ❌ 记录失败订单失败: API用户=${apiUsername}`, e)
        })
      }
      
      return jsonWithCors({ error: `upstream request failed: ${error.message || 'unknown error'}` }, { status: 502 })
    }
  } catch (error: any) {
    console.error(`[delegate_meal] ❌ 接口处理异常:`, error)
    console.error(`[delegate_meal] 错误详情:`, error.message, error.stack)
    return jsonWithCors({ error: `internal server error: ${error.message || 'unknown error'}` }, { status: 500 })
  }
}
