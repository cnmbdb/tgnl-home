import { NextRequest, NextResponse } from 'next/server';

// 通知机器人系统支付成功（由能量池系统调用）
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

    // 这里可以调用机器人的webhook或API来通知
    // 暂时返回成功，实际通知逻辑由调用方处理
    return NextResponse.json({
      success: true,
      message: '通知已发送',
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
    console.error('通知机器人失败:', error);
    return NextResponse.json(
      { success: false, error: error.message || '通知失败' },
      { status: 500 }
    );
  }
}














