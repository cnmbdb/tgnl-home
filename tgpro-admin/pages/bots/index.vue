<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white flex items-center gap-3">
          <div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-cpu-chip" class="w-5 h-5 text-[#00dc82]" />
          </div>
          机器人管理
        </h1>
        <p class="mt-1 text-sm text-[#9ca3af]">监控和管理 Telegram 机器人状态</p>
      </div>
      <div class="flex gap-2">
        <UButton variant="outline" size="sm">
          <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
          刷新状态
        </UButton>
        <UButton color="primary" size="sm" class="bg-[#00dc82] hover:bg-[#00dc82]/80">
          <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
          添加机器人
        </UButton>
      </div>
    </div>



    <!-- 机器人配置 -->
    <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg">
      <div class="px-4 py-3 border-b border-[#2a2a2b]">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-white">机器人配置</h3>
          <div class="flex items-center gap-2">
            <UBadge v-if="isSaving" color="yellow" variant="subtle" size="sm">
              <UIcon name="i-heroicons-arrow-path" class="w-3 h-3 mr-1 animate-spin" />
              保存中...
            </UBadge>
            <UBadge v-else-if="lastSaved" color="green" variant="subtle" size="sm">
              <UIcon name="i-heroicons-check" class="w-3 h-3 mr-1" />
              已保存
            </UBadge>
            
            <!-- 热更新配置开关 -->
            <div class="flex items-center gap-2 px-3 py-1 bg-[#1a1a1b] rounded-lg border border-[#2a2a2b]">
              <UIcon name="i-heroicons-bolt" class="w-4 h-4 text-[#00dc82]" />
              <span class="text-sm text-[#9ca3af]">热更新</span>
              <UToggle 
                v-model="hotReloadEnabled" 
                size="sm"
                @change="handleHotReloadToggle"
              />
            </div>
            
            <UButton 
              color="primary" 
              size="sm" 
              class="bg-[#00dc82] hover:bg-[#00dc82]/80"
              @click="restartBot"
              :loading="isRestarting"
              :disabled="hotReloadEnabled"
            >
              <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
              重启机器人
            </UButton>
            <UButton 
              color="primary" 
              size="sm" 
              class="bg-[#00dc82] hover:bg-[#00dc82]/80"
              @click="saveConfig"
              :loading="isSaving"
            >
              <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
              {{ hotReloadEnabled ? '保存并热更新' : '立即保存' }}
            </UButton>
          </div>
        </div>
        
        <!-- 重启进度条 -->
        <div v-if="showRestartProgress" class="mt-3 flex justify-end">
          <div class="w-48">
            <div class="flex items-center justify-between text-xs text-[#9ca3af] mb-1">
              <span>重启进度</span>
              <span>{{ restartProgress }}%</span>
            </div>
            <div class="w-full bg-[#2a2a2b] rounded-full h-2">
              <div 
                class="bg-[#00dc82] h-2 rounded-full transition-all duration-300 ease-out"
                :style="{ width: restartProgress + '%' }"
              ></div>
            </div>
            <div class="text-xs text-[#9ca3af] mt-1">{{ restartStatus }}</div>
          </div>
        </div>
      </div>
      
      <div class="p-4 space-y-6">
        <!-- 基础配置 -->
        <div>
          <h4 class="text-md font-medium text-white mb-3 flex items-center">
            <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-2" />
            基础配置
          </h4>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">Bot Token</label>
              <UInput
                v-model="botConfig.token"
                placeholder="请输入机器人令牌"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">管理员 ID</label>
              <UInput
                v-model="botConfig.adminId"
                placeholder="请输入管理员ID"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">客服链接</label>
              <UInput
                v-model="botConfig.customerServiceId"
                placeholder="请输入客服链接"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">钱包地址</label>
              <UInput
                v-model="botConfig.controlAddress"
                placeholder="请输入钱包地址"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">机器人连接</label>
              <UInput
                v-model="botConfig.tiaozhuan"
                placeholder="请输入机器人连接"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
          </div>
        </div>

        <!-- 价格配置 -->
        <div>
          <h4 class="text-md font-medium text-white mb-3 flex items-center">
            <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4 mr-2" />
            价格配置
          </h4>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">3个月价格</label>
              <UInput
                v-model="botConfig.threePrice"
                type="number"
                placeholder="请输入3个月价格"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">6个月价格</label>
              <UInput
                v-model="botConfig.sixPrice"
                type="number"
                placeholder="请输入6个月价格"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">年费价格</label>
              <UInput
                v-model="botConfig.yearPrice"
                type="number"
                placeholder="请输入年费价格"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
          </div>
        </div>

        <!-- 资源配置 -->
        <div>
          <h4 class="text-md font-medium text-white mb-3 flex items-center">
            <UIcon name="i-heroicons-globe-alt" class="w-4 h-4 mr-2" />
            资源配置
          </h4>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">资源哈希</label>
              <UInput
                v-model="botConfig.resHash"
                placeholder="请输入资源哈希"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">资源Cookie</label>
              <UTextarea
                v-model="botConfig.resCookie"
                placeholder="请输入资源Cookie"
                class="bg-[#0c0c0d]"
                :rows="3"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">钱包助记词</label>
              <UTextarea
                v-model="botConfig.walletMnemonic"
                placeholder="请输入钱包助记词（用空格分隔）"
                class="bg-[#0c0c0d]"
                :rows="2"
                @input="handleConfigChange"
              />
            </div>
          </div>
        </div>

        <!-- 数据库配置 -->
        <div>
          <h4 class="text-md font-medium text-white mb-3 flex items-center">
            <UIcon name="i-heroicons-circle-stack" class="w-4 h-4 mr-2" />
            数据库配置
          </h4>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库主机</label>
              <UInput
                v-model="botConfig.dbHost"
                placeholder="请输入数据库主机地址"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库端口</label>
              <UInput
                v-model="botConfig.dbPort"
                type="number"
                placeholder="请输入数据库端口"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库名称</label>
              <UInput
                v-model="botConfig.dbName"
                placeholder="请输入数据库名称"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库用户</label>
              <UInput
                v-model="botConfig.dbUser"
                placeholder="请输入数据库用户名"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库密码</label>
              <UInput
                v-model="botConfig.dbPassword"
                type="password"
                placeholder="请输入数据库密码"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
          </div>
        </div>

        <!-- Tron API 配置 -->
        <div>
          <h4 class="text-md font-medium text-white mb-3 flex items-center">
            <UIcon name="i-heroicons-key" class="w-4 h-4 mr-2" />
            Tron API 配置
          </h4>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">
                Tron API Key
                <span class="text-xs text-[#6b7280] ml-2">(来自 hy.py 文件)</span>
              </label>
              <UInput
                v-model="botConfig.tronApiKey"
                placeholder="请输入 Tron API Key"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
              <p class="mt-1 text-xs text-[#6b7280]">
                修改后将自动保存到 hy.py 文件中的 tron_api_key 变量
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>






  </div>
</template>

<script setup>
// 页面元数据
definePageMeta({
  title: '机器人管理',
  description: '管理和配置 Telegram 机器人',
  middleware: 'auth'
})

// 响应式数据
const botConfig = ref({
  // 基础配置 (来自 config.txt)
  token: '',
  controlAddress: '',
  adminId: '',
  customerServiceId: '',
  tiaozhuan: '',
  
  // 价格配置 (来自 config.txt)
  threePrice: '',
  sixPrice: '',
  yearPrice: '',
  
  // 资源配置 (来自 .env)
  resHash: '',
  resCookie: '',
  walletMnemonic: '',
  
  // 数据库配置 (来自 .env)
  dbHost: '',
  dbUser: '',
  dbPassword: '',
  dbName: '',
  dbPort: '',
  
  // Tron API 配置 (来自 hy.py)
  tronApiKey: ''
})

// 保存状态
const isSaving = ref(false)
const lastSaved = ref(false)
let saveTimeout = null

// 重启状态
const isRestarting = ref(false)
const showRestartProgress = ref(false)
const restartProgress = ref(0)
const restartStatus = ref('')

// 热更新状态
const hotReloadEnabled = ref(false)

// 方法
const maskToken = (token) => {
  if (!token) return ''
  return token.substring(0, 10) + '...' + token.substring(token.length - 10)
}

const handleConfigChange = () => {
  // 清除之前的定时器
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  
  // 重置保存状态
  lastSaved.value = false
  
  // 设置3秒后自动保存
  saveTimeout = setTimeout(() => {
    saveConfig()
  }, 3000)
}

const handleHotReloadToggle = () => {
  console.log('热更新状态切换:', hotReloadEnabled.value)
  // 当热更新开启时，自动保存配置
  if (hotReloadEnabled.value) {
    saveConfig()
  }
}

const saveConfig = async () => {
  try {
    isSaving.value = true
    
    console.log('保存配置:', botConfig.value)
    
    // 调用API保存配置到文件
    const response = await $fetch('/api/bot-config', {
      method: 'POST',
      body: {
        ...botConfig.value,
        hotReload: hotReloadEnabled.value
      }
    })
    
    if (response.success) {
      console.log('配置保存成功')
      
      // 显示保存成功状态
      lastSaved.value = true
      
      // 根据热更新状态显示不同的提示
      if (hotReloadEnabled.value) {
        // 显示热更新成功提示
        const toast = useToast()
        toast.add({
          title: '配置已保存并热更新',
          description: '机器人配置已自动重载，无需重启',
          icon: 'i-heroicons-bolt',
          color: 'green'
        })
      }
      
      // 3秒后隐藏保存成功状态
      setTimeout(() => {
        lastSaved.value = false
      }, 3000)
    } else {
      console.error('保存配置失败:', response.error)
      const toast = useToast()
      toast.add({
        title: '保存失败',
        description: response.error || '配置保存失败，请重试',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red'
      })
    }
    
  } catch (error) {
    console.error('保存配置失败:', error)
    const toast = useToast()
    toast.add({
      title: '保存失败',
      description: '网络错误，请检查连接后重试',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'red'
    })
  } finally {
    isSaving.value = false
  }
}

const restartBot = async () => {
  try {
    isRestarting.value = true
    showRestartProgress.value = true
    restartProgress.value = 0
    restartStatus.value = '正在检查机器人进程...'
    
    // 模拟进度更新
    const updateProgress = (progress, status) => {
      restartProgress.value = progress
      restartStatus.value = status
    }
    
    // 调用重启API
    const response = await $fetch('/api/restart-bot', {
      method: 'POST'
    })
    
    if (response.success) {
      // 模拟重启进度
      updateProgress(20, '正在停止现有进程...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      updateProgress(50, '正在清理资源...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      updateProgress(80, '正在启动机器人...')
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      updateProgress(100, '重启完成')
      
      // 2秒后隐藏进度条
      setTimeout(() => {
        showRestartProgress.value = false
        restartProgress.value = 0
        restartStatus.value = ''
      }, 2000)
      
      console.log('机器人重启成功')
    } else {
      console.error('重启机器人失败:', response.error)
      restartStatus.value = '重启失败: ' + response.error
    }
    
  } catch (error) {
    console.error('重启机器人失败:', error)
    restartStatus.value = '重启失败: ' + error.message
  } finally {
    isRestarting.value = false
  }
}

// 页面加载时读取配置
onMounted(async () => {
  try {
    console.log('加载配置...')
    
    // 调用API读取配置文件
    const response = await $fetch('/api/bot-config')
    
    if (response.success && response.data) {
      // 更新配置数据
      botConfig.value = { ...response.data }
      console.log('配置加载成功:', botConfig.value)
    } else {
      console.error('加载配置失败:', response.error)
    }
    
  } catch (error) {
    console.error('加载配置失败:', error)
  }
})

// 页面卸载时清理定时器
onUnmounted(() => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
})
</script>