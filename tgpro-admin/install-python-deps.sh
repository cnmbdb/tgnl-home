#!/bin/bash

# Python 依赖安装脚本
echo "安装 Python 依赖..."

cd hf-tgpro

# 检查 Python3 和 pip
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装，请先安装 Python3"
    exit 1
fi

if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 未安装，请先安装 pip3"
    exit 1
fi

# 升级 pip
echo "升级 pip..."
python3 -m pip install --upgrade pip

# 安装依赖
echo "安装项目依赖..."
pip3 install -r requirements.txt

# 检查关键依赖
echo "检查关键依赖..."
python3 -c "import telegram; print('✅ python-telegram-bot 安装成功')"
python3 -c "import tronapi; print('✅ tronapi 安装成功')"
python3 -c "import mysql.connector; print('✅ mysql-connector-python 安装成功')"
python3 -c "import requests; print('✅ requests 安装成功')"

echo "🎉 Python 依赖安装完成！"