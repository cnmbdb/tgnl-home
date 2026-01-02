import fs from 'fs'
import path from 'path'
import { requireAdmin } from '../utils/auth'

export default defineEventHandler(async (event) => {
  try {
    await requireAdmin(event)

    const envPath = path.join(process.cwd(), '.env')
  
  if (!fs.existsSync(envPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: '.env 文件不存在'
    })
  }

    const envContent = fs.readFileSync(envPath, 'utf-8')
    const envLines = envContent.split('\n')
    
    // 解析环境变量
    const config = {
      // 后端API数据库配置
      dbHost: '',
      dbPort: '',
      dbName: '',
      dbUser: '',
      dbPassword: '',
      
      // Telegram机器人数据库配置
      tgDbHost: '',
      tgDbPort: '',
      tgDbName: '',
      tgDbUser: '',
      tgDbPassword: '',
      
      // 前端数据库配置
      viteDbHost: '',
      viteDbName: '',
      viteDbUser: '',
      viteDbPassword: ''
    }

    envLines.forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, value] = trimmedLine.split('=', 2)
        if (key && value) {
          switch (key.trim()) {
            case 'DB_HOST':
              config.dbHost = value.trim()
              break
            case 'DB_PORT':
              config.dbPort = value.trim()
              break
            case 'DB_NAME':
              config.dbName = value.trim()
              break
            case 'DB_USER':
              config.dbUser = value.trim()
              break
            case 'DB_PASSWORD':
              config.dbPassword = value.trim()
              break
            case 'TG_DB_HOST':
              config.tgDbHost = value.trim()
              break
            case 'TG_DB_PORT':
              config.tgDbPort = value.trim()
              break
            case 'TG_DB_NAME':
              config.tgDbName = value.trim()
              break
            case 'TG_DB_USER':
              config.tgDbUser = value.trim()
              break
            case 'TG_DB_PASSWORD':
              config.tgDbPassword = value.trim()
              break
            case 'VITE_DB_HOST':
              config.viteDbHost = value.trim()
              break
            case 'VITE_DB_NAME':
              config.viteDbName = value.trim()
              break
            case 'VITE_DB_USER':
              config.viteDbUser = value.trim()
              break
            case 'VITE_DB_PASSWORD':
              config.viteDbPassword = value.trim()
              break
          }
        }
      }
    })

    return {
      success: true,
      data: config
    }

  } catch (error: any) {
    console.error('读取数据库配置失败:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: '读取数据库配置失败: ' + error.message
    })
  }
})