import { NextResponse } from 'next/server'
import { getDefaultUpstreamProvider } from '@/app/v1/_lib/provider'
import { validateApiUser } from '@/app/v1/_lib/auth'
import { safeJson } from '@/app/v1/_lib/parse-json'
import { unauthorized } from '@/app/v1/_lib/response'
import { logClientCall } from '@/app/v1/_lib/client-log'
import { deductApiUserBalance, recordFailedConsumptionOrder } from '@/app/v1/_lib/deduct-balance'
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
  const provider = await getDefaultUpstreamProvider()

  const body = await safeJson<DelegateBody>(request)
  if (!body) {
    await logClientCall({ request, apiUsername: undefined, endpoint: '/v1/delegate_tran (invalid json)' })
    return jsonWithCors({ error: 'invalid json' }, { status: 400 })
  }

  // 调用方传入的是"本系统 API 账号"
  const apiUsername = body.username
  const apiPassword = body.password
  const botUsername = body.bot_username

  await logClientCall({ request, apiUsername, endpoint: '/v1/delegate_tran', botUsername })

  const ok = await validateApiUser(apiUsername, apiPassword)
  if (!ok) return jsonWithCors({ error: 'invalid api username/password' }, { status: 401 })

  // 上游账号必须来自系统配置（EP001）
  if (!provider.username || !provider.password) {
    return jsonWithCors({ error: 'upstream not configured for EP001' }, { status: 400 })
  }

  const { energy, day, receiver_address } = body

  // 在调用上游之前检查余额是否足够
  try {
    const pool = (await import('@/lib/db')).default
    const pricingResult = await pool.query(
      `SELECT 
        cost_1hour_trx,
        cost_1day_trx,
        cost_3day_trx,
        cost_30day_trx,
        cost_bishu_trx
      FROM downstream_pricing
      WHERE energy_pool_id = $1`,
      ['EP001']
    )

    if (pricingResult.rows.length > 0) {
      const pricing = pricingResult.rows[0]
      const dayValue = day || 0
      let costTrx = 0
      if (dayValue === 0) {
        costTrx = parseFloat(pricing.cost_bishu_trx) || 0
      } else if (dayValue === 1) {
        costTrx = parseFloat(pricing.cost_1day_trx) || 0
      } else if (dayValue === 3) {
        costTrx = parseFloat(pricing.cost_3day_trx) || 0
      } else if (dayValue >= 30) {
        costTrx = parseFloat(pricing.cost_30day_trx) || 0
      } else {
        costTrx = parseFloat(pricing.cost_1day_trx) || 0
      }

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
              `[delegate_tran] ❌ 余额不足: user=${apiUsername}, current=${currentBalanceTrx.toFixed(6)} TRX, required=${costTrx} TRX`
            )
            
            // 通知机器人系统能量下发失败（余额不足）
            if (apiUsername) {
              notifyEnergyDelegationFailure({
                apiUsername,
                errorMessage: errorMsg,
                energy,
                receiverAddress: receiver_address,
                orderType: 'delegate_tran',
              }).catch((e) => {
                console.error(`[delegate_tran] ❌ 发送失败通知失败: API用户=${apiUsername}`, e)
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
    console.error(`[delegate_tran] ❌ 余额检查失败:`, balanceError)
    return jsonWithCors({ error: `balance check failed: ${balanceError.message}` }, { status: 500 })
  }

  const upstreamUrl = new URL('/v1/delegate_tran', provider.baseUrl)

  try {
    console.log(`[delegate_tran] 准备委托交易能量: API用户=${apiUsername}, 能量=${energy}, 天数=${day}, 接收地址=${receiver_address}`)
    console.log(`[delegate_tran] 上游地址: ${upstreamUrl.toString()}`)
    
    const res = await fetch(upstreamUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username: provider.username,
        password: provider.password,
        energy,
        day,
        receiver_address,
      }),
    })

    const text = await res.text()
    console.log(`[delegate_tran] 上游响应: status=${res.status}, body=${text.substring(0, 200)}`)
    
    // 成功下发后的处理
    if (res.ok) {
      console.log(`[delegate_tran] ✅ 交易能量委托成功: API用户=${apiUsername}, 能量=${energy}, 接收地址=${receiver_address}`)
      // 异步刷新上游信息（不阻塞响应）
      const selfUrl = process.env.ENERGY_POOL_API_URL || 'http://localhost:3000'
      fetch(`${selfUrl}/api/energy-pool/upstream-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ energyPoolId: 'EP001' }),
      }).catch((e) => console.error('刷新上游信息失败:', e))

      // 根据下游成本配置扣费
      if (apiUsername) {
        console.log(`[delegate_tran] 准备扣费: API用户=${apiUsername}, day=${day || 0}`)
        deductApiUserBalance({
          apiUsername,
          energyPoolId: 'EP001',
          day: day || 0,
          orderType: 'delegate_tran',
          energy,
          receiverAddress: receiver_address,
        })
          .then((cost) => {
            console.log(`[delegate_tran] ✅ 扣费成功: API用户=${apiUsername}, 扣费金额=${cost} TRX`)
          })
          .catch((e) => {
            console.error(`[delegate_tran] ❌ 扣费失败: API用户=${apiUsername}`, e)
          })
      }
    } else {
      // 失败时记录失败订单
      console.error(`[delegate_tran] ❌ 上游服务返回错误: status=${res.status}, body=${text.substring(0, 500)}`)
      let errorMsg = `上游服务返回错误: HTTP ${res.status}`
      try {
        const responseData = JSON.parse(text)
        errorMsg = responseData.error || responseData.message || errorMsg
      } catch {
        if (text) {
          errorMsg = text.substring(0, 200)
        }
      }
      
      // 记录失败的消费订单（即使失败也要记录）
      if (apiUsername) {
        recordFailedConsumptionOrder({
          apiUsername,
          energyPoolId: 'EP001',
          orderType: 'delegate_tran',
          energy,
          receiverAddress: receiver_address,
          errorMessage: errorMsg,
          day: day || 0,
        }).catch((e) => {
          console.error(`[delegate_tran] ❌ 记录失败订单失败: API用户=${apiUsername}`, e)
        })
      }
    }

    const response = new NextResponse(text, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    })
    return withCors(response)
  } catch (error: any) {
    console.error(`[delegate_tran] ❌ 上游请求异常:`, error)
    console.error(`[delegate_tran] 错误详情:`, error.message, error.stack)
    
    // 记录失败的消费订单（即使请求异常也要记录）
    if (apiUsername) {
      const errorMsg = `upstream request failed: ${error.message || 'unknown error'}`
      recordFailedConsumptionOrder({
        apiUsername,
        energyPoolId: 'EP001',
        orderType: 'delegate_tran',
        energy,
        receiverAddress: receiver_address,
        errorMessage: errorMsg,
        day: day || 0,
      }).catch((e) => {
        console.error(`[delegate_tran] ❌ 记录失败订单失败: API用户=${apiUsername}`, e)
      })
    }
    
    return jsonWithCors({ error: 'upstream request failed' }, { status: 502 })
  }
}
