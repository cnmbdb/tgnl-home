'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type CaptchaData = {
  captchaId: string
  question: string
}

type AccessConfig = {
  requireDomain: boolean
  allowedDomains: string[]
  loginPath: string
  domainUrl: string
  ipUrl: string
  currentUrl: string
}

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState<CaptchaData | null>(null)
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [accessConfig, setAccessConfig] = useState<AccessConfig | null>(null)
  const [showAccessSelector, setShowAccessSelector] = useState(false)

  // 加载验证码
  const loadCaptcha = async () => {
    try {
      // 加一个时间戳参数并禁用缓存，避免浏览器 / 代理缓存旧验证码
      const response = await fetch(`/api/auth/captcha?t=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
      })
      const data = await response.json()
      if (data.success && data.data) {
        setCaptcha(data.data)
        setCaptchaAnswer('')
        setError('')
      }
    } catch (err) {
      console.error('加载验证码失败:', err)
    }
  }

  // 加载访问配置
  const loadAccessConfig = async () => {
    try {
      const response = await fetch('/api/auth/access-config')
      const data = await response.json()
      if (data.success && data.data) {
        const config = data.data
        setAccessConfig(config)
        
        // 如果配置了域名限制，显示访问方式选择器
        if (config.requireDomain) {
          const currentHost = window.location.hostname
          const currentProtocol = window.location.protocol
          const currentPort = window.location.port || (currentProtocol === 'https:' ? '443' : '80')
          const currentPath = window.location.pathname
          
          // 构建当前访问 URL
          const currentUrl = `${currentProtocol}//${currentHost}${currentPort !== '80' && currentPort !== '443' ? `:${currentPort}` : ''}${currentPath}`
          
          // 判断当前是 IP 还是域名
          const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(currentHost)
          
          // 如果有域名配置且当前是 IP 访问，或者有多个访问方式可选，显示选择器
          if (config.domainUrl && (isIP || config.domainUrl !== currentUrl)) {
            setShowAccessSelector(true)
            // 更新 IP URL 为当前访问地址
            if (isIP && config.ipUrl.includes('[IP地址]')) {
              config.ipUrl = currentUrl
            }
          }
        }
      }
    } catch (err) {
      console.error('加载访问配置失败:', err)
    }
  }

  useEffect(() => {
    loadCaptcha()
    loadAccessConfig()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!captcha) {
      setError('验证码加载失败，请刷新页面')
      setLoading(false)
      return
    }

    if (!captchaAnswer.trim()) {
      setError('请输入验证码')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password.trim(),
          captchaId: captcha.captchaId,
          captchaAnswer: parseInt(captchaAnswer.trim(), 10),
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        router.push('/dashboard')
        router.refresh()
      } else {
        setError(data.error || '登录失败，请检查账号密码')
        // 验证码错误时重新加载验证码
        if (data.error && data.error.includes('验证码')) {
          loadCaptcha()
        }
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  // 切换访问方式
  const switchAccess = (url: string) => {
    window.location.href = url
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Telegram 能量池
          </h1>
          <p className="text-gray-400 text-sm">后台管理系统</p>
        </div>

        {/* 访问方式选择器 */}
        {showAccessSelector && accessConfig && (
          <div className="mb-6 rounded-lg border border-gray-700 bg-gray-900/80 p-4">
            <div className="text-sm text-gray-300 mb-3">选择访问方式：</div>
            <div className="flex flex-col sm:flex-row gap-2">
              {accessConfig.domainUrl && !accessConfig.domainUrl.includes('[IP地址]') && (
                <button
                  onClick={() => switchAccess(accessConfig.domainUrl)}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-white text-sm transition-colors min-h-[44px]"
                >
                  🌐 域名访问
                </button>
              )}
              {accessConfig.ipUrl && !accessConfig.ipUrl.includes('[IP地址]') && (
                <button
                  onClick={() => switchAccess(accessConfig.ipUrl)}
                  className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-white text-sm transition-colors min-h-[44px]"
                >
                  🔌 IP 访问
                </button>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              {accessConfig.domainUrl && !accessConfig.domainUrl.includes('[IP地址]') && (
                <div>域名：<code className="text-xs">{accessConfig.domainUrl}</code></div>
              )}
              {accessConfig.ipUrl && !accessConfig.ipUrl.includes('[IP地址]') && (
                <div>IP：<code className="text-xs">{accessConfig.ipUrl}</code></div>
              )}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                账号
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                placeholder="请输入账号"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all"
                placeholder="请输入密码"
                required
              />
            </div>

            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-300 mb-2">
                验证码
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg">
                  <span className="text-white font-mono text-lg">
                    {captcha ? captcha.question : '加载中...'}
                  </span>
                  <button
                    type="button"
                    onClick={loadCaptcha}
                    className="ml-auto text-gray-400 hover:text-white transition-colors text-sm"
                    title="刷新验证码"
                  >
                    🔄
                  </button>
                </div>
                <input
                  id="captcha"
                  type="text"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value.replace(/\D/g, ''))}
                  className="w-24 px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all text-center"
                  placeholder="答案"
                  required
                  maxLength={3}
                  inputMode="numeric"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">请输入计算结果</p>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
