#!/bin/bash

# 启动智能支付检测任务管理器
# 这个管理器会：
# 1. 检查是否有待处理的充值订单
# 2. 如果有订单，启动检测任务
# 3. 如果没有订单，停止检测任务
# 4. 每30秒检查一次订单状态

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_FILE="/tmp/payment-checker-manager.log"
PID_FILE="/tmp/payment-checker-manager.pid"

# 检查是否已经在运行
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if ps -p "$OLD_PID" > /dev/null 2>&1; then
        echo "支付检测任务管理器已在运行 (PID: $OLD_PID)"
        exit 0
    else
        rm -f "$PID_FILE"
    fi
fi

# 启动管理器
cd "$PROJECT_DIR"
nohup node scripts/payment-checker-manager.js > "$LOG_FILE" 2>&1 &
NEW_PID=$!

# 保存 PID
echo "$NEW_PID" > "$PID_FILE"

echo "✅ 支付检测任务管理器已启动 (PID: $NEW_PID)"
echo "📝 日志文件: $LOG_FILE"
echo "🛑 停止管理器: kill $NEW_PID 或运行 stop-payment-checker-manager.sh"
echo ""
echo "💡 管理器会自动："
echo "   - 检测到订单时启动支付检测任务"
echo "   - 没有订单时停止支付检测任务"
