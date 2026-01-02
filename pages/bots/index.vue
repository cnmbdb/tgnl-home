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
        <p class="mt-1 text-sm text-[#9ca3af]">监控和管理能量出租机器人状态</p>
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
            <div class="flex items-center space-x-3 px-3 py-2 rounded-lg border border-[#374151] bg-[#1f2937]/50">
              <UIcon name="i-heroicons-bolt" class="w-4 h-4" :class="hotReloadEnabled ? 'text-[#00dc82]' : 'text-[#9ca3af]'" />
              <span class="text-sm text-[#9ca3af]">热更新</span>
              <UToggle 
                v-model="hotReloadEnabled"
                @change="toggleHotReload"
                :loading="isReloading"
                color="primary"
                size="sm"
              />
              <span class="text-xs font-medium" :class="hotReloadEnabled ? 'text-[#00dc82]' : 'text-[#9ca3af]'">
                {{ hotReloadEnabled ? '已启用' : '已禁用' }}
              </span>
            </div>
            <UButton 
              color="primary" 
              size="sm" 
              class="bg-[#00dc82] hover:bg-[#00dc82]/80"
              @click="restartBot"
              :loading="isRestarting"
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
              立即保存
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
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">机器人ID</label>
              <UInput
                v-model="botConfig.botId"
                placeholder="请输入机器人ID"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">群组链接</label>
              <UInput
                v-model="botConfig.groupLink"
                placeholder="请输入群组链接"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">控制地址</label>
              <UInput
                v-model="botConfig.controlAddress"
                placeholder="请输入控制地址"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">私钥</label>
              <UInput
                v-model="botConfig.privateKey"
                placeholder="请输入私钥"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">用户名</label>
              <UInput
                v-model="botConfig.username"
                placeholder="请输入用户名"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">密码</label>
              <UInput
                v-model="botConfig.password"
                type="password"
                placeholder="请输入密码"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">广告时间</label>
              <UInput
                v-model="botConfig.adTime"
                placeholder="请输入广告时间"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">汇率折扣</label>
              <UInput
                v-model="botConfig.huilvZhekou"
                type="number"
                step="0.01"
                placeholder="请输入汇率折扣"
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
          <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">小时价格</label>
              <UInput
                v-model="botConfig.hourPrice"
                type="number"
                step="0.1"
                placeholder="请输入小时价格"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">日价格</label>
              <UInput
                v-model="botConfig.dayPrice"
                type="number"
                step="0.1"
                placeholder="请输入日价格"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">三日价格</label>
              <UInput
                v-model="botConfig.threeDayPrice"
                type="number"
                step="0.1"
                placeholder="请输入三日价格"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">预存价格</label>
              <UInput
                v-model="botConfig.yucunPrice"
                type="number"
                step="0.1"
                placeholder="请输入预存价格"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
            </div>
          </div>
        </div>



        <!-- 数据库配置 -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-md font-medium text-white flex items-center">
              <UIcon name="i-heroicons-circle-stack" class="w-4 h-4 mr-2" />
              数据库配置
            </h4>

          </div>
          

          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库主机</label>
              <UInput
                v-model="dbConfig.dbHost"
                placeholder="请输入数据库主机地址"
                class="bg-[#0c0c0d]"
                @input="handleDbConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库端口</label>
              <UInput
                v-model="dbConfig.dbPort"
                type="number"
                placeholder="请输入数据库端口"
                class="bg-[#0c0c0d]"
                @input="handleDbConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库名称</label>
              <UInput
                v-model="dbConfig.dbName"
                placeholder="请输入数据库名称"
                class="bg-[#0c0c0d]"
                @input="handleDbConfigChange"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库用户</label>
              <UInput
                v-model="dbConfig.dbUser"
                placeholder="请输入数据库用户名"
                class="bg-[#0c0c0d]"
                @input="handleDbConfigChange"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-[#9ca3af] mb-2">数据库密码</label>
              <UInput
                v-model="dbConfig.dbPassword"
                type="password"
                placeholder="请输入数据库密码"
                class="bg-[#0c0c0d]"
                @input="handleDbConfigChange"
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
                <span class="text-xs text-[#6b7280] ml-2">(来自 al.py 文件)</span>
              </label>
              <UInput
                v-model="botConfig.tronApiKey"
                placeholder="请输入 Tron API Key"
                class="bg-[#0c0c0d]"
                @input="handleConfigChange"
              />
              <p class="mt-1 text-xs text-[#6b7280]">
                修改后将自动保存到 al.py 文件中的 API_KEY 变量
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
  description: '管理和配置 Telegram 机器人'
})

// 响应式数据
const botConfig = ref({
  // 基础配置 - 从config.txt读取
  token: '',
  adminId: '',
  customerServiceId: '',
  botId: '',
  groupLink: '',
  controlAddress: '',
  privateKey: '',
  username: '',
  password: '',
  adTime: '',
  huilvZhekou: '',
  
  // 价格配置 - 从config.txt读取
  hourPrice: '',
  dayPrice: '',
  threeDayPrice: '',
  yucunPrice: '',
  
  // API配置 - 从al.py读取
  tronApiKey: ''
})

// 数据库配置 - 从.env读取
const dbConfig = reactive({
  dbHost: '',
  dbPort: '',
  dbName: '',
  dbUser: '',
  dbPassword: '',
  tgDbHost: '',
  tgDbPort: '',
  tgDbName: '',
  tgDbUser: '',
  tgDbPassword: '',
  viteDbHost: '',
  viteDbName: '',
  viteDbUser: '',
  viteDbPassword: ''
})

// 保存状态
const isSaving = ref(false)
const lastSaved = ref(false)

// 数据库配置状态
const isLoadingDbConfig = ref(false)
const isSavingDbConfig = ref(false)
const dbConfigLoaded = ref(false)

// 重启状态
const isRestarting = ref(false)
const showRestartProgress = ref(false)
const restartProgress = ref(0)
const restartStatus = ref('')

// 热重载状态
const isReloading = ref(false)
const reloadSuccess = ref(false)
const hotReloadEnabled = ref(false)

// 自动保存定时器
let saveTimeout = null

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
  saveTimeout = setTimeout(async () => {
    await saveConfig()
    
    // 如果热重载已启用，自动触发重载
    if (hotReloadEnabled.value) {
      await reloadConfig()
    }
  }, 3000)
}

// 处理数据库配置变化
const handleDbConfigChange = () => {
  // 数据库配置不自动保存，需要手动保存
}

// 加载数据库配置
const loadDbConfig = async () => {
  try {
    isLoadingDbConfig.value = true
    
    const response = await $fetch('/api/db-config')
    
    if (response.success && response.data) {
      Object.assign(dbConfig, response.data)
      dbConfigLoaded.value = true
      console.log('数据库配置加载成功:', dbConfig)
    } else {
      console.error('加载数据库配置失败:', response.error)
    }
    
  } catch (error) {
    console.error('加载数据库配置失败:', error)
  } finally {
    isLoadingDbConfig.value = false
  }
}

// 保存数据库配置
 const saveDbConfig = async () => {
   try {
     isSavingDbConfig.value = true
     
     const response = await $fetch('/api/db-config', {
       method: 'PUT',
       body: dbConfig
     })
     
     if (response.success) {
       console.log('数据库配置保存成功')
       
       const toast = useToast()
       toast.add({
         title: '保存成功',
         description: '数据库配置已保存并同步到相关服务',
         icon: 'i-heroicons-check-circle',
         color: 'green'
       })
       
     } else {
       console.error('保存数据库配置失败:', response.error)
       
       const toast = useToast()
       toast.add({
         title: '保存失败',
         description: response.error || '保存数据库配置时发生错误',
         icon: 'i-heroicons-exclamation-triangle',
         color: 'red'
       })
     }
     
   } catch (error) {
     console.error('保存数据库配置失败:', error)
     
     const toast = useToast()
     toast.add({
       title: '保存失败',
       description: error.message || '网络错误或服务器异常',
       icon: 'i-heroicons-exclamation-triangle',
       color: 'red'
     })
   } finally {
     isSavingDbConfig.value = false
   }
 }

 // 刷新数据库配置
 const refreshDbConfig = async () => {
   await loadDbConfig()
   
   const toast = useToast()
   toast.add({
     title: '刷新成功',
     description: '数据库配置已重新加载',
     icon: 'i-heroicons-arrow-path',
     color: 'blue'
   })
 }

const saveConfig = async () => {
  try {
    isSaving.value = true
    
    console.log('保存配置:', botConfig.value)
    
    // 调用API保存配置到文件
    const response = await $fetch('/api/bot-config', {
      method: 'POST',
      body: botConfig.value
    })
    
    if (response.success) {
      console.log('配置保存成功')
      
      // 显示保存成功状态
      lastSaved.value = true
      
      // 3秒后隐藏保存成功状态
      setTimeout(() => {
        lastSaved.value = false
      }, 3000)
    } else {
      console.error('保存配置失败:', response.error)
      // 这里可以添加错误提示
    }
    
  } catch (error) {
    console.error('保存配置失败:', error)
    // 这里可以添加错误提示
  } finally {
    isSaving.value = false
  }
}

const reloadConfig = async () => {
  try {
    isReloading.value = true
    
    // 首先保存当前配置
    await saveConfig()
    
    // 调用热重载API
    const response = await $fetch('/api/bot-reload', {
      method: 'POST',
      body: {
        adminToken: 'admin-token' // 这里应该使用实际的管理员令牌
      }
    })
    
    if (response.success) {
      reloadSuccess.value = true
      console.log('配置热重载成功:', response.message)
      
      // 显示成功提示
      const toast = useToast()
      toast.add({
        title: '热重载成功',
        description: '机器人配置已重新加载，无需重启',
        icon: 'i-heroicons-check-circle',
        color: 'green'
      })
      
      // 3秒后隐藏成功状态
      setTimeout(() => {
        reloadSuccess.value = false
      }, 3000)
      
    } else {
      console.error('配置热重载失败:', response.error)
      
      // 显示错误提示
      const toast = useToast()
      toast.add({
        title: '热重载失败',
        description: response.error || '配置重载时发生错误',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red'
      })
    }
    
  } catch (error) {
    console.error('配置热重载失败:', error)
    
    // 显示错误提示
    const toast = useToast()
    toast.add({
      title: '热重载失败',
      description: error.message || '网络错误或服务器异常',
      icon: 'i-heroicons-exclamation-triangle',
      color: 'red'
    })
  } finally {
    isReloading.value = false
  }
}

const toggleHotReload = async (enabled) => {
  if (enabled) {
    // 启用热重载时，先保存配置然后触发一次重载
    await saveConfig()
    await reloadConfig()
  }
  
  // 保存热重载状态到本地存储
  localStorage.setItem('hotReloadEnabled', enabled.toString())
  
  const toast = useToast()
  toast.add({
    title: enabled ? '热重载已启用' : '热重载已禁用',
    description: enabled ? '配置变更时将自动重载' : '配置变更时需要手动重启',
    icon: enabled ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle',
    color: enabled ? 'green' : 'orange'
  })
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
    
    // 恢复热重载状态
    const savedHotReloadState = localStorage.getItem('hotReloadEnabled')
    if (savedHotReloadState !== null) {
      hotReloadEnabled.value = savedHotReloadState === 'true'
    }
    
    // 加载数据库配置
    await loadDbConfig()
    
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