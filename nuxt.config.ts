// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  css: ['~/assets/css/main.css'],

  ui: {
    global: true
  },

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

  typescript: {
    strict: false,
    typeCheck: false
  },

  vite: {
    server: {
      hmr: {
        overlay: false
      }
    },
    optimizeDeps: {
      include: ['@nuxt/ui']
    }
  },

  runtimeConfig: {
    // Private keys (only available on server-side)
    // 数据库配置完全从 .env 文件读取，不使用硬编码默认值
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: Number(process.env.DB_PORT),
    
    // WordPress API 配置
    WORDPRESS_URL: process.env.WORDPRESS_URL,
    WORDPRESS_USERNAME: process.env.WORDPRESS_USERNAME,
    WORDPRESS_APP_PASSWORD: process.env.WORDPRESS_APP_PASSWORD,
    WORDPRESS_PRODUCT_ID: process.env.WORDPRESS_PRODUCT_ID,
    
    // 授权配置
    ORDER_NUMBER: process.env.ORDER_NUMBER,
    SERVER_IP: process.env.SERVER_IP,
    
    // Public keys (exposed to client-side)
    public: {
      apiBase: '/api'
    }
  },

  nitro: {
    experimental: {
      wasm: true
    }
  },

  compatibilityDate: '2025-11-07'
})