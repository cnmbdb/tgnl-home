#!/bin/bash

# 停止智能支付检测任务管理器

PID_FILE="/tmp/payment-checker-manager.pid"

if [ ! -f "$PID_FILE" ]; then
    echo "❌ 支付检测任务管理器未运行"
    exit 1
fi

PID=$(cat "$PID_FILE")

if ps -p "$PID" > /dev/null 2>&1; then
    kill "$PID"
    rm -f "$PID_FILE"
    echo "✅ 支付检测任务管理器已停止 (PID: $PID)"
    
    # 同时停止检测任务（如果正在运行）
    CHECK_PID_FILE="/tmp/check-payments.pid"
    if [ -f "$CHECK_PID_FILE" ]; then
        CHECK_PID=$(cat "$CHECK_PID_FILE")
        if ps -p "$CHECK_PID" > /dev/null 2>&1; then
            kill "$CHECK_PID" 2>/dev/null
            echo "✅ 支付检测任务已停止 (PID: $CHECK_PID)"
        fi
        rm -f "$CHECK_PID_FILE"
    fi
else
    rm -f "$PID_FILE"
    echo "⚠️  管理器进程不存在，已清理 PID 文件"
fi
