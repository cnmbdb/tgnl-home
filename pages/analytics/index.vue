<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-white flex items-center gap-3">
          <div class="w-8 h-8 bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-chart-bar" class="w-5 h-5 text-[#00dc82]" />
          </div>
          数据分析
        </h1>
        <p class="mt-1 text-sm text-[#9ca3af]">分析能量出租业务数据和趋势</p>
      </div>
      <div class="flex gap-2">
        <USelect
          v-model="selectedTimeRange"
          :options="timeRangeOptions"
          class="w-32"
        />
        <UButton variant="outline" size="sm" @click="refreshOrders">
          <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
          刷新
        </UButton>
        <UButton color="primary" size="sm" class="bg-[#00dc82] hover:bg-[#00dc82]/80">
          <UIcon name="i-heroicons-arrow-down-tray" class="w-4 h-4 mr-2" />
          导出订单
        </UButton>
      </div>
    </div>

    <!-- 订单统计卡片 -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">总订单数</p>
            <p class="text-2xl font-bold text-white">{{ formatNumber(stats.totalOrders) }}</p>
            <div class="flex items-center mt-1">
              <UIcon 
                :name="stats.orderGrowth >= 0 ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'" 
                :class="stats.orderGrowth >= 0 ? 'text-green-400' : 'text-red-400'"
                class="w-4 h-4 mr-1"
              />
              <span :class="stats.orderGrowth >= 0 ? 'text-green-400' : 'text-red-400'" class="text-sm">
                {{ Math.abs(stats.orderGrowth) }}%
              </span>
              <span class="text-[#9ca3af] text-sm ml-1">vs 上期</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-shopping-bag" class="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">总销售额</p>
            <p class="text-2xl font-bold text-white">¥{{ formatNumber(stats.totalRevenue) }}</p>
            <div class="flex items-center mt-1">
              <UIcon 
                :name="stats.revenueGrowth >= 0 ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'" 
                :class="stats.revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'"
                class="w-4 h-4 mr-1"
              />
              <span :class="stats.revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'" class="text-sm">
                {{ Math.abs(stats.revenueGrowth) }}%
              </span>
              <span class="text-[#9ca3af] text-sm ml-1">vs 上期</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">待处理订单</p>
            <p class="text-2xl font-bold text-white">{{ formatNumber(stats.pendingOrders) }}</p>
            <div class="flex items-center mt-1">
              <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-1 text-orange-400" />
              <span class="text-orange-400 text-sm">需要处理</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-clock" class="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[#9ca3af]">完成率</p>
            <p class="text-2xl font-bold text-white">{{ stats.completionRate }}%</p>
            <div class="flex items-center mt-1">
              <UIcon name="i-heroicons-check-circle" class="w-4 h-4 mr-1 text-green-400" />
              <span class="text-green-400 text-sm">已完成</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <UIcon name="i-heroicons-chart-pie" class="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg">
      <div class="p-4 border-b border-[#2a2a2b]">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">订单列表</h2>
          <div class="flex gap-2">
            <UInput
              v-model="searchQuery"
              placeholder="搜索订单号、用户..."
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
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">订单号</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">用户</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">商品</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">金额</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">状态</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">创建时间</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-[#9ca3af] uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#2a2a2b]">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-[#2a2a2b]/50">
              <td class="px-4 py-3">
                <div class="text-sm font-medium text-white">{{ order.orderNumber }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-[#2a2a2b] rounded-full flex items-center justify-center mr-3">
                    <span class="text-xs font-medium text-white">{{ order.user.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-white">{{ order.user.name }}</div>
                    <div class="text-sm text-[#9ca3af]">{{ order.user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="text-sm text-white">{{ order.product }}</div>
                <div class="text-sm text-[#9ca3af]">数量: {{ order.quantity }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="text-sm font-medium text-white">¥{{ formatNumber(order.amount) }}</div>
              </td>
              <td class="px-4 py-3">
                <UBadge
                  :color="(getStatusColor(order.status))"
                  variant="subtle"
                  size="sm"
                >
                  {{ getStatusLabel(order.status) }}
                </UBadge>
              </td>
              <td class="px-4 py-3 text-sm text-[#9ca3af]">{{ formatDate(order.createdAt) }}</td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <UButton variant="ghost" size="xs" @click="viewOrder(order)">
                    <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                  </UButton>
                  <UButton 
                    v-if="order.status === 'pending'"
                    variant="ghost" 
                    size="xs" 
                    color="green"
                    @click="processOrder(order)"
                  >
                    <UIcon name="i-heroicons-check" class="w-4 h-4" />
                  </UButton>
                  <UButton 
                    v-if="order.status === 'pending'"
                    variant="ghost" 
                    size="xs" 
                    color="red"
                    @click="cancelOrder(order)"
                  >
                    <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                  </UButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="px-4 py-3 border-t border-[#2a2a2b] flex items-center justify-between">
        <div class="text-sm text-[#9ca3af]">
          显示 {{ (currentPage - 1) * pageSize + 1 }} 到 {{ Math.min(currentPage * pageSize, totalOrders) }} 条，共 {{ totalOrders }} 条
        </div>
        <div class="flex gap-2">
          <UButton 
            variant="outline" 
            size="sm" 
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            上一页
          </UButton>
          <UButton 
            variant="outline" 
            size="sm" 
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            下一页
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
definePageMeta({
  middleware: 'auth'
})

// 响应式数据
const searchQuery = ref('')
const statusFilter = ref('all')
const selectedTimeRange = ref('7d')
const currentPage = ref(1)
const pageSize = ref(10)

// 时间范围选项
const timeRangeOptions = [
  { label: '今天', value: '1d' },
  { label: '7天', value: '7d' },
  { label: '30天', value: '30d' },
  { label: '90天', value: '90d' }
]

// 状态选项
const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '待付款', value: 'pending' },
  { label: '已付款', value: 'paid' },
  { label: '处理中', value: 'processing' },
  { label: '已发货', value: 'shipped' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' }
]

// 定义订单类型
interface Order {
  id: string
  orderNumber: string
  user: {
    name: string
    email: string
  }
  product: string
  quantity: number
  amount: number
  status: string
  createdAt: string
}

// 响应式数据
const orders = ref<Order[]>([])
const loading = ref(false)

// 统计数据
const stats = computed(() => {
  const totalOrders = orders.value.length
  const totalRevenue = orders.value.reduce((sum: number, order: Order) => sum + order.amount, 0)
  const successOrders = orders.value.filter((order: Order) => order.status === 'completed').length
  const failedOrders = orders.value.filter((order: Order) => order.status === 'cancelled').length
  const completionRate = totalOrders > 0 ? ((successOrders / totalOrders) * 100).toFixed(1) : '0'
  
  return {
    totalOrders,
    totalRevenue,
    pendingOrders: failedOrders,
    completionRate: parseFloat(completionRate),
    orderGrowth: 12.5, // 暂时保持静态值
    revenueGrowth: 18.3 // 暂时保持静态值
  }
})

// 获取订单数据
const fetchOrders = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/orders')
    if (response.success) {
      orders.value = response.data.map((order: any) => ({
        id: order.id,
        orderNumber: `ORD-${order.id}`,
        user: {
          name: order.username,
          email: `${order.username}@telegram.com`
        },
        product: 'Telegram Premium Gift',
        quantity: 1,
        amount: order.amount,
        status: order.status === 'success' ? 'completed' : 'cancelled',
        createdAt: order.createdAt
      }))
    }
  } catch (error) {
    console.error('获取订单数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchOrders()
})

// 计算属性
const filteredOrders = computed(() => {
  let filtered = orders.value

  if (searchQuery.value) {
    filtered = filtered.filter(order => 
      order.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(order => order.status === statusFilter.value)
  }

  return filtered
})

const totalOrders = computed(() => filteredOrders.value.length)
const totalPages = computed(() => Math.ceil(totalOrders.value / pageSize.value))

// 方法
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('zh-CN').format(num)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('zh-CN')
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'orange',
    paid: 'blue',
    processing: 'purple',
    shipped: 'cyan',
    completed: 'green',
    cancelled: 'red'
  }
  return colors[status] || 'gray'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: '待付款',
    paid: '已付款',
    processing: '处理中',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return labels[status] || status
}

const refreshOrders = () => {
  fetchOrders()
}

const viewOrder = (order: any) => {
  console.log('查看订单:', order)
}

const processOrder = (order: any) => {
  order.status = 'processing'
  console.log('处理订单:', order)
}

const cancelOrder = (order: any) => {
  order.status = 'cancelled'
  console.log('取消订单:', order)
}
</script>