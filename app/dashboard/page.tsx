'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

type DashboardStats = {
  apiUsers: {
    total: number
    active: number
    totalBalanceTrx: string
  }
  bots: {
    total: number
  }
  todayRecharge: {
    count: number
    totalAmount: string
    completedCount: number
    completedAmount: string
  }
  todayConsumption: {
    count: number
    totalAmount: string
  }
  recentOrders: Array<{
    id: string
    apiUsername: string
    amountTrx: string
    status: string
    orderType: string
    createdAt: string
  }>
  systemStatus: {
    database: string
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/dashboard/stats')
      const data = await res.json()
      if (data.success) {
        setStats(data.data)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error('获取统计数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    // 每30秒自动刷新
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes} 分钟前`
    if (hours < 24) return `${hours} 小时前`
    return `${days} 天前`
  }

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">加载中...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-white">仪表板</h1>
          <p className="text-sm text-gray-400">系统概览和统计数据</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {typeof window !== 'undefined' ? lastUpdate.toLocaleTimeString('zh-CN', { hour12: false }) : ''}
          </span>
          <Button size="sm" onClick={fetchStats} disabled={loading}>
            {loading ? '刷新中...' : '刷新'}
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              API 用户
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {stats?.apiUsers.total || 0}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              活跃: {stats?.apiUsers.active || 0}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              总余额: {stats?.apiUsers.totalBalanceTrx || '0.00'} TRX
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              机器人数量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {stats?.bots.total || 0}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              已注册机器人
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              今日充值
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {stats?.todayRecharge.count || 0}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              已完成: {stats?.todayRecharge.completedCount || 0}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              金额: {stats?.todayRecharge.completedAmount || '0.00'} TRX
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              今日消费
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {stats?.todayConsumption.count || 0}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              消费订单数
            </p>
            <p className="text-xs text-gray-600 mt-1">
              金额: {stats?.todayConsumption.totalAmount || '0.00'} TRX
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 最近订单和系统状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>最近消费订单</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.recentOrders && stats.recentOrders.filter((o) => o.orderType === 'consumption').length > 0 ? (
              <div className="space-y-3">
                {stats.recentOrders
                  .filter((order) => order.orderType === 'consumption')
                  .map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between py-2 px-3 border border-gray-800 rounded-lg hover:bg-gray-900/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white truncate">
                            {order.apiUsername}
                          </span>
                          <Badge variant="warning" className="text-xs">
                            消费
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatTime(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <span className="text-sm font-medium text-white">
                          {order.amountTrx} TRX
                        </span>
                        <Badge
                          variant={
                            order.status === 'completed'
                              ? 'success'
                              : order.status === 'pending'
                              ? 'warning'
                              : 'error'
                          }
                          className="text-xs"
                        >
                          {order.status === 'completed'
                            ? '已完成'
                            : order.status === 'pending'
                            ? '待处理'
                            : '失败'}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">暂无消费订单记录</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>系统状态</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">数据库</span>
                <Badge
                  variant={stats?.systemStatus.database === 'normal' ? 'success' : 'error'}
                >
                  {stats?.systemStatus.database === 'normal' ? '正常' : '异常'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
