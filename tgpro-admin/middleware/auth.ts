export default defineNuxtRouteMiddleware((to, from) => {
  // 在服务器端跳过认证检查,因为服务器端无法访问客户端cookie
  // SSR时会在客户端重新执行这个中间件
  if (process.server) {
    return
  }

  // 检查登录状态
  const isLoggedIn = useCookie('isLoggedIn', {
    default: () => false,
    maxAge: 60 * 60 * 24 * 7, // 7天
    sameSite: 'lax',
    secure: false,
    httpOnly: false,
    path: '/'
  })

  // 同时检查用户信息cookie作为备用验证
  const userInfo = useCookie('userInfo', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7天
    sameSite: 'lax',
    secure: false,
    httpOnly: false,
    path: '/'
  })

  // 调试信息
  console.log('Auth middleware check (client only):', {
    path: to.path,
    from: from?.path,
    isLoggedIn: isLoggedIn.value,
    isLoggedInType: typeof isLoggedIn.value,
    userInfo: userInfo.value,
    userInfoType: typeof userInfo.value,
    cookies: document.cookie
  })

  // 检查是否已登录
  // 需要同时检查字符串 'true' 和布尔值 true
  const isLoginCookieValid = isLoggedIn.value === true || String(isLoggedIn.value) === 'true'
  
  let isUserInfoValid = false
  if (userInfo.value) {
    // 如果是字符串，尝试解析
    if (typeof userInfo.value === 'string') {
      try {
        const parsed = JSON.parse(userInfo.value)
        isUserInfoValid = parsed && typeof parsed === 'object' && 'id' in parsed
      } catch (e) {
        console.error('Failed to parse userInfo cookie:', e)
      }
    } else if (typeof userInfo.value === 'object' && userInfo.value !== null && 'id' in userInfo.value) {
      isUserInfoValid = true
    }
  }

  const authenticated = isLoginCookieValid || isUserInfoValid

  console.log('Auth state:', {
    isLoginCookieValid,
    isUserInfoValid,
    authenticated
  })

  // 如果未登录且不是在登录页面，则重定向到登录页面
  if (!authenticated && to.path !== '/') {
    console.log('Redirecting to login: not authenticated')
    return navigateTo('/')
  }

  // 如果已登录且在登录页面，则重定向到仪表板页面
  if (authenticated && to.path === '/') {
    console.log('Redirecting to dashboard: already authenticated')
    return navigateTo('/dashboard')
  }
})