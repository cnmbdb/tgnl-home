<template>
  <div class="min-h-screen bg-[#0c0c0d] flex items-center justify-center">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img 
          src="/logo.png" 
          alt="Logo" 
          class="h-16 w-auto mx-auto mb-4"
        />
        <h1 class="text-2xl font-bold text-white mb-2">管理后台</h1>
        <p class="text-[#9ca3af]">请输入您的登录凭据</p>
      </div>

      <!-- 登录表单 -->
      <div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-6">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- 用户名输入框 -->
          <div>
            <label for="username" class="block text-sm font-medium text-white mb-2">
              用户名
            </label>
            <UInput
              id="username"
              v-model="loginForm.username"
              type="text"
              placeholder="请输入用户名"
              :disabled="loading"
              class="w-full text-white"
              style="background-color: black !important; color: white !important;"
              size="lg"
            />
          </div>

          <!-- 密码输入框 -->
          <div>
            <label for="password" class="block text-sm font-medium text-white mb-2">
              密码
            </label>
            <UInput
              id="password"
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :disabled="loading"
              class="w-full text-white"
              style="background-color: black !important; color: white !important;"
              size="lg"
            />
          </div>

          <!-- 错误提示 -->
          <div v-if="errorMessage" class="text-red-400 text-sm text-center">
            {{ errorMessage }}
          </div>

          <!-- 登录按钮 -->
          <UButton
            type="submit"
            :loading="loading"
            :disabled="loading"
            class="w-full text-center flex items-center justify-center"
            size="lg"
            color="primary"
          >
            {{ loading ? '登录中...' : '登录' }}
          </UButton>
        </form>


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 设置页面布局为空，不使用默认布局
definePageMeta({
  layout: false
})

// 响应式数据
const loginForm = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

// 监听表单变化，用于调试
watch(loginForm, (newVal, oldVal) => {
  console.log('Form data changed:', { old: oldVal, new: newVal })
}, { deep: true })

// 登录处理函数
const handleLogin = async () => {
  console.log('Login attempt started', { username: loginForm.value.username })
  
  // 验证输入
  if (!loginForm.value.username || !loginForm.value.password) {
    errorMessage.value = '请输入用户名和密码'
    console.log('Validation failed: missing username or password')
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    console.log('Sending login request...')
    // 调用登录API
    const response: any = await $fetch('/api/login', {
      method: 'POST',
      body: {
        username: loginForm.value.username,
        password: loginForm.value.password
      }
    })

    console.log('Login response:', response)

    if (response.success) {
      console.log('Login successful, redirecting to dashboard...')
      
      // 手动设置cookie到客户端(确保立即可用)
      const isLoggedInCookie = useCookie('isLoggedIn', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: false,
        httpOnly: false,
        path: '/'
      })
      const userInfoCookie = useCookie('userInfo', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: false,
        httpOnly: false,
        path: '/'
      })
      
      isLoggedInCookie.value = 'true' as any
      userInfoCookie.value = response.data as any
      
      console.log('Cookies set on client, navigating to dashboard...')
      
      // 使用Nuxt的导航,避免完整页面刷新
      await navigateTo('/dashboard', { replace: true })
    } else {
      // 登录失败
      console.log('Login failed:', response.error)
      errorMessage.value = response.error || '登录失败'
      // 保持表单内容，不清空
    }
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error.data?.error || error.message || '登录过程中发生错误，请重试'
    // 保持表单内容，不清空
  } finally {
    loading.value = false
    console.log('Login attempt finished')
  }
}

// 检查是否已登录
onMounted(() => {
  const isLoggedIn = useCookie('isLoggedIn', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 7, // 7天
    sameSite: 'lax',
    secure: false, // 在开发环境中设置为false
    httpOnly: false
  })
  console.log('Checking login status on mount:', isLoggedIn.value)
  if (isLoggedIn.value) {
    console.log('User already logged in, redirecting to dashboard')
    navigateTo('/dashboard')
  }
})
</script>

<style scoped>
/* 自定义样式 */
.bg-primary {
  background-color: #00dc82;
}
</style>