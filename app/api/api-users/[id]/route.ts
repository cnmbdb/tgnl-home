import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import type { ApiResponse } from '@/types'
import { notifyBalanceChange } from '@/app/v1/_lib/notify-balance-change'

function toMicroFromTrx(trx: number) {
  // 保留到 micro
  return Math.round(trx * 1e6)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = (await request.json().catch(() => ({}))) as {
      password?: string
      status?: 'active' | 'inactive'
      balanceTrx?: number | string
    }

    const updates: string[] = []
    const values: any[] = [id]
    let idx = 2

    if (typeof body.password === 'string') {
      updates.push(`password = $${idx++}`)
      values.push(body.password)
    }

    if (body.status === 'active' || body.status === 'inactive') {
      updates.push(`status = $${idx++}`)
      values.push(body.status)
    }

    // 如果更新了余额，先获取旧余额（在更新之前）
    let oldBalanceMicro = 0
    if (body.balanceTrx !== undefined) {
      const oldResult = await pool.query(
        'SELECT balance_micro FROM api_users WHERE id = $1',
        [id]
      )
      if (oldResult.rows.length > 0) {
        oldBalanceMicro = Number(oldResult.rows[0].balance_micro || 0)
      }
    }

    if (body.balanceTrx !== undefined) {
      const trx = typeof body.balanceTrx === 'string' ? Number(body.balanceTrx) : body.balanceTrx
      if (Number.isNaN(trx)) {
        const res: ApiResponse<null> = { success: false, error: 'balanceTrx 不是有效数字' }
        return NextResponse.json(res, { status: 400 })
      }
      updates.push(`balance_micro = $${idx++}`)
      values.push(toMicroFromTrx(trx))
    }

    if (updates.length === 0) {
      const res: ApiResponse<null> = { success: false, error: '没有需要更新的字段' }
      return NextResponse.json(res, { status: 400 })
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')

    const sql = `UPDATE api_users SET ${updates.join(', ')} WHERE id = $1 RETURNING id, username, password, status, balance_micro, created_at, updated_at`
    const result = await pool.query(sql, values)

    if (result.rowCount === 0) {
      const res: ApiResponse<null> = { success: false, error: '用户不存在' }
      return NextResponse.json(res, { status: 404 })
    }

    const row = result.rows[0]
    const balanceMicro = Number(row.balance_micro || 0)
    const data = {
      id: row.id,
      username: row.username,
      password: row.password,
      status: row.status,
      balanceMicro,
      balanceTrx: (balanceMicro / 1e6).toFixed(6).replace(/\.?0+$/, ''),
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at?.toISOString?.() || null,
    }

    // 如果更新了余额，通知机器人系统
    if (body.balanceTrx !== undefined) {
      const newBalanceTrx = balanceMicro / 1e6
      const changeAmount = newBalanceTrx - (oldBalanceMicro / 1e6)
      
      console.log(`[余额调整] API用户=${row.username}, 旧余额=${oldBalanceMicro / 1e6} TRX, 新余额=${newBalanceTrx} TRX, 变动=${changeAmount} TRX`)
      
      // 只有当余额真正发生变化时才通知
      if (Math.abs(changeAmount) > 0.000001) {
        console.log(`[余额调整] 开始通知机器人系统: API用户=${row.username}, 变动金额=${changeAmount} TRX`)
        notifyBalanceChange({
          apiUsername: row.username,
          changeType: 'adjust',
          amountTrx: changeAmount,
          newBalanceTrx,
        }).catch(err => {
          console.error('[余额调整] 通知机器人余额变动失败:', err)
        })
      } else {
        console.log(`[余额调整] 余额未发生变化，跳过通知`)
      }
    }

    const res: ApiResponse<typeof data> = { success: true, data, message: '更新成功' }
    return NextResponse.json(res)
  } catch (e) {
    console.error('更新 API 用户失败:', e)
    const res: ApiResponse<null> = { success: false, error: '更新 API 用户失败' }
    return NextResponse.json(res, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const result = await pool.query('DELETE FROM api_users WHERE id = $1 RETURNING id, username', [id])

    if (result.rowCount === 0) {
      const res: ApiResponse<null> = { success: false, error: '用户不存在' }
      return NextResponse.json(res, { status: 404 })
    }

    const res: ApiResponse<{ id: string; username: string }> = {
      success: true,
      data: { id: result.rows[0].id, username: result.rows[0].username },
      message: '删除成功',
    }
    return NextResponse.json(res)
  } catch (e) {
    console.error('删除 API 用户失败:', e)
    const res: ApiResponse<null> = { success: false, error: '删除 API 用户失败' }
    return NextResponse.json(res, { status: 500 })
  }
}
