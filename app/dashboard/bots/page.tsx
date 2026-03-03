'use client'

import { useEffect, useMemo, useState } from 'react'
import type { ApiResponse } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ServerIcon, BotIcon, ClockIcon, HashIcon } from '@/components/ui/Icons' // Assuming these icons exist

// Data structure from our new API endpoint
type BotInfo = {
  apiUsername: string
  botUsername: string | null
  isOfficial: boolean | null  // null = 未知(未上传配置), true = 官方, false = 盗版
}

type ServerActivity = {
  ip: string
  remark?: string | null
  lastSeen: string
  calls: number
  calls24h: number
  bots: BotInfo[]
}

// 机器人配置信息
type BotConfig = {
  botUsername: string
  apiUsername: string | null
  configContent: string
  updatedAt: string
}

export default function BotsPage() {
  const [servers, setServers] = useState<ServerActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // 折叠状态：key 是服务器 IP，value 是是否展开
  const [expandedServers, setExpandedServers] = useState<Record<string, boolean>>({})
  
  // 配置详情弹窗状态
  const [configModal, setConfigModal] = useState<{ open: boolean; config: BotConfig | null; loading: boolean; error: string | null }>({
    open: false,
    config: null,
    loading: false,
    error: null
  })

  // 新增服务器配置弹窗
  const [serverModal, setServerModal] = useState<{ open: boolean; ip: string; remark: string; purgeLogsOnDelete: boolean; saving: boolean; error: string | null }>({
    open: false,
    ip: '',
    remark: '',
    purgeLogsOnDelete: false,
    saving: false,
    error: null,
  })

  // 切换服务器展开/折叠状态
  const toggleServer = (ip: string) => {
    setExpandedServers(prev => ({
      ...prev,
      [ip]: !prev[ip]
    }))
  }

  // 加载机器人配置
  const loadBotConfig = async (botUsername: string) => {
    setConfigModal({ open: true, config: null, loading: true, error: null })
    try {
      const res = await fetch(`/api/bots/config?botUsername=${encodeURIComponent(botUsername)}`, { cache: 'no-store' })
      const json: ApiResponse<BotConfig> = await res.json()
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || '获取配置失败')
      }
      setConfigModal({ open: true, config: json.data, loading: false, error: null })
    } catch (e) {
      setConfigModal({ open: true, config: null, loading: false, error: e instanceof Error ? e.message : '获取配置失败' })
    }
  }

  const closeConfigModal = () => {
    setConfigModal({ open: false, config: null, loading: false, error: null })
  }

  const loadServerActivity = async () => {
    try {
      setError(null)
      setIsLoading(true)
      const res = await fetch('/api/bots/servers', { cache: 'no-store' })
      const json: ApiResponse<ServerActivity[]> = await res.json()
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || '获取服务器活动失败')
      }
      setServers(json.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : '获取服务器活动失败')
    } finally {
      setIsLoading(false)
    }
  }

  const openAddServerModal = () => {
    setServerModal({ open: true, ip: '', remark: '', purgeLogsOnDelete: false, saving: false, error: null })
  }

  const closeServerModal = () => {
    setServerModal((prev) => ({ ...prev, open: false, saving: false, error: null }))
  }

  const saveServerConfig = async () => {
    try {
      setServerModal((prev) => ({ ...prev, saving: true, error: null }))
      const res = await fetch('/api/bots/servers-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: serverModal.ip.trim(), remark: serverModal.remark.trim() }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || '保存失败')
      }
      closeServerModal()
      await loadServerActivity()
    } catch (e) {
      setServerModal((prev) => ({ ...prev, saving: false, error: e instanceof Error ? e.message : '保存失败' }))
    }
  }

  const deleteServerConfig = async (ip: string) => {
    const ok = confirm(`确定要删除服务器 ${ip} 及其所有历史调用记录吗？\n\n此操作不可恢复，请谨慎操作。`)
    if (!ok) return
    try {
      const res = await fetch(
        `/api/bots/servers-config?ip=${encodeURIComponent(ip)}&purgeLogs=true`,
        { method: 'DELETE' }
      )
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || '删除失败')
      await loadServerActivity()
    } catch (e) {
      alert(e instanceof Error ? e.message : '删除失败')
    }
  }

  useEffect(() => {
    loadServerActivity()
  }, [])

  const stats = useMemo(() => {
    const totalServers = servers.length
    const totalBots = new Set(servers.flatMap((s) => s.bots.map((b) => b.apiUsername))).size
    const totalCalls = servers.reduce((sum, s) => sum + s.calls, 0)
    const totalCalls24h = servers.reduce((sum, s) => sum + (s.calls24h || 0), 0)
    return { totalServers, totalBots, totalCalls, totalCalls24h }
  }, [servers])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">机器人管理</h1>
          <p className="text-gray-400">监控调用本系统的服务器及机器人活动</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openAddServerModal} disabled={isLoading}>
            添加
          </Button>
          <Button variant="outline" onClick={loadServerActivity} disabled={isLoading}>
            {isLoading ? '刷新中...' : '刷新'}
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">服务器总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalServers}</div>
            <p className="text-sm text-gray-500 mt-1">历史记录（全部）</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">机器人总数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalBots}</div>
            <p className="text-sm text-gray-500 mt-1">去重后总数（全部历史）</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">总调用次数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalCalls.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">
              全部历史 | 24h: {stats.totalCalls24h.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 错误提示 */}
      {error && (
        <Card>
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-medium">加载失败</p>
              <p className="text-sm text-gray-400">{error}</p>
            </div>
            <Button variant="outline" onClick={loadServerActivity}>重试</Button>
          </CardContent>
        </Card>
      )}

      {/* 服务器与机器人卡片列表 */}
      <div className="space-y-6">
        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-gray-400">正在加载服务器活动...</CardContent>
          </Card>
        ) : servers.length === 0 ? (
      <Card>
            <CardContent className="p-8 text-gray-400">没有机器人调用记录。</CardContent>
      </Card>
        ) : (
          servers.map((server) => {
            const isExpanded = expandedServers[server.ip] ?? true // 默认展开
            return (
            <Card key={server.ip} className="bg-black border border-gray-500">
              {/* 上模块：服务器 IP 信息（可点击折叠/展开） */}
              <CardHeader 
                className="p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900/50 transition-colors"
                onClick={() => toggleServer(server.ip)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      {isExpanded ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                    <ServerIcon className="w-6 h-6 text-gray-400" />
                    <div>
                      <CardTitle className="text-lg font-mono text-white">{server.ip}</CardTitle>
                      <p className="text-xs text-gray-500">
                        服务器 IP · {server.bots.length} 个机器人
                        {server.remark ? <span className="text-gray-400"> · 备注：{server.remark}</span> : null}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="text-xs px-2 py-1 h-auto"
                        onClick={(e) => {
                          e.stopPropagation()
                          setServerModal((prev) => ({
                            ...prev,
                            open: true,
                            ip: server.ip,
                            remark: server.remark || '',
                            saving: false,
                            error: null,
                          }))
                        }}
                      >
                        编辑
                      </Button>
                      <Button
                        variant="outline"
                        className="text-xs px-2 py-1 h-auto text-red-400 border-red-400/50 hover:bg-red-400/10"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteServerConfig(server.ip)
                        }}
                      >
                        删除
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 text-gray-400">
                        <ClockIcon className="w-4 h-4" />
                        <span>最后活跃</span>
                      </div>
                      <p className="text-white font-medium">{new Date(server.lastSeen).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 text-gray-400">
                        <HashIcon className="w-4 h-4" />
                        <span>调用次数</span>
                      </div>
                      <p className="text-white font-medium">
                        {server.calls.toLocaleString()}
                        {server.calls24h > 0 && (
                          <span className="text-xs text-gray-500 ml-1">(24h: {server.calls24h.toLocaleString()})</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* 下模块：机器人管理信息（可折叠） */}
              {isExpanded && (
                <CardContent className="p-4">
                  {server.bots.length === 0 ? (
                    <div className="text-sm text-gray-500">该服务器上的机器人调用未提供用户名。</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {server.bots.map((bot) => (
                        <div key={bot.apiUsername} className="relative flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg">
                          {/* 官方/盗版标识 - 右上角 */}
                          {bot.isOfficial !== null && (
                            <span className={`absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded ${
                              bot.isOfficial 
                                ? 'bg-green-600 text-white' 
                                : 'bg-red-600 text-white'
                            }`}>
                              {bot.isOfficial ? '官方' : '盗版'}
                            </span>
                          )}
                          <BotIcon className="w-5 h-5 text-green-400" />
                          <div className="flex-1">
                            {bot.botUsername ? (
                              <>
                                <p className="text-white font-medium text-sm">{bot.botUsername}</p>
                                <p className="text-xs text-gray-400 font-mono">API: {bot.apiUsername}</p>
                              </>
                            ) : (
                              <>
                                <p className="text-white font-medium font-mono text-sm">{bot.apiUsername}</p>
                                <p className="text-xs text-gray-500">API 账号</p>
                              </>
                            )}
                          </div>
                          <Badge variant="success">活跃</Badge>
                          {bot.botUsername && (
                            <Button 
                              variant="outline" 
                              className="text-xs px-2 py-1 h-auto"
                              onClick={(e) => {
                                e.stopPropagation()
                                loadBotConfig(bot.botUsername!)
                              }}
                            >
                              详情
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )})
      )}
      </div>

      {/* 配置详情弹窗 */}
      {configModal.open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeConfigModal}>
          <div 
            className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">机器人配置详情</h3>
              <Button variant="outline" className="text-xs px-2 py-1 h-auto" onClick={closeConfigModal}>关闭</Button>
            </div>
            
            {/* 弹窗内容 */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
              {configModal.loading ? (
                <p className="text-gray-400">正在加载配置...</p>
              ) : configModal.error ? (
                <div className="text-center py-8">
                  <p className="text-red-400 mb-2">{configModal.error}</p>
                  <p className="text-gray-500 text-sm">请确保机器人管理员已发送过&quot;查询后台信息&quot;命令</p>
                </div>
              ) : configModal.config ? (
                <div className="space-y-4">
                  {/* 基本信息 */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">机器人用户名</p>
                      <p className="text-white font-mono">{configModal.config.botUsername}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">API 账号</p>
                      <p className="text-white font-mono">{configModal.config.apiUsername || '-'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400">最后更新时间</p>
                      <p className="text-white">{new Date(configModal.config.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {/* 配置内容 */}
                  <div>
                    <p className="text-gray-400 mb-2">config.txt 内容</p>
                    <pre className="bg-black p-4 rounded-lg text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap break-all">
                      {configModal.config.configContent}
                    </pre>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* 新增/编辑服务器弹窗 */}
      {serverModal.open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeServerModal}>
          <div
            className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-lg overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">服务器配置</h3>
              <Button variant="outline" className="text-xs px-2 py-1 h-auto" onClick={closeServerModal}>
                关闭
              </Button>
            </div>
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-gray-400">服务器 IP</div>
                <input
                  value={serverModal.ip}
                  onChange={(e) => setServerModal((prev) => ({ ...prev, ip: e.target.value }))}
                  placeholder="例如：127.0.0.1"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white text-sm min-h-[44px]"
                  disabled={serverModal.saving}
                />
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">备注（可选）</div>
                <input
                  value={serverModal.remark}
                  onChange={(e) => setServerModal((prev) => ({ ...prev, remark: e.target.value }))}
                  placeholder="例如：深圳-机房A"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-white text-sm min-h-[44px]"
                  disabled={serverModal.saving}
                />
              </div>
              {serverModal.error && <div className="text-sm text-red-400">{serverModal.error}</div>}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 min-h-[44px]" disabled={serverModal.saving} onClick={saveServerConfig}>
                  {serverModal.saving ? '保存中...' : '保存'}
                </Button>
                <Button variant="outline" className="flex-1 min-h-[44px]" onClick={closeServerModal} disabled={serverModal.saving}>
                  取消
                </Button>
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                说明：这里的“添加/编辑”主要用于给服务器 IP 维护备注；“清空记录”会删除该 IP 在 `client_logs` 的历史调用记录。
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
