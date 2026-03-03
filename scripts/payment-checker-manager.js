#!/usr/bin/env node

/**
 * 智能支付检测任务管理器
 * 功能：
 * 1. 检查是否有待处理的充值订单
 * 2. 如果有订单，启动/保持检测任务运行
 * 3. 如果没有订单，停止检测任务
 * 4. 定期检查订单状态，动态调整任务运行状态
 */

const { Pool } = require('pg');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PID_FILE = '/tmp/check-payments.pid';
const CHECK_SCRIPT = path.join(__dirname, 'check-recharge-payments.js');
const CHECK_INTERVAL = parseInt(process.env.CHECK_INTERVAL || '10000'); // 检测间隔（默认 10 秒）
const MANAGER_INTERVAL = parseInt(process.env.MANAGER_INTERVAL || '10000'); // 管理器检查间隔（默认 10 秒）
const IDLE_SHUTDOWN_MS = 15 * 60 * 1000; // 连续 15 分钟没有订单则自动休眠

// 记录最近一次检测到「有待处理订单」的时间
let lastHasOrderAt = null;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'tgnl_db',
  user: process.env.DB_USER || 'tgnl_user',
  password: process.env.DB_PASSWORD || 'tgnl_password',
});

/**
 * 检查是否有待处理的充值订单
 */
async function hasPendingOrders() {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) as count 
       FROM api_recharge_orders 
       WHERE status = 'pending' 
       AND created_at > NOW() - INTERVAL '1 hour'`
    );
    
    const count = parseInt(result.rows[0].count);
    return count > 0;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 检查订单失败:`, error.message);
    return false;
  }
}

/**
 * 检查检测任务是否在运行
 */
function isTaskRunning() {
  if (!fs.existsSync(PID_FILE)) {
    return false;
  }
  
  try {
    const pid = parseInt(fs.readFileSync(PID_FILE, 'utf-8').trim());
    // 检查进程是否存在
    try {
      process.kill(pid, 0); // 信号0不杀死进程，只检查是否存在
      return true;
    } catch (e) {
      // 进程不存在
      fs.unlinkSync(PID_FILE);
      return false;
    }
  } catch (error) {
    return false;
  }
}

/**
 * 启动检测任务
 */
function startTask() {
  if (isTaskRunning()) {
    return false; // 已经在运行
  }
  
  console.log(`[${new Date().toISOString()}] 🚀 启动支付检测任务`);
  
  const child = spawn('node', [CHECK_SCRIPT], {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      CHECK_INTERVAL: CHECK_INTERVAL.toString(),
    },
  });
  
  // 保存 PID
  fs.writeFileSync(PID_FILE, child.pid.toString());
  
  // 输出日志
  child.stdout.on('data', (data) => {
    console.log(`[检测任务] ${data.toString().trim()}`);
  });
  
  child.stderr.on('data', (data) => {
    console.error(`[检测任务错误] ${data.toString().trim()}`);
  });
  
  child.on('exit', (code) => {
    console.log(`[${new Date().toISOString()}] ⚠️  检测任务退出 (code: ${code})`);
    if (fs.existsSync(PID_FILE)) {
      fs.unlinkSync(PID_FILE);
    }
  });
  
  child.unref(); // 让父进程可以退出
  
  return true;
}

/**
 * 停止检测任务
 */
function stopTask() {
  if (!isTaskRunning()) {
    return false; // 没有运行
  }
  
  try {
    const pid = parseInt(fs.readFileSync(PID_FILE, 'utf-8').trim());
    console.log(`[${new Date().toISOString()}] 🛑 停止支付检测任务 (PID: ${pid})`);
    
    process.kill(pid, 'SIGTERM');
    
    // 等待进程退出
    setTimeout(() => {
      try {
        process.kill(pid, 0); // 检查是否还存在
        process.kill(pid, 'SIGKILL'); // 强制杀死
      } catch (e) {
        // 进程已退出
      }
      if (fs.existsSync(PID_FILE)) {
        fs.unlinkSync(PID_FILE);
      }
    }, 2000);
    
    return true;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 停止任务失败:`, error.message);
    if (fs.existsSync(PID_FILE)) {
      fs.unlinkSync(PID_FILE);
    }
    return false;
  }
}

/**
 * 管理器主循环
 */
async function managerLoop() {
  try {
    const hasOrders = await hasPendingOrders();
    const isRunning = isTaskRunning();
    const now = Date.now();

    if (hasOrders) {
      // 记录最近一次有订单的时间
      lastHasOrderAt = now;
      if (!isRunning) {
        console.log(
          `[${new Date().toISOString()}] ✅ 检测到待处理订单，自动启动支付检测任务（至少保持运行 15 分钟）`,
        );
        startTask();
      }
      return;
    }

    // 没有订单的情况：判断是否已经连续 15 分钟没有订单
    if (isRunning) {
      // 如果从未检测到订单，直接认为可以停止（防止任务空转）
      if (!lastHasOrderAt) {
        console.log(
          `[${new Date().toISOString()}] ℹ️ 没有检测到过待处理订单，自动停止检测任务`,
        );
        stopTask();
        return;
      }

      const idleDuration = now - lastHasOrderAt;
      if (idleDuration >= IDLE_SHUTDOWN_MS) {
        console.log(
          `[${new Date().toISOString()}] 💤 已连续 ${
            Math.round(idleDuration / 1000)
          } 秒没有待处理订单，自动休眠并停止检测任务`,
        );
        stopTask();
      }
    }
    // 其他情况：没有订单且任务未运行，保持休眠状态
  } catch (error) {
    console.error(`[${new Date().toISOString()}] 管理器循环错误:`, error.message);
  }
}

// 主程序
if (require.main === module) {
  console.log(`[${new Date().toISOString()}] 🎯 支付检测任务管理器已启动`);
  console.log(`检测间隔: ${CHECK_INTERVAL / 1000}秒`);
  console.log(`管理器检查间隔: ${MANAGER_INTERVAL / 1000}秒`);
  console.log(`无订单自动休眠时间: ${IDLE_SHUTDOWN_MS / 60000}分钟`);
  
  // 立即执行一次
  managerLoop();
  
  // 定期检查
  setInterval(managerLoop, MANAGER_INTERVAL);
  
  // 优雅退出
  process.on('SIGTERM', () => {
    console.log(`[${new Date().toISOString()}] 收到退出信号，停止检测任务...`);
    stopTask();
    pool.end();
    process.exit(0);
  });
  
  process.on('SIGINT', () => {
    console.log(`[${new Date().toISOString()}] 收到中断信号，停止检测任务...`);
    stopTask();
    pool.end();
    process.exit(0);
  });
}

module.exports = { startTask, stopTask, hasPendingOrders, isTaskRunning };
