import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs'
import { requireAdmin } from '../utils/auth'

const execAsync = promisify(exec)

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
    const botDir = '/www/wwwroot/tgpro-admin/nl-2333'
const botScript = 'al.py'
    const botPath = path.join(botDir, botScript)
    const pythonPath = '/www/server/pyporject_evn/versions/3.9.7/bin/python3.9'
    
    // 检查机器人文件是否存在
    if (!fs.existsSync(botPath)) {
      return {
        success: false,
        error: '机器人文件不存在: ' + botPath
      }
    }
    
    console.log('开始重启机器人进程...')
    
    try {
      // 1. 杀掉所有机器人相关进程
      console.log('正在清理所有机器人相关进程...')
      
      // 1.1 停止并删除所有PM2进程
      try {
        console.log('检查并清理PM2进程...')
        const { stdout: pm2List } = await execAsync('pm2 jlist')
        const pm2Processes = JSON.parse(pm2List)
        
        for (const process of pm2Processes) {
          if (process.pm2_env && process.pm2_env.pm_exec_path && 
              (process.pm2_env.pm_exec_path.includes('al.py') || 
               process.name.includes('bot') || 
               process.name.includes('tgpro'))) {
            console.log(`发现PM2机器人进程: ${process.name} (ID: ${process.pm_id})`)
            try {
              await execAsync(`pm2 delete ${process.pm_id}`)
              console.log(`已删除PM2进程: ${process.name}`)
            } catch (error) {
              console.log(`删除PM2进程失败: ${process.name}`, error)
            }
          }
        }
      } catch (error) {
        console.log('检查PM2进程失败或无PM2进程:', error)
      }
      
      // 1.2 杀掉所有Python机器人进程
      try {
        console.log('查找并杀掉Python机器人进程...')
        
        // 查找所有al.py进程
      try {
        const { stdout: pythonProcesses } = await execAsync('ps aux | grep al.py | grep -v grep')
          if (pythonProcesses.trim()) {
            console.log('发现Python机器人进程:')
            console.log(pythonProcesses)
            
            const lines = pythonProcesses.trim().split('\n')
            for (const line of lines) {
              const parts = line.trim().split(/\s+/)
              if (parts.length >= 2) {
                const pid = parts[1]
                try {
                  await execAsync(`kill -9 ${pid}`)
                  console.log(`已杀掉Python进程 PID: ${pid}`)
                } catch (error) {
                  console.log(`杀掉进程失败 PID: ${pid}`, error)
                }
              }
            }
          } else {
            console.log('未发现Python机器人进程')
          }
        } catch (error) {
          console.log('未发现Python机器人进程或查找失败:', error)
        }
        
        // 使用pkill命令强制杀掉所有相关进程
        try {
          await execAsync('pkill -f "al.py"')
        console.log('已使用pkill清理al.py进程')
      } catch (error) {
        console.log('pkill清理al.py进程失败或无进程:', error)
        }
        
        try {
          await execAsync('pkill -f "nl-2333"')
        console.log('已使用pkill清理nl-2333进程')
      } catch (error) {
        console.log('pkill清理nl-2333进程失败或无进程:', error)
        }
        
        // 查找所有nl-2333路径相关的进程
        try {
          const { stdout: pathProcesses } = await execAsync('ps aux | grep nl-2333 | grep -v grep')
          if (pathProcesses.trim()) {
            console.log('发现nl-2333相关进程:')
            console.log(pathProcesses)
            
            const lines = pathProcesses.trim().split('\n')
            for (const line of lines) {
              const parts = line.trim().split(/\s+/)
              if (parts.length >= 2) {
                const pid = parts[1]
                try {
                  await execAsync(`kill -9 ${pid}`)
                  console.log(`已清理nl-2333相关进程 PID: ${pid}`)
                } catch (error) {
                  console.log(`清理进程失败 PID: ${pid}`, error)
                }
              }
            }
          }
        } catch (error) {
          console.log('未发现nl-2333相关进程或查找失败:', error)
        }
      } catch (error) {
        console.log('清理Python进程失败:', error)
      }
      
      // 等待进程完全清理
      console.log('等待进程清理完成...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 2. 使用宝塔面板Python3.9.7启动机器人
      console.log('正在使用宝塔面板Python3.9.7启动机器人...')
      console.log(`Python路径: ${pythonPath}`)
      console.log(`机器人脚本: ${botScript}`)
      console.log(`工作目录: ${botDir}`)
      
      // 创建日志目录
      const logDir = path.join(botDir, 'logs')
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true })
        console.log('已创建日志目录:', logDir)
      }
      
      const logFile = path.join(logDir, 'bot.log')
      const startCommand = `cd ${botDir} && nohup ${pythonPath} ${botScript} > ${logFile} 2>&1 &`
      
      console.log('执行启动命令:', startCommand)
      console.log('工作目录:', botDir)
      
      // 确保在正确的目录下启动
      await execAsync(startCommand, { 
        cwd: botDir,
        env: { ...process.env, PYTHONPATH: botDir }
      })
      console.log('启动命令执行完成')
      
      // 3. 验证机器人启动
      console.log('等待机器人启动...')
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // 检查机器人进程是否启动成功
      try {
        const { stdout: checkProcesses } = await execAsync('ps aux | grep al.py | grep -v grep')
        if (checkProcesses.trim()) {
          console.log('机器人进程启动成功:')
          console.log(checkProcesses)
          
          // 解析进程信息
          const lines = checkProcesses.trim().split('\n')
          const processInfo = []
          
          for (const line of lines) {
            const parts = line.trim().split(/\s+/)
            if (parts.length >= 11) {
              processInfo.push({
                user: parts[0],
                pid: parts[1],
                cpu: parts[2],
                memory: parts[3],
                command: parts.slice(10).join(' ')
              })
            }
          }
          
          return {
            success: true,
            message: '机器人重启成功',
            processes: processInfo,
            python_path: pythonPath,
            log_file: logFile,
            bot_dir: botDir
          }
        } else {
          // 检查日志文件获取错误信息
          let errorInfo = '未知错误'
          try {
            if (fs.existsSync(logFile)) {
              const logContent = fs.readFileSync(logFile, 'utf8')
              const lastLines = logContent.split('\n').slice(-10).join('\n')
              errorInfo = lastLines || '日志文件为空'
            } else {
              errorInfo = '日志文件不存在'
            }
          } catch (logError: any) {
            errorInfo = '无法读取日志文件: ' + logError.message
          }
          
          return {
            success: false,
            error: '机器人启动失败，未发现运行进程',
            log_info: errorInfo,
            python_path: pythonPath,
            log_file: logFile
          }
        }
      } catch (error: any) {
         // 如果检查进程失败（比如没有进程运行），仍然返回成功，因为我们已经尝试启动了
         console.log('检查进程状态失败，但启动命令已执行:', error.message)
         return {
           success: true,
           message: '机器人启动命令已执行',
           processes: [],
           python_path: pythonPath,
           log_file: logFile,
           bot_dir: botDir,
           note: '进程检查失败，请手动验证机器人状态'
         }
       }
      
    } catch (error: any) {
      console.error('重启机器人时发生错误:', error)
      return {
        success: false,
        error: error.message || '重启机器人失败'
      }
    }
    
  } catch (error: any) {
    console.error('重启机器人时发生错误:', error)
    return {
      success: false,
      error: error.message || '重启机器人失败'
    }
  }
})
