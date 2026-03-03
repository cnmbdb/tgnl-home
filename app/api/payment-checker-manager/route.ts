import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { spawn, spawnSync } from 'child_process'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isManagerRunning() {
  const pidFile = '/tmp/payment-checker-manager.pid'
  if (!fs.existsSync(pidFile)) return false
  try {
    const pid = parseInt(fs.readFileSync(pidFile, 'utf-8').trim(), 10)
    if (!pid || Number.isNaN(pid)) return false
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function getIntervals() {
  const checkInterval = parseInt(process.env.CHECK_INTERVAL || '10000', 10)
  const managerInterval = parseInt(process.env.MANAGER_INTERVAL || '10000', 10)
  return { checkInterval, managerInterval }
}

export async function GET() {
  const running = isManagerRunning()
  const { checkInterval, managerInterval } = getIntervals()

  return NextResponse.json({
    success: true,
    data: {
      running,
      checkInterval,
      managerInterval,
    },
  })
}

type Action = 'start' | 'stop' | 'restart'

async function runScript(script: 'start' | 'stop') {
  const projectDir = process.cwd()
  const managerScript = path.join(projectDir, 'scripts', 'payment-checker-manager.js')
  const checkScript = path.join(projectDir, 'scripts', 'check-recharge-payments.js')
  const pidFile = '/tmp/payment-checker-manager.pid'
  const checkPidFile = '/tmp/check-payments.pid'
  const logFile = '/tmp/payment-checker-manager.log'

  if (script === 'start') {
    // 检查是否已经在运行
    if (isManagerRunning()) {
      return { ok: false, message: '智能管理器已在运行' }
    }

    // 检查脚本文件是否存在
    if (!fs.existsSync(managerScript)) {
      return { ok: false, message: `管理器脚本不存在: ${managerScript}` }
    }

    try {
      // 直接启动 Node.js 进程（使用 spawn 而不是 spawnSync）
      const child = spawn('node', [managerScript], {
        cwd: projectDir,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: {
          ...process.env,
          CHECK_INTERVAL: process.env.CHECK_INTERVAL || '10000',
          MANAGER_INTERVAL: process.env.MANAGER_INTERVAL || '10000',
        },
      })

      // 保存 PID
      if (child.pid) {
        fs.writeFileSync(pidFile, child.pid.toString())
      }

      // 等待一下，让进程启动
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 检查进程是否启动成功
      if (isManagerRunning()) {
        const pid = parseInt(fs.readFileSync(pidFile, 'utf-8').trim(), 10)
        return { ok: true, message: `智能管理器已启动 (PID: ${pid})` }
      } else {
        return { ok: false, message: '启动失败：进程未成功启动' }
      }
    } catch (error: any) {
      return { ok: false, message: `启动失败: ${error.message}` }
    }
  } else {
    // stop
    try {
      // 停止管理器进程
      if (fs.existsSync(pidFile)) {
        const pid = parseInt(fs.readFileSync(pidFile, 'utf-8').trim(), 10)
        if (pid && !Number.isNaN(pid)) {
          try {
            process.kill(pid, 'SIGTERM')
            // 等待进程退出
            await new Promise(resolve => setTimeout(resolve, 1000))
            if (fs.existsSync(pidFile)) {
              fs.unlinkSync(pidFile)
            }
          } catch (e: any) {
            // 进程可能已经不存在
            if (fs.existsSync(pidFile)) {
              fs.unlinkSync(pidFile)
            }
          }
        }
      }

      // 停止检测任务进程
      if (fs.existsSync(checkPidFile)) {
        const pid = parseInt(fs.readFileSync(checkPidFile, 'utf-8').trim(), 10)
        if (pid && !Number.isNaN(pid)) {
          try {
            process.kill(pid, 'SIGTERM')
            if (fs.existsSync(checkPidFile)) {
              fs.unlinkSync(checkPidFile)
            }
          } catch (e: any) {
            // 进程可能已经不存在
            if (fs.existsSync(checkPidFile)) {
              fs.unlinkSync(checkPidFile)
            }
          }
        }
      }

      return { ok: true, message: '智能管理器已停止' }
    } catch (error: any) {
      return { ok: false, message: `停止失败: ${error.message}` }
    }
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { action?: Action }
  const action = body.action

  if (!action || !['start', 'stop', 'restart'].includes(action)) {
    return NextResponse.json(
      { success: false, error: '无效的操作类型' },
      { status: 400 },
    )
  }

  let result

  if (action === 'start' || action === 'stop') {
    result = await runScript(action)
  } else {
    // restart
    await runScript('stop')
    result = await runScript('start')
  }

  const running = isManagerRunning()
  const { checkInterval, managerInterval } = getIntervals()

  return NextResponse.json({
    success: result.ok,
    message: result.message,
    data: {
      running,
      checkInterval,
      managerInterval,
    },
  })
}

