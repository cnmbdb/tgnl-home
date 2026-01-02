#!/bin/bash

# TGPro Admin 生产环境启动脚本
# 使用方法: ./start-production.sh [start|stop|restart|status]

PROJECT_DIR="/www/wwwroot/tgpro-admin"
LOG_DIR="/var/log/tgpro"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_info "检查系统依赖..."
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装，请先安装 Node.js"
        exit 1
    fi
    
    # 检查 PM2
    if ! command -v pm2 &> /dev/null; then
        log_error "PM2 未安装，正在安装..."
        npm install -g pm2
    fi
    
    # 检查 Python3
    if ! command -v python3 &> /dev/null; then
        log_error "Python3 未安装，请先安装 Python3"
        exit 1
    fi
    
    log_success "依赖检查完成"
}

# 创建必要目录
create_directories() {
    log_info "创建必要目录..."
    
    # 创建日志目录
    sudo mkdir -p $LOG_DIR
    sudo chown -R www:www $LOG_DIR
    
    # 创建项目目录（如果不存在）
    sudo mkdir -p $PROJECT_DIR
    sudo chown -R www:www $PROJECT_DIR
    
    log_success "目录创建完成"
}

# 启动服务
start_services() {
    log_info "启动 TGPro Admin 服务..."
    
    cd $PROJECT_DIR
    
    # 检查是否已构建
    if [ ! -d ".output" ]; then
        log_warning "未找到构建文件，正在构建..."
        npm run build
    fi
    
    # 启动 PM2 服务
    pm2 start ecosystem.config.js --env production
    
    # 保存 PM2 配置
    pm2 save
    
    # 设置开机自启
    pm2 startup
    
    log_success "服务启动完成"
    
    # 显示状态
    pm2 status
}

# 停止服务
stop_services() {
    log_info "停止 TGPro Admin 服务..."
    
    pm2 stop ecosystem.config.js
    
    log_success "服务已停止"
}

# 重启服务
restart_services() {
    log_info "重启 TGPro Admin 服务..."
    
    cd $PROJECT_DIR
    
    # 重新构建（可选）
    if [ "$2" = "--rebuild" ]; then
        log_info "重新构建项目..."
        npm run build
    fi
    
    pm2 restart ecosystem.config.js
    
    log_success "服务重启完成"
    
    # 显示状态
    pm2 status
}

# 显示状态
show_status() {
    log_info "TGPro Admin 服务状态:"
    pm2 status
    
    echo ""
    log_info "服务日志:"
    pm2 logs --lines 10
}

# 主函数
main() {
    case "$1" in
        start)
            check_dependencies
            create_directories
            start_services
            ;;
        stop)
            stop_services
            ;;
        restart)
            restart_services
            ;;
        status)
            show_status
            ;;
        *)
            echo "使用方法: $0 {start|stop|restart|status}"
            echo ""
            echo "命令说明:"
            echo "  start   - 启动服务"
            echo "  stop    - 停止服务"
            echo "  restart - 重启服务 (可选 --rebuild 参数重新构建)"
            echo "  status  - 查看服务状态"
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"