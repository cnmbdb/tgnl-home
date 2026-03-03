'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ApiResponse, EnergyPool } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'

export default function EnergyPoolPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [energyPools, setEnergyPools] = useState<EnergyPool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showProviderModal, setShowProviderModal] = useState(false)
  const [selectedPool, setSelectedPool] = useState<EnergyPool | null>(null)

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailPool, setDetailPool] = useState<EnergyPool | null>(null)

  const [createName, setCreateName] = useState('')
  const [createTotal, setCreateTotal] = useState<number>(1000)
  const [isCreating, setIsCreating] = useState(false)

  const [providerBaseUrl, setProviderBaseUrl] = useState('https://zhangpu.online')
  const [providerUsername, setProviderUsername] = useState('')
  const [providerPassword, setProviderPassword] = useState('')
  const [isSavingProvider, setIsSavingProvider] = useState(false)

  const [upstreamBalanceTrx, setUpstreamBalanceTrx] = useState<number | null>(null)
  const [isLoadingUpstreamBalance, setIsLoadingUpstreamBalance] = useState(false)

  // 上游完整信息（包括成本价格）
  type UpstreamInfo = {
    energyPoolId: string
    balanceTrx: number
    upstreamUsername: string | null
    price1HourSun: number | null
    price1DaySun: number | null
    price3DaySun: number | null
    price30DaySun: number | null
    priceBishuTrx: number | null
    cost1HourTrx: number | null
    cost1DayTrx: number | null
    cost3DayTrx: number | null
    cost30DayTrx: number | null
    lastConsumptionTime: string | null
    updatedAt: string
  }
  const [upstreamInfo, setUpstreamInfo] = useState<UpstreamInfo | null>(null)
  const [isLoadingUpstreamInfo, setIsLoadingUpstreamInfo] = useState(false)
  const [isRefreshingUpstreamInfo, setIsRefreshingUpstreamInfo] = useState(false)

  // 下游成本配置
  type DownstreamPricing = {
    energyPoolId: string
    cost1HourTrx: number
    cost1DayTrx: number
    cost3DayTrx: number
    cost30DayTrx: number
    costBishuTrx: number
    autoFollowUpstream?: boolean
    updatedAt: string | null
  }
  const [showDownstreamPricingModal, setShowDownstreamPricingModal] = useState(false)
  const [downstreamPricing, setDownstreamPricing] = useState<DownstreamPricing | null>(null)
  const [isSavingDownstreamPricing, setIsSavingDownstreamPricing] = useState(false)
  const [dsCost1Hour, setDsCost1Hour] = useState('')
  const [dsCost1Day, setDsCost1Day] = useState('')
  const [dsCost3Day, setDsCost3Day] = useState('')
  const [dsCost30Day, setDsCost30Day] = useState('')
  const [dsCostBishu, setDsCostBishu] = useState('')
  const [autoFollowUpstream, setAutoFollowUpstream] = useState(false)

  // 额外统计（今日分配等）
  type ExtraStats = {
    todayAllocations: number
    todayEnergy: number
  }
  const [extraStats, setExtraStats] = useState<ExtraStats | null>(null)

  // 上游 API 余额扣费相关订单记录（使用本系统记录的消费订单）
  type UpstreamConsumptionOrder = {
    id: string
    apiUsername: string
    orderType: string
    amountTrx: string
    energy: number | null
    day: number | null
    receiverAddress: string | null
    status: string
    createdAt: string
  }
  const [upstreamOrders, setUpstreamOrders] = useState<UpstreamConsumptionOrder[]>([])
  const [isLoadingUpstreamOrders, setIsLoadingUpstreamOrders] = useState(false)

  const loadEnergyPools = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const res = await fetch('/api/energy-pool', { cache: 'no-store' })
      const json: ApiResponse<EnergyPool[]> = await res.json()
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || '获取能量池列表失败')
      }
      setEnergyPools(json.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : '获取能量池列表失败')
    } finally {
      setIsLoading(false)
    }
  }

  const loadUpstreamBalance = async () => {
    try {
      setIsLoadingUpstreamBalance(true)
      const res = await fetch('/api/energy-pool/upstream-balance?energyPoolId=EP001', { cache: 'no-store' })
      const json: ApiResponse<{ balanceTrx: number }> = await res.json()
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || '获取上游余额失败')
      }
      setUpstreamBalanceTrx(json.data.balanceTrx)
    } catch {
      setUpstreamBalanceTrx(null)
    } finally {
      setIsLoadingUpstreamBalance(false)
    }
  }

  // 加载上游完整信息（从数据库缓存）
  const loadUpstreamInfo = async () => {
    try {
      setIsLoadingUpstreamInfo(true)
      const res = await fetch('/api/energy-pool/upstream-info?energyPoolId=EP001', { cache: 'no-store' })
      const json: ApiResponse<UpstreamInfo> = await res.json()
      if (res.ok && json.success && json.data) {
        setUpstreamInfo(json.data)
        setUpstreamBalanceTrx(json.data.balanceTrx)
      }
    } catch {
      // 静默失败
    } finally {
      setIsLoadingUpstreamInfo(false)
    }
  }

  // 刷新上游信息（从上游 API 查询并保存）
  const refreshUpstreamInfo = async () => {
    try {
      setIsRefreshingUpstreamInfo(true)
      const res = await fetch('/api/energy-pool/upstream-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ energyPoolId: 'EP001' }),
      })
      const json: ApiResponse<UpstreamInfo> = await res.json()
      if (res.ok && json.success && json.data) {
        setUpstreamInfo(json.data)
        setUpstreamBalanceTrx(json.data.balanceTrx)
        // 如果跟随开关开启，重新加载下游成本配置（可能已自动更新）
        if (autoFollowUpstream) {
          await loadDownstreamPricing('EP001')
        }
      } else {
        setError(json.error || '刷新上游信息失败')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '刷新上游信息失败')
    } finally {
      setIsRefreshingUpstreamInfo(false)
    }
  }

  // 加载下游成本配置
  const loadDownstreamPricing = async (energyPoolId: string) => {
    try {
      const res = await fetch(`/api/energy-pool/downstream-pricing?energyPoolId=${energyPoolId}`, { cache: 'no-store' })
      const json: ApiResponse<DownstreamPricing> = await res.json()
      if (res.ok && json.success && json.data) {
        setDownstreamPricing(json.data)
        setDsCost1Hour(json.data.cost1HourTrx?.toString() || '')
        setDsCost1Day(json.data.cost1DayTrx?.toString() || '')
        setDsCost3Day(json.data.cost3DayTrx?.toString() || '')
        setDsCost30Day(json.data.cost30DayTrx?.toString() || '')
        setDsCostBishu(json.data.costBishuTrx?.toString() || '')
        setAutoFollowUpstream(json.data.autoFollowUpstream || false)
      }
    } catch {
      // 静默失败
    }
  }

  // 应用跟随上游价格（上游价格 + 0.1 TRX）
  const applyFollowUpstream = () => {
    if (upstreamInfo) {
      const margin = 0.1 // 固定加价 0.1 TRX
      setDsCost1Hour((upstreamInfo.cost1HourTrx ? (upstreamInfo.cost1HourTrx + margin).toFixed(2) : ''))
      setDsCost1Day((upstreamInfo.cost1DayTrx ? (upstreamInfo.cost1DayTrx + margin).toFixed(2) : ''))
      setDsCost3Day((upstreamInfo.cost3DayTrx ? (upstreamInfo.cost3DayTrx + margin).toFixed(2) : ''))
      setDsCost30Day((upstreamInfo.cost30DayTrx ? (upstreamInfo.cost30DayTrx + margin).toFixed(2) : ''))
      setDsCostBishu((upstreamInfo.priceBishuTrx ? (upstreamInfo.priceBishuTrx + margin).toFixed(2) : ''))
    }
  }

  // 保存下游成本配置
  const saveDownstreamPricing = async (energyPoolId: string) => {
    try {
      setIsSavingDownstreamPricing(true)
      setError(null)
      
      // 如果开启跟随，自动计算价格
      let finalCost1Hour = parseFloat(dsCost1Hour) || 0
      let finalCost1Day = parseFloat(dsCost1Day) || 0
      let finalCost3Day = parseFloat(dsCost3Day) || 0
      let finalCost30Day = parseFloat(dsCost30Day) || 0
      let finalCostBishu = parseFloat(dsCostBishu) || 0
      
      if (autoFollowUpstream && upstreamInfo) {
        const margin = 0.1
        finalCost1Hour = upstreamInfo.cost1HourTrx ? upstreamInfo.cost1HourTrx + margin : 0
        finalCost1Day = upstreamInfo.cost1DayTrx ? upstreamInfo.cost1DayTrx + margin : 0
        finalCost3Day = upstreamInfo.cost3DayTrx ? upstreamInfo.cost3DayTrx + margin : 0
        finalCost30Day = upstreamInfo.cost30DayTrx ? upstreamInfo.cost30DayTrx + margin : 0
        finalCostBishu = upstreamInfo.priceBishuTrx ? upstreamInfo.priceBishuTrx + margin : 0
      }
      
      const res = await fetch('/api/energy-pool/downstream-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          energyPoolId,
          cost1HourTrx: finalCost1Hour,
          cost1DayTrx: finalCost1Day,
          cost3DayTrx: finalCost3Day,
          cost30DayTrx: finalCost30Day,
          costBishuTrx: finalCostBishu,
          autoFollowUpstream,
        }),
      })
      const json: ApiResponse<DownstreamPricing> = await res.json()
      if (res.ok && json.success && json.data) {
        setDownstreamPricing(json.data)
        setShowDownstreamPricingModal(false)
      } else {
        setError(json.error || '保存失败')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存失败')
    } finally {
      setIsSavingDownstreamPricing(false)
    }
  }

  const stats = useMemo(() => {
    const total = energyPools.length
    const active = energyPools.filter((p) => p.status === 'active').length
    const totalCapacity = energyPools.reduce((sum, p) => sum + p.total, 0)
    const usedCapacity = energyPools.reduce((sum, p) => sum + p.usage, 0)

    return {
      total,
      active,
      totalCapacity,
      usedCapacity,
    }
  }, [energyPools])

  const loadExtraStats = async () => {
    try {
      const res = await fetch('/api/energy-pool/stats', { cache: 'no-store' })
      const json: ApiResponse<ExtraStats> = await res.json()
      if (res.ok && json.success && json.data) {
        setExtraStats(json.data)
      }
    } catch {
      // 静默失败，不影响主流程
    }
  }

  const loadUpstreamOrders = async () => {
    try {
      setIsLoadingUpstreamOrders(true)
      const res = await fetch('/api/energy-pool/upstream-consumption-history?limit=5', { cache: 'no-store' })
      const json: ApiResponse<UpstreamConsumptionOrder[]> = await res.json()
      if (res.ok && json.success && json.data) {
        setUpstreamOrders(json.data)
      }
    } catch {
      // 静默失败，不影响主流程
    } finally {
      setIsLoadingUpstreamOrders(false)
    }
  }

  useEffect(() => {
    loadEnergyPools()
    loadUpstreamInfo()
    loadDownstreamPricing('EP001')
    loadExtraStats()
    loadUpstreamOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">能量池管理</h1>
          <p className="text-gray-400">管理和监控能量池资源</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">批量操作</Button>
          <Button onClick={() => setShowCreateModal(true)}>创建能量池</Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">
              总能量池数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <p className="text-sm text-gray-500 mt-1">活跃: {stats.active}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">
              总容量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalCapacity.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">已使用: {Math.round(stats.usedCapacity).toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">
              平均使用率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {stats.totalCapacity > 0 ? Math.round((stats.usedCapacity / stats.totalCapacity) * 100) : 0}%
            </div>
            <p className="text-sm text-gray-500 mt-1">所有能量池实时整体使用率</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">
              今日分配
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {extraStats?.todayAllocations ?? 0}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              今日已完成消费订单数，能量合计：{extraStats ? extraStats.todayEnergy : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input placeholder="搜索能量池..." />
            <Select
              options={[
                { value: 'all', label: '全部状态' },
                { value: 'active', label: '活跃' },
                { value: 'inactive', label: '未激活' },
              ]}
              defaultValue="all"
            />
            <Select
              options={[
                { value: 'all', label: '全部类型' },
                { value: 'standard', label: '标准' },
                { value: 'premium', label: '高级' },
              ]}
              defaultValue="all"
            />
            <Button variant="outline">重置筛选</Button>
          </div>
        </CardContent>
      </Card>

      {/* 数据状态 */}
      {error && (
        <Card>
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-medium">加载失败</p>
              <p className="text-sm text-gray-400">{error}</p>
            </div>
            <Button variant="outline" onClick={loadEnergyPools}>
              重试
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <Card>
          <CardContent className="p-8 text-gray-400">正在加载能量池...</CardContent>
        </Card>
      ) : (
        <>
          {energyPools.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-gray-400">暂无能量池数据</CardContent>
            </Card>
          ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {energyPools.map((pool) => (
          <Card key={pool.id} hover>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{pool.name}</CardTitle>
                <Badge variant={pool.status === 'active' ? 'success' : 'default'}>
                  {pool.status === 'active' ? '活跃' : '未激活'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
          <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-400">API余额</span>
                          <span className="text-white">
                            {upstreamBalanceTrx !== null
                              ? `${upstreamBalanceTrx.toFixed(2)} TRX`
                              : isLoadingUpstreamBalance
                                ? '加载中...'
                                : '获取失败'}
                          </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{
                              width:
                                upstreamBalanceTrx !== null
                                  ? `${Math.min(100, Math.max(0, (upstreamBalanceTrx / 500) * 100))}%`
                                  : '0%',
                            }}
                    />
                  </div>
                        <div className="text-xs text-gray-400 mt-1 text-right">总容量: 500 TRX</div>
                </div>
                {/* 上游成本价格（仅 EP001） */}
                {pool.id === 'EP001' && upstreamInfo && (
                  <div className="border-t border-gray-800 pt-3 mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">上游成本价（TRX）</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={refreshUpstreamInfo}
                        disabled={isRefreshingUpstreamInfo}
                        className="text-xs py-0 px-2 h-6"
                      >
                        {isRefreshingUpstreamInfo ? '刷新中...' : '刷新上游'}
                      </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-xs">
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">1小时</div>
                        <div className="text-white font-medium">
                          {upstreamInfo.cost1HourTrx?.toFixed(2) ?? '-'}
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">1天</div>
                        <div className="text-white font-medium">
                          {upstreamInfo.cost1DayTrx?.toFixed(2) ?? '-'}
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">3天</div>
                        <div className="text-white font-medium">
                          {upstreamInfo.cost3DayTrx?.toFixed(2) ?? '-'}
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">30天</div>
                        <div className="text-white font-medium">
                          {upstreamInfo.cost30DayTrx?.toFixed(2) ?? '-'}
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">笔数</div>
                        <div className="text-white font-medium">
                          {upstreamInfo.priceBishuTrx?.toFixed(2) ?? '-'}
                        </div>
                      </div>
                    </div>
                    {upstreamInfo.updatedAt && (
                      <div className="text-xs text-gray-500 mt-2 text-right">
                        更新时间: {new Date(upstreamInfo.updatedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}
                {pool.id === 'EP001' && !upstreamInfo && !isLoadingUpstreamInfo && (
                  <div className="border-t border-gray-800 pt-3 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={refreshUpstreamInfo}
                      disabled={isRefreshingUpstreamInfo}
                      className="w-full text-xs"
                    >
                      {isRefreshingUpstreamInfo ? '获取中...' : '获取上游成本信息'}
                    </Button>
                  </div>
                )}

                {/* 上游扣费相关订单记录（仅 EP001，用本系统消费订单近几条代表） */}
                {pool.id === 'EP001' && (
                  <div className="border-t border-gray-800 pt-3 mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">上游 API 余额扣费记录（本系统触发）</span>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isLoadingUpstreamOrders}
                        onClick={loadUpstreamOrders}
                        className="text-xs py-0 px-2 h-6"
                      >
                        {isLoadingUpstreamOrders ? '加载中...' : '刷新记录'}
                      </Button>
                    </div>
                    {isLoadingUpstreamOrders && upstreamOrders.length === 0 ? (
                      <div className="text-xs text-gray-500">加载中...</div>
                    ) : upstreamOrders.length === 0 ? (
                      <div className="text-xs text-gray-500">暂无扣费记录</div>
                    ) : (
                      <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                        {upstreamOrders.map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center justify-between text-xs text-gray-300 border border-gray-800 rounded px-2 py-1"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <span className="font-mono truncate">{order.apiUsername}</span>
                                <span className="text-[10px] text-gray-500">{order.orderType}</span>
                              </div>
                              <div className="text-[10px] text-gray-500">
                                {new Date(order.createdAt).toLocaleString()}
                              </div>
                            </div>
                            <div className="text-right ml-2">
                              <div className="text-xs text-white font-medium">{order.amountTrx} TRX</div>
                              <div className="text-[10px] text-gray-500">
                                {order.energy ? `${order.energy} 能量` : ''}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setDetailPool(pool)
                            setShowDetailModal(true)
                          }}
                        >
                    详情
                  </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedPool(pool)
                            // 加载已保存的配置（如果密码已保存，显示占位符，不显示真实密码）
                            setProviderBaseUrl(pool.providerBaseUrl || 'https://zhangpu.online')
                            setProviderUsername(pool.providerUsername || '')
                            // 如果密码已保存，显示占位符提示用户重新输入（安全考虑）
                            setProviderPassword(pool.providerPassword ? '••••••••' : '')
                            setShowProviderModal(true)
                          }}
                        >
                          配置上游
                  </Button>
                </div>
                {pool.id === 'EP001' && (
                  <div className="border-t border-gray-800 pt-3 mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">下游 API 调用成本（TRX）</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedPool(pool)
                          loadDownstreamPricing(pool.id)
                          setShowDownstreamPricingModal(true)
                        }}
                        className="text-xs py-0 px-2 h-6"
                      >
                        设置成本
                      </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-xs">
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">1小时</div>
                        <div className="text-white font-medium">
                          {downstreamPricing?.cost1HourTrx != null ? Number(downstreamPricing.cost1HourTrx).toFixed(2) : '-'}
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">1天</div>
                        <div className="text-white font-medium">
                          {downstreamPricing?.cost1DayTrx != null ? Number(downstreamPricing.cost1DayTrx).toFixed(2) : '-'}
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">3天</div>
                        <div className="text-white font-medium">
                          {downstreamPricing?.cost3DayTrx != null ? Number(downstreamPricing.cost3DayTrx).toFixed(2) : '-'}
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">30天</div>
                        <div className="text-white font-medium">
                          {downstreamPricing?.cost30DayTrx != null ? Number(downstreamPricing.cost30DayTrx).toFixed(2) : '-'}
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded p-2 text-center">
                        <div className="text-gray-500">笔数</div>
                        <div className="text-white font-medium">
                          {downstreamPricing?.costBishuTrx != null ? Number(downstreamPricing.costBishuTrx).toFixed(2) : '-'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
          )}

      {/* 列表视图 */}
      <Card>
        <CardHeader>
          <CardTitle>能量池列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>名称</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>使用率</TableHead>
                <TableHead>总容量</TableHead>
                <TableHead>已使用</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>更新时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {energyPools.map((pool) => (
                <TableRow key={pool.id}>
                  <TableCell className="font-mono text-xs">{pool.id}</TableCell>
                  <TableCell className="font-medium">{pool.name}</TableCell>
                  <TableCell>
                    <Badge variant={pool.status === 'active' ? 'success' : 'default'}>
                      {pool.status === 'active' ? '活跃' : '未激活'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-800 rounded-full h-1.5">
                        <div
                          className="bg-white h-1.5 rounded-full"
                              style={{ width: `${Math.min(100, Math.max(0, Math.round((pool.usage / pool.total) * 100)))}%` }}
                        />
                      </div>
                          <span className="text-xs">{Math.round((pool.usage / pool.total) * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{pool.total}</TableCell>
                      <TableCell>{pool.usage}</TableCell>
                      <TableCell className="text-gray-400 text-xs">
                        {new Date(pool.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-gray-400 text-xs">
                        {new Date(pool.updatedAt).toLocaleDateString()}
                      </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setDetailPool(pool)
                              setShowDetailModal(true)
                            }}
                          >
                            详情
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedPool(pool)
                              setProviderBaseUrl(pool.providerBaseUrl || 'https://zhangpu.online')
                              setProviderUsername(pool.providerUsername || '')
                              setProviderPassword(pool.providerPassword || '')
                              setShowProviderModal(true)
                            }}
                          >
                            配置上游
                          </Button>
                      <Button size="sm" variant="outline">删除</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        </>
      )}

      {/* 详情模态框 */}
      {showDetailModal && detailPool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg bg-black border border-gray-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>能量池详情</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowDetailModal(false)
                    setDetailPool(null)
                  }}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-400">名称</div>
                  <div className="text-white font-medium">{detailPool.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">ID</div>
                    <div className="text-white font-mono">{detailPool.id}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">状态</div>
                    <div>
                      <Badge variant={detailPool.status === 'active' ? 'success' : 'default'}>
                        {detailPool.status === 'active' ? '活跃' : '未激活'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">总容量</div>
                    <div className="text-white">{detailPool.total}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">已使用</div>
                    <div className="text-white">{detailPool.usage}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">使用率</div>
                    <div className="text-white">
                      {detailPool.total > 0 ? Math.round((detailPool.usage / detailPool.total) * 100) : 0}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">上游状态</div>
                    <div className="text-white">
                      {detailPool.providerUsername ? '已配置' : '未配置'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">创建时间</div>
                    <div className="text-white">{new Date(detailPool.createdAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">更新时间</div>
                    <div className="text-white">{new Date(detailPool.updatedAt).toLocaleString()}</div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 space-y-3 text-sm">
                  <div className="text-gray-400">上游配置</div>
                  <div>
                    <div className="text-gray-400">Base URL</div>
                    <div className="text-white break-all">{detailPool.providerBaseUrl || 'https://zhangpu.online'}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400">账号</div>
                      <div className="text-white">{detailPool.providerUsername || '-'}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">密码</div>
                      <div className="text-white">{detailPool.providerPassword ? '已设置' : '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowDetailModal(false)
                      setDetailPool(null)
                    }}
                  >
                    关闭
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setShowDetailModal(false)
                      setDetailPool(null)
                      setSelectedPool(detailPool)
                      setProviderBaseUrl(detailPool.providerBaseUrl || 'https://zhangpu.online')
                      setProviderUsername(detailPool.providerUsername || '')
                      setProviderPassword(detailPool.providerPassword || '')
                      setShowProviderModal(true)
                    }}
                  >
                    去配置上游
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 上游配置模态框 */}
      {showProviderModal && selectedPool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-black border border-gray-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>配置上游能量池</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowProviderModal(false)
                    setSelectedPool(null)
                    setProviderBaseUrl('https://zhangpu.online')
                    setProviderUsername('')
                    setProviderPassword('')
                  }}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  当前能量池：<span className="text-white font-medium">{selectedPool.name}</span>
                </div>

                <Input
                  label="上游 Base URL"
                  placeholder="https://zhangpu.online"
                  value={providerBaseUrl}
                  onChange={(e) => setProviderBaseUrl(e.target.value)}
                />
                <Input
                  label="账号"
                  placeholder="例如：hf2333"
                  value={providerUsername}
                  onChange={(e) => setProviderUsername(e.target.value)}
                />
                <Input
                  label="密码"
                  type="password"
                  placeholder="请输入密码"
                  value={providerPassword}
                  onChange={(e) => setProviderPassword(e.target.value)}
                />

                <div className="flex space-x-2 pt-4">
                  <Button
                    className="flex-1"
                    disabled={isSavingProvider}
                    onClick={async () => {
                      try {
                        setIsSavingProvider(true)
                        setError(null)

                        // 如果密码是占位符（••••••••），说明用户没有修改密码，需要从数据库读取原密码
                        let finalPassword = providerPassword
                        if (providerPassword === '••••••••' && selectedPool.providerPassword) {
                          // 使用已保存的密码，不更新
                          finalPassword = selectedPool.providerPassword
                        }
                        
                        // 如果密码为空且之前也没有配置，则报错
                        if (!finalPassword || finalPassword.trim() === '') {
                          throw new Error('请输入上游服务密码')
                        }

                        const res = await fetch('/api/energy-pool/provider', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            energyPoolId: selectedPool.id,
                            providerType: 'zhangpu',
                            baseUrl: providerBaseUrl.trim() || 'https://zhangpu.online',
                            username: providerUsername.trim(),
                            password: finalPassword,
                          }),
                        })

                        const json: ApiResponse<null> = await res.json()
                        if (!res.ok || !json.success) {
                          throw new Error(json.error || '保存上游配置失败')
                        }

                        setShowProviderModal(false)
                        setSelectedPool(null)
                        await loadEnergyPools()
                      } catch (e) {
                        setError(e instanceof Error ? e.message : '保存上游配置失败')
                      } finally {
                        setIsSavingProvider(false)
                      }
                    }}
                  >
                    {isSavingProvider ? '保存中...' : '保存'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowProviderModal(false)
                      setSelectedPool(null)
                    }}
                  >
                    取消
                  </Button>
                </div>

                <div className="text-xs text-gray-500 leading-relaxed">
                  说明：机器人将请求你的系统 <span className="text-gray-300">/v1/*</span> 接口，系统再转发到上游。
                  当前实现为明文保存账号密码，后续可升级为加密存储。
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 下游成本配置模态框 */}
      {showDownstreamPricingModal && selectedPool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-black border border-gray-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>设置下游 API 调用成本</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowDownstreamPricingModal(false)
                    setSelectedPool(null)
                  }}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  当前能量池：<span className="text-white font-medium">{selectedPool.name}</span>
                </div>
                <div className="text-xs text-gray-500">
                  设置后，下游 API 用户调用本能量池接口时会按对应成本扣除余额
                </div>

                {/* 跟随上游开关 */}
                <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">动态跟随上游成本价格</div>
                    <div className="text-xs text-gray-400 mt-1">
                      开启后，下游成本将自动设置为：上游成本 + 0.1 TRX
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoFollowUpstream}
                      onChange={(e) => {
                        const checked = e.target.checked
                        setAutoFollowUpstream(checked)
                        if (checked) {
                          applyFollowUpstream()
                        }
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="1小时成本 (TRX)"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={dsCost1Hour}
                    onChange={(e) => setDsCost1Hour(e.target.value)}
                    disabled={autoFollowUpstream}
                    className={autoFollowUpstream ? 'opacity-60 cursor-not-allowed' : ''}
                  />
                  <Input
                    label="1天成本 (TRX)"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={dsCost1Day}
                    onChange={(e) => setDsCost1Day(e.target.value)}
                    disabled={autoFollowUpstream}
                    className={autoFollowUpstream ? 'opacity-60 cursor-not-allowed' : ''}
                  />
                  <Input
                    label="3天成本 (TRX)"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={dsCost3Day}
                    onChange={(e) => setDsCost3Day(e.target.value)}
                    disabled={autoFollowUpstream}
                    className={autoFollowUpstream ? 'opacity-60 cursor-not-allowed' : ''}
                  />
                  <Input
                    label="30天成本 (TRX)"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={dsCost30Day}
                    onChange={(e) => setDsCost30Day(e.target.value)}
                    disabled={autoFollowUpstream}
                    className={autoFollowUpstream ? 'opacity-60 cursor-not-allowed' : ''}
                  />
                  <Input
                    label="笔数成本 (TRX)"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={dsCostBishu}
                    onChange={(e) => setDsCostBishu(e.target.value)}
                    disabled={autoFollowUpstream}
                    className={autoFollowUpstream ? 'opacity-60 cursor-not-allowed' : ''}
                  />
                </div>
                {autoFollowUpstream && (
                  <div className="text-xs text-blue-400 bg-blue-900/20 p-2 rounded border border-blue-800">
                    💡 已开启跟随模式，成本价格将自动计算（上游价格 + 0.1 TRX）
                  </div>
                )}

                <div className="flex space-x-2 pt-4">
                  <Button
                    className="flex-1"
                    disabled={isSavingDownstreamPricing}
                    onClick={() => saveDownstreamPricing(selectedPool.id)}
                  >
                    {isSavingDownstreamPricing ? '保存中...' : '保存'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowDownstreamPricingModal(false)
                      setSelectedPool(null)
                    }}
                  >
                    取消
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 创建模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-black border border-gray-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>创建能量池</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false)
                    setCreateName('')
                    setCreateTotal(1000)
                  }}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="能量池名称"
                  placeholder="输入能量池名称"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                />
                <Input
                  label="总容量"
                  type="number"
                  placeholder="1000"
                  value={String(createTotal)}
                  onChange={(e) => setCreateTotal(Number(e.target.value || 0))}
                />

                <div className="flex space-x-2 pt-4">
                  <Button
                    className="flex-1"
                    disabled={isCreating}
                    onClick={async () => {
                      try {
                        setIsCreating(true)
                        setError(null)

                        const res = await fetch('/api/energy-pool', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            name: createName.trim() || undefined,
                            total: createTotal || 1000,
                          }),
                        })

                        const json: ApiResponse<EnergyPool> = await res.json()
                        if (!res.ok || !json.success || !json.data) {
                          throw new Error(json.error || '创建能量池失败')
                        }

                        setShowCreateModal(false)
                        setCreateName('')
                        setCreateTotal(1000)
                        await loadEnergyPools()
                      } catch (e) {
                        setError(e instanceof Error ? e.message : '创建能量池失败')
                      } finally {
                        setIsCreating(false)
                      }
                    }}
                  >
                    {isCreating ? '创建中...' : '创建'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowCreateModal(false)
                      setCreateName('')
                      setCreateTotal(1000)
                    }}
                  >
                    取消
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
