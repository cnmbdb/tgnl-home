import { NextRequest, NextResponse } from 'next/server';

// 通知Telegram用户支付成功
// 这个API由能量池系统调用，通知机器人系统
// 机器人系统收到后，会发送消息给TG用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, apiUsername, amountTrx, txHash, newBalanceTrx, telegramChatId, telegramMessageId } = body;

    if (!orderId || !apiUsername || !amountTrx || !txHash) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 这里应该调用机器人的API来发送Telegram消息
    // 由于机器人是独立的Python服务，我们需要通过HTTP调用
    // 机器人需要提供一个接收通知的HTTP端点
    
    // 暂时返回成功，实际通知由机器人系统的HTTP接口处理
    return NextResponse.json({
      success: true,
      message: '通知信息已准备',
      data: {
        orderId,
        apiUsername,
        amountTrx,
        txHash,
        newBalanceTrx,
        telegramChatId,
        telegramMessageId,
      },
    });
  } catch (error: any) {
    console.error('通知Telegram失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '通知失败' },
      { status: 500 }
    );
  }
}














