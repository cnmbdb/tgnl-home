// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 开发工具配置
  devtools: { enabled: true },
  
  // 开发服务器配置 - 支持外网访问
  devServer: {
    host: 'localhost',
    port: 3000,
    https: false
  },
  
  // 模块配置
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  
  // CSS配置
  css: ['~/assets/css/main.css'],
  
  // UI配置
  ui: {
    global: true
  },
  
  // 颜色模式配置
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  
  // TypeScript配置
  typescript: {
    strict: true,
    typeCheck: false
  },
  
  // 运行时配置 - 统一使用.env文件
  runtimeConfig: {
    // Private keys (only available on server-side)
    dbHost: process.env.DB_HOST || '127.0.0.1',
    dbUser: process.env.DB_USER || 'hftgpro',
    dbPassword: process.env.DB_PASSWORD || 'hftgpro',
    dbName: process.env.DB_NAME || 'hftgpro',
    dbPort: process.env.DB_PORT || '3306',
    
    // Fragment.com 配置
    resCookie: process.env.ResCookie || '',
    resHash: process.env.ResHash || '',
    
    // WordPress 配置（子比主题）
    wordpressUrl: process.env.WORDPRESS_URL || 'https://hfz.pw',
    wordpressUsername: process.env.WORDPRESS_USERNAME || '',
    wordpressAppPassword: process.env.WORDPRESS_APP_PASSWORD || '',
    wordpressJwtToken: process.env.WORDPRESS_JWT_TOKEN || '',
    wordpressProductId: process.env.WORDPRESS_PRODUCT_ID || '2101',
    
    // WordPress 配置（许可证验证需要的大写键名）
    WORDPRESS_URL: process.env.WORDPRESS_URL || 'https://hfz.pw',
    WORDPRESS_USERNAME: process.env.WORDPRESS_USERNAME || '',
    WORDPRESS_APP_PASSWORD: process.env.WORDPRESS_APP_PASSWORD || '',
    ORDER_NUMBER: process.env.ORDER_NUMBER || '',
    SERVER_IP: process.env.SERVER_IP || '',
    
    // 安全配置
    secretKey: process.env.NUXT_SECRET_KEY || 'tgpro-admin-secret-key-2024',
    
    // Public keys (exposed to client-side)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },
  
  // Nitro配置
  nitro: {
    experimental: {
      wasm: true
    }
  },
  
  // Vite配置
  vite: {
    server: {
      hmr: {
        port: 24678,
        host: process.env.NUXT_HOST || '0.0.0.0'
      }
    }
  },
  
  // SSR配置
  ssr: true,
  
  // 构建配置
  build: {
    analyze: process.env.ANALYZE === 'true'
  }
})