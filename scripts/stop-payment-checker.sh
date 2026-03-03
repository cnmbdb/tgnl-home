#!/bin/bash

# 停止充值支付检测定时任务

PID_FILE="/tmp/check-payments.pid"

if [ ! -f "$PID_FILE" ]; then
    echo "❌ 支付检测任务未运行"
    exit 1
fi

PID=$(cat "$PID_FILE")

if ps -p "$PID" > /dev/null 2>&1; then
    kill "$PID"
    rm -f "$PID_FILE"
    echo "✅ 支付检测任务已停止 (PID: $PID)"
else
    rm -f "$PID_FILE"
    echo "⚠️  任务进程不存在，已清理 PID 文件"
fi
