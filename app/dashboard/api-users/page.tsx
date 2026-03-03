'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ApiResponse } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'

type ApiUserItem = {
  id: string
  username: string
  password: string
  status: 'active' | 'inactive'
  balanceMicro: number
  balanceTrx: string
  createdAt: string
}

type CreatedApiUser = ApiUserItem

type RechargeOrder = {
  id: string
  api_username: string
  payment_address: string
  amount_trx: string
  status: 'pending' | 'paid' | 'expired' | 'cancelled'
  tx_hash: string | null
  created_at: string
  expires_at: string
  paid_at: string | null
  telegram_chat_id: number | null
  telegram_message_id: number | null
}

type ConsumptionOrder = {
  id: string
  api_username: string
  order_type: string
  amount_trx: string
  energy: number | null
  day: number | null
  receiver_address: string | null
  status: 'completed' | 'failed'
  error_message: string | null
  created_at: string
  updated_at: string
}

type Order = (RechargeOrder & { type: 'recharge' }) | (ConsumptionOrder & { type: 'consumption' })

function ApiUserRow({ user }: { user: ApiUserItem }) {
  const [showPassword, setShowPassword] = useState(false)

  const [showEditPassword, setShowEditPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')

  const [showEditBalance, setShowEditBalance] = useState(false)
  const [newBalanceTrx, setNewBalanceTrx] = useState(user.balanceTrx || '0')

  const [isSaving, setIsSaving] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`username=${user.username}\npassword=${user.password}`)
    } catch {
      // ignore
    }
  }

  return (
    <div className="border border-gray-800 rounded-lg p-3 sm:p-4 space-y-3">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-white font-medium text-sm sm:text-base break-words">{user.username}</div>
          <div className="text-xs text-gray-500 mt-1">创建时间：{new Date(user.createdAt).toLocaleString()}</div>
        </div>
        <div className="text-xs sm:text-sm text-gray-400 shrink-0">{user.status === 'active' ? '活跃' : '未激活'}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <div>
          <div className="text-gray-400">username</div>
          <code className="block text-white bg-gray-900 px-3 py-2 rounded font-mono break-all">{user.username}</code>
        </div>
        <div>
          <div className="text-gray-400">password</div>
          <code className="block text-white bg-gray-900 px-3 py-2 rounded font-mono break-all">
            {showPassword ? user.password : '••••••••••••••••'}
          </code>
        </div>
        <div>
          <div className="text-gray-400">余额(TRX)</div>
          <code className="block text-white bg-gray-900 px-3 py-2 rounded font-mono break-all">{user.balanceTrx}</code>
        </div>
      </div>

      {err && <div className="text-sm text-red-400">{err}</div>}

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setShowPassword((v) => !v)} className="min-h-[44px] flex-1 sm:flex-none">
          {showPassword ? '隐藏密码' : '显示密码'}
        </Button>
        <Button size="sm" variant="outline" onClick={copy} className="min-h-[44px] flex-1 sm:flex-none">
          复制
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setShowEditPassword((v) => !v)} className="min-h-[44px] flex-1 sm:flex-none">
          修改密码
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setShowEditBalance((v) => !v)} className="min-h-[44px] flex-1 sm:flex-none">
          修改余额
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="min-h-[44px] flex-1 sm:flex-none text-red-400 border-red-400/50 hover:bg-red-400/10"
          disabled={isSaving}
          onClick={async () => {
            if (!confirm(`确定要删除账号 ${user.username} 吗？此操作不可恢复。`)) return
            try {
              setErr(null)
              setIsSaving(true)
              const res = await fetch(`/api/api-users/${user.id}`, { method: 'DELETE' })
              const json: ApiResponse<{ id: string; username: string }> = await res.json()
              if (!res.ok || !json.success) throw new Error(json.error || '删除失败')
              window.location.reload()
            } catch (e) {
              setErr(e instanceof Error ? e.message : '删除失败')
            } finally {
              setIsSaving(false)
            }
          }}
        >
          删除
        </Button>
      </div>

      {showEditPassword && (
        <div className="border border-gray-800 rounded-lg p-3 sm:p-4 space-y-3">
          <div className="text-white font-medium text-sm sm:text-base">修改密码</div>
          <Input
            label="新密码"
            placeholder="输入新密码"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="min-h-[44px]"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 min-h-[44px]"
              disabled={isSaving}
              onClick={async () => {
                try {
                  setErr(null)
                  setIsSaving(true)
                  const res = await fetch(`/api/api-users/${user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: newPassword }),
                  })
                  const json: ApiResponse<ApiUserItem> = await res.json()
                  if (!res.ok || !json.success || !json.data) throw new Error(json.error || '修改失败')
                  window.location.reload()
                } catch (e) {
                  setErr(e instanceof Error ? e.message : '修改失败')
                } finally {
                  setIsSaving(false)
                }
              }}
            >
              {isSaving ? '保存中...' : '保存'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 min-h-[44px]"
              onClick={() => {
                setShowEditPassword(false)
                setNewPassword('')
              }}
            >
              取消
            </Button>
          </div>
        </div>
      )}

      {showEditBalance && (
        <div className="border border-gray-800 rounded-lg p-3 sm:p-4 space-y-3">
          <div className="text-white font-medium text-sm sm:text-base">修改余额</div>
          <Input
            label="余额(TRX)"
            placeholder="例如：12.34"
            value={newBalanceTrx}
            onChange={(e) => setNewBalanceTrx(e.target.value)}
            className="min-h-[44px]"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 min-h-[44px]"
              disabled={isSaving}
              onClick={async () => {
                try {
                  setErr(null)
                  setIsSaving(true)
                  const res = await fetch(`/api/api-users/${user.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ balanceTrx: newBalanceTrx }),
                  })
                  const json: ApiResponse<ApiUserItem> = await res.json()
                  if (!res.ok || !json.success || !json.data) throw new Error(json.error || '修改失败')
                  window.location.reload()
                } catch (e) {
                  setErr(e instanceof Error ? e.message : '修改失败')
                } finally {
                  setIsSaving(false)
                }
              }}
            >
              {isSaving ? '保存中...' : '保存'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 min-h-[44px]"
              onClick={() => {
                setShowEditBalance(false)
                setNewBalanceTrx(user.balanceTrx || '0')
              }}
            >
              取消
            </Button>
          </div>
          <div className="text-xs text-gray-500">内部存储为 micro（1 TRX = 1,000,000）。</div>
        </div>
      )}
    </div>
  )
}

export default function ApiUsersPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'orders'>('users')
  
  // API 用户管理相关状态
  const [items, setItems] = useState<ApiUserItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createUsername, setCreateUsername] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const [showCreatedModal, setShowCreatedModal] = useState(false)
  const [created, setCreated] = useState<CreatedApiUser | null>(null)

  // API 用户订单相关状态
  const [rechargeOrders, setRechargeOrders] = useState<RechargeOrder[]>([])
  const [consumptionOrders, setConsumptionOrders] = useState<ConsumptionOrder[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all')

  // 智能管理器运行状态（与后端脚本同步）
  const [managerStatus, setManagerStatus] = useState<
    'unknown' | 'running' | 'stopped' | 'starting' | 'stopping' | 'restarting'
  >('unknown')
  const [managerCheckInterval, setManagerCheckInterval] = useState<number | null>(null)
  const [managerManagerInterval, setManagerManagerInterval] = useState<number | null>(null)
  const [isManagerLoading, setIsManagerLoading] = useState(false)
  const [managerError, setManagerError] = useState<string | null>(null)

  const load = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const res = await fetch('/api/api-users', { cache: 'no-store' })
      const json: ApiResponse<ApiUserItem[]> = await res.json()
      if (!res.ok || !json.success || !json.data) throw new Error(json.error || '加载失败')
      setItems(json.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败')
    } finally {
      setIsLoading(false)
    }
  }

  const loadOrders = async () => {
    try {
      setOrderError(null)
      setIsLoadingOrders(true)
      
      // 加载充值订单
      const rechargeParams = new URLSearchParams()
      if (orderStatusFilter !== 'all') {
        rechargeParams.set('status', orderStatusFilter)
      }
      const rechargeRes = await fetch(`/api/api-recharge-orders?${rechargeParams.toString()}`, { cache: 'no-store' })
      const rechargeJson: ApiResponse<RechargeOrder[]> = await rechargeRes.json()
      if (!rechargeRes.ok || !rechargeJson.success || !rechargeJson.data) {
        throw new Error(rechargeJson.error || '加载充值订单失败')
      }
      setRechargeOrders(rechargeJson.data)
      
      // 加载消费订单
      const consumptionParams = new URLSearchParams()
      if (orderStatusFilter !== 'all') {
        consumptionParams.set('status', orderStatusFilter === 'paid' ? 'completed' : orderStatusFilter)
      }
      const consumptionRes = await fetch(`/api/api-consumption-orders?${consumptionParams.toString()}`, { cache: 'no-store' })
      const consumptionJson: ApiResponse<ConsumptionOrder[]> = await consumptionRes.json()
      if (!consumptionRes.ok || !consumptionJson.success || !consumptionJson.data) {
        throw new Error(consumptionJson.error || '加载消费订单失败')
      }
      setConsumptionOrders(consumptionJson.data)
    } catch (e) {
      setOrderError(e instanceof Error ? e.message : '加载失败')
    } finally {
      setIsLoadingOrders(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, orderStatusFilter])

  // 加载智能管理器状态
  const loadManagerStatus = async () => {
    try {
      setIsManagerLoading(true)
      setManagerError(null)
      const res = await fetch('/api/payment-checker-manager', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || '获取管理器状态失败')
      }
      const { running, checkInterval, managerInterval } = json.data as {
        running: boolean
        checkInterval: number
        managerInterval: number
      }
      setManagerStatus(running ? 'running' : 'stopped')
      setManagerCheckInterval(checkInterval)
      setManagerManagerInterval(managerInterval)
    } catch (e) {
      setManagerError(e instanceof Error ? e.message : '获取管理器状态失败')
      setManagerStatus('unknown')
    } finally {
      setIsManagerLoading(false)
    }
  }

  useEffect(() => {
    // 页面加载时同步一次管理器状态
    loadManagerStatus()
  }, [])

  const handleManagerAction = async (action: 'start' | 'stop' | 'restart') => {
    try {
      setIsManagerLoading(true)
      setManagerError(null)
      if (action === 'start') setManagerStatus('starting')
      if (action === 'stop') setManagerStatus('stopping')
      if (action === 'restart') setManagerStatus('restarting')

      const res = await fetch('/api/payment-checker-manager', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const json = await res.json()
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || '操作失败')
      }
      const { running, checkInterval, managerInterval } = json.data as {
        running: boolean
        checkInterval: number
        managerInterval: number
      }
      setManagerStatus(running ? 'running' : 'stopped')
      setManagerCheckInterval(checkInterval)
      setManagerManagerInterval(managerInterval)
    } catch (e) {
      setManagerError(e instanceof Error ? e.message : '操作失败')
      // 操作失败时不强行覆盖当前状态
    } finally {
      setIsManagerLoading(false)
    }
  }

  const stats = useMemo(() => {
    const total = items.length
    const active = items.filter((i) => i.status === 'active').length
    const totalBalanceTrx = items.reduce((sum, i) => sum + (Number(i.balanceMicro || 0) / 1e6), 0)
    return { total, active, totalBalanceTrx }
  }, [items])

  const getOrderDisplayStatus = (order: RechargeOrder): RechargeOrder['status'] => {
    // 如果订单状态是 pending 但已经过期，显示为 expired
    if (order.status === 'pending' && new Date(order.expires_at) < new Date()) {
      return 'expired'
    }
    return order.status
  }

  const getStatusBadge = (status: RechargeOrder['status']) => {
    const statusMap = {
      pending: { label: '进行中', variant: 'info' as const },
      paid: { label: '成功', variant: 'success' as const },
      expired: { label: '过期', variant: 'warning' as const },
      cancelled: { label: '失败', variant: 'error' as const },
    }
    const config = statusMap[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const allOrders = useMemo(() => {
    // 合并充值订单和消费订单
    const recharge: Order[] = rechargeOrders.map((o) => ({
      ...o,
      type: 'recharge' as const,
    }))
    const consumption: Order[] = consumptionOrders.map((o) => ({
      ...o,
      type: 'consumption' as const,
    }))
    return [...recharge, ...consumption].sort((a, b) => {
      const timeA = new Date(a.created_at).getTime()
      const timeB = new Date(b.created_at).getTime()
      return timeB - timeA // 最新的在前
    })
  }, [rechargeOrders, consumptionOrders])

  const filteredOrders = useMemo(() => {
    let result = allOrders
    
    if (orderStatusFilter !== 'all') {
      result = result.filter((o) => {
        if (o.type === 'recharge') {
          const displayStatus = getOrderDisplayStatus(o)
          return displayStatus === orderStatusFilter
        } else {
          // 消费订单：completed 对应 paid，failed 对应 cancelled
          if (orderStatusFilter === 'paid') return o.status === 'completed'
          if (orderStatusFilter === 'cancelled') return o.status === 'failed'
          return false
        }
      })
    }
    
    return result
  }, [allOrders, orderStatusFilter])

  // 批量删除相关状态
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [isDeleting, setIsDeleting] = useState(false)

  const toggleOrderSelection = (orderId: string, orderType: 'recharge' | 'consumption') => {
    const key = `${orderType}-${orderId}`
    setSelectedOrders((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedOrders.size === filteredOrders.length) {
      setSelectedOrders(new Set())
    } else {
      setSelectedOrders(new Set(filteredOrders.map((o) => `${o.type}-${o.id}`)))
    }
  }

  const handleBatchDelete = async () => {
    if (selectedOrders.size === 0) {
      alert('请先选择要删除的订单')
      return
    }

    if (!confirm(`确定要删除选中的 ${selectedOrders.size} 条订单吗？此操作不可恢复。`)) {
      return
    }

    try {
      setIsDeleting(true)
      const orderIds: string[] = []

      selectedOrders.forEach((key) => {
        const [, id] = key.split('-', 2)
        orderIds.push(id)
      })

      const res = await fetch('/api/orders/batch-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderIds }),
      })

      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || '删除失败')
      }

      // 清空选择并刷新订单列表
      setSelectedOrders(new Set())
      await loadOrders()
      alert(json.message || `成功删除 ${json.data?.deletedCount || 0} 条订单`)
    } catch (error) {
      alert(error instanceof Error ? error.message : '删除失败')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-white">API 用户管理</h1>
          <p className="text-sm sm:text-base text-gray-400">为外部调用（机器人）创建账号密码，并管理余额</p>
        </div>

        {/* 智能管理器运行状态卡片 */}
        <Card className="w-full md:w-80 bg-black/60 border border-gray-800 shrink-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-200">
              智能管理器运行状态
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-400">
              用于自动检测充值订单支付状态，并回调更新 API 用户余额。
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">当前状态：</span>
              <span
                className={
                  managerStatus === 'running'
                    ? 'text-xs font-medium text-emerald-400'
                    : managerStatus === 'stopped'
                    ? 'text-xs font-medium text-red-400'
                    : managerStatus === 'starting' || managerStatus === 'restarting'
                    ? 'text-xs font-medium text-sky-400'
                    : managerStatus === 'stopping'
                    ? 'text-xs font-medium text-amber-400'
                    : 'text-xs font-medium text-gray-400'
                }
              >
                {isManagerLoading
                  ? '同步中...'
                  : managerStatus === 'running'
                  ? '运行中'
                  : managerStatus === 'stopped'
                  ? '已停止'
                  : managerStatus === 'starting'
                  ? '启动中...'
                  : managerStatus === 'stopping'
                  ? '停止中...'
                  : managerStatus === 'restarting'
                  ? '重启中...'
                  : '未知'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <span>检测间隔：</span>
              <span>{managerCheckInterval ? `${managerCheckInterval / 1000} 秒` : '—'}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <span>管理器检查间隔：</span>
              <span>{managerManagerInterval ? `${managerManagerInterval / 1000} 秒` : '—'}</span>
            </div>
            {managerError && (
              <div className="text-[11px] text-red-400">
                {managerError}
              </div>
            )}
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 min-h-[44px]"
                variant="outline"
                disabled={isManagerLoading}
                onClick={() => handleManagerAction('start')}
              >
                开启
              </Button>
              <Button
                size="sm"
                className="flex-1 min-h-[44px]"
                variant="outline"
                disabled={isManagerLoading}
                onClick={() => handleManagerAction('stop')}
              >
                关闭
              </Button>
              <Button
                size="sm"
                className="flex-1 min-h-[44px]"
                variant="outline"
                disabled={isManagerLoading}
                onClick={() => handleManagerAction('restart')}
              >
                重启
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 标签页 */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              API 用户管理
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              API 用户订单
            </button>
          </div>
        </CardContent>
      </Card>

      {/* API 用户管理标签页 */}
      {activeTab === 'users' && (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="text-sm sm:text-base text-gray-400">管理 API 用户账号和余额</div>
            <Button onClick={() => setShowCreateModal(true)} className="w-full sm:w-auto min-h-[44px]">创建账号</Button>
          </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">总账号数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <p className="text-sm text-gray-500 mt-1">活跃: {stats.active}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">总余额(TRX)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalBalanceTrx.toFixed(2)}</div>
            <p className="text-sm text-gray-500 mt-1">所有 API 账号余额合计</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">鉴权方式</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white font-medium">username / password</div>
            <p className="text-sm text-gray-500 mt-1">机器人 config.txt 使用</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">说明</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">系统会用 EP001 的上游账号去请求 zhangpu.online</p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Card>
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-medium">加载失败</p>
              <p className="text-sm text-gray-400">{error}</p>
            </div>
            <Button variant="outline" onClick={load} className="min-h-[44px]">重试</Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>账号列表</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-gray-400">加载中...</div>
          ) : items.length === 0 ? (
            <div className="text-gray-400">暂无账号，请先创建一个</div>
          ) : (
            <div className="space-y-3">
              {items.map((u) => (
                <ApiUserRow key={u.id} user={u} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-black border border-gray-500 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl">创建 API 账号</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false)
                    setCreateUsername('')
                  }}
                  className="min-w-[44px] min-h-[44px]"
                >
                  ✕
                </Button>
                  </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="用户名（可选）"
                  placeholder="留空将自动生成"
                  value={createUsername}
                  onChange={(e) => setCreateUsername(e.target.value)}
                />

                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 min-h-[44px]"
                    disabled={isCreating}
                    onClick={async () => {
                      try {
                        setIsCreating(true)
                        const res = await fetch('/api/api-users', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ username: createUsername.trim() || undefined }),
                        })
                        const json: ApiResponse<CreatedApiUser> = await res.json()
                        if (!res.ok || !json.success || !json.data) throw new Error(json.error || '创建失败')

                        setCreated(json.data)
                        setShowCreateModal(false)
                        setShowCreatedModal(true)
                        setCreateUsername('')
                        await load()
                      } catch (e) {
                        setError(e instanceof Error ? e.message : '创建失败')
                      } finally {
                        setIsCreating(false)
                      }
                    }}
                  >
                    {isCreating ? '创建中...' : '创建'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 min-h-[44px]"
                    onClick={() => {
                      setShowCreateModal(false)
                      setCreateUsername('')
                    }}
                  >
                    取消
                      </Button>
                    </div>

                <div className="text-xs text-gray-500 leading-relaxed">创建后可在列表里随时查看/修改密码与余额。</div>
                      </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showCreatedModal && created && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-black border border-gray-500 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl">账号已创建</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowCreatedModal(false)
                    setCreated(null)
                  }}
                  className="min-w-[44px] min-h-[44px]"
                >
                  ✕
                </Button>
                      </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">请把以下账号密码填到机器人 config.txt：</div>

                <div className="space-y-2">
                  <div className="text-gray-400 text-sm">username</div>
                  <code className="block text-white bg-gray-900 px-3 py-2 rounded font-mono break-all">{created.username}</code>
                      </div>

                <div className="space-y-2">
                  <div className="text-gray-400 text-sm">password</div>
                  <code className="block text-white bg-gray-900 px-3 py-2 rounded font-mono break-all">{created.password}</code>
                    </div>

                <div className="space-y-2">
                  <div className="text-gray-400 text-sm">余额(TRX)</div>
                  <code className="block text-white bg-gray-900 px-3 py-2 rounded font-mono break-all">{created.balanceTrx}</code>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 min-h-[44px]"
                    onClick={async () => {
                      const text = `username=${created.username}\npassword=${created.password}`
                      try {
                        await navigator.clipboard.writeText(text)
                      } catch {
                        // ignore
                      }
                    }}
                  >
                    复制
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 min-h-[44px]"
                    onClick={() => {
                      setShowCreatedModal(false)
                      setCreated(null)
                    }}
                  >
                    关闭
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      </>
      )}

      {/* API 用户订单标签页 */}
      {activeTab === 'orders' && (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div className="text-sm sm:text-base text-gray-400">查看 API 用户的充值和消费订单</div>
            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={orderStatusFilter}
                onChange={(e) => {
                  setOrderStatusFilter(e.target.value)
                  setSelectedOrders(new Set()) // 切换筛选时清空选择
                }}
                className="flex-1 sm:flex-none px-3 py-2 bg-gray-900 border border-gray-800 rounded text-white text-sm min-h-[44px]"
              >
                <option value="all">全部状态</option>
                <option value="pending">进行中</option>
                <option value="paid">成功</option>
                <option value="expired">过期</option>
                <option value="cancelled">失败</option>
              </select>
              <Button
                variant="outline"
                onClick={handleBatchDelete}
                disabled={isDeleting || selectedOrders.size === 0}
                className="min-h-[44px] text-red-400 border-red-400/50 hover:bg-red-400/10 disabled:text-gray-500 disabled:border-gray-700 disabled:hover:bg-transparent"
              >
                {isDeleting ? '删除中...' : selectedOrders.size > 0 ? `删除选中(${selectedOrders.size})` : '批量删除'}
              </Button>
              <Button variant="outline" onClick={loadOrders} className="min-h-[44px]">刷新</Button>
            </div>
          </div>

          {orderError && (
            <Card>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-white font-medium">加载失败</p>
                  <p className="text-sm text-gray-400">{orderError}</p>
                </div>
                <Button variant="outline" onClick={loadOrders} className="min-h-[44px]">重试</Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>订单列表</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="text-gray-400">加载中...</div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-gray-400">暂无订单</div>
              ) : (
                <>
                  {/* 移动端：卡片式布局 */}
                  <div className="block md:hidden space-y-3">
                    {filteredOrders.map((order) => {
                      const orderKey = `${order.type}-${order.id}`
                      const isSelected = selectedOrders.has(orderKey)
                      return (
                      <Card key={orderKey} className={`bg-gray-900/50 border ${isSelected ? 'border-blue-500' : 'border-gray-800'}`}>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleOrderSelection(order.id, order.type)}
                                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 shrink-0 mt-1"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  {order.type === 'recharge' ? (
                                    <Badge variant="info">充值</Badge>
                                  ) : (
                                    <Badge variant="warning">
                                      {order.order_type === 'delegate_meal' ? '能量委托' : 
                                       order.order_type === 'delegate_tran' ? '交易委托' : '消费'}
                                    </Badge>
                                  )}
                                  {order.type === 'recharge' 
                                    ? getStatusBadge(getOrderDisplayStatus(order))
                                    : order.status === 'completed' 
                                    ? <Badge variant="success">成功</Badge>
                                    : <Badge variant="error">失败</Badge>}
                                </div>
                                <div className="text-xs text-gray-500">
                                  <code>{order.id.substring(0, 8)}...</code> · {order.api_username}
                                </div>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className={`font-mono font-semibold ${order.type === 'recharge' ? 'text-green-400' : 'text-red-400'}`}>
                                {order.type === 'recharge' 
                                  ? `+${Number(order.amount_trx).toFixed(2)}`
                                  : `-${Number(order.amount_trx).toFixed(2)}`} TRX
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 space-y-1 pt-2 border-t border-gray-800">
                            {order.type === 'recharge' ? (
                              <>
                                {order.payment_address && (
                                  <div>支付地址: <code className="text-xs break-all">{order.payment_address}</code></div>
                                )}
                                {order.tx_hash && (
                                  <div>
                                    <a
                                      href={`https://tronscan.org/#/transaction/${order.tx_hash}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 break-all"
                                    >
                                      交易: {order.tx_hash}
                                    </a>
                                  </div>
                                )}
                                {order.expires_at && (
                                  <div>过期: {new Date(order.expires_at).toLocaleString('zh-CN')}</div>
                                )}
                                {order.paid_at && (
                                  <div>支付: {new Date(order.paid_at).toLocaleString('zh-CN')}</div>
                                )}
                              </>
                            ) : (
                              <>
                                {order.energy && <div>能量: {order.energy}</div>}
                                {order.day !== null && <div>天数: {order.day}</div>}
                                {order.receiver_address && (
                                  <div>接收地址: <code className="text-xs break-all">{order.receiver_address}</code></div>
                                )}
                                {order.error_message && (
                                  <div className="text-red-400">错误: {order.error_message}</div>
                                )}
                              </>
                            )}
                            <div className="text-gray-500">创建: {new Date(order.created_at).toLocaleString('zh-CN')}</div>
                          </div>
                        </CardContent>
                      </Card>
                      )
                    })}
                  </div>

                  {/* 桌面端：表格布局 */}
                  <div className="hidden md:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              checked={selectedOrders.size === filteredOrders.length && filteredOrders.length > 0}
                              onChange={toggleSelectAll}
                              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                            />
                          </TableHead>
                          <TableHead>订单ID</TableHead>
                          <TableHead>API账号</TableHead>
                          <TableHead>类型</TableHead>
                          <TableHead>金额(TRX)</TableHead>
                          <TableHead>状态</TableHead>
                          <TableHead>详情</TableHead>
                          <TableHead>创建时间</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => {
                          const orderKey = `${order.type}-${order.id}`
                          const isSelected = selectedOrders.has(orderKey)
                          return (
                          <TableRow key={orderKey} className={isSelected ? 'bg-gray-800/50' : ''}>
                            <TableCell>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleOrderSelection(order.id, order.type)}
                                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                              />
                            </TableCell>
                            <TableCell>
                              <code className="text-xs">{order.id.substring(0, 8)}...</code>
                            </TableCell>
                            <TableCell>
                              <code className="text-xs">{order.api_username}</code>
                            </TableCell>
                            <TableCell>
                              {order.type === 'recharge' ? (
                                <Badge variant="info">充值</Badge>
                              ) : (
                                <Badge variant="warning">
                                  {order.order_type === 'delegate_meal' ? '能量委托' : 
                                   order.order_type === 'delegate_tran' ? '交易委托' : '消费'}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="font-mono">
                              {order.type === 'recharge' 
                                ? Number(order.amount_trx).toFixed(2)
                                : `-${Number(order.amount_trx).toFixed(2)}`}
                            </TableCell>
                            <TableCell>
                              {order.type === 'recharge' 
                                ? getStatusBadge(getOrderDisplayStatus(order))
                                : order.status === 'completed' 
                                ? <Badge variant="success">成功</Badge>
                                : <Badge variant="error">失败</Badge>}
                            </TableCell>
                            <TableCell className="text-xs text-gray-400">
                              {order.type === 'recharge' ? (
                                <div className="space-y-1">
                                  {order.payment_address && (
                                    <div>地址: <code className="text-xs">{order.payment_address.substring(0, 12)}...</code></div>
                                  )}
                                  {order.tx_hash && (
                                    <div>
                                      <a
                                        href={`https://tronscan.org/#/transaction/${order.tx_hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300"
                                      >
                                        交易: {order.tx_hash.substring(0, 12)}...
                                      </a>
                                    </div>
                                  )}
                                  {order.expires_at && (
                                    <div>过期: {new Date(order.expires_at).toLocaleString('zh-CN')}</div>
                                  )}
                                  {order.paid_at && (
                                    <div>支付: {new Date(order.paid_at).toLocaleString('zh-CN')}</div>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  {order.energy && <div>能量: {order.energy}</div>}
                                  {order.day !== null && <div>天数: {order.day}</div>}
                                  {order.receiver_address && (
                                    <div>接收: <code className="text-xs">{order.receiver_address.substring(0, 12)}...</code></div>
                                  )}
                                  {order.error_message && (
                                    <div className="text-red-400">错误: {order.error_message}</div>
                                  )}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-xs text-gray-400">
                              {new Date(order.created_at).toLocaleString('zh-CN')}
                            </TableCell>
                          </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
