<template>
  <div class="min-h-screen bg-[#0c0c0d]">
    <!-- 侧边栏 -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a1b] border-r border-[#2a2a2b] lg:translate-x-0" :class="{ '-translate-x-full': !sidebarOpen && isMobile, 'translate-x-0': sidebarOpen || !isMobile }">
      <div class="flex items-center justify-center h-20 px-4 border-b border-[#2a2a2b]">
        <img 
          src="/logo.png" 
          alt="Logo" 
          class="h-16 w-auto object-contain"
        />
      </div>
      
      <nav class="mt-4 px-2">
        <div v-for="group in navigationGroups" :key="group.name" class="mb-6">
          <!-- 分组标题 -->
          <button
            @click="group.expanded.value = !group.expanded.value"
            class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#9ca3af] hover:text-white transition-colors group uppercase tracking-wider"
          >
            <span class="flex items-center">
              <UIcon :name="group.icon" class="w-4 h-4 mr-2" />
              {{ group.name }}
            </span>
            <UIcon 
              name="i-heroicons-chevron-down" 
              class="w-3 h-3 transition-transform duration-200"
              :class="{ 'rotate-180': group.expanded.value }"
            />
          </button>
          
          <!-- 分组项目 -->
          <Transition name="nav-collapse">
            <div 
              v-show="group.expanded.value"
              class="mt-1 space-y-0.5 relative"
            >
              <!-- 左侧竖线 -->
              <div class="absolute left-3 top-0 bottom-0 w-px bg-[#374151]"></div>
              
              <NuxtLink
                v-for="item in group.items"
                :key="item.name"
                :to="item.href"
                class="flex items-center pl-6 pr-3 py-2 text-sm transition-all group relative ml-3"
                :class="{ 
                  'text-[#00dc82]': $route.path === item.href,
                  'text-[#9ca3af] hover:text-white': $route.path !== item.href
                }"
              >
                <!-- 选中状态的绿色竖线 -->
                <div 
                  v-if="$route.path === item.href"
                  class="absolute left-0 top-0 bottom-0 w-px bg-[#00dc82]"
                ></div>
                
                <UIcon 
                  :name="item.icon" 
                  class="w-4 h-4 mr-3 transition-colors"
                  :class="{ 
                    'text-[#00dc82]': $route.path === item.href,
                    'text-[#9ca3af] group-hover:text-white': $route.path !== item.href
                  }"
                />
                {{ item.name }}
              </NuxtLink>
            </div>
          </Transition>
         </div>
      </nav>
    </div>

    <!-- 主内容区域 -->
    <div class="lg:pl-64">
      <!-- 顶部导航栏 -->
      <div class="sticky top-0 z-40 flex h-16 bg-[#1a1a1b] border-b border-[#2a2a2b]">
        <button
          @click="toggleSidebar"
          class="px-4 text-[#9ca3af] hover:text-[#00dc82] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00dc82] lg:hidden transition-colors"
        >
          <Bars3Icon class="w-6 h-6" />
        </button>
        
        <div class="flex justify-between flex-1 px-4">
          <div class="flex items-center">
            <h2 class="text-lg font-semibold text-white">{{ pageTitle }}</h2>
          </div>
          
          <div class="flex items-center">
            <!-- 用户菜单 -->
            <UDropdown :items="userMenuItems" :popper="{ placement: 'bottom-start' }">
              <div class="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#2a2a2b] transition-all">
                <UAvatar
                  :src="adminAvatar"
                  alt="管理员头像"
                  size="sm"
                />
                <div class="hidden md:block text-sm">
                  <div class="font-medium text-white">Admin</div>
                  <div class="text-[#9ca3af]">管理员</div>
                </div>
              </div>
            </UDropdown>
          </div>
        </div>
      </div>

      <!-- 页面内容 -->
      <main class="p-6 bg-[#0c0c0d] min-h-screen">
        <slot />
      </main>
    </div>

    <!-- 移动端遮罩 -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-all"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { 
  Bars3Icon
} from '@heroicons/vue/24/outline'

// 响应式状态
const sidebarOpen = ref(false)
const isMobile = ref(false)

// AJ1 像素头像库
const aj1Avatars = [
  '/avatars/aj1-pixel-1.svg',
  '/avatars/aj1-pixel-2.svg',
  '/avatars/aj1-pixel-3.svg',
  '/avatars/aj1-pixel-4.svg',
  '/avatars/aj1-pixel-5.svg'
]

// 随机选择一个AJ1头像
const adminAvatar = ref('')

// 初始化随机头像
const initRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * aj1Avatars.length)
  adminAvatar.value = aj1Avatars[randomIndex]
}

// 分组导航菜单
const navigationGroups = [
  {
    name: '首页',
    icon: 'i-heroicons-home',
    expanded: ref(true),
    items: [
      { name: '控制台', href: '/dashboard', icon: 'i-heroicons-bolt' }
    ]
  },
  {
    name: '管理',
    icon: 'i-heroicons-cog-6-tooth',
    expanded: ref(true),
    items: [
      { name: '机器人管理', href: '/bots', icon: 'i-heroicons-cpu-chip' },
      { name: '机器人命令', href: '/bot-commands', icon: 'i-heroicons-command-line' },
      { name: '关键词回复', href: '/keyword-replies', icon: 'i-heroicons-chat-bubble-left-right' },
      { name: '键盘按钮', href: '/keyboard-buttons', icon: 'i-heroicons-rectangle-group' },
      { name: '内联键盘', href: '/inline-keyboards', icon: 'i-heroicons-squares-plus' },
      { name: '用户管理', href: '/users', icon: 'i-heroicons-users' },
      { name: '订单管理', href: '/orders', icon: 'i-heroicons-shopping-bag' },
      { name: '数据分析', href: '/analytics', icon: 'i-heroicons-chart-bar' }
    ]
  },
  {
    name: '设置',
    icon: 'i-heroicons-cog-6-tooth',
    expanded: ref(false),
    items: [
      { name: '更新授权', href: '/license', icon: 'i-heroicons-heart' },
      { name: '系统设置', href: '/development', icon: 'i-heroicons-wrench-screwdriver' }
    ]
  }
]

// 登出函数
const handleLogout = async () => {
  try {
    // 调用后端注销API
    await $fetch('/api/logout', {
      method: 'POST'
    })
  } catch (error) {
    console.error('Logout API error:', error)
  }
  
  // 清除所有相关的cookie
  const isLoggedIn = useCookie('isLoggedIn', {
    default: () => false
  })
  const userInfo = useCookie('userInfo', {
    default: () => null
  })
  
  isLoggedIn.value = false
  userInfo.value = null
  
  // 跳转到登录页
  await navigateTo('/')
}

// 用户菜单
const userMenuItems = [
  [
    { label: '个人设置', icon: 'i-heroicons-user-circle', click: () => console.log('个人设置') },
    { label: '退出登录', icon: 'i-heroicons-arrow-right-on-rectangle', click: handleLogout }
  ]
]

// 页面标题
const pageTitle = computed(() => {
  const route = useRoute()
  for (const group of navigationGroups) {
    const currentNav = group.items.find(item => item.href === route.path)
    if (currentNav) {
      return currentNav.name
    }
  }
  return '仪表板'
})

// 侧边栏控制
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

// 切换分组展开状态
const toggleGroup = (group: any) => {
  group.expanded.value = !group.expanded.value
}

// 检测是否为移动端
const checkMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 1024
  }
}

// 监听路由变化，关闭移动端侧边栏
watch(() => useRoute().path, () => {
  if (isMobile.value) {
    sidebarOpen.value = false
  }
})

// 监听窗口大小变化
onMounted(() => {
  checkMobile()
  initRandomAvatar() // 初始化随机头像
  
  const handleResize = () => {
    checkMobile()
    // 在移动端切换到桌面端时，关闭侧边栏
    if (!isMobile.value) {
      sidebarOpen.value = false
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})
</script>