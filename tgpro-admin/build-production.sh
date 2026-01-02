#!/bin/bash

# 生产环境构建脚本
echo "开始构建生产环境..."

# 检查 Node.js 版本
echo "检查 Node.js 版本..."
node --version
npm --version

# 安装依赖
echo "安装项目依赖..."
npm ci --production=false

# 构建项目
echo "构建 Nuxt 项目..."
npm run build

# 检查构建结果
if [ -d ".output" ]; then
    echo "✅ 构建成功！"
    echo "构建输出目录: .output"
    ls -la .output/
else
    echo "❌ 构建失败！"
    exit 1
fi

# 检查环境配置文件
if [ -f ".env" ]; then
    echo "✅ 环境配置文件 .env 已存在"
else
    echo "❌ 错误: 未找到 .env 文件，请确保配置文件存在"
    exit 1
fi

echo "🎉 生产环境构建完成！"