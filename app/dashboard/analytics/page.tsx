'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type AnalyticsStats = {
  range: string
  activeUsers: {
    current: number
    previous: number
    growth: string
  }
  orders: {
    total: number
    previous: number
    growth: string
    recharge: {
      count: number
      amount: string
      completed: number
    }
    consumption: {
      count: number
      amount: string
      completed: number
    }
  }
  dailyTrend: Array<{
    date: string
    rechargeCount: number
    consumptionCount: number
    rechargeAmount: string
    consumptionAmount: string
  }>
}

export default function AnalyticsPage() {
  const timeRanges = [
    { key: 'today', label: '今日' },
    { key: 'week', label: '本周' },
    { key: 'month', label: '本月' },
    { key: 'year', label: '本年' },
  ]
  const [selectedRange, setSelectedRange] = useState('month')
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/analytics/stats?range=${selectedRange}`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange])

  const rangeLabel = timeRanges.find((r) => r.key === selectedRange)?.label || '本月'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-white">数据分析</h1>
          <p className="text-sm text-gray-400">系统使用统计和趋势分析</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {typeof window !== 'undefined' ? lastUpdate.toLocaleTimeString('zh-CN', { hour12: false }) : ''}
          </span>
          <Button size="sm" onClick={fetchStats} disabled={loading} className="min-h-[44px]">
            {loading ? '刷新中...' : '刷新'}
          </Button>
        </div>
      </div>

      {/* 时间范围选择 */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range.key}
                variant={selectedRange === range.key ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedRange(range.key)}
                className="min-h-[44px]"
              >
                {range.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {loading && !stats ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">加载中...</div>
        </div>
      ) : (
        <>
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  活跃用户
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stats?.activeUsers.current || 0}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {stats?.activeUsers.growth || '0%'} 较上{rangeLabel === '今日' ? '日' : rangeLabel === '本周' ? '周' : rangeLabel === '本月' ? '月' : '年'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  总订单数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stats?.orders.total || 0}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {stats?.orders.growth || '0%'} 较上{rangeLabel === '今日' ? '日' : rangeLabel === '本周' ? '周' : rangeLabel === '本月' ? '月' : '年'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  充值订单
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stats?.orders.recharge.count || 0}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  已完成: {stats?.orders.recharge.completed || 0}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  金额: {stats?.orders.recharge.amount || '0.00'} TRX
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  消费订单
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stats?.orders.consumption.count || 0}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  已完成: {stats?.orders.consumption.completed || 0}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  金额: {stats?.orders.consumption.amount || '0.00'} TRX
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 每日趋势（最近30天） */}
          {stats?.dailyTrend && stats.dailyTrend.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>每日订单趋势（最近30天）</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {stats.dailyTrend.map((day) => (
                    <div
                      key={day.date}
                      className="flex items-center justify-between py-2 px-3 border border-gray-800 rounded-lg hover:bg-gray-900/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white">
                          {new Date(day.date).toLocaleDateString('zh-CN', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          充值: {day.rechargeCount} 单 ({day.rechargeAmount} TRX) · 
                          消费: {day.consumptionCount} 单 ({day.consumptionAmount} TRX)
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-sm font-medium text-white">
                          {day.rechargeCount + day.consumptionCount} 单
                        </div>
                        <div className="text-xs text-gray-500">
                          {(parseFloat(day.rechargeAmount) + parseFloat(day.consumptionAmount)).toFixed(2)} TRX
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
