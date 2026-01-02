#!/bin/bash
echo "=== 系统资源监控 $(date) ==="
echo "内存使用情况:"
free -h
echo ""
echo "CPU负载:"
uptime
echo ""
echo "占用内存最多的进程:"
ps aux --sort=-%mem | head -5
echo "=========================="
