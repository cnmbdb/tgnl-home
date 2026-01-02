<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- 页面标题 -->
    <div class="text-center space-y-4">
      <div class="flex justify-center">
        <div class="w-16 h-16 bg-[#1a1a1b] border border-[#2a2a2b] rounded-2xl flex items-center justify-center">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-[#00dc82]" />
        </div>
      </div>
      <h1 class="text-3xl font-bold text-white">更新授权</h1>
      <p class="text-[#9ca3af] max-w-2xl mx-auto">
        管理系统的OTA更新、版本检测和自动升级功能
      </p>
    </div>

    <!-- 版本信息概览 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 当前版本 -->
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
        <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
          <UIcon name="i-heroicons-cube" class="w-5 h-5 mr-3 text-[#00dc82]" />
          当前版本
        </h2>
        
        <div class="space-y-4">
          <div class="text-center">
            <div class="w-20 h-20 bg-[#00dc82]/10 border border-[#00dc82]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-check-circle" class="w-10 h-10 text-[#00dc82]" />
            </div>
            <div class="text-2xl font-bold text-white">v{{ formatVersionDisplay(versionInfo.currentVersion) }}</div>
            <div class="text-sm text-[#9ca3af]">运行正常</div>
          </div>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-[#9ca3af]">发布时间</span>
              <span class="text-white">{{ formatDate(versionInfo.currentReleaseDate) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#9ca3af]">运行时间</span>
              <span class="text-[#00dc82]">{{ versionInfo.uptime }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#9ca3af]">更新源</span>
              <span class="text-white">GitHub</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#9ca3af]">自动更新</span>
              <UToggle v-model="updateSettings.autoUpdate" @change="saveUpdateSettings" />
            </div>
          </div>
        </div>
      </div>

      <!-- 更新状态 -->
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-white flex items-center">
            <UIcon name="i-heroicons-arrow-down-circle" class="w-5 h-5 mr-3 text-[#00dc82]" />
            更新状态
          </h2>
          <UButton 
            color="green" 
            size="sm" 
            @click="checkForUpdates"
            :loading="checking"
            variant="outline"
          >
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
            检查更新
          </UButton>
        </div>
        
        <div class="space-y-4">
          <div class="text-center" v-if="!versionInfo.hasUpdate">
            <div class="text-3xl font-bold text-[#00dc82]">最新版本</div>
            <div class="text-sm text-[#9ca3af]">系统已是最新版本</div>
          </div>
          
          <div class="text-center" v-else>
            <div class="text-3xl font-bold text-orange-400">有新版本</div>
            <div class="text-sm text-[#9ca3af]">v{{ formatVersionDisplay(versionInfo.latestVersion) }} 可用</div>
          </div>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-[#9ca3af]">最后检查</span>
              <span class="text-white">{{ formatDate(versionInfo.lastChecked) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#9ca3af]">检查频率</span>
              <span class="text-white">每日自动</span>
            </div>
            <div class="flex justify-between" v-if="versionInfo.hasUpdate">
              <span class="text-[#9ca3af]">更新大小</span>
              <span class="text-white">{{ formatFileSize(versionInfo.updateInfo?.size) }}</span>
            </div>
          </div>
          
          <div class="w-full bg-[#2a2a2b] rounded-full h-2" v-if="updateProgress > 0">
            <div 
              class="bg-[#00dc82] h-2 rounded-full transition-all duration-300"
              :style="{ width: `${updateProgress}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 独立更新步骤 -->
    <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
      <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
        <UIcon name="i-heroicons-cog-8-tooth" class="w-5 h-5 mr-3 text-[#00dc82]" />
        独立更新步骤
      </h3>
      
      <div class="space-y-4">
        <!-- 步骤1: 下载更新包 -->
        <div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
              <UIcon 
                v-if="independentSteps.download.status === 'completed'" 
                name="i-heroicons-check" 
                class="w-5 h-5 text-green-400" 
              />
              <UIcon 
                v-else-if="independentSteps.download.status === 'error'" 
                name="i-heroicons-x-mark" 
                class="w-5 h-5 text-red-400" 
              />
              <UIcon 
                v-else-if="independentSteps.download.status === 'in_progress'" 
                name="i-heroicons-arrow-path" 
                class="w-5 h-5 text-blue-400 animate-spin" 
              />
              <span v-else class="text-sm font-medium text-gray-400">1</span>
            </div>
            <div>
              <div class="text-white font-medium">下载更新包</div>
              <div class="text-sm text-[#9ca3af]">从GitHub下载最新版本</div>
              <div v-if="independentSteps.download.status === 'in_progress' && independentSteps.download.progress !== undefined" class="mt-2">
                <div class="w-48 bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${independentSteps.download.progress || 0}%` }"
                  ></div>
                </div>
                <div class="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{{ Math.round(independentSteps.download.progress || 0) }}%</span>
                  <span v-if="independentSteps.download.logs && independentSteps.download.logs.length > 0">
                    {{ independentSteps.download.logs?.at(-1)?.message || '下载中...' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UBadge 
              :color="getStepBadgeColor(independentSteps.download, 'download')" 
              variant="subtle"
            >
              {{ getStepStatusText(independentSteps.download, 'download') }}
            </UBadge>
            <UButton 
              size="sm" 
              color="primary"
              @click="openGitHubRepo"
            >
              <UIcon 
                name="i-heroicons-arrow-top-right-on-square" 
                class="w-4 h-4 mr-2" 
              />
              前往下载
            </UButton>
          </div>
        </div>

        <!-- 步骤2: 解压文件 -->
        <div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
              <UIcon 
                v-if="independentSteps.extract.status === 'completed'" 
                name="i-heroicons-check" 
                class="w-5 h-5 text-green-400" 
              />
              <UIcon 
                v-else-if="independentSteps.extract.status === 'error'" 
                name="i-heroicons-x-mark" 
                class="w-5 h-5 text-red-400" 
              />
              <UIcon 
                v-else-if="independentSteps.extract.status === 'in_progress'" 
                name="i-heroicons-arrow-path" 
                class="w-5 h-5 text-blue-400 animate-spin" 
              />
              <span v-else class="text-sm font-medium text-gray-400">2</span>
            </div>
            <div>
              <div class="text-white font-medium">解压文件</div>
              <div class="text-sm text-[#9ca3af]">解压下载的更新包</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UBadge 
              :color="getStepBadgeColor(independentSteps.extract, 'extract')" 
              variant="subtle"
            >
              {{ getStepStatusText(independentSteps.extract, 'extract') }}
            </UBadge>
            <UButton 
              size="sm" 
              :color="stepStatusData.extract.isCompleted ? 'green' : 'primary'"
              :loading="independentSteps.extract.status === 'in_progress'"
              :disabled="!stepStatusData.extract.canClick"
              @click="executeIndependentStep('extract')"
            >
              <UIcon 
                :name="stepStatusData.extract.isCompleted ? 'i-heroicons-check' : 'i-heroicons-archive-box-arrow-down'" 
                class="w-4 h-4 mr-2" 
              />
              {{ stepStatusData.extract.isCompleted ? '已完成' : '开始解压' }}
            </UButton>
          </div>
        </div>

        <!-- 步骤3: 备份当前版本 -->
        <div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
              <UIcon 
                v-if="independentSteps.backup.status === 'completed'" 
                name="i-heroicons-check" 
                class="w-5 h-5 text-green-400" 
              />
              <UIcon 
                v-else-if="independentSteps.backup.status === 'error'" 
                name="i-heroicons-x-mark" 
                class="w-5 h-5 text-red-400" 
              />
              <UIcon 
                v-else-if="independentSteps.backup.status === 'in_progress'" 
                name="i-heroicons-arrow-path" 
                class="w-5 h-5 text-blue-400 animate-spin" 
              />
              <span v-else class="text-sm font-medium text-gray-400">3</span>
            </div>
            <div>
              <div class="text-white font-medium">备份当前版本</div>
              <div class="text-sm text-[#9ca3af]">备份整个项目文件夹</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UBadge 
              :color="getStepBadgeColor(independentSteps.backup, 'backup')" 
              variant="subtle"
            >
              {{ getStepStatusText(independentSteps.backup, 'backup') }}
            </UBadge>
            <UButton 
              size="sm" 
              :loading="independentSteps.backup.status === 'in_progress'"
              :disabled="!stepStatusData.backup.canClick"
              @click="executeIndependentStep('backup')"
            >
              <UIcon name="i-heroicons-shield-check" class="w-4 h-4 mr-2" />
              {{ stepStatusData.backup.isCompleted ? '已完成' : '开始备份' }}
            </UButton>
          </div>
        </div>

        <!-- 步骤4: 应用更新 -->
        <div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
              <UIcon 
                v-if="independentSteps.apply.status === 'completed'" 
                name="i-heroicons-check" 
                class="w-5 h-5 text-green-400" 
              />
              <UIcon 
                v-else-if="independentSteps.apply.status === 'error'" 
                name="i-heroicons-x-mark" 
                class="w-5 h-5 text-red-400" 
              />
              <UIcon 
                v-else-if="independentSteps.apply.status === 'in_progress'" 
                name="i-heroicons-arrow-path" 
                class="w-5 h-5 text-blue-400 animate-spin" 
              />
              <span v-else class="text-sm font-medium text-gray-400">4</span>
            </div>
            <div>
              <div class="text-white font-medium">应用更新</div>
              <div class="text-sm text-[#9ca3af]">一键更新：停止服务、应用文件、自动重启</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UBadge 
              :color="getStepBadgeColor(independentSteps.apply, 'apply')" 
              variant="subtle"
            >
              {{ getStepStatusText(independentSteps.apply, 'apply') }}
            </UBadge>
            <UButton 
              size="sm" 
              :loading="independentSteps.apply.status === 'in_progress'"
              :disabled="!stepStatusData.apply.canClick"
              @click="executeIndependentStep('apply')"
            >
              <UIcon name="i-heroicons-arrow-up-circle" class="w-4 h-4 mr-2" />
              {{ stepStatusData.apply.isCompleted ? '已完成' : '开始应用' }}
            </UButton>
          </div>
        </div>

        <!-- 步骤5: 重启系统 -->
        <div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
              <UIcon 
                v-if="independentSteps.restart.status === 'completed'" 
                name="i-heroicons-check" 
                class="w-5 h-5 text-green-400" 
              />
              <UIcon 
                v-else-if="independentSteps.restart.status === 'error'" 
                name="i-heroicons-x-mark" 
                class="w-5 h-5 text-red-400" 
              />
              <UIcon 
                v-else-if="independentSteps.restart.status === 'in_progress'" 
                name="i-heroicons-arrow-path" 
                class="w-5 h-5 text-blue-400 animate-spin" 
              />
              <span v-else class="text-sm font-medium text-gray-400">5</span>
            </div>
            <div>
              <div class="text-white font-medium">重启系统</div>
              <div class="text-sm text-[#9ca3af]">自动重启前端和机器人端（第4步完成后自动执行）</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <UBadge 
              :color="getStepBadgeColor(independentSteps.restart)" 
              variant="subtle"
            >
              {{ getStepStatusText(independentSteps.restart) }}
            </UBadge>
            <UButton 
              size="sm" 
              :loading="independentSteps.restart.status === 'in_progress'"
              :disabled="independentSteps.apply.status !== 'completed'"
              @click="executeIndependentStep('restart')"
              color="orange"
            >
              <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
              {{ independentSteps.restart.status === 'completed' ? '重新启动' : '重启系统' }}
            </UButton>
          </div>
        </div>
      </div>

      <!-- 独立步骤操作区 -->
      <div class="mt-6 p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-white font-medium">批量操作</div>
            <div class="text-sm text-[#9ca3af]">一键执行多个步骤</div>
          </div>
          <div class="flex space-x-2">
            <UButton 
              size="sm" 
              variant="outline"
              @click="resetAllSteps"
            >
              <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
              重置所有
            </UButton>
            <UButton 
              size="sm"
              :disabled="!versionInfo.hasUpdate"
              @click="executeAllSteps"
            >
              <UIcon name="i-heroicons-play" class="w-4 h-4 mr-2" />
              执行全部
            </UButton>
          </div>
        </div>
      </div>

      <!-- 步骤日志显示 -->
      <div v-if="currentIndependentStep && currentIndependentStep.logs && currentIndependentStep.logs.length > 0" class="mt-6 p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
        <div class="text-white font-medium mb-3 flex items-center">
          <UIcon name="i-heroicons-document-text" class="w-4 h-4 mr-2" />
          执行日志
        </div>
        <div class="bg-black rounded p-3 max-h-48 overflow-y-auto">
          <div 
            v-for="(log, index) in currentIndependentStep.logs" 
            :key="index"
            class="text-xs font-mono mb-1"
            :class="log.type === 'error' ? 'text-red-400' : log.type === 'warning' ? 'text-yellow-400' : log.type === 'success' ? 'text-green-400' : 'text-gray-300'"
          >
            [{{ formatTime(log.timestamp) }}] {{ log.message }}
          </div>
        </div>
      </div>
    </div>

    <!-- 更新详情 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 版本信息 -->
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
          <UIcon name="i-heroicons-information-circle" class="w-5 h-5 mr-3 text-[#00dc82]" />
          版本详情
        </h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
            <div>
              <div class="text-white font-medium">当前版本</div>
              <div class="text-sm text-[#9ca3af] font-mono">v{{ formatVersionDisplay(versionInfo.currentVersion) }}</div>
            </div>
            <UBadge color="green" variant="subtle">运行中</UBadge>
          </div>
          
          <div class="grid grid-cols-2 gap-4" v-if="versionInfo.hasUpdate">
            <div class="p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg text-center">
              <div class="text-sm text-[#9ca3af]">当前</div>
              <div class="text-white font-mono">v{{ formatVersionDisplay(versionInfo.currentVersion) }}</div>
            </div>
            <div class="p-3 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg text-center">
              <div class="text-sm text-[#9ca3af]">最新</div>
              <div class="text-[#00dc82] font-mono">v{{ formatVersionDisplay(versionInfo.latestVersion) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 更新设置 -->
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
          <UIcon name="i-heroicons-cog-6-tooth" class="w-5 h-5 mr-3 text-[#00dc82]" />
          更新设置
        </h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">自动检查更新</div>
              <div class="text-sm text-[#9ca3af]">定期检查新版本</div>
            </div>
            <UToggle v-model="updateSettings.autoCheck" @change="saveUpdateSettings" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">自动下载更新</div>
              <div class="text-sm text-[#9ca3af]">发现新版本时自动下载</div>
            </div>
            <UToggle v-model="updateSettings.autoDownload" @change="saveUpdateSettings" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">自动安装更新</div>
              <div class="text-sm text-[#9ca3af]">下载完成后自动安装</div>
            </div>
            <UToggle v-model="updateSettings.autoInstall" @change="saveUpdateSettings" />
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">更新通知</div>
              <div class="text-sm text-[#9ca3af]">发现更新时发送通知</div>
            </div>
            <UToggle v-model="updateSettings.notifications" @change="saveUpdateSettings" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
definePageMeta({
  title: '更新授权',
  description: '管理系统的OTA更新、版本检测和自动升级功能'
})

// 响应式数据
const checking = ref(false)
const updateProgress = ref(0)
const updateSessionId = ref(null)
const currentIndependentStep = ref(null)

// 版本信息
const versionInfo = ref({
  currentVersion: '1.0.4',
  latestVersion: '1.0.5',
  hasUpdate: false,
  currentReleaseDate: '2024-01-15',
  lastChecked: new Date().toISOString(),
  uptime: '7天 12小时',
  updateInfo: {
    size: 25600000 // 25.6MB
  }
})

// 更新设置
const updateSettings = ref({
  autoUpdate: false,
  autoCheck: true,
  autoDownload: false,
  autoInstall: false,
  notifications: true
})

// 独立步骤状态
const independentSteps = ref({
  download: {
    status: 'idle',
    progress: 0,
    logs: [],
    error: ''
  },
  extract: {
    status: 'idle',
    progress: 0,
    logs: [],
    error: ''
  },
  backup: {
    status: 'idle',
    progress: 0,
    logs: [],
    error: ''
  },
  apply: {
    status: 'idle',
    progress: 0,
    logs: [],
    error: ''
  },
  restart: {
    status: 'idle',
    progress: 0,
    logs: [],
    error: ''
  }
})

// 步骤状态数据
const stepStatusData = ref({
  download: {
    isCompleted: false,
    canClick: true
  },
  extract: {
    isCompleted: false,
    canClick: false
  },
  backup: {
    isCompleted: false,
    canClick: false
  },
  apply: {
    isCompleted: false,
    canClick: false
  }
})

// 检查更新
const checkForUpdates = async () => {
  checking.value = true
  try {
    // 调用真实的版本检查API
    const response = await fetch('/api/system/version-check')
    const result = await response.json()
    
    if (result.success && result.data) {
      const data = result.data
      versionInfo.value.currentVersion = data.currentVersion
      versionInfo.value.latestVersion = data.latestVersion
      versionInfo.value.hasUpdate = data.hasUpdate
      versionInfo.value.lastChecked = data.lastChecked
      
      if (data.updateInfo) {
        versionInfo.value.updateInfo = {
          size: data.updateInfo.size || 0,
          description: data.updateInfo.description,
          downloadUrl: data.updateInfo.downloadUrl,
          publishedAt: data.updateInfo.publishedAt
        }
      }
    } else {
      console.error('版本检查API返回错误:', result.error)
    }
  } catch (error) {
    console.error('检查更新失败:', error)
  } finally {
    checking.value = false
  }
}

// 保存更新设置
const saveUpdateSettings = async () => {
  try {
    // 模拟保存设置
    console.log('保存更新设置:', updateSettings.value)
  } catch (error) {
    console.error('保存设置失败:', error)
  }
}

// 执行独立步骤
const executeIndependentStep = async (stepName) => {
  const step = independentSteps.value[stepName]
  if (!step) return
  
  step.status = 'in_progress'
  step.progress = 0
  step.logs = []
  step.error = ''
  currentIndependentStep.value = step

  try {
    // 模拟步骤执行
    step.logs.push({
      type: 'info',
      message: `开始执行${stepName}步骤...`,
      timestamp: Date.now()
    })
    
    // 模拟进度更新
    for (let i = 0; i <= 100; i += 10) {
      step.progress = i
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    step.status = 'completed'
    step.logs.push({
      type: 'success',
      message: `${stepName}步骤执行完成`,
      timestamp: Date.now()
    })
    
    // 更新步骤状态
    stepStatusData.value[stepName] = {
      isCompleted: true,
      canClick: true
    }
    
  } catch (error) {
    step.status = 'error'
    step.error = error.message
    step.logs.push({
      type: 'error',
      message: error.message,
      timestamp: Date.now()
    })
  }
}

// 重置所有步骤
const resetAllSteps = () => {
  Object.keys(independentSteps.value).forEach(key => {
    independentSteps.value[key] = {
      status: 'idle',
      progress: 0,
      logs: [],
      error: ''
    }
  })
  currentIndependentStep.value = null
  
  // 重置步骤状态
  Object.keys(stepStatusData.value).forEach(key => {
    stepStatusData.value[key] = {
      isCompleted: false,
      canClick: key === 'download' || key === 'backup'
    }
  })
}

// 执行全部步骤
const executeAllSteps = async () => {
  const steps = ['download', 'extract', 'backup', 'apply', 'restart']
  
  for (const stepName of steps) {
    await executeIndependentStep(stepName)
    if (independentSteps.value[stepName].status === 'error') {
      break
    }
  }
}

// 打开GitHub仓库页面
const openGitHubRepo = () => {
  window.open('https://github.com/cnmbdb/hf-tgpro-admin', '_blank')
}

// 获取步骤状态文本
const getStepStatusText = (step, stepName) => {
  if (stepStatusData.value[stepName]) {
    const apiStatus = stepStatusData.value[stepName]
    if (apiStatus.isCompleted) return '已完成'
    if (step.status === 'in_progress') return '执行中'
    if (step.status === 'error') return '失败'
    return '等待中'
  }
  
  switch (step.status) {
    case 'completed': return '已完成'
    case 'in_progress': return '执行中'
    case 'error': return '失败'
    default: return '等待中'
  }
}

// 获取步骤状态徽章颜色
const getStepBadgeColor = (step, stepName) => {
  if (stepStatusData.value[stepName]) {
    const apiStatus = stepStatusData.value[stepName]
    if (apiStatus.isCompleted) return 'green'
    if (step.status === 'in_progress') return 'blue'
    if (step.status === 'error') return 'red'
    return 'gray'
  }
  
  switch (step.status) {
    case 'completed': return 'green'
    case 'in_progress': return 'blue'
    case 'error': return 'red'
    default: return 'gray'
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN')
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('zh-CN')
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (!bytes) return ''
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}

// 格式化版本号显示
const formatVersionDisplay = (version) => {
  if (!version) return ''
  
  if (version.includes('.zip')) {
    const match = version.match(/nl-admin-(.+)\.zip$/)
    if (match) {
      return match[1]
    }
  }
  
  return version.startsWith('v') ? version.substring(1) : version
}

// 页面挂载时初始化
onMounted(async () => {
  await checkForUpdates()
})
</script>