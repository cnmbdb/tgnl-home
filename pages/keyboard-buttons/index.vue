<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white flex items-center gap-3">
          <div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-rectangle-group" class="w-5 h-5 text-[#00dc82]" />
          </div>
          键盘按钮
        </h1>
        <p class="mt-1 text-sm text-[#9ca3af]">管理机器人的自定义键盘按钮布局</p>
      </div>
      <div class="flex gap-2">
        <UButton variant="outline" size="sm" @click="refreshKeyboards">
          <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
          刷新
        </UButton>
        <UButton color="primary" size="sm" class="bg-[#00dc82] hover:bg-[#00dc82]/80" @click="showAddModal = true">
          <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
          创建键盘
        </UButton>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">总键盘数</p>
            <p class="text-2xl font-bold text-white">{{ stats.totalKeyboards }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-rectangle-group" class="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">活跃键盘</p>
            <p class="text-2xl font-bold text-white">{{ stats.activeKeyboards }}</p>
          </div>
          <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">总按钮数</p>
            <p class="text-2xl font-bold text-white">{{ stats.totalButtons }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-squares-2x2" class="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">今日使用</p>
            <p class="text-2xl font-bold text-white">{{ stats.todayUsage }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-cursor-arrow-rays" class="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- 键盘列表 -->
    <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg">
      <div class="p-4 border-b border-[#2a2a2b]">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">键盘列表</h2>
          <div class="flex gap-2">
            <UInput
              v-model="searchQuery"
              placeholder="搜索键盘名称..."
              class="w-64"
              icon="i-heroicons-magnifying-glass"
            />
            <USelect
              v-model="statusFilter"
              :options="statusOptions"
              class="w-32"
            />
          </div>
        </div>
      </div>

      <!-- 键盘卡片网格布局 - 一行两个 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="keyboard in filteredKeyboards" 
          :key="keyboard.id" 
          class="bg-gradient-to-br from-[#1a1a1b] to-[#2a2a2b] border border-[#3a3a3b] rounded-xl p-6 hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 group"
        >
          <!-- 卡片头部 -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {{ keyboard.name }}
              </h3>
              <p class="text-sm text-[#9ca3af] line-clamp-2">{{ keyboard.description }}</p>
            </div>
            <UBadge
              :color="keyboard.status === 'active' ? 'green' : 'red'"
              variant="subtle"
              size="sm"
              class="ml-2"
            >
              {{ keyboard.status === 'active' ? '活跃' : '禁用' }}
            </UBadge>
          </div>

          <!-- 键盘按钮预览 -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-[#9ca3af] mb-3">按钮布局</h4>
            <div class="space-y-2">
              <div
                v-for="(row, rowIndex) in keyboard.layout"
                :key="rowIndex"
                class="grid grid-cols-2 gap-2 w-full"
              >
                <button
                  v-for="(button, buttonIndex) in row"
                  :key="`${rowIndex}-${buttonIndex}`"
                  class="w-full px-3 py-2 bg-gradient-to-r from-[#2a2a2b] to-[#323234] border border-[#3a3a3b] rounded-lg text-sm text-white hover:border-blue-400/30 transition-all duration-200 min-h-[40px] text-center block"
                >
                  {{ button.text }}
                </button>
              </div>
            </div>
          </div>

          <!-- 统计信息 -->
          <div class="grid grid-cols-2 gap-4 mb-4 p-3 bg-[#0c0c0d]/50 rounded-lg">
            <div class="text-center">
              <div class="text-lg font-semibold text-white">{{ keyboard.buttonCount }}</div>
              <div class="text-xs text-[#9ca3af]">按钮数量</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-semibold text-white">{{ keyboard.usageCount }}</div>
              <div class="text-xs text-[#9ca3af]">使用次数</div>
            </div>
          </div>

          <!-- 创建时间 -->
          <div class="text-xs text-[#9ca3af] mb-4">
            创建于 {{ formatDate(keyboard.createdAt) }}
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-2">
            <UButton variant="soft" size="sm" class="flex-1" @click="editKeyboard(keyboard)">
              <UIcon name="i-heroicons-pencil" class="w-4 h-4 mr-1" />
              编辑
            </UButton>
            <UButton variant="soft" size="sm" @click="previewKeyboard(keyboard)">
              <UIcon name="i-heroicons-eye" class="w-4 h-4" />
            </UButton>
            <UButton 
              variant="soft" 
              size="sm" 
              :color="keyboard.status === 'active' ? 'red' : 'green'"
              @click="toggleKeyboardStatus(keyboard)"
            >
              <UIcon 
                :name="keyboard.status === 'active' ? 'i-heroicons-pause' : 'i-heroicons-play'" 
                class="w-4 h-4" 
              />
            </UButton>
            <UButton variant="soft" size="sm" color="red" @click="deleteKeyboard(keyboard)">
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建键盘模态框 -->
    <UModal v-model="showAddModal" :ui="{ width: 'sm:max-w-2xl' }">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-white mb-4">创建键盘</h3>
        <div class="space-y-4">
          <UInput
            v-model="newKeyboard.name"
            label="键盘名称"
            placeholder="输入键盘名称"
          />
          
          <UTextarea
            v-model="newKeyboard.description"
            label="描述"
            placeholder="输入键盘描述"
          />
          
          <div>
            <label class="block text-sm font-medium text-white mb-2">键盘布局</label>
            <div class="space-y-2">
              <div v-for="(row, rowIndex) in newKeyboard.layout" :key="rowIndex" class="flex gap-2 items-center">
                <div class="flex-1 flex gap-2">
                  <div v-for="(button, buttonIndex) in row" :key="buttonIndex" class="flex-1">
                    <UInput
                      v-model="button.text"
                      :placeholder="`按钮 ${buttonIndex + 1}`"
                      size="sm"
                    />
                  </div>
                </div>
                <UButton 
                  variant="ghost" 
                  size="xs" 
                  color="green"
                  @click="addButtonToRow(rowIndex)"
                  :disabled="row.length >= 4"
                >
                  <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                </UButton>
                <UButton 
                  variant="ghost" 
                  size="xs" 
                  color="red"
                  @click="removeRow(rowIndex)"
                  :disabled="newKeyboard.layout.length <= 1"
                >
                  <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
            <div class="mt-2 flex gap-2">
              <UButton 
                variant="outline" 
                size="sm" 
                @click="addRow"
                :disabled="newKeyboard.layout.length >= 8"
              >
                <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
                添加行
              </UButton>
            </div>
          </div>
          
          <USelect
            v-model="newKeyboard.status"
            label="状态"
            :options="[
              { label: '活跃', value: 'active' },
              { label: '禁用', value: 'inactive' }
            ]"
          />
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <UButton variant="outline" @click="showAddModal = false">取消</UButton>
          <UButton color="primary" @click="createKeyboard">创建</UButton>
        </div>
      </div>
    </UModal>

    <!-- 预览模态框 -->
    <UModal v-model="showPreviewModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-white mb-4">键盘预览</h3>
        <div v-if="previewKeyboardData" class="space-y-2">
          <div v-for="(row, rowIndex) in previewKeyboardData.layout" :key="rowIndex" class="flex gap-2">
            <button
              v-for="(button, buttonIndex) in row"
              :key="buttonIndex"
              class="flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors"
            >
              {{ button.text }}
            </button>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <UButton @click="showPreviewModal = false">关闭</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
definePageMeta({
  middleware: 'auth'
})

// 响应式数据
const showAddModal = ref(false)
const showPreviewModal = ref(false)
const searchQuery = ref('')
const statusFilter = ref('all')
const previewKeyboardData = ref<any>(null)

// 统计数据
const stats = ref({
  totalKeyboards: 1,
  activeKeyboards: 1,
  totalButtons: 8,
  todayUsage: 1245
})

// 新键盘表单
const newKeyboard = ref({
  name: '',
  description: '',
  layout: [
    [{ text: '按钮1', action: 'text' }]
  ],
  status: 'active'
})

// 状态选项
const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '活跃', value: 'active' },
  { label: '禁用', value: 'inactive' }
]

// 真实机器人回复键盘数据
const keyboards = ref([
  {
    id: 1,
    name: '主键盘菜单',
    description: '机器人主要功能键盘布局（回复键盘）',
    type: 'reply',
    layout: [
      [
        { text: '💰 预存扣费', action: 'text' },
        { text: '✅ USDT转TRX', action: 'text' }
      ],
      [
        { text: '🔍 查交易', action: 'text' },
        { text: '⚡ TRX转能量', action: 'text' }
      ],
      [
        { text: '📍 已监听地址', action: 'text' },
        { text: '🔔 开始/结束监听', action: 'text' }
      ],
      [
        { text: '💳 我要充值', action: 'text' },
        { text: '👤 个人中心', action: 'text' }
      ]
    ],
    buttonCount: 8,
    status: 'active',
    usageCount: 1245,
    createdAt: '2024-01-15T10:30:00Z'
  }
])

// 计算属性
const filteredKeyboards = computed(() => {
  let filtered = keyboards.value

  if (searchQuery.value) {
    filtered = filtered.filter(keyboard => 
      keyboard.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      keyboard.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(keyboard => keyboard.status === statusFilter.value)
  }

  return filtered
})

// 方法
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('zh-CN')
}

const refreshKeyboards = () => {
  console.log('刷新键盘列表')
}

const addRow = () => {
  newKeyboard.value.layout.push([{ text: '', action: 'text' }])
}

const removeRow = (index: number) => {
  newKeyboard.value.layout.splice(index, 1)
}

const addButtonToRow = (rowIndex: number) => {
  newKeyboard.value.layout[rowIndex].push({ text: '', action: 'text' })
}

const createKeyboard = () => {
  if (!newKeyboard.value.name) {
    return
  }

  // 计算按钮总数
  const buttonCount = newKeyboard.value.layout.reduce((total, row) => total + row.length, 0)

  const keyboard = {
    id: Date.now(),
    name: newKeyboard.value.name,
    description: newKeyboard.value.description,
    type: 'reply',
    layout: newKeyboard.value.layout.map(row => 
      row.filter(button => button.text.trim() !== '')
    ).filter(row => row.length > 0),
    buttonCount,
    status: newKeyboard.value.status,
    usageCount: 0,
    createdAt: new Date().toISOString()
  }

  keyboards.value.unshift(keyboard)
  
  // 重置表单
  newKeyboard.value = {
    name: '',
    description: '',
    layout: [
      [{ text: '按钮1', action: 'text' }, { text: '按钮2', action: 'text' }]
    ],
    status: 'active'
  }
  
  showAddModal.value = false
}

const editKeyboard = (keyboard: any) => {
  console.log('编辑键盘:', keyboard)
}

const previewKeyboard = (keyboard: any) => {
  previewKeyboardData.value = keyboard
  showPreviewModal.value = true
}

const toggleKeyboardStatus = (keyboard: any) => {
  keyboard.status = keyboard.status === 'active' ? 'inactive' : 'active'
}

const deleteKeyboard = (keyboard: any) => {
  const index = keyboards.value.findIndex(k => k.id === keyboard.id)
  if (index > -1) {
    keyboards.value.splice(index, 1)
  }
}
</script>