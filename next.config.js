/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 启用 standalone 输出模式（用于 Docker）
  output: 'standalone',
  // 注入环境变量到客户端
  env: {
    NEXT_PUBLIC_LOGIN_PATH: process.env.LOGIN_PATH || '/admin/auth/login',
  },
  // 添加 CORS 头支持（用于 API 路由）
  async headers() {
    return [
      {
        // 匹配所有 v1 API 路由
        source: '/v1/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // 允许所有来源，生产环境可以限制为特定域名
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, Accept',
          },
        ],
      },
      {
        // 匹配所有 api 路由（用于机器人系统调用）
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, Accept',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

