module.exports = {
  apps: [
    {
      // Nuxt.js 前端应用
      name: 'tgnl-admin',
      script: '.output/server/index.mjs',
      cwd: '/Users/hf-mac/Downloads/tgnl-admin',
      instances: 1,
      exec_mode: 'fork',
      // Node.js 内存和性能优化 (兼容v22.19)
      node_args: [
        '--max-old-space-size=1024'
      ],
      env: {
        NODE_ENV: 'production',
        NUXT_HOST: '0.0.0.0',
        NUXT_PORT: 3000,
        TZ: 'Asia/Shanghai'
      },
      env_production: {
        NODE_ENV: 'production',
        NUXT_HOST: '0.0.0.0',
        NUXT_PORT: 3000
      },
      // 日志配置
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // 进程管理
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 4000,
      
      // 健康检查
      min_uptime: '10s',
      max_restarts: 10,
      
      // 其他配置
      merge_logs: true,
      time: true
    }
  ],

  // 部署配置
  deploy: {
    production: {
      user: 'root',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'your-git-repo-url',
      path: '/www/wwwroot/tgpro-admin',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
