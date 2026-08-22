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
    <>
      <main className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1 className="login-title">Telegram 能量池</h1>
            <p className="login-subtitle">后台管理系统 · 版本标记 v20260306-02</p>
          </div>

          {/* 访问方式选择器 */}
          {showAccessSelector && accessConfig && (
            <div className="access-box">
              <div className="access-title">选择访问方式：</div>
              <div className="access-actions">
                {accessConfig.domainUrl && !accessConfig.domainUrl.includes('[IP地址]') && (
                  <button
                    type="button"
                    onClick={() => switchAccess(accessConfig.domainUrl)}
                    className="access-btn"
                  >
                    🌐 域名访问
                  </button>
                )}
                {accessConfig.ipUrl && !accessConfig.ipUrl.includes('[IP地址]') && (
                  <button
                    type="button"
                    onClick={() => switchAccess(accessConfig.ipUrl)}
                    className="access-btn"
                  >
                    🔌 IP 访问
                  </button>
                )}
              </div>
              <div className="access-hint">
                {accessConfig.domainUrl && !accessConfig.domainUrl.includes('[IP地址]') && (
                  <div>域名：<code>{accessConfig.domainUrl}</code></div>
                )}
                {accessConfig.ipUrl && !accessConfig.ipUrl.includes('[IP地址]') && (
                  <div>IP：<code>{accessConfig.ipUrl}</code></div>
                )}
              </div>
            </div>
          )}

          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-item">
                <label htmlFor="username" className="form-label">
                  账号
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  placeholder="请输入账号"
                  required
                  autoFocus
                />
              </div>

              <div className="form-item">
                <label htmlFor="password" className="form-label">
                  密码
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="请输入密码"
                  required
                />
              </div>

              <div className="form-item">
                <label htmlFor="captcha" className="form-label">
                  验证码
                </label>
                <div className="captcha-row">
                  <div className="captcha-box">
                    <span className="captcha-text">
                      {captcha ? captcha.question : '加载中...'}
                    </span>
                    <button
                      type="button"
                      onClick={loadCaptcha}
                      className="captcha-refresh"
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
                    className="captcha-input"
                    placeholder="答案"
                    required
                    maxLength={3}
                    inputMode="numeric"
                  />
                </div>
                <p className="captcha-tip">请输入计算结果</p>
              </div>

              {error && (
                <div className="error-box">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* 这里使用组件内样式，不依赖外部 CSS 文件，避免反代问题导致页面变形 */}
      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          background-color: #000000;
          color: #ffffff;
        }

        .login-container {
          width: 100%;
          max-width: 720px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-title {
          font-size: 40px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .login-subtitle {
          margin: 0;
          font-size: 14px;
          color: #9ca3af;
        }

        .access-box {
          margin-bottom: 24px;
          border-radius: 12px;
          border: 1px solid #374151;
          background: rgba(17, 24, 39, 0.85);
          padding: 16px;
        }

        .access-title {
          font-size: 14px;
          color: #e5e7eb;
          margin-bottom: 8px;
        }

        .access-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        @media (min-width: 640px) {
          .access-actions {
            flex-direction: row;
          }
        }

        .access-btn {
          flex: 1;
          min-height: 44px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid #4b5563;
          background-color: #111827;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }

        .access-btn:hover {
          background-color: #1f2937;
          border-color: #6b7280;
        }

        .access-hint {
          margin-top: 6px;
          font-size: 12px;
          color: #9ca3af;
        }

        .access-hint code {
          font-size: 12px;
        }

        .login-card {
          border-radius: 16px;
          border: 1px solid #1f2937;
          background: rgba(17, 24, 39, 0.85);
          padding: 32px 28px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #d1d5db;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #4b5563;
          background-color: #020617;
          color: #ffffff;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
        }

        .form-input::placeholder {
          color: #6b7280;
        }

        .form-input:focus {
          border-color: #e5e7eb;
          box-shadow: 0 0 0 1px #111827;
        }

        .captcha-row {
          display: flex;
          align-items: stretch;
          gap: 12px;
        }

        .captcha-box {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #4b5563;
          background-color: #111827;
        }

        .captcha-text {
          color: #ffffff;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: 18px;
        }

        .captcha-refresh {
          margin-left: auto;
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          font-size: 14px;
          padding: 0;
          transition: color 0.15s ease;
        }

        .captcha-refresh:hover {
          color: #ffffff;
        }

        .captcha-input {
          width: 96px;
          padding: 12px 10px;
          border-radius: 10px;
          border: 1px solid #4b5563;
          background-color: #020617;
          color: #ffffff;
          font-size: 14px;
          text-align: center;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
        }

        .captcha-input::placeholder {
          color: #6b7280;
        }

        .captcha-input:focus {
          border-color: #e5e7eb;
          box-shadow: 0 0 0 1px #111827;
        }

        .captcha-tip {
          margin-top: 6px;
          font-size: 12px;
          color: #9ca3af;
        }

        .error-box {
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid rgba(248, 113, 113, 0.3);
          background-color: rgba(248, 113, 113, 0.1);
          color: #fecaca;
          font-size: 13px;
        }

        .submit-btn {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: none;
          background-color: #f9fafb;
          color: #000000;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s ease, box-shadow 0.15s ease, transform 0.05s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #e5e7eb;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 640px) {
          .login-card {
            padding: 24px 18px;
          }

          .login-title {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  )
}
