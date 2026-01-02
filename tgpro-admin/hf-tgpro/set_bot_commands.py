#!/usr/bin/env python3
"""
设置Telegram机器人命令菜单的脚本
"""
import asyncio
import os
from telegram import Bot, BotCommand
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

def read_config(file_path: str) -> dict:
    """读取配置文件"""
    config = {}
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                line = line.strip()
                if line and '=' in line:
                    key, value = line.split('=', 1)
                    config[key.strip()] = value.strip()
    except FileNotFoundError:
        print(f"配置文件 {file_path} 未找到")
    return config

async def set_bot_commands():
    """设置机器人命令菜单"""
    # 读取配置文件获取TOKEN
    config = read_config('config.txt')
    TOKEN = config.get('TOKEN', '')
    
    if not TOKEN:
        print("错误：未找到机器人TOKEN")
        return
    
    # 创建机器人实例
    bot = Bot(token=TOKEN)
    
    # 定义命令列表
    commands = [
        BotCommand("start", "开始使用机器人"),
        BotCommand("help", "显示帮助信息"),
        BotCommand("buy", "购买Telegram会员"),
        BotCommand("info", "查看账户信息"),
        BotCommand("settings", "设置选项"),
    ]
    
    try:
        # 设置命令菜单
        await bot.set_my_commands(commands)
        print("✅ 机器人命令菜单设置成功！")
        print("设置的命令：")
        for cmd in commands:
            print(f"  /{cmd.command} - {cmd.description}")
            
        # 验证设置是否成功
        current_commands = await bot.get_my_commands()
        print(f"\n当前机器人命令菜单（共{len(current_commands)}个命令）：")
        for cmd in current_commands:
            print(f"  /{cmd.command} - {cmd.description}")
            
    except Exception as e:
        print(f"❌ 设置命令菜单失败：{e}")
    
    finally:
        # 关闭bot会话
        await bot.close()

if __name__ == "__main__":
    print("正在设置机器人命令菜单...")
    asyncio.run(set_bot_commands())