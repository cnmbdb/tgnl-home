'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('api')

  const tabs = [
    { id: 'api', label: 'API 配置' },
    { id: 'energy', label: '能量池设置' },
    { id: 'security', label: '安全设置' },
    { id: 'notification', label: '通知设置' },
    { id: 'system', label: '系统信息' },
  ]

  const systemInfo = [
    { label: '系统版本', value: 'v1.0.0' },
    { label: 'Next.js 版本', value: '14.2.5' },
    { label: 'Node.js 版本', value: '18.17.0' },
    { label: '数据库版本', value: 'PostgreSQL 15' },
    { label: '运行时间', value: '7 天 12 小时' },
    { label: '服务器时间', value: new Date().toLocaleString('zh-CN') },
  ]

  const recentLogs = [
    { time: '2024-01-20 10:30:25', action: '配置更新', user: 'admin', status: 'success' },
    { time: '2024-01-20 09:15:10', action: 'API 密钥创建', user: 'admin', status: 'success' },
    { time: '2024-01-20 08:45:33', action: '系统重启', user: 'system', status: 'info' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">系统设置</h1>
        <p className="text-gray-400">管理系统配置和参数</p>
      </div>

      {/* 标签页 */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API 配置 */}
      {activeTab === 'api' && (
        <Card>
          <CardHeader>
            <CardTitle>API 配置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Telegram Bot Token"
              type="password"
              placeholder="输入 Bot Token"
            />
            <Input
              label="Webhook URL"
              type="text"
              placeholder="https://your-domain.com/api/webhook"
            />
            <Input
              label="API 基础 URL"
              type="text"
              placeholder="https://api.example.com"
            />
            <div className="flex space-x-2 pt-4">
              <Button>保存配置</Button>
              <Button variant="outline">测试连接</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 能量池设置 */}
      {activeTab === 'energy' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>能量池设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="默认能量池容量"
                type="number"
                defaultValue="1000"
              />
              <Input
                label="自动回收阈值 (%)"
                type="number"
                defaultValue="10"
              />
              <Select
                label="分配策略"
                options={[
                  { value: 'round-robin', label: '轮询分配' },
                  { value: 'least-used', label: '最少使用' },
                  { value: 'random', label: '随机分配' },
                ]}
              />
              <div className="flex space-x-2 pt-4">
                <Button>保存设置</Button>
                <Button variant="outline">重置默认</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>能量池规则</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>规则名称</TableHead>
                    <TableHead>条件</TableHead>
                    <TableHead>操作</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>自动回收</TableCell>
                    <TableCell>使用率 &lt; 10%</TableCell>
                    <TableCell>回收能量池</TableCell>
                    <TableCell>
                      <Badge variant="success">启用</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">编辑</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>自动扩容</TableCell>
                    <TableCell>使用率 &gt; 90%</TableCell>
                    <TableCell>创建新能量池</TableCell>
                    <TableCell>
                      <Badge variant="success">启用</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">编辑</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 安全设置 */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>安全设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">双因素认证</p>
                  <p className="text-sm text-gray-400">为账户添加额外的安全保护</p>
                </div>
                <Button variant="outline">启用</Button>
              </div>
              <div className="border-t border-gray-800 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">API 速率限制</p>
                    <p className="text-sm text-gray-400">限制 API 调用频率</p>
                  </div>
                  <Input type="number" defaultValue="1000" className="w-32" />
                </div>
              </div>
              <div className="border-t border-gray-800 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">IP 白名单</p>
                    <p className="text-sm text-gray-400">仅允许指定 IP 访问</p>
                  </div>
                  <Button variant="outline">配置</Button>
                </div>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button>保存设置</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>登录历史</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>时间</TableHead>
                    <TableHead>IP 地址</TableHead>
                    <TableHead>设备</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { time: '2024-01-20 10:30:25', ip: '192.168.1.100', device: 'Chrome on macOS', status: 'success' },
                    { time: '2024-01-20 09:15:10', ip: '192.168.1.100', device: 'Chrome on macOS', status: 'success' },
                    { time: '2024-01-19 18:45:33', ip: '192.168.1.101', device: 'Safari on iOS', status: 'success' },
                  ].map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-400 text-xs">{log.time}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{log.device}</TableCell>
                      <TableCell>
                        <Badge variant="success">成功</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 通知设置 */}
      {activeTab === 'notification' && (
        <Card>
          <CardHeader>
            <CardTitle>通知设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">邮件通知</p>
                <p className="text-sm text-gray-400">接收系统重要通知</p>
              </div>
              <Button variant="outline">配置</Button>
            </div>
            <div className="border-t border-gray-800 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Webhook 通知</p>
                  <p className="text-sm text-gray-400">发送通知到指定 URL</p>
                </div>
                <Button variant="outline">配置</Button>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">能量池告警</span>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">机器人离线告警</span>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">API 异常告警</span>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
              </div>
            </div>
            <div className="flex space-x-2 pt-4">
              <Button>保存设置</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 系统信息 */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>系统信息</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {systemInfo.map((info, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-400">{info.label}</TableCell>
                      <TableCell className="text-white">{info.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>系统日志</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>时间</TableHead>
                    <TableHead>操作</TableHead>
                    <TableHead>用户</TableHead>
                    <TableHead>状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-400 text-xs">{log.time}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === 'success' ? 'success' : 'info'}>
                          {log.status === 'success' ? '成功' : '信息'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>系统操作</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">清除缓存</p>
                    <p className="text-sm text-gray-400">清除系统缓存数据</p>
                  </div>
                  <Button variant="outline">清除</Button>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">导出日志</p>
                      <p className="text-sm text-gray-400">导出系统日志文件</p>
                    </div>
                    <Button variant="outline">导出</Button>
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">系统重启</p>
                      <p className="text-sm text-gray-400">重启系统服务</p>
                    </div>
                    <Button variant="outline" className="text-red-400 hover:text-red-300">
                      重启
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
