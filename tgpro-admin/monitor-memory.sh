#!/bin/bash

# TGPro Admin 内存监控脚本
# 用于监控应用内存使用情况并在内存使用过高时自动重启

LOG_FILE="/var/log/tgpro/memory-monitor.log"
MEMORY_THRESHOLD=80  # 内存使用率阈值（百分比）
CHECK_INTERVAL=60    # 检查间隔（秒）

# 创建日志目录
sudo mkdir -p /var/log/tgpro
sudo touch $LOG_FILE

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | sudo tee -a $LOG_FILE
}

check_memory_usage() {
    # 获取系统内存使用率
    MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.1f", $3/$2 * 100.0)}')
    
    # 获取tgpro-admin进程内存使用
    ADMIN_MEMORY=$(ps aux | grep 'tgpro-admin' | grep -v grep | awk '{sum+=$6} END {print sum/1024}')
    
    # 获取tgpro-bot进程内存使用
    BOT_MEMORY=$(ps aux | grep 'tgpro-bot' | grep -v grep | awk '{sum+=$6} END {print sum/1024}')
    
    log_message "系统内存使用率: ${MEMORY_USAGE}%, Admin进程: ${ADMIN_MEMORY}MB, Bot进程: ${BOT_MEMORY}MB"
    
    # 检查是否超过阈值
    if (( $(echo "$MEMORY_USAGE > $MEMORY_THRESHOLD" | bc -l) )); then
        log_message "警告: 内存使用率超过阈值 ${MEMORY_THRESHOLD}%，当前使用率: ${MEMORY_USAGE}%"
        
        # 重启应用
        log_message "正在重启tgpro应用..."
        pm2 restart tgpro-admin
        pm2 restart tgpro-bot
        
        log_message "应用重启完成"
        
        # 等待一段时间再检查
        sleep 30
    fi
}

# 主循环
log_message "内存监控脚本启动，阈值: ${MEMORY_THRESHOLD}%，检查间隔: ${CHECK_INTERVAL}秒"

while true; do
    check_memory_usage
    sleep $CHECK_INTERVAL
done
