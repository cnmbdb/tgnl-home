'use client'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">
          Telegram 能量池系统
        </h1>
        <p className="text-gray-400 mb-8">Energy Pool System API</p>
        <div className="space-y-2 text-gray-500 text-sm">
          <p>系统运行正常</p>
          <p className="text-xs">API 服务已就绪</p>
        </div>
      </div>
    </main>
  )
}
