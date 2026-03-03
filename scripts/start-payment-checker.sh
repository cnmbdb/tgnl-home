#!/bin/bash

# 启动充值支付检测定时任务
# 这个脚本会在后台运行，每30秒检查一次充值订单的支付状态

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_FILE="/tmp/check-payments.log"
PID_FILE="/tmp/check-payments.pid"

# 检查是否已经在运行
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if ps -p "$OLD_PID" > /dev/null 2>&1; then
        echo "支付检测任务已在运行 (PID: $OLD_PID)"
        exit 0
    else
        rm -f "$PID_FILE"
    fi
fi

# 启动任务
cd "$PROJECT_DIR"
nohup node scripts/check-recharge-payments.js > "$LOG_FILE" 2>&1 &
NEW_PID=$!

# 保存 PID
echo "$NEW_PID" > "$PID_FILE"

echo "✅ 支付检测任务已启动 (PID: $NEW_PID)"
echo "📝 日志文件: $LOG_FILE"
echo "🛑 停止任务: kill $NEW_PID 或运行 stop-payment-checker.sh"
