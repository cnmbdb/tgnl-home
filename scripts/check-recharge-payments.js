#!/usr/bin/env node

/**
 * 定时任务：检测充值订单的支付状态
 * 这个脚本会定期调用能量池系统的 check-payments API 来检测充值地址的转账记录
 * 
 * 使用方法：
 * 1. 使用 node-cron 或系统 cron 定时运行此脚本
 * 2. 或者使用 PM2 的 cron 功能
 * 3. 默认每10秒检测一次，可通过环境变量 CHECK_INTERVAL 自定义（单位：毫秒）
 * 
 * 环境变量：
 * - CHECK_INTERVAL: 检测间隔（毫秒），默认 10000（10秒）
 * - ENERGY_POOL_API_URL: 能量池系统 API 地址，默认 http://localhost:3000
 * 
 * 示例：
 * CHECK_INTERVAL=5000 node scripts/check-recharge-payments.js  # 每5秒检测一次
 * CHECK_INTERVAL=15000 node scripts/check-recharge-payments.js # 每15秒检测一次
 */

const API_URL = process.env.ENERGY_POOL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const CHECK_INTERVAL = parseInt(process.env.CHECK_INTERVAL || '10000'); // 默认10秒，可通过环境变量自定义

async function checkPayments() {
  try {
    const response = await fetch(`${API_URL}/api/api-recharge-orders/check-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[${new Date().toISOString()}] 检查支付状态失败: ${response.status} ${response.statusText}`);
      console.error(`错误详情: ${errorText}`);
      return;
    }

    const result = await response.json();
    
    if (result.success) {
      const processedCount = result.data?.length || 0;
      if (processedCount > 0) {
        console.log(`[${new Date().toISOString()}] ✅ 检测到 ${processedCount} 个订单已支付`);
        result.data.forEach(order => {
          console.log(`  - 订单 ${order.orderId}: ${order.amountTrx} TRX, API用户: ${order.apiUsername}`);
        });
      } else {
        console.log(`[${new Date().toISOString()}] ℹ️  没有新的支付订单`);
      }
    } else {
      console.error(`[${new Date().toISOString()}] ❌ 检查失败: ${result.error || '未知错误'}`);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ 检查支付状态异常:`, error.message);
  }
}

// 如果作为脚本直接运行，则立即执行一次，然后按间隔重复执行
if (require.main === module) {
  console.log(`[${new Date().toISOString()}] 🚀 充值支付检测任务已启动`);
  console.log(`API地址: ${API_URL}`);
  console.log(`检测间隔: ${CHECK_INTERVAL / 1000}秒`);
  
  // 立即执行一次
  checkPayments();
  
  // 然后按间隔重复执行
  setInterval(checkPayments, CHECK_INTERVAL);
}

module.exports = { checkPayments };
