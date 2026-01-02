<template>
  <div class="min-h-screen bg-black">
    <!-- 页面头部 -->
    <div class="bg-transparent border-b border-gray-700">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-white">仪表板</h1>
            <p class="text-sm text-gray-400 mt-1">监控您的Telegram机器人和API服务状态</p>
          </div>
          <div class="flex items-center space-x-3">
            <UBadge color="green" variant="soft" size="lg">
              <UIcon name="i-heroicons-signal" class="w-4 h-4 mr-1" />
              系统运行中
            </UBadge>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="px-6 py-6">
      <!-- 状态卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Telegram机器人连接状态卡片 -->
        <UCard class="bg-gray-900/70 backdrop-blur-md border border-gray-700/40 shadow-lg hover:shadow-xl transition-all duration-200">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-gray-800/50 rounded-lg">
                  <UIcon name="i-simple-icons-telegram" class="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white">Telegram机器人</h3>
                  <p class="text-sm text-gray-400">连接状态监控</p>
                </div>
              </div>
              <UBadge :color="telegramStatus.color" variant="soft">
                {{ telegramStatus.text }}
              </UBadge>
            </div>
          </template>

          <div class="space-y-4">
            <!-- 连接状态指示器 -->
            <div class="flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <div :class="[
                    'w-3 h-3 rounded-full',
                    telegramStatus.connected ? 'bg-green-500' : 'bg-red-500'
                  ]"></div>
                  <div v-if="telegramStatus.connected" class="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span class="text-sm font-medium text-gray-300">
                  {{ telegramStatus.connected ? '已连接' : '连接断开' }}
                </span>
              </div>
              <span class="text-xs text-gray-400">
                最后更新: {{ telegramStatus.lastUpdate }}
              </span>
            </div>

            <!-- 统计信息 -->
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30">
                <div class="text-2xl font-bold text-white">{{ telegramStats.activeUsers }}</div>
                <div class="text-xs text-gray-400">活跃用户</div>
              </div>
              <div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30">
                <div class="text-2xl font-bold text-white">{{ telegramStats.messagesCount }}</div>
                <div class="text-xs text-gray-400">今日消息</div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex space-x-2">
              <UButton 
                size="sm" 
                variant="soft" 
                color="blue"
                @click="refreshTelegramStatus"
                :loading="telegramLoading"
              >
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1" />
                刷新状态
              </UButton>
              <UButton 
                size="sm" 
                variant="outline" 
                color="gray"
                @click="viewTelegramLogs"
              >
                <UIcon name="i-heroicons-document-text" class="w-4 h-4 mr-1" />
                查看日志
              </UButton>
            </div>
          </div>
        </UCard>

        <!-- API服务状态 -->
        <UCard class="bg-gray-900/70 backdrop-blur-md border border-gray-700/40 shadow-lg hover:shadow-xl transition-all duration-200">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-gray-800/50 rounded-lg">
                  <UIcon name="i-heroicons-server" class="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white">API服务</h3>
                  <p class="text-sm text-gray-400">接口连接状态</p>
                </div>
              </div>
              <UBadge :color="apiStatus.color" variant="soft">
                {{ apiStatus.text }}
              </UBadge>
            </div>
          </template>

          <div class="space-y-4">
            <!-- 连接状态指示器 -->
            <div class="flex items-center justify-between p-4 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30">
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <div :class="[
                    'w-3 h-3 rounded-full',
                    apiStatus.connected ? 'bg-green-500' : 'bg-red-500'
                  ]"></div>
                  <div v-if="apiStatus.connected" class="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span class="text-sm font-medium text-gray-300">
                  {{ apiStatus.connected ? '服务正常' : '服务异常' }}
                </span>
              </div>
              <span class="text-xs text-gray-400">
                响应时间: {{ apiStatus.responseTime }}ms
              </span>
            </div>

            <!-- 统计信息 -->
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30">
                <div class="text-2xl font-bold text-white">{{ apiStats.requestsCount }}</div>
                <div class="text-xs text-gray-400">今日请求</div>
              </div>
              <div class="text-center p-3 bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-600/30">
                <div class="text-2xl font-bold text-white">{{ apiStats.uptime }}%</div>
                <div class="text-xs text-gray-400">可用性</div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex space-x-2">
              <UButton 
                size="sm" 
                variant="soft" 
                color="green"
                @click="refreshApiStatus"
                :loading="apiLoading"
              >
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-1" />
                刷新状态
              </UButton>
              <UButton 
                size="sm" 
                variant="outline" 
                color="gray"
                @click="viewApiMetrics"
              >
                <UIcon name="i-heroicons-chart-bar" class="w-4 h-4 mr-1" />
                查看指标
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <!-- 快速操作区域 -->
      <UCard class="mt-8 bg-gray-900/70 backdrop-blur-md border border-gray-700/40 shadow-lg">
        <template #header>
          <div class="flex items-center space-x-3">
            <UIcon name="i-heroicons-bolt" class="w-5 h-5 text-yellow-500" />
            <h3 class="text-lg font-semibold text-white">快速操作</h3>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UCard class="bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70">
            <div class="text-center p-4">
              <div class="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UIcon name="i-heroicons-users" class="w-6 h-6 text-green-400" />
              </div>
              <h3 class="font-medium text-white mb-1">用户管理</h3>
              <p class="text-sm text-gray-400">管理用户和权限</p>
            </div>
          </UCard>

          <UCard class="bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70">
            <div class="text-center p-4">
              <div class="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-purple-400" />
              </div>
              <h3 class="font-medium text-white mb-1">数据统计</h3>
              <p class="text-sm text-gray-400">查看详细统计</p>
            </div>
          </UCard>

          <UCard class="bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 hover:shadow-xl transition-all cursor-pointer hover:bg-gray-700/70">
            <div class="text-center p-4">
              <div class="w-12 h-12 bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UIcon name="i-heroicons-wrench-screwdriver" class="w-6 h-6 text-orange-400" />
              </div>
              <h3 class="font-medium text-white mb-1">开发工具</h3>
              <p class="text-sm text-gray-400">API测试和调试</p>
            </div>
          </UCard>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
definePageMeta({
  title: '仪表板'
})

// 组件销毁时清理定时器
onUnmounted(() => {
  if (statusTimer) {
    clearInterval(statusTimer)
    statusTimer = null
  }
})

// 响应式状态
const telegramLoading = ref(false)
const apiLoading = ref(false)

// Telegram机器人状态
const telegramStatus = ref({
  connected: true,
  color: 'green',
  text: '在线',
  lastUpdate: '刚刚'
})

// 组件销毁时清理定时器
onUnmounted(() => {
  if (statusTimer) {
    clearInterval(statusTimer)
    statusTimer = null
  }
})

// Telegram统计数据
const telegramStats = ref({
  activeUsers: 1247,
  messagesCount: 3856
})

// 组件销毁时清理定时器
onUnmounted(() => {
  if (statusTimer) {
    clearInterval(statusTimer)
    statusTimer = null
  }
})

// API服务状态
const apiStatus = ref({
  connected: true,
  color: 'green',
  text: '正常',
  responseTime: 45
})

// 组件销毁时清理定时器
onUnmounted(() => {
  if (statusTimer) {
    clearInterval(statusTimer)
    statusTimer = null
  }
})

// API统计数据
const apiStats = ref({
  requestCount: 12847,
  uptime: 99.9
})

// 组件销毁时清理定时器
onUnmounted(() => {
  if (statusTimer) {
    clearInterval(statusTimer)
    statusTimer = null
  }
})

// 刷新Telegram状态
const refreshTelegramStatus = async () => {
  telegramLoading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 更新状态
    telegramStatus.value.lastUpdate = new Date().toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
    
    // 模拟随机状态变化
    const isConnected = Math.random() > 0.1 // 90%概率连接正常
    telegramStatus.value.connected = isConnected
    telegramStatus.value.color = isConnected ? 'green' : 'red'
    telegramStatus.value.text = isConnected ? '在线' : '离线'
    
    // 更新统计数据
    telegramStats.value.activeUsers = Math.floor(Math.random() * 2000) + 1000
    telegramStats.value.messagesCount = Math.floor(Math.random() * 5000) + 2000
    
  } catch (error) {
    console.error('刷新Telegram状态失败:', error)
  } finally {
    telegramLoading.value = false
  }
}

// 刷新API状态
const refreshApiStatus = async () => {
  apiLoading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 模拟随机状态变化
    const isConnected = Math.random() > 0.05 // 95%概率连接正常
    apiStatus.value.connected = isConnected
    apiStatus.value.color = isConnected ? 'green' : 'red'
    apiStatus.value.text = isConnected ? '正常' : '异常'
    apiStatus.value.responseTime = Math.floor(Math.random() * 100) + 20
    
    // 更新统计数据
    apiStats.value.requestCount = Math.floor(Math.random() * 20000) + 10000
    apiStats.value.uptime = (Math.random() * 0.5 + 99.5).toFixed(1)
    
  } catch (error) {
    console.error('刷新API状态失败:', error)
  } finally {
    apiLoading.value = false
  }
}

// 查看Telegram日志
const viewTelegramLogs = () => {
  // 这里可以打开日志查看器或跳转到日志页面
  console.log('查看Telegram日志')
}

// 查看API指标
const viewApiMetrics = () => {
  // 这里可以打开指标监控页面
  console.log('查看API指标')
}
// 定时器引用
let statusTimer = null


// 页面加载时自动刷新状态
onMounted(() => {
  // 定期刷新状态
  statusTimer = setInterval(() => {
    telegramStatus.value.lastUpdate = new Date().toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }, 30000) // 每30秒更新一次时间
})

// 组件销毁时清理定时器
onUnmounted(() => {
  if (statusTimer) {
    clearInterval(statusTimer)
    statusTimer = null
  }
})
</script>

<style scoped>
/* 自定义样式 */
.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>