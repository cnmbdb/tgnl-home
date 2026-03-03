// 能量池相关类型
export interface EnergyPool {
  id: string
  name: string
  status: 'active' | 'inactive'
  usage: number
  total: number
  createdAt: string
  updatedAt: string

  // 上游能量池（provider）配置：用于把 /v1/* 请求转发到第三方能量池
  providerType?: string
  providerBaseUrl?: string
  providerUsername?: string
  providerPassword?: string
}

// 机器人相关类型
export interface Bot {
  id: string
  name: string
  username: string
  token: string
  status: 'online' | 'offline'
  calls: number
  lastActive: string
  createdAt: string
}

// API 响应类型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 统计数据类型
export interface Statistics {
  totalEnergyPools: number
  activeBots: number
  todayCalls: number
  successRate: number
}

