<template>
  <div class="max-w-6xl mx-auto space-y-6">
    <!-- 页面标题 -->
    <div class="text-center space-y-4">
      <div class="flex justify-center">
        <div class="w-16 h-16 bg-[#1a1a1b] border border-[#2a2a2b] rounded-2xl flex items-center justify-center">
          <UIcon name="i-heroicons-key" class="w-8 h-8 text-[#00dc82]" />
        </div>
      </div>
      <h1 class="text-3xl font-bold text-white">更新授权</h1>
      <p class="text-[#9ca3af] max-w-2xl mx-auto">
        管理系统授权许可、更新授权状态和许可证信息
      </p>
    </div>

    <!-- 当前授权状态 -->
    <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
      <h2 class="text-xl font-semibold text-white mb-4 flex items-center">
        <UIcon name="i-heroicons-shield-check" class="w-5 h-5 mr-3 text-[#00dc82]" />
        当前授权状态
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-[#00dc82]" />
          </div>
          <div class="text-lg font-semibold text-white">{{ license.status }}</div>
          <div class="text-sm text-[#00dc82]">授权状态</div>
          <div class="text-xs text-[#9ca3af]">有效期至: {{ license.expiryDate }}</div>
        </div>
        
        <div class="text-center space-y-2">
          <div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">
            <UIcon name="i-heroicons-users" class="w-6 h-6 text-blue-400" />
          </div>
          <div class="text-lg font-semibold text-white">{{ license.maxUsers }}</div>
          <div class="text-sm text-blue-400">最大用户数</div>
          <div class="text-xs text-[#9ca3af]">当前: {{ license.currentUsers }} 用户</div>
        </div>
        
        <div class="text-center space-y-2">
          <div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">
            <UIcon name="i-heroicons-server" class="w-6 h-6 text-purple-400" />
          </div>
          <div class="text-lg font-semibold text-white">{{ license.edition }}</div>
          <div class="text-sm text-purple-400">授权版本</div>
          <div class="text-xs text-[#9ca3af]">功能: {{ license.features }}</div>
        </div>
        
        <div class="text-center space-y-2">
          <div class="w-12 h-12 bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl flex items-center justify-center mx-auto">
            <UIcon name="i-heroicons-calendar-days" class="w-6 h-6 text-orange-400" />
          </div>
          <div class="text-lg font-semibold text-white">{{ license.remainingDays }}</div>
          <div class="text-sm text-orange-400">剩余天数</div>
          <div class="text-xs text-[#9ca3af]">自动续期: {{ license.autoRenewal ? '已启用' : '已禁用' }}</div>
        </div>
      </div>
    </div>

    <!-- 授权信息 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 许可证详情 -->
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
          <UIcon name="i-heroicons-document-text" class="w-5 h-5 mr-3 text-[#00dc82]" />
          许可证详情
        </h3>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">许可证ID</div>
              <div class="text-sm text-[#9ca3af] font-mono">{{ licenseDetails.id }}</div>
            </div>
            <UButton variant="outline" size="sm" @click="copyLicenseId">
              <UIcon name="i-heroicons-clipboard" class="w-4 h-4" />
            </UButton>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">授权机构</div>
              <div class="text-sm text-[#9ca3af]">{{ licenseDetails.issuer }}</div>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">授权类型</div>
              <div class="text-sm text-[#9ca3af]">{{ licenseDetails.type }}</div>
            </div>
            <UBadge :color="licenseDetails.type === '永久授权' ? 'green' : 'blue'" variant="subtle">
              {{ licenseDetails.type }}
            </UBadge>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">激活时间</div>
              <div class="text-sm text-[#9ca3af]">{{ licenseDetails.activatedAt }}</div>
            </div>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <div class="text-white font-medium">最后验证</div>
              <div class="text-sm text-[#9ca3af]">{{ licenseDetails.lastVerified }}</div>
            </div>
            <UButton variant="outline" size="sm" @click="verifyLicense" :loading="verifying">
              <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- 功能权限 -->
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
          <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 mr-3 text-[#00dc82]" />
          功能权限
        </h3>
        
        <div class="space-y-4">
          <div v-for="feature in features" :key="feature.name" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <UIcon :name="feature.icon" class="w-5 h-5 text-[#00dc82]" />
              <div>
                <div class="text-white font-medium">{{ feature.name }}</div>
                <div class="text-sm text-[#9ca3af]">{{ feature.description }}</div>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <UBadge 
                :color="feature.enabled ? 'green' : 'gray'" 
                variant="subtle"
                size="xs"
              >
                {{ feature.enabled ? '已启用' : '未授权' }}
              </UBadge>
              <UIcon 
                :name="feature.enabled ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                :class="feature.enabled ? 'text-[#00dc82]' : 'text-red-400'"
                class="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 更新授权 -->
    <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
      <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
        <UIcon name="i-heroicons-arrow-up-circle" class="w-5 h-5 mr-3 text-[#00dc82]" />
        更新授权
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-white font-medium mb-2">新授权密钥</label>
            <UTextarea 
              v-model="newLicenseKey" 
              placeholder="请输入新的授权密钥..."
              rows="4"
              class="w-full"
            />
          </div>
          
          <div class="flex space-x-4">
            <UButton @click="updateLicense" :loading="updating" :disabled="!newLicenseKey">
              <UIcon name="i-heroicons-key" class="w-4 h-4 mr-2" />
              更新授权
            </UButton>
            <UButton variant="outline" @click="validateKey" :disabled="!newLicenseKey">
              <UIcon name="i-heroicons-shield-check" class="w-4 h-4 mr-2" />
              验证密钥
            </UButton>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <div class="text-white font-medium mb-2">授权文件上传</div>
            <div class="border-2 border-dashed border-[#2a2a2b] rounded-lg p-6 text-center">
              <UIcon name="i-heroicons-cloud-arrow-up" class="w-8 h-8 text-[#9ca3af] mx-auto mb-2" />
              <div class="text-[#9ca3af] mb-2">拖拽授权文件到此处或</div>
              <UButton variant="outline" @click="selectFile">
                选择文件
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 授权历史 -->
    <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-xl p-6">
      <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
        <UIcon name="i-heroicons-clock" class="w-5 h-5 mr-3 text-[#00dc82]" />
        授权历史
      </h3>
      
      <div class="space-y-4">
        <div v-for="history in licenseHistory" :key="history.id" class="flex items-center justify-between p-4 bg-[#0c0c0d] border border-[#2a2a2b] rounded-lg">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
              <UIcon :name="history.icon" class="w-5 h-5 text-[#00dc82]" />
            </div>
            <div>
              <div class="text-white font-medium">{{ history.action }}</div>
              <div class="text-sm text-[#9ca3af]">{{ history.description }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-white">{{ history.date }}</div>
            <div class="text-xs text-[#9ca3af]">{{ history.time }}</div>
          </div>
        </div>
      </div>
      
      <div class="mt-6 flex justify-center">
        <UButton variant="outline" @click="loadMoreHistory">
          <UIcon name="i-heroicons-arrow-down" class="w-4 h-4 mr-2" />
          加载更多
        </UButton>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-center space-x-4">
      <UButton @click="refreshLicense" :loading="refreshing" size="lg">
        <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
        刷新授权
      </UButton>
      <UButton variant="outline" @click="exportLicense" size="lg">
        <UIcon name="i-heroicons-arrow-down-tray" class="w-5 h-5 mr-2" />
        导出授权信息
      </UButton>
      <UButton variant="outline" @click="contactSupport" size="lg">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 mr-2" />
        联系支持
      </UButton>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
definePageMeta({
  title: '更新授权',
  description: '管理系统授权许可、更新授权状态和许可证信息'
})

// 响应式数据
const license = ref({
  status: '已激活',
  expiryDate: '2024-12-31',
  maxUsers: 100,
  currentUsers: 45,
  edition: '企业版',
  features: '全功能',
  remainingDays: 156,
  autoRenewal: true
})

const licenseDetails = ref({
  id: 'TGP-ENT-2024-XXXX-XXXX-XXXX',
  issuer: 'TG Pro Technologies',
  type: '年度授权',
  activatedAt: '2024-01-01 10:30:00',
  lastVerified: '2小时前'
})

const features = ref([
  {
    name: '机器人管理',
    description: '创建和管理多个Telegram机器人',
    icon: 'i-heroicons-cpu-chip',
    enabled: true
  },
  {
    name: '用户管理',
    description: '管理用户权限和访问控制',
    icon: 'i-heroicons-users',
    enabled: true
  },
  {
    name: '数据分析',
    description: '详细的使用统计和分析报告',
    icon: 'i-heroicons-chart-bar',
    enabled: true
  },
  {
    name: 'API 接口',
    description: '完整的REST API访问权限',
    icon: 'i-heroicons-code-bracket',
    enabled: true
  },
  {
    name: '高级功能',
    description: '自定义插件和扩展功能',
    icon: 'i-heroicons-puzzle-piece',
    enabled: false
  },
  {
    name: '技术支持',
    description: '7x24小时技术支持服务',
    icon: 'i-heroicons-chat-bubble-left-right',
    enabled: true
  }
])

const licenseHistory = ref([
  {
    id: 1,
    action: '授权激活',
    description: '成功激活企业版授权',
    date: '2024-01-01',
    time: '10:30:00',
    icon: 'i-heroicons-check-circle'
  },
  {
    id: 2,
    action: '授权验证',
    description: '定期授权状态验证',
    date: '2024-01-15',
    time: '14:20:00',
    icon: 'i-heroicons-shield-check'
  },
  {
    id: 3,
    action: '功能更新',
    description: '新增高级分析功能',
    date: '2024-02-01',
    time: '09:15:00',
    icon: 'i-heroicons-arrow-up-circle'
  },
  {
    id: 4,
    action: '授权续期',
    description: '自动续期至2024年底',
    date: '2024-03-01',
    time: '00:00:00',
    icon: 'i-heroicons-calendar-days'
  }
])

const newLicenseKey = ref('')

// 加载状态
const verifying = ref(false)
const updating = ref(false)
const refreshing = ref(false)

// 方法
const copyLicenseId = () => {
  navigator.clipboard.writeText(licenseDetails.value.id)
  // 显示复制成功提示
}

const verifyLicense = async () => {
  verifying.value = true
  try {
    // 验证授权逻辑
    await new Promise(resolve => setTimeout(resolve, 2000))
    licenseDetails.value.lastVerified = '刚刚'
  } finally {
    verifying.value = false
  }
}

const updateLicense = async () => {
  updating.value = true
  try {
    // 更新授权逻辑
    await new Promise(resolve => setTimeout(resolve, 3000))
    newLicenseKey.value = ''
  } finally {
    updating.value = false
  }
}

const validateKey = () => {
  // 验证密钥逻辑
}

const selectFile = () => {
  // 选择文件逻辑
}

const loadMoreHistory = () => {
  // 加载更多历史记录逻辑
}

const refreshLicense = async () => {
  refreshing.value = true
  try {
    // 刷新授权逻辑
    await new Promise(resolve => setTimeout(resolve, 2000))
  } finally {
    refreshing.value = false
  }
}

const exportLicense = () => {
  // 导出授权信息逻辑
}

const contactSupport = () => {
  // 联系支持逻辑
}

// 生命周期
onMounted(() => {
  // 初始化数据
})
</script>