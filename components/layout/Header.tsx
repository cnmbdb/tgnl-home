'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogoutIcon } from '@/components/ui/Icons'

interface HeaderProps {
  onMenuToggle: () => void
}

export const Header = ({ onMenuToggle }: HeaderProps) => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          {/* 移动端汉堡菜单按钮 */}
          <button
            onClick={onMenuToggle}
            className="md:hidden text-gray-400 hover:text-white active:text-white p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="打开菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/dashboard" className="flex items-center space-x-2 min-h-[44px]">
            <span className="text-lg sm:text-xl font-bold text-white">
              Telegram 能量池
            </span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white active:text-white transition-colors min-h-[44px] px-2"
          >
            <LogoutIcon className="w-5 h-5" />
            <span className="hidden sm:inline">退出</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
