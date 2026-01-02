import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // 动态获取项目根目录路径
    const projectRoot = process.cwd()
    // 在预览模式下，工作目录是 .output，需要回到上级目录
    const actualRoot = projectRoot.endsWith('.output') ? path.dirname(projectRoot) : projectRoot
    const basePath = path.join(actualRoot, 'hf-tgpro')
    const configPath = path.join(basePath, 'config.txt')
    const envPath = path.join(basePath, '.env')
    const hyPyPath = path.join(basePath, 'hy.py')
    

    
    // 读取 config.txt 文件
    const configContent = fs.readFileSync(configPath, 'utf-8')
    const configLines = configContent.split('\n').filter((line: string) => line.trim() && !line.startsWith('#'))
    
    // 解析 config.txt
    const config: Record<string, string> = {}
    configLines.forEach((line: string) => {
      const [key, value] = line.split('=')
      if (key && value) {
        config[key.trim()] = value.trim()
      }
    })
    
    // 读取 .env 文件
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const envLines = envContent.split('\n').filter((line: string) => line.trim() && !line.startsWith('#'))
    
    // 解析 .env
    const env: Record<string, string> = {}
    envLines.forEach((line: string) => {
      const equalIndex = line.indexOf('=')
      if (equalIndex > 0) {
        const key = line.substring(0, equalIndex).trim()
        let value = line.substring(equalIndex + 1).trim()
        
        // 先移除注释
        const commentIndex = value.indexOf(' #')
        if (commentIndex > 0) {
          value = value.substring(0, commentIndex).trim()
        }
        
        // 再移除引号
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        
        env[key] = value
      }
    })
    
    // 读取 hy.py 文件并提取 tron_api_key
    const hyPyContent = fs.readFileSync(hyPyPath, 'utf-8')
    const tronApiKeyMatch = hyPyContent.match(/tron_api_key\s*=\s*["']([^"']+)["']/)
    const tronApiKey = tronApiKeyMatch ? tronApiKeyMatch[1] : ''
    
    // 返回合并的配置
    return {
      success: true,
      data: {
        // 基础配置 (来自 config.txt)
        token: config.TOKEN || '',
        controlAddress: config.control_address || '',
        adminId: config.admin_id || '',
        customerServiceId: config.CUSTOMER_SERVICE_ID || '',
        tiaozhuan: config.Tiaozhuan || '',
        
        // 价格配置 (来自 config.txt)
        threePrice: config.three_price || '',
        sixPrice: config.six_price || '',
        yearPrice: config.year_price || '',
        
        // 资源配置 (来自 .env)
        resHash: env.ResHash || '',
        resCookie: env.ResCookie || '',
        walletMnemonic: env.WalletMnemonic || '',
        
        // 数据库配置 (来自 .env)
        dbHost: env.DB_HOST || '',
        dbUser: env.DB_USER || '',
        dbPassword: env.DB_PASSWORD || '',
        dbName: env.DB_NAME || '',
        dbPort: env.DB_PORT || '',
        
        // Tron API 配置 (来自 hy.py)
        tronApiKey: tronApiKey
      }
    }
  } catch (error) {
    console.error('读取配置文件失败:', error)
    return {
      success: false,
      error: '读取配置文件失败: ' + (error as Error).message
    }
  }
})