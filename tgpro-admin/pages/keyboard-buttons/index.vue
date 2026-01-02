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

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0c0c0d]">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">键盘名称</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">布局预览</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">按钮数量</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">状态</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">使用次数</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">创建时间</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#2a2a2b]">
            <tr v-for="keyboard in filteredKeyboards" :key="keyboard.id" class="hover:bg-[#2a2a2b]/50">
              <td class="px-4 py-3">
                <div class="text-sm font-medium text-white">{{ keyboard.name }}</div>
                <div class="text-sm text-[#9ca3af]">{{ keyboard.description }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="space-y-1 max-w-xs">
                  <div v-for="(row, rowIndex) in keyboard.layout" :key="rowIndex" class="flex gap-1">
                    <div
                      v-for="(button, buttonIndex) in row"
                      :key="buttonIndex"
                      class="px-2 py-1 bg-[#2a2a2b] border border-[#3a3a3b] rounded text-xs text-white truncate"
                      style="max-width: 60px;"
                    >
                      {{ button.text }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="text-sm text-white">{{ keyboard.buttonCount }}</div>
                <div class="text-sm text-[#9ca3af]">{{ keyboard.layout.length }} 行</div>
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
              <td class="px-4 py-3 text-sm text-white">{{ keyboard.usageCount }}</td>
              <td class="px-4 py-3 text-sm text-[#9ca3af]">{{ formatDate(keyboard.createdAt) }}</td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <UButton variant="ghost" size="xs" @click="editKeyboard(keyboard)">
                    <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
                  </UButton>
                  <UButton variant="ghost" size="xs" @click="previewKeyboard(keyboard)">
                    <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                  </UButton>
                  <UButton 
                    variant="ghost" 
                    size="xs" 
                    :color="keyboard.status === 'active' ? 'red' : 'green'"
                    @click="toggleKeyboardStatus(keyboard)"
                  >
                    <UIcon 
                      :name="keyboard.status === 'active' ? 'i-heroicons-pause' : 'i-heroicons-play'" 
                      class="w-4 h-4" 
                    />
                  </UButton>
                  <UButton variant="ghost" size="xs" color="red" @click="deleteKeyboard(keyboard)">
                    <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
  totalKeyboards: 15,
  activeKeyboards: 12,
  totalButtons: 68,
  todayUsage: 234
})

// 新键盘表单
const newKeyboard = ref({
  name: '',
  description: '',
  layout: [
    [{ text: '按钮1', action: 'text' }, { text: '按钮2', action: 'text' }]
  ],
  status: 'active'
})

// 状态选项
const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '活跃', value: 'active' },
  { label: '禁用', value: 'inactive' }
]

// 模拟键盘数据
const keyboards = ref([
  {
    id: 1,
    name: '主菜单',
    description: '机器人主菜单键盘',
    layout: [
      [{ text: '📊 数据统计', action: 'callback' }, { text: '👥 用户管理', action: 'callback' }],
      [{ text: '🤖 机器人设置', action: 'callback' }],
      [{ text: '❓ 帮助', action: 'callback' }, { text: '📞 联系客服', action: 'callback' }]
    ],
    buttonCount: 5,
    status: 'active',
    usageCount: 1234,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: '设置菜单',
    description: '机器人设置相关功能',
    layout: [
      [{ text: '🔧 基础设置', action: 'callback' }, { text: '🎨 界面设置', action: 'callback' }],
      [{ text: '🔔 通知设置', action: 'callback' }, { text: '🔐 安全设置', action: 'callback' }],
      [{ text: '🔙 返回主菜单', action: 'callback' }]
    ],
    buttonCount: 5,
    status: 'active',
    usageCount: 567,
    createdAt: '2024-01-14T16:45:00Z'
  },
  {
    id: 3,
    name: '快速操作',
    description: '常用功能快速访问',
    layout: [
      [{ text: '📝 新建', action: 'callback' }, { text: '📋 列表', action: 'callback' }, { text: '🔍 搜索', action: 'callback' }],
      [{ text: '⭐ 收藏', action: 'callback' }, { text: '📤 分享', action: 'callback' }]
    ],
    buttonCount: 5,
    status: 'inactive',
    usageCount: 89,
    createdAt: '2024-01-13T11:30:00Z'
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