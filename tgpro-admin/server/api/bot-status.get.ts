import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

export default defineEventHandler(async (event) => {
  try {
    // 获取真实的机器人进程信息
    const botProcesses = await getBotProcesses()
    
    return {
      success: true,
      data: {
        processes: botProcesses,
        processCount: botProcesses.length,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('获取机器人状态失败:', error)
    return {
      success: false,
      error: '获取机器人状态失败',
      data: {
        processes: [],
        processCount: 0,
        timestamp: new Date().toISOString()
      }
    }
  }
})

async function getBotProcesses() {
  try {
    const processes = []
    
    // 查找所有运行中的 hy.py 进程
    const { stdout } = await execAsync(`ps aux | grep "hy.py" | grep -v grep`)
    
    if (stdout.trim()) {
      const lines = stdout.trim().split('\n')
      
      for (const line of lines) {
        const parts = line.trim().split(/\s+/)
        if (parts.length >= 11) {
          const user = parts[0]
          const pid = parseInt(parts[1])
          const cpuUsage = parseFloat(parts[2])
          const memUsage = parseFloat(parts[3])
          const startTime = parts[8] // 启动时间
          const command = parts.slice(10).join(' ')
          
          // 获取进程的详细信息
          const processInfo = await getProcessDetails(pid)
          
          processes.push({
            pid: pid,
            name: 'Telegram Bot (hy.py)',
            cpuUsage: cpuUsage,
            memUsage: memUsage,
            status: 'running',
            uptime: processInfo.uptime,
            startedAt: processInfo.startedAt,
            command: command,
            workingDir: (() => {
               const projectRoot = process.cwd()
               const actualRoot = projectRoot.endsWith('.output') ? path.dirname(projectRoot) : projectRoot
               return path.join(actualRoot, 'hf-tgpro')
             })(),
            user: user,
            startTime: startTime
          })
        }
      }
    }
    
    return processes
  } catch (error) {
    console.error('获取进程信息失败:', error)
    return []
  }
}

async function getProcessDetails(pid: number) {
  try {
    // 获取进程启动时间
    const { stdout: statOutput } = await execAsync(`ps -o lstart= -p ${pid}`)
    const startedAt = new Date(statOutput.trim()).toISOString()
    
    // 计算运行时间
    const now = new Date()
    const startTime = new Date(startedAt)
    const uptimeSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000)
    
    return {
      startedAt,
      uptime: formatUptime(uptimeSeconds)
    }
  } catch (error) {
    // 如果获取详细信息失败，返回默认值
    const now = new Date()
    return {
      startedAt: now.toISOString(),
      uptime: '未知'
    }
  }
}

function formatUptime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}