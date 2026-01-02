import fs from 'fs'
import path from 'path'
import { requireAdmin } from '../utils/auth'

export default defineEventHandler(async (event) => {
  // 验证管理员权限
  const user = await requireAdmin(event)
  if (!user) {
    return {
      success: false,
      error: '需要管理员权限'
    }
  }
  try {
    const body = await readBody(event)
    
    if (!body || typeof body !== 'object') {
      throw new Error('无效的请求数据')
    }
    
    // 配置文件路径 - 使用绝对路径
     const projectRoot = process.cwd()
     const actualRoot = projectRoot.endsWith('.output') ? path.dirname(projectRoot) : projectRoot
     const basePath = path.join(actualRoot, 'hf-tgpro')
    const configPath = path.join(basePath, 'config.txt')
    const envPath = path.join(basePath, '.env')
    const hyPyPath = path.join(basePath, 'hy.py')
    
    // 构建 config.txt 内容
    const configContent = [
      `TOKEN=${body.token || ''}`,
      `control_address=${body.controlAddress || ''}`,
      `CUSTOMER_SERVICE_ID=${body.customerServiceId || ''}`,
      `Tiaozhuan=${body.tiaozhuan || ''}`,
      `admin_id=${body.adminId || ''}`,
      `three_price=${body.threePrice || ''}`,
      `six_price=${body.sixPrice || ''}`,
      `year_price=${body.yearPrice || ''}`
    ].join('\n')
    
    // 构建 .env 内容 - 为资源配置字段添加双引号包装
    const envContent = [
      `ResHash="${body.resHash || ''}" #fragment.com`,
      `ResCookie="${body.resCookie || ''}" # fragment.com`,
      '',
      '',
      `WalletMnemonic="${body.walletMnemonic || ''}" # 钱包助记词 用空格分隔`,
      '',
      '# 数据库配置',
      `DB_HOST=${body.dbHost || ''}`,
      `DB_USER=${body.dbUser || ''}`,
      `DB_PASSWORD=${body.dbPassword || ''}`,
      `DB_NAME=${body.dbName || ''}`,
      `DB_PORT=${body.dbPort || ''}`,
      '',
      '',
      '',
      '',
      ''
    ].join('\n')
    
    // 更新 hy.py 文件中的 tron_api_key
    if (body.tronApiKey !== undefined) {
      const hyPyContent = fs.readFileSync(hyPyPath, 'utf-8')
      const updatedHyPyContent = hyPyContent.replace(
        /tron_api_key\s*=\s*["'][^"']*["']/,
        `tron_api_key="${body.tronApiKey}"`
      )
      fs.writeFileSync(hyPyPath, updatedHyPyContent, 'utf-8')
    }
    
    // 写入文件
    fs.writeFileSync(configPath, configContent, 'utf-8')
    fs.writeFileSync(envPath, envContent, 'utf-8')
    
    // 如果启用了热更新，触发配置重载
    if (body.hotReload) {
      try {
        // 创建一个触发文件来通知配置监听器
        const triggerPath = path.join(basePath, '.config_reload_trigger')
        fs.writeFileSync(triggerPath, Date.now().toString(), 'utf-8')
        
        return {
          success: true,
          message: '配置保存成功，已触发热更新'
        }
      } catch (triggerError) {
        console.error('触发热更新失败:', triggerError)
        return {
          success: true,
          message: '配置保存成功，但热更新触发失败'
        }
      }
    }
    
    return {
      success: true,
      message: '配置保存成功'
    }
  } catch (error) {
    console.error('保存配置文件失败:', error)
    return {
      success: false,
      error: '保存配置文件失败: ' + (error as Error).message
    }
  }
})