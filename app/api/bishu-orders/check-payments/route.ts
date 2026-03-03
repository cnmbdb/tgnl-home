import { NextRequest, NextResponse } from 'next/server';

// 检查笔数套餐订单的支付状态
// 这个API由机器人系统调用，或者由定时任务调用
// 检测到支付后，通知机器人系统处理订单
export async function POST(request: NextRequest) {
  try {
    const RECHARGE_PAYMENT_ADDRESS = 'TJdtCWfm4iaqcQVMJchrobkbP5Y9yqNpPf';
    const TRON_API_KEY = process.env.TRON_API_KEY || '93ed8c29-bd1c-4940-ad6c-7eb53bf58bcb';
    
    // 查询该地址最近的TRX转账记录
    const response = await fetch(
      `https://api.trongrid.io/v1/accounts/${RECHARGE_PAYMENT_ADDRESS}/transactions?only_confirmed=true&limit=100`,
      {
        headers: {
          'TRON-PRO-API-KEY': TRON_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: '查询区块链失败',
      }, { status: 500 });
    }

    const data = await response.json();
    const transactions = data.data || [];
    const processedOrders: any[] = [];

    // 这里需要从机器人系统获取待支付的笔数套餐订单列表
    // 由于订单在机器人系统的MySQL数据库中，我们需要通过机器人系统的API获取
    // 或者让机器人系统自己检测并调用处理函数
    
    // 暂时返回成功，实际检测逻辑由机器人系统自己实现
    return NextResponse.json({
      success: true,
      message: '笔数套餐订单检测需要机器人系统自己实现',
      data: processedOrders,
    });
  } catch (error: any) {
    console.error('检查笔数套餐订单支付状态失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '检查支付状态失败' },
      { status: 500 }
    );
  }
}










