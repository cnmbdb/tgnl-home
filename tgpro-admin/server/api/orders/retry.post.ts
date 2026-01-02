import { executeQuery } from '../../utils/database'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { orderId, order_id } = body
    const finalOrderId = orderId || order_id

    if (!finalOrderId) {
      return {
        success: false,
        error: '订单ID不能为空'
      }
    }

    // 获取订单信息
    const getOrderQuery = 'SELECT * FROM orders WHERE order_id = ?'
    const orders = await executeQuery(getOrderQuery, [finalOrderId]) as any[]
    
    if (orders.length === 0) {
      return {
        success: false,
        error: '订单不存在'
      }
    }

    const order = orders[0]

    // 只允许重新开通失败的订单
    if (order.status !== 'failed') {
      return {
        success: false,
        error: '只能重新开通失败的订单'
      }
    }

    // 更新订单状态为处理中
    const updateQuery = `
      UPDATE orders 
      SET status = 'processing', 
          failure_reason = NULL, 
          updated_at = CURRENT_TIMESTAMP 
      WHERE order_id = ?
    `
    await executeQuery(updateQuery, [finalOrderId])

    // 调用Python脚本进行重新开通
    try {
      console.log(`重新开通订单: ${finalOrderId}, 用户: ${order.username}, 金额: ${order.amount}`)
      
      // 调用Python重新开通脚本
      const { spawn } = require('child_process')
      const pythonPath = '/www/server/pyporject_evn/versions/3.9.7/bin/python3.9'
      const scriptPath = '/www/wwwroot/tgpro-admin/hf-tgpro/retry_order.py'
      
      const retryProcess = spawn(pythonPath, [scriptPath, finalOrderId], {
        cwd: '/www/wwwroot/tgpro-admin/hf-tgpro',
        stdio: ['pipe', 'pipe', 'pipe']
      })
      
      let stdout = ''
      let stderr = ''
      
      retryProcess.stdout.on('data', (data: Buffer) => {
        stdout += data.toString()
      })
      
      retryProcess.stderr.on('data', (data: Buffer) => {
        stderr += data.toString()
      })
      
      // 等待进程完成
      await new Promise((resolve, reject) => {
        retryProcess.on('close', (code: number) => {
          console.log(`重新开通脚本执行完成，退出代码: ${code}`)
          console.log(`标准输出: ${stdout}`)
          if (stderr) {
            console.log(`标准错误: ${stderr}`)
          }
          
          if (code === 0) {
            console.log(`订单 ${orderId} 重新开通成功`)
            resolve(true)
          } else {
            console.log(`订单 ${orderId} 重新开通失败`)
            resolve(false)
          }
        })
        
        retryProcess.on('error', (error: Error) => {
          console.error('执行重新开通脚本失败:', error)
          reject(error)
        })
        
        // 设置超时时间（60秒）
        setTimeout(() => {
          retryProcess.kill()
          reject(new Error('重新开通脚本执行超时'))
        }, 60000)
      })
      
    } catch (retryError) {
      console.error('重新开通订单失败:', retryError)
      // 更新为失败状态
      const failQuery = `
        UPDATE orders 
        SET status = 'failed', 
            failure_reason = '重新开通过程中出现错误',
            updated_at = CURRENT_TIMESTAMP 
        WHERE order_id = ?
      `
      await executeQuery(failQuery, [orderId])
    }

    return {
      success: true,
      message: '订单重新开通请求已提交'
    }
  } catch (error) {
    console.error('重新开通订单失败:', error)
    return {
      success: false,
      error: '重新开通订单失败'
    }
  }
})