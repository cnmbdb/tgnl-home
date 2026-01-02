<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white flex items-center gap-3">
          <div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-squares-plus" class="w-5 h-5 text-[#00dc82]" />
          </div>
          内联键盘
        </h1>
        <p class="mt-1 text-sm text-[#9ca3af]">管理机器人的内联键盘按钮和回调功能</p>
      </div>
      <div class="flex gap-2">
        <UButton variant="outline" size="sm" @click="refreshInlineKeyboards">
          <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
          刷新
        </UButton>
        <UButton color="primary" size="sm" class="bg-[#00dc82] hover:bg-[#00dc82]/80" @click="showAddModal = true">
          <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
          创建内联键盘
        </UButton>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">总内联键盘</p>
            <p class="text-2xl font-bold text-white">{{ stats.totalInlineKeyboards }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-squares-plus" class="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">活跃键盘</p>
            <p class="text-2xl font-bold text-white">{{ stats.activeInlineKeyboards }}</p>
          </div>
          <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">总回调数</p>
            <p class="text-2xl font-bold text-white">{{ stats.totalCallbacks }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-cursor-arrow-ripple" class="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">今日点击</p>
            <p class="text-2xl font-bold text-white">{{ stats.todayClicks }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-hand-raised" class="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- 内联键盘列表 -->
    <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg">
      <div class="p-4 border-b border-[#2a2a2b]">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">内联键盘列表</h2>
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

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0c0c0d]">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">键盘名称</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">按钮预览</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">回调类型</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">状态</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">点击次数</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">创建时间</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#2a2a2b]">
            <tr v-for="keyboard in filteredInlineKeyboards" :key="keyboard.id" class="hover:bg-[#2a2a2b]/50">
              <td class="px-4 py-3">
                <div class="text-sm font-medium text-white">{{ keyboard.name }}</div>
                <div class="text-sm text-[#9ca3af]">{{ keyboard.description }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="space-y-1 max-w-xs">
                  <div v-for="(row, rowIndex) in keyboard.buttons" :key="rowIndex" class="flex gap-1">
                    <div
                      v-for="(button, buttonIndex) in row"
                      :key="buttonIndex"
                      class="px-2 py-1 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-xs text-white truncate flex items-center gap-1"
                      style="max-width: 80px;"
                    >
                      <UIcon 
                        v-if="button.type === 'url'" 
                        name="i-heroicons-link" 
                        class="w-3 h-3 text-blue-400" 
                      />
                      <UIcon 
                        v-else-if="button.type === 'callback'" 
                        name="i-heroicons-cursor-arrow-rays" 
                        class="w-3 h-3 text-green-400" 
                      />
                      <UIcon 
                        v-else-if="button.type === 'switch_inline'" 
                        name="i-heroicons-arrow-path-rounded-square" 
                        class="w-3 h-3 text-purple-400" 
                      />
                      {{ button.text }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1">
                  <UBadge
                    v-for="type in getUniqueButtonTypes(keyboard.buttons)"
                    :key="type"
                    :color="getTypeColor(type)"
                    variant="subtle"
                    size="sm"
                  >
                    {{ getTypeLabel(type) }}
                  </UBadge>
                </div>
              </td>
              <td class="px-4 py-3">
                <UBadge
                  :color="keyboard.status === 'active' ? 'green' : 'red'"
                  variant="subtle"
                  size="sm"
                >
                  {{ keyboard.status === 'active' ? '活跃' : '禁用' }}
                </UBadge>
              </td>
              <td class="px-4 py-3 text-sm text-white">{{ keyboard.clickCount }}</td>
              <td class="px-4 py-3 text-sm text-[#9ca3af]">{{ formatDate(keyboard.createdAt) }}</td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <UButton variant="ghost" size="xs" @click="editInlineKeyboard(keyboard)">
                    <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                  </UButton>
                  <UButton variant="ghost" size="xs" @click="previewInlineKeyboard(keyboard)">
                    <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                  </UButton>
                  <UButton 
                    variant="ghost" 
                    size="xs" 
                    :color="keyboard.status === 'active' ? 'red' : 'green'"
                    @click="toggleInlineKeyboardStatus(keyboard)"
                  >
                    <UIcon 
                      :name="keyboard.status === 'active' ? 'i-heroicons-pause' : 'i-heroicons-play'" 
                      class="w-4 h-4" 
                    />
                  </UButton>
                  <UButton variant="ghost" size="xs" color="red" @click="deleteInlineKeyboard(keyboard)">
                    <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 创建内联键盘模态框 -->
    <UModal v-model="showAddModal" :ui="{ width: 'sm:max-w-3xl' }">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-white mb-4">创建内联键盘</h3>
        <div class="space-y-4">
          <UInput
            v-model="newInlineKeyboard.name"
            label="键盘名称"
            placeholder="输入内联键盘名称"
          />
          
          <UTextarea
            v-model="newInlineKeyboard.description"
            label="描述"
            placeholder="输入键盘描述"
          />
          
          <div>
            <label class="block text-sm font-medium text-white mb-2">按钮布局</label>
            <div class="space-y-3">
              <div v-for="(row, rowIndex) in newInlineKeyboard.buttons" :key="rowIndex" class="border border-[#2a2a2b] rounded-lg p-3">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-[#9ca3af]">第 {{ rowIndex + 1 }} 行</span>
                  <div class="flex gap-2">
                    <UButton 
                      variant="ghost" 
                      size="xs" 
                      color="green"
                      @click="addButtonToRow(rowIndex)"
                      :disabled="row.length >= 3"
                    >
                      <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                    </UButton>
                    <UButton 
                      variant="ghost" 
                      size="xs" 
                      color="red"
                      @click="removeRow(rowIndex)"
                      :disabled="newInlineKeyboard.buttons.length <= 1"
                    >
                      <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                    </UButton>
                  </div>
                </div>
                <div class="space-y-2">
                  <div v-for="(button, buttonIndex) in row" :key="buttonIndex" class="grid grid-cols-12 gap-2 items-end">
                    <div class="col-span-4">
                      <UInput
                        v-model="button.text"
                        :placeholder="`按钮文本`"
                        size="sm"
                      />
                    </div>
                    <div class="col-span-3">
                      <USelect
                        v-model="button.type"
                        :options="buttonTypeOptions"
                        size="sm"
                      />
                    </div>
                    <div class="col-span-4">
                      <UInput
                        v-model="button.value"
                        :placeholder="getValuePlaceholder(button.type)"
                        size="sm"
                      />
                    </div>
                    <div class="col-span-1">
                      <UButton 
                        variant="ghost" 
                        size="xs" 
                        color="red"
                        @click="removeButtonFromRow(rowIndex, buttonIndex)"
                        :disabled="row.length <= 1"
                      >
                        <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 flex gap-2">
              <UButton 
                variant="outline" 
                size="sm" 
                @click="addRow"
                :disabled="newInlineKeyboard.buttons.length >= 6"
              >
                <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
                添加行
              </UButton>
            </div>
          </div>
          
          <USelect
            v-model="newInlineKeyboard.status"
            label="状态"
            :options="[
              { label: '活跃', value: 'active' },
              { label: '禁用', value: 'inactive' }
            ]"
          />
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <UButton variant="outline" @click="showAddModal = false">取消</UButton>
          <UButton color="primary" @click="createInlineKeyboard">创建</UButton>
        </div>
      </div>
    </UModal>

    <!-- 预览模态框 -->
    <UModal v-model="showPreviewModal">
      <div class="p-6">
        <h3 class="text-lg font-semibold text-white mb-4">内联键盘预览</h3>
        <div v-if="previewInlineKeyboardData" class="space-y-2">
          <div v-for="(row, rowIndex) in previewInlineKeyboardData.buttons" :key="rowIndex" class="flex gap-2">
            <button
              v-for="(button, buttonIndex) in row"
              :key="buttonIndex"
              class="flex-1 px-3 py-2 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-white hover:bg-[#3a3a3b] transition-colors flex items-center justify-center gap-2"
              :class="{
                'border-blue-500': button.type === 'url',
                'border-green-500': button.type === 'callback',
                'border-purple-500': button.type === 'switch_inline'
              }"
            >
              <UIcon 
                v-if="button.type === 'url'" 
                name="i-heroicons-link" 
                class="w-4 h-4 text-blue-400" 
              />
              <UIcon 
                v-else-if="button.type === 'callback'" 
                name="i-heroicons-cursor-arrow-rays" 
                class="w-4 h-4 text-green-400" 
              />
              <UIcon 
                v-else-if="button.type === 'switch_inline'" 
                name="i-heroicons-arrow-path-rounded-square" 
                class="w-4 h-4 text-purple-400" 
              />
              {{ button.text }}
            </button>
          </div>
          <div class="mt-4 text-sm text-[#9ca3af]">
            <p><strong>说明：</strong></p>
            <ul class="list-disc list-inside space-y-1 mt-2">
              <li><span class="text-blue-400">蓝色边框</span>：URL 链接按钮</li>
              <li><span class="text-green-400">绿色边框</span>：回调数据按钮</li>
              <li><span class="text-purple-400">紫色边框</span>：内联查询按钮</li>
            </ul>
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
const previewInlineKeyboardData = ref<any>(null)

// 统计数据
const stats = ref({
  totalInlineKeyboards: 8,
  activeInlineKeyboards: 6,
  totalCallbacks: 24,
  todayClicks: 156
})

// 新内联键盘表单
const newInlineKeyboard = ref({
  name: '',
  description: '',
  buttons: [
    [{ text: '按钮1', type: 'callback', value: 'callback_data_1' }]
  ],
  status: 'active'
})

// 状态选项
const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '活跃', value: 'active' },
  { label: '禁用', value: 'inactive' }
]

// 按钮类型选项
const buttonTypeOptions = [
  { label: '回调数据', value: 'callback' },
  { label: 'URL链接', value: 'url' },
  { label: '内联查询', value: 'switch_inline' }
]

// 模拟内联键盘数据
const inlineKeyboards = ref([
  {
    id: 1,
    name: '确认操作',
    description: '用户确认操作的内联键盘',
    buttons: [
      [
        { text: '✅ 确认', type: 'callback', value: 'confirm_action' },
        { text: '❌ 取消', type: 'callback', value: 'cancel_action' }
      ]
    ],
    status: 'active',
    clickCount: 456,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: '分享选项',
    description: '内容分享相关选项',
    buttons: [
      [
        { text: '📱 分享到群组', type: 'switch_inline', value: 'share_group' },
        { text: '👤 私聊分享', type: 'switch_inline', value: 'share_private' }
      ],
      [
        { text: '🔗 获取链接', type: 'callback', value: 'get_link' }
      ]
    ],
    status: 'active',
    clickCount: 234,
    createdAt: '2024-01-14T16:45:00Z'
  },
  {
    id: 3,
    name: '外部链接',
    description: '跳转到外部网站的链接',
    buttons: [
      [
        { text: '📖 官方文档', type: 'url', value: 'https://docs.example.com' },
        { text: '💬 技术支持', type: 'url', value: 'https://support.example.com' }
      ],
      [
        { text: '🌐 官方网站', type: 'url', value: 'https://example.com' }
      ]
    ],
    status: 'active',
    clickCount: 123,
    createdAt: '2024-01-13T11:30:00Z'
  },
  {
    id: 4,
    name: '评分系统',
    description: '用户评分反馈系统',
    buttons: [
      [
        { text: '⭐', type: 'callback', value: 'rate_1' },
        { text: '⭐⭐', type: 'callback', value: 'rate_2' },
        { text: '⭐⭐⭐', type: 'callback', value: 'rate_3' }
      ],
      [
        { text: '⭐⭐⭐⭐', type: 'callback', value: 'rate_4' },
        { text: '⭐⭐⭐⭐⭐', type: 'callback', value: 'rate_5' }
      ]
    ],
    status: 'inactive',
    clickCount: 67,
    createdAt: '2024-01-12T09:15:00Z'
  }
])

// 计算属性
const filteredInlineKeyboards = computed(() => {
  let filtered = inlineKeyboards.value

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

const getUniqueButtonTypes = (buttons: any[][]) => {
  const types = new Set<string>()
  buttons.forEach(row => {
    row.forEach(button => {
      types.add(button.type)
    })
  })
  return Array.from(types)
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'url': return 'blue'
    case 'callback': return 'green'
    case 'switch_inline': return 'purple'
    default: return 'gray'
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'url': return 'URL'
    case 'callback': return '回调'
    case 'switch_inline': return '内联'
    default: return type
  }
}

const getValuePlaceholder = (type: string) => {
  switch (type) {
    case 'url': return 'https://example.com'
    case 'callback': return 'callback_data'
    case 'switch_inline': return 'inline_query'
    default: return '值'
  }
}

const refreshInlineKeyboards = () => {
  console.log('刷新内联键盘列表')
}

const addRow = () => {
  newInlineKeyboard.value.buttons.push([{ text: '', type: 'callback', value: '' }])
}

const removeRow = (index: number) => {
  newInlineKeyboard.value.buttons.splice(index, 1)
}

const addButtonToRow = (rowIndex: number) => {
  newInlineKeyboard.value.buttons[rowIndex].push({ text: '', type: 'callback', value: '' })
}

const removeButtonFromRow = (rowIndex: number, buttonIndex: number) => {
  newInlineKeyboard.value.buttons[rowIndex].splice(buttonIndex, 1)
}

const createInlineKeyboard = () => {
  if (!newInlineKeyboard.value.name) {
    return
  }

  // 过滤空按钮
  const filteredButtons = newInlineKeyboard.value.buttons
    .map(row => row.filter(button => button.text.trim() !== ''))
    .filter(row => row.length > 0)

  if (filteredButtons.length === 0) {
    return
  }

  const keyboard = {
    id: Date.now(),
    name: newInlineKeyboard.value.name,
    description: newInlineKeyboard.value.description,
    buttons: filteredButtons,
    status: newInlineKeyboard.value.status,
    clickCount: 0,
    createdAt: new Date().toISOString()
  }

  inlineKeyboards.value.unshift(keyboard)
  
  // 重置表单
  newInlineKeyboard.value = {
    name: '',
    description: '',
    buttons: [
      [{ text: '按钮1', type: 'callback', value: 'callback_data_1' }]
    ],
    status: 'active'
  }
  
  showAddModal.value = false
}

const editInlineKeyboard = (keyboard: any) => {
  console.log('编辑内联键盘:', keyboard)
}

const previewInlineKeyboard = (keyboard: any) => {
  previewInlineKeyboardData.value = keyboard
  showPreviewModal.value = true
}

const toggleInlineKeyboardStatus = (keyboard: any) => {
  keyboard.status = keyboard.status === 'active' ? 'inactive' : 'active'
}

const deleteInlineKeyboard = (keyboard: any) => {
  const index = inlineKeyboards.value.findIndex(k => k.id === keyboard.id)
  if (index > -1) {
    inlineKeyboards.value.splice(index, 1)
  }
}
</script>