'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DashboardIcon, EnergyIcon, BotIcon, AnalyticsIcon, SettingsIcon, UserIcon } from '@/components/ui/Icons'

const navigation = [
  { name: '仪表板', href: '/dashboard', icon: DashboardIcon },
  { name: '能量池管理', href: '/dashboard/energy-pool', icon: EnergyIcon },
  { name: '机器人管理', href: '/dashboard/bots', icon: BotIcon },
  { name: 'API用户管理', href: '/dashboard/api-users', icon: UserIcon },
  { name: '数据分析', href: '/dashboard/analytics', icon: AnalyticsIcon },
  { name: '系统设置', href: '/dashboard/settings', icon: SettingsIcon },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname()

  // 移动端点击菜单项后自动关闭
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          w-64 sm:w-72 border-r border-gray-800 bg-black/95 backdrop-blur-sm
          h-screen transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">导航菜单</h2>
            {/* 移动端关闭按钮 */}
            <button
              onClick={onClose}
              className="md:hidden text-gray-400 hover:text-white p-1"
              aria-label="关闭菜单"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors min-h-[44px]
                    ${
                      isActive
                        ? 'bg-gray-900 text-white border border-gray-700'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900/50 active:bg-gray-900/70'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
