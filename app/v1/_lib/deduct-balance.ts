import pool from '@/lib/db'
import { notifyBalanceChange } from './notify-balance-change'

type DeductParams = {
  apiUsername: string
  energyPoolId: string
  day: number // 0 = 按笔数, 其他 = 按天数
  orderType?: string // 'delegate_meal', 'delegate_tran', 'other'
  energy?: number // 下发的能量值（可选）
  receiverAddress?: string // 接收地址（可选）
}

/**
 * 根据下游成本配置扣除 API 用户余额
 * @returns 扣除金额，如果无配置或失败则返回 0
 */
export async function deductApiUserBalance({
  apiUsername,
  energyPoolId,
  day,
  orderType = 'other',
  energy,
  receiverAddress,
}: DeductParams): Promise<number> {
  try {
    // 获取下游成本配置
    const pricingResult = await pool.query(
      `SELECT 
        cost_1hour_trx,
        cost_1day_trx,
        cost_3day_trx,
        cost_30day_trx,
        cost_bishu_trx
      FROM downstream_pricing
      WHERE energy_pool_id = $1`,
      [energyPoolId]
    )

    if (pricingResult.rows.length === 0) {
      console.log(`[deduct] 未找到 ${energyPoolId} 的下游成本配置，跳过扣费`)
      return 0
    }

    const pricing = pricingResult.rows[0]

    // 根据 day 参数确定扣费金额
    let costTrx = 0
    if (day === 0) {
      // 按1小时套餐计费，支持1小时多笔（2/5/10 等）
      // 注意：原来的「笔数预存」功能已从机器人侧删除，day=0 现在就是1小时套餐
      // 机器人侧约定：1 笔能量 = 65000，N 笔能量 = 65000 * N
      const baseEnergyPerOrder = 65000
      let multiplier = 1
      if (typeof energy === 'number' && energy > 0) {
        const approx = energy / baseEnergyPerOrder
        multiplier = Math.max(1, Math.round(approx))
      }
      // 使用 1小时套餐成本（而不是笔数预存成本）
      const baseCostTrx = parseFloat(pricing.cost_1hour_trx) || 0
      costTrx = baseCostTrx * multiplier
      console.log(
        `[deduct] 计算1小时套餐成本: baseCost=${baseCostTrx} TRX, multiplier=${multiplier}, totalCost=${costTrx} TRX, energy=${energy}`
      )
    } else if (day === 1) {
      // 1天
      costTrx = parseFloat(pricing.cost_1day_trx) || 0
    } else if (day === 3) {
      // 3天
      costTrx = parseFloat(pricing.cost_3day_trx) || 0
    } else if (day >= 30) {
      // 30天
      costTrx = parseFloat(pricing.cost_30day_trx) || 0
    } else {
      // 其他天数按1天计费
      costTrx = parseFloat(pricing.cost_1day_trx) || 0
    }

    if (costTrx <= 0) {
      console.log(`[deduct] day=${day} 对应成本为 0，跳过扣费`)
      return 0
    }

    // 将 TRX 转换为微单位（1 TRX = 1,000,000 micro）
    const costMicro = Math.round(costTrx * 1e6)

    // 先检查余额是否足够
    const balanceCheck = await pool.query(
      `SELECT balance_micro FROM api_users WHERE username = $1`,
      [apiUsername]
    )

    if (balanceCheck.rows.length === 0) {
      console.error(`[deduct] API 用户 ${apiUsername} 不存在`)
      throw new Error(`API user not found: ${apiUsername}`)
    }

    const currentBalanceMicro = Number(balanceCheck.rows[0].balance_micro)
    if (currentBalanceMicro < costMicro) {
      const currentBalanceTrx = currentBalanceMicro / 1e6
      console.error(
        `[deduct] ❌ 余额不足: user=${apiUsername}, current=${currentBalanceTrx.toFixed(6)} TRX, required=${costTrx} TRX`
      )
      throw new Error(`insufficient balance: current=${currentBalanceTrx.toFixed(6)} TRX, required=${costTrx} TRX`)
    }

    // 扣除余额（确保不会变成负数）
    const updateResult = await pool.query(
      `UPDATE api_users 
       SET balance_micro = balance_micro - $1, updated_at = NOW()
       WHERE username = $2 AND balance_micro >= $1
       RETURNING balance_micro`,
      [costMicro, apiUsername]
    )

    if (updateResult.rowCount === 0) {
      console.error(`[deduct] ❌ 扣费失败: API用户 ${apiUsername} 不存在或余额不足`)
      throw new Error(`Failed to deduct balance: user not found or insufficient balance`)
    }

    const newBalanceMicro = Number(updateResult.rows[0].balance_micro)
    const newBalanceTrx = newBalanceMicro / 1e6
    console.log(
      `[deduct] 扣费成功: user=${apiUsername}, day=${day}, cost=${costTrx} TRX, newBalance=${newBalanceTrx.toFixed(6)} TRX`
    )

    // 记录消费订单
    try {
      await pool.query(
        `INSERT INTO api_consumption_orders 
         (api_username, order_type, amount_trx, energy, day, receiver_address, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'completed')`,
        [apiUsername, orderType, costTrx, energy || null, day || null, receiverAddress || null]
      )
      console.log(`[deduct] 消费订单已记录: user=${apiUsername}, type=${orderType}, amount=${costTrx} TRX`)
    } catch (err) {
      console.error('[deduct] 记录消费订单失败:', err)
      // 不影响主流程，继续执行
    }

    // 通知机器人系统余额变动（扣费通知）
    notifyBalanceChange({
      apiUsername,
      changeType: 'deduct',
      amountTrx: -costTrx, // 负数表示扣费
      newBalanceTrx,
    })
      .then(() => {
        console.log(`[deduct] ✅ 扣费通知已发送: API用户=${apiUsername}, 扣费=${costTrx} TRX, 新余额=${newBalanceTrx.toFixed(6)} TRX`)
      })
      .catch(err => {
        console.error(`[deduct] ❌ 扣费通知失败: API用户=${apiUsername}`, err)
        // 通知失败不影响主流程，但记录错误日志
      })

    return costTrx
  } catch (error) {
    console.error('[deduct] 扣费失败:', error)
    return 0
  }
}

/**
 * 扣除 1小时 成本
 */
export async function deductApiUserBalanceForHour({
  apiUsername,
  energyPoolId,
  orderType = 'delegate_meal',
  energy,
  receiverAddress,
}: {
  apiUsername: string
  energyPoolId: string
  orderType?: string
  energy?: number
  receiverAddress?: string
}): Promise<number> {
  try {
    const pricingResult = await pool.query(
      `SELECT cost_1hour_trx FROM downstream_pricing WHERE energy_pool_id = $1`,
      [energyPoolId]
    )

    if (pricingResult.rows.length === 0) {
      return 0
    }

    const costTrx = parseFloat(pricingResult.rows[0].cost_1hour_trx) || 0
    if (costTrx <= 0) return 0

    // 将 TRX 转换为微单位（1 TRX = 1,000,000 micro）
    const costMicro = Math.round(costTrx * 1e6)

    // 先检查余额是否足够
    const balanceCheck = await pool.query(
      `SELECT balance_micro FROM api_users WHERE username = $1`,
      [apiUsername]
    )

    if (balanceCheck.rows.length === 0) {
      console.error(`[deduct] API 用户 ${apiUsername} 不存在`)
      throw new Error(`API user not found: ${apiUsername}`)
    }

    const currentBalanceMicro = Number(balanceCheck.rows[0].balance_micro)
    if (currentBalanceMicro < costMicro) {
      const currentBalanceTrx = currentBalanceMicro / 1e6
      console.error(
        `[deduct] ❌ 余额不足: user=${apiUsername}, current=${currentBalanceTrx.toFixed(6)} TRX, required=${costTrx} TRX`
      )
      throw new Error(`insufficient balance: current=${currentBalanceTrx.toFixed(6)} TRX, required=${costTrx} TRX`)
    }

    // 扣除余额（确保不会变成负数）
    const updateResult = await pool.query(
      `UPDATE api_users 
       SET balance_micro = balance_micro - $1, updated_at = NOW()
       WHERE username = $2 AND balance_micro >= $1
       RETURNING balance_micro`,
      [costMicro, apiUsername]
    )

    if (updateResult.rowCount === 0) {
      console.error(`[deduct] ❌ 扣费失败: API用户 ${apiUsername} 余额不足`)
      throw new Error(`Failed to deduct balance: insufficient balance`)
    }

    const newBalanceMicro = Number(updateResult.rows[0].balance_micro)
    const newBalanceTrx = newBalanceMicro / 1e6
    console.log(
      `[deduct] 1小时扣费: user=${apiUsername}, cost=${costTrx} TRX, newBalance=${newBalanceTrx.toFixed(6)} TRX`
    )

    // 记录消费订单（按小时计费，day 为 null）
    try {
      const insertResult = await pool.query(
        `INSERT INTO api_consumption_orders 
         (api_username, order_type, amount_trx, energy, day, receiver_address, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'completed')
         RETURNING id`,
        [apiUsername, orderType || 'delegate_meal', costTrx, energy || null, null, receiverAddress || null]
      )
      console.log(`[deduct] ✅ 消费订单已记录: user=${apiUsername}, type=${orderType || 'delegate_meal'}, amount=${costTrx} TRX, id=${insertResult.rows[0]?.id}`)
    } catch (err: any) {
      console.error(`[deduct] ❌ 记录消费订单失败: user=${apiUsername}, type=${orderType || 'delegate_meal'}, amount=${costTrx} TRX`, err)
      console.error(`[deduct] 错误详情:`, err.message, err.code, err.detail)
      // 不影响主流程，继续执行
    }

    // 通知机器人系统余额变动（1小时扣费通知）
    notifyBalanceChange({
      apiUsername,
      changeType: 'deduct',
      amountTrx: -costTrx, // 负数表示扣费
      newBalanceTrx,
    })
      .then(() => {
        console.log(`[deduct] ✅ 1小时扣费通知已发送: API用户=${apiUsername}, 扣费=${costTrx} TRX, 新余额=${newBalanceTrx.toFixed(6)} TRX`)
      })
      .catch(err => {
        console.error(`[deduct] ❌ 1小时扣费通知失败: API用户=${apiUsername}`, err)
        // 通知失败不影响主流程，但记录错误日志
      })

    return costTrx
  } catch (error) {
    console.error('[deduct] 1小时扣费失败:', error)
    return 0
  }
}

/**
 * 记录失败的消费订单（不扣费，仅记录）
 */
export async function recordFailedConsumptionOrder({
  apiUsername,
  orderType = 'delegate_meal',
  energy,
  receiverAddress,
  errorMessage,
  energyPoolId,
  day,
}: {
  apiUsername: string
  orderType?: string
  energy?: number
  receiverAddress?: string
  errorMessage: string
  energyPoolId: string
  day?: number
}): Promise<void> {
  try {
    // 获取下游成本配置（用于记录应该扣费的金额）
    let costTrx = 0
    if (orderType === 'delegate_meal') {
      // delegate_meal 使用 1小时 成本
      const pricingResult = await pool.query(
        `SELECT cost_1hour_trx FROM downstream_pricing WHERE energy_pool_id = $1`,
        [energyPoolId]
      )
      if (pricingResult.rows.length > 0) {
        costTrx = parseFloat(pricingResult.rows[0].cost_1hour_trx) || 0
      }
    } else {
      // delegate_tran 根据 day 参数选择成本
      const pricingResult = await pool.query(
        `SELECT 
          cost_1hour_trx,
          cost_1day_trx,
          cost_3day_trx,
          cost_30day_trx,
          cost_bishu_trx
        FROM downstream_pricing
        WHERE energy_pool_id = $1`,
        [energyPoolId]
      )
      if (pricingResult.rows.length > 0) {
        const pricing = pricingResult.rows[0]
        const dayValue = day || 0
        if (dayValue === 0) {
          // 使用 1小时套餐成本（而不是笔数预存成本）
          costTrx = parseFloat(pricing.cost_1hour_trx) || 0
        } else if (dayValue === 1) {
          costTrx = parseFloat(pricing.cost_1day_trx) || 0
        } else if (dayValue === 3) {
          costTrx = parseFloat(pricing.cost_3day_trx) || 0
        } else if (dayValue >= 30) {
          costTrx = parseFloat(pricing.cost_30day_trx) || 0
        } else {
          costTrx = parseFloat(pricing.cost_1day_trx) || 0
        }
      }
    }

    // 记录失败的消费订单
    const insertResult = await pool.query(
      `INSERT INTO api_consumption_orders 
       (api_username, order_type, amount_trx, energy, day, receiver_address, status, error_message)
       VALUES ($1, $2, $3, $4, $5, $6, 'failed', $7)
       RETURNING id`,
      [apiUsername, orderType || 'delegate_meal', costTrx, energy || null, day || null, receiverAddress || null, errorMessage]
    )
    console.log(`[recordFailed] ✅ 失败订单已记录: user=${apiUsername}, type=${orderType || 'delegate_meal'}, amount=${costTrx} TRX, day=${day || null}, error=${errorMessage.substring(0, 100)}, id=${insertResult.rows[0]?.id}`)
  } catch (err: any) {
    console.error(`[recordFailed] ❌ 记录失败订单失败: user=${apiUsername}, type=${orderType || 'delegate_meal'}`, err)
    console.error(`[recordFailed] 错误详情:`, err.message, err.code, err.detail)
    // 不影响主流程，继续执行
  }
}
