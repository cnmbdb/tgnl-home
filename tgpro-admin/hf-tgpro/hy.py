import threading
import hashlib
import json
import os
import subprocess
import sys
import time
import re
import asyncio
import threading
from datetime import datetime
from threading import Thread
from urllib.request import Request
import random
import mysql.connector
from decimal import Decimal
from mysql.connector import errors
from datetime import timedelta
from dotenv import load_dotenv
from telegram.ext import CallbackQueryHandler
from telegram import Update, ReplyKeyboardMarkup, InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import Updater, CommandHandler, CallbackContext, MessageHandler, Filters
import requests
from tronapi import Tron
from concurrent.futures import ThreadPoolExecutor
from requests.exceptions import ReadTimeout
from tronapi.exceptions import TransportError
import base64
from curl_cffi import requests

# 设置时区环境变量，避免APScheduler时区问题
os.environ['TZ'] = 'Asia/Shanghai'
import pytz
import time
time.tzset() if hasattr(time, 'tzset') else None

os.chdir(os.path.dirname(os.path.abspath(__file__)))
tron = Tron()
local_photo_path = "photo.jpg"
tron_api_key="e6e1e705-24e1-475e-84a6-34e44e90069e"

# 加载当前目录的.env文件（用于fragment.com配置）
load_dotenv()
# 加载上级目录的.env文件（用于数据库配置）
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env'))

cookie = os.getenv("ResCookie")
api_url = f"https://fragment.com/api/?hash={os.getenv('ResHash')}"
Agent_headers = {
    'scheme': 'https',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': cookie,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg',

}
# 数据库配置 - 从环境变量读取
config = {
        'user': os.getenv('DB_USER', 'hftgpro'),
        'password': os.getenv('DB_PASSWORD', 'hftgpro'),
        'host': os.getenv('DB_HOST', 'localhost'),
        'database': os.getenv('DB_NAME', 'hftgpro'),
        'port': int(os.getenv('DB_PORT', '3306')),
        'charset': 'utf8mb4'
    }
def convert_to_readable_time(epoch_time):
    return datetime.fromtimestamp(epoch_time).strftime('%Y-%m-%d %H:%M:%S')
def get_gift_premium_link(device, transaction_id, show_sender):
    """
    调用 API 获取礼品链接。

    :param api_url: API URL
    :param account: 账户信息 (dict)
    :param device: 设备信息 (dict)
    :param transaction_id: 交易 ID
    :param show_sender: 是否显示发送者 (int)
    :return: API 响应结果
    """
    payload = {
        # "account": account,
        "device": device,
        "transaction": 1,
        "id": transaction_id,
        "show_sender": show_sender,
        "method": "getGiftPremiumLink",
    }
    return send_request(payload)
def init_gift_premium_request(username, duration_int):
    payload = {
        "query": username,
        "months": duration_int,
        "method": "searchPremiumGiftRecipient",
    }
    result = send_request(payload)


    if not result:
        return "", "服务器异常，请重新查询"
    # print(result)
    found=result.get("found")
    recipient = found.get("recipient")
    if not recipient:
        return "", "无法找到平台账号，请重新确认！"
    print(recipient)
    payload = {
        "recipient": recipient,
        "months": duration_int,
        "method": "initGiftPremiumRequest",
    }
    result = send_request(payload)
    print(222,result)
    if not result:
        return "", "初始化会员请求失败，请重试"

    req_id = result.get("req_id")
    if not req_id:
        return "", "无法获取请求ID，请重试"
    # confirm_order = {
    #     "id": req_id,
    #     "show_sender": 1,
    #     "method": "getGiftPremiumLink",
    # }
    # result = send_request(api_url, confirm_order)
    # if not result:
    #     return "", "确认订单失败，请重试"

    print("req_id",req_id)
    device = {
        "platform": "iphone",
        "appName": "Tonkeeper",
        "appVersion": "4.9.0",
        "maxProtocolVersion": 2,
        "features": ["SendTransaction", {"name": "SendTransaction", "maxMessages": 4}]
    }
    transaction_id = req_id
    show_sender = 1
    print(api_url, device, transaction_id, show_sender)
    response_data = get_gift_premium_link(device, transaction_id, show_sender)
    print(response_data)

    if not response_data.get('ok'):
        raise ValueError("响应数据中 'ok' 字段为 False，无法提取数据。")

    transaction = response_data.get('transaction', {})
    messages = transaction.get('messages', [])

    if not messages:
        raise ValueError("交易数据中没有可用的消息。")

    # 获取第一个消息中的 payload 和 amount
    first_message = messages[0]
    payload = first_message.get('payload')
    amount = int(first_message.get('amount'))/1000000000

    # 转换有效期
    valid_until = transaction.get('validUntil')
    expire_at = convert_to_readable_time(valid_until)
    
    print("payload",payload)
    ref=decode_and_extract(payload)
    return ref, amount, expire_at
def get_raw_request(req_id):
    url = f"https://fragment.com/tonkeeper/rawRequest?id={req_id}"
    print(url)
    response_data = send_request2(url)
    print(response_data)  # 打印确认

    try:
        body = response_data.get("body")
        if not body:
            raise ValueError("Invalid 'body' field in the response")

        params = body.get("params")
        if not params:
            raise ValueError("Invalid 'params' field in the 'body' object")

        messages = params.get("messages")
        if not messages or len(messages) == 0:
            raise ValueError("Invalid 'messages' field in the 'params' object")

        first_message = messages[0]
        amount = first_message.get("amount")
        if not amount:
            raise ValueError("Invalid 'amount' field in the first message object")

        payload = first_message.get("payload")
        if not payload:
            raise ValueError("Invalid 'payload' field in the first message object")

        expires_sec = body.get("expires_sec")
        if not expires_sec:
            raise ValueError("Invalid 'expires_sec' field in the 'body' object")
        readable_expires_time = convert_to_readable_time(expires_sec)

        return payload, amount/1000000000, readable_expires_time
    except ValueError as e:
        print(f"Value error: {e}")
        return None, None, None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None, None, None
def decode_and_extract(payload):
    """
    填充并解码payload，然后提取目标字符串。
    """
    padding = len(payload) % 4
    if padding > 0:
        payload += "=" * (4 - padding)

    print(f"payload: {payload}")

    try:
        decoded_payload = base64.b64decode(payload)
        print(f"decodedPayload (bytes): {decoded_payload}")

        match = extract_ref_from_payload(decoded_payload)
        if len(match) == 9:
            print(f"提取到的字符: {match}")
        else:
            raise
            print("未找到匹配的字符")
        return match
    except Exception as e:
        print(f"Error: {e}")
        return None
def extract_ref_from_payload(decoded_payload):
    """
    从解码后的字节序列中提取目标字符串。
    """
    ref_str = b""
    ref_index = decoded_payload.find(b"#")
    if ref_index != -1:
        ref_index += 1  # 跳过 '#'
        while len(ref_str) < 9 and ref_index < len(decoded_payload):
            byte = decoded_payload[ref_index]
            if byte in range(65, 91) or byte in range(97, 123) or byte in range(48, 58):  # A-Z, a-z, 0-9
                ref_str += bytes([byte])
            ref_index += 1
    else:
        print("Ref# not found")
    return ref_str.decode('utf-8', errors='ignore')
def send_request2(api_url, max_retries=5):
    for attempt in range(max_retries):
        try:
            response = requests.get(api_url,headers=Agent_headers, impersonate="chrome101")
            print(response.text)
            # 解析JSON响应
            try:
                result = response.json()
                return result
            except json.JSONDecodeError:
                # print(f"JSON decode error: {response_text}")
                continue  # 尝试下一次请求
            except Exception as err:
                print(f"Other error occurred: {err}")
                continue  # 尝试下一次请求

        except Exception as e:
            print(f"Request attempt {attempt + 1} failed: {e}")
            continue  # 尝试下一次请求

    print("All request attempts failed.")
    return None    
        
def send_request(payload, max_retries=3):
    for attempt in range(max_retries):
        try:
            print(f"[DEBUG] 尝试第 {attempt + 1} 次请求 Fragment API...")
            print(f"[DEBUG] 请求参数: {payload}")
            response = requests.get(api_url, params=payload, headers=Agent_headers, impersonate="chrome101", timeout=30)

            # 检查响应状态码
            if response.status_code == 200:
                # 解析JSON响应
                try:
                    result = response.json()
                    print(f"[DEBUG] API请求成功，返回数据: {str(result)[:200]}...")
                    return result
                except json.JSONDecodeError:
                    print(f"JSON解码错误：{response.text[:500]}")
                    return None
                except Exception as err:
                    print(f"发生其他错误：{err}")
                    return None
            elif response.status_code == 413:
                print(f"请求失败，状态码：{response.status_code} (请求实体过大)")
                print(f"响应内容: {response.text[:500]}")
                # 对于413错误，不重试，直接返回错误信息
                return {"error": "请求数据过大，请检查API配置"}
            elif response.status_code == 429:
                print(f"请求失败，状态码：{response.status_code} (请求过于频繁)")
                if attempt < max_retries - 1:
                    wait_time = (attempt + 1) * 2
                    print(f"等待 {wait_time} 秒后重试...")
                    time.sleep(wait_time)
                    continue
            else:
                print(f"请求失败，状态码：{response.status_code}")
                print(f"响应内容: {response.text[:500]}")
                if attempt < max_retries - 1:
                    time.sleep(1)
                    continue
                    
        except Exception as e:
            print(f"请求过程中发生错误 (尝试 {attempt + 1}/{max_retries}): {e}")
            if attempt < max_retries - 1:
                time.sleep(2)
                continue
    
    print(f"所有 {max_retries} 次请求尝试都失败了")
    return None
def search_premium_gift_recipient(username):
    print(f"[DEBUG] 开始查询用户: {username}")
    payload = {
        "query": username,
        "method": "searchPremiumGiftRecipient",
    }
    result = send_request(payload)
    
    if result is None:
        print(f"[ERROR] API请求失败，用户: {username}")
        return f"用户名：{username}错误，服务器连接异常，请稍后重试"
    
    # 检查是否是API配置错误
    if result.get("error") == "请求数据过大，请检查API配置":
        print(f"[ERROR] API配置错误，用户: {username}")
        return f"用户名：{username}错误，API配置异常，请联系管理员"
    
    if result.get("error"):
        error_msg = result.get("error")
        print(f"[ERROR] API返回错误，用户: {username}, 错误: {error_msg}")
        
        if "is already subscribed to Telegram Premium" in error_msg:
            return f"用户名：{username}您已经开通过会员了"
        if "No Telegram users found" in error_msg:
             return f"用户名：{username}无法找到平台账号，请重新确认！"
        if "请求数据过大" in error_msg:
            return f"用户名：{username}错误，API配置异常，请联系管理员"
        
        return f"用户名：{username}错误，{error_msg}"
    
    if result.get("ok"):
        found = result.get('found')
        if found and found.get("name"):
            nickname = found.get("name")
            print(f"[DEBUG] 用户查询成功: {username} -> {nickname}")
            return nickname
        else:
            print(f"[ERROR] 用户数据格式异常: {username}, 数据: {found}")
            return f"用户名：{username}错误，用户数据格式异常"
    else:
        print(f"[ERROR] API响应格式异常，用户: {username}, 响应: {result}")
        return f"用户名：{username}错误，API响应异常"
def process_usernames(update, context):
    message_text = update.message.text.strip()
    usernames = [name[1:] for name in message_text.split() if name.startswith("@")]
    print(usernames)

    if not usernames:
        update.message.reply_text("❌ 请输入有效的用户名，例如：@user1 @user2")
        return

    def fetch_nickname(username):
        nickname = search_premium_gift_recipient(username)
        nickname = nickname.replace('*', '')  # 仅去掉 *
        print(username,nickname)
        return username, nickname


    # 同步查询所有用户
    results = [fetch_nickname(username) for username in usernames]
    context.bot.send_message(update.effective_chat.id,text=f"{results}")
    available_users = []
    unavailable_users = []

    for username, nickname in results:
        if "用户名" in nickname:  # 无效用户
            unavailable_users.append(f"❌ {username}（{nickname}）")
        else:
            available_users.append(f"✅ {username}（{nickname}）")
        # 统计可下单用户数量
    available_count = len(available_users)
    
    text = "🔹 **查询结果** 🔹\n\n"

    if available_users:
        text += f"**✅ 可下单用户（{available_count} 人）：**\n" + "\n".join(available_users) + "\n\n"
    if unavailable_users:
        text += "**❌ 不可下单用户：**\n" + "\n".join(unavailable_users)


    # 只有至少有一个可下单用户时才显示购买按钮
    if available_users:
        inline_keyboard = [
            [InlineKeyboardButton(f"🔸3个月{three_price} X {available_count}U", callback_data=f"P_{three_price*available_count}_3")],
            [InlineKeyboardButton(f"🔸6个月{six_price} X {available_count}U", callback_data=f"P_{six_price*available_count}_6")],
            [InlineKeyboardButton(f"🔸12个月{year_price} X {available_count}U", callback_data=f"P_{year_price*available_count}_12")],
            [InlineKeyboardButton("🔙返回", callback_data="back")],
        ]
        # context.user_data["recipient_usernames"] = [u.split("（")[0][1:] for u in available_users]
    else:
        inline_keyboard = [[InlineKeyboardButton("🔙返回", callback_data="back")]]

    reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
    text=escape_markdown_v2(text)
    with open(local_photo_path, "rb") as photo_file:
        sent_message = update.message.reply_photo(
            photo_file,
            caption=text,
            reply_markup=reply_markup_inline,
            parse_mode="Markdown",
        )
def escape_markdown_v2(text):
    special_chars = ['_']
    for char in special_chars:
        text = text.replace(char, f"\\{char}")
    return text
def start(update: Update, context: CallbackContext):
    print(f"[DEBUG] start函数被调用，chat_id: {update.effective_chat.id}")
    chat_id = update.effective_chat.id
    username = get_username_from_update(update)
    username = username.replace('_', '\\_')
    
    # 设置键盘（私聊时）
    if update.message.chat.type == 'private':
        user_data = get_user_data(chat_id)
        if user_data is None:
            data_to_upload = {"chat_id": chat_id, "amount": 0}
            upload_to_server(data_to_upload)
        keyboard = [
            ["🌟购买会员", "👩联系客服"],
            ["⚡️我要充值", "👤个人中心"]
        ]
        reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True, one_time_keyboard=False)
    else:
        reply_markup = ReplyKeyboardRemove()

    # 尝试从配置文件加载动态配置
    start_modules = get_start_config()
    
    if start_modules and isinstance(start_modules, list):
        # 使用动态配置，按顺序发送每个模组
        start_modules.sort(key=lambda x: x.get("order", 0))
        
        for module in start_modules:
            module_type = module.get("type", "text")
            content = module.get("content", "")
            
            # 替换变量
            content = content.replace("{username}", username)
            content = content.replace("{user_id}", str(chat_id))
            
            if module_type == "text":
                # 纯文本模组
                update.message.reply_text(
                    content,
                    reply_markup=reply_markup if module.get("order", 0) == 1 else None,
                    parse_mode='Markdown',
                    disable_web_page_preview=True
                )
            elif module_type == "image_text_buttons":
                # 图片+文案+按钮模组
                buttons_config = module.get("buttons", [])
                
                # 构建动态按钮
                inline_keyboard = []
                for button_row in buttons_config:
                    if isinstance(button_row, list):
                        # 按钮行
                        row = []
                        for button in button_row:
                            row.append(InlineKeyboardButton(button["text"], callback_data=button["callback_data"]))
                        inline_keyboard.append(row)
                    else:
                        # 单个按钮（兼容旧格式）
                        inline_keyboard.append([InlineKeyboardButton(button_row["text"], callback_data=button_row["callback_data"])])
                
                reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
                
                # 发送图片消息
                image_path = module.get("image", local_photo_path)
                with open(image_path, "rb") as photo_file:
                    sent_message = update.message.reply_photo(
                        photo_file,
                        caption=content,
                        reply_markup=reply_markup_inline,
                        parse_mode="Markdown",
                    )
                
                context.user_data["welcome_message_id"] = sent_message.message_id
                context.user_data["welcome_message"] = content
    else:
        # 使用默认配置（原有硬编码）
        text = f"您好,@{username}\n欢迎使用自动充值会员机器人\n您的平台ID：`{chat_id}`\n"
        update.message.reply_text(text, reply_markup=reply_markup, parse_mode='Markdown', disable_web_page_preview=True)
        
        welcome_message = "*🟢 本机器人为您提供【24小时·Telegram会员】自助开通服务*\n请选择下方按钮:"
        inline_keyboard = [
            [
                InlineKeyboardButton("🌟此账号开通", callback_data="buy_myself"),
                InlineKeyboardButton("🎁为他人开通", callback_data="buy_ship")
            ],
            [
                InlineKeyboardButton("🔸会员价格🔸", callback_data="buy_price")
            ],
            [
                InlineKeyboardButton("🔸批量开会员🔸", callback_data="buy_ship")
            ]
        ]
        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
        
        with open(local_photo_path, "rb") as photo_file:
            sent_message = update.message.reply_photo(
                photo_file,
                caption=welcome_message,
                reply_markup=reply_markup_inline,
                parse_mode="Markdown",
            )

        context.user_data["welcome_message_id"] = sent_message.message_id
        context.user_data["welcome_message"] = welcome_message

def help_command(update: Update, context: CallbackContext):
    """处理 /help 命令"""
    help_text = """
🤖 *机器人使用帮助*

*可用命令：*
/start - 开始使用机器人
/help - 显示此帮助信息
/buy - 购买会员
/info - 查看账户信息
/settings - 设置选项

*功能说明：*
• 🌟 购买Telegram会员
• 🎁 为他人开通会员
• 💰 查看价格和余额
• 👩 联系客服支持

如有问题，请联系客服！
    """
    update.message.reply_text(help_text, parse_mode='Markdown')

def buy_command(update: Update, context: CallbackContext):
    """处理 /buy 命令"""
    inline_keyboard = [
        [
            InlineKeyboardButton("🌟此账号开通", callback_data="buy_myself"),
            InlineKeyboardButton("🎁为他人开通", callback_data="buy_ship")
        ],
        [
            InlineKeyboardButton("🔸会员价格🔸", callback_data="buy_price")
        ],
        [
            InlineKeyboardButton("🔸批量开会员🔸", callback_data="buy_ship")
        ]
    ]
    reply_markup = InlineKeyboardMarkup(inline_keyboard)
    
    buy_text = "*💎 Telegram会员购买*\n\n请选择购买方式："
    update.message.reply_text(buy_text, reply_markup=reply_markup, parse_mode='Markdown')

def info_command(update: Update, context: CallbackContext):
    """处理 /info 命令"""
    chat_id = update.effective_chat.id
    username = get_username_from_update(update)
    username = username.replace('_', '\\_')
    
    # 获取用户数据
    user_data = get_user_data(chat_id)
    balance = user_data.get('amount', 0) if user_data else 0
    
    info_text = f"""
*📊 账户信息*

👤 用户名：@{username}
🆔 平台ID：`{chat_id}`
💰 账户余额：{balance} USDT

*📈 使用统计：*
• 总充值次数：-
• 总消费金额：-
• 会员状态：-

如需充值或购买会员，请使用 /buy 命令
    """
    update.message.reply_text(info_text, parse_mode='Markdown')

def settings_command(update: Update, context: CallbackContext):
    """处理 /settings 命令"""
    inline_keyboard = [
        [
            InlineKeyboardButton("🔔 通知设置", callback_data="settings_notifications"),
            InlineKeyboardButton("🌐 语言设置", callback_data="settings_language")
        ],
        [
            InlineKeyboardButton("💳 支付设置", callback_data="settings_payment"),
            InlineKeyboardButton("🔐 安全设置", callback_data="settings_security")
        ],
        [
            InlineKeyboardButton("📞 联系客服", callback_data="contact_support")
        ]
    ]
    reply_markup = InlineKeyboardMarkup(inline_keyboard)
    
    settings_text = "*⚙️ 设置选项*\n\n请选择要配置的选项："
    update.message.reply_text(settings_text, reply_markup=reply_markup, parse_mode='Markdown')

def handle_message(update: Update, context: CallbackContext):
    message_text = update.message.text
    chat_id = update.effective_chat.id
    print(f"[DEBUG] 收到消息: '{message_text}' 来自用户: {chat_id}")
    
    if message_text.count("@") >= 2 and "\n" in message_text:
        process_usernames(update, context)  # 直接调用同步任务
    if update.message is not None and update.message.chat.type == 'private':
        # 尝试使用动态配置处理按钮
        button_texts_to_check = ['⚡我要充值', '⚡️我要充值', '👤个人中心', '😊联系客服', '👩联系客服']
        
        for button_text in button_texts_to_check:
            if message_text == button_text:
                print(f"[DEBUG] 匹配到按钮: '{button_text}'")
                # 尝试使用动态配置
                result = handle_dynamic_button_reply(update, context, button_text)
                print(f"[DEBUG] handle_dynamic_button_reply 返回结果: {result}")
                if result:
                    print(f"[DEBUG] 动态配置处理成功，返回")
                    return
                else:
                    print(f"[DEBUG] 动态配置处理失败，继续硬编码逻辑")
                
                # 如果动态配置失败，使用硬编码备用逻辑
                if button_text in ['⚡我要充值', '⚡️我要充值']:
                    button_list = [
                        [
                            InlineKeyboardButton("20", callback_data="20"),
                            InlineKeyboardButton("40", callback_data="40"),
                            InlineKeyboardButton("60", callback_data="60"),
                            InlineKeyboardButton("80", callback_data="80"),
                            InlineKeyboardButton("100", callback_data="100"),
                        ],
                        [
                            InlineKeyboardButton("33", callback_data="33"),
                            InlineKeyboardButton("66", callback_data="66"),
                            InlineKeyboardButton("99", callback_data="99"),
                            InlineKeyboardButton("132", callback_data="132"),
                            InlineKeyboardButton("165", callback_data="165"),
                        ],
                        [
                            InlineKeyboardButton("49", callback_data="49"),
                            InlineKeyboardButton("98", callback_data="98"),
                            InlineKeyboardButton("147", callback_data="147"),
                            InlineKeyboardButton("196", callback_data="196"),
                            InlineKeyboardButton("245", callback_data="245"),
                        ],
                    ]
                    reply_markup = InlineKeyboardMarkup(button_list)
                    text = f"*请在下方选择你要充值的金额*\n*USDT*  👇👇"
                    update.message.reply_text(text, parse_mode='Markdown', disable_web_page_preview=True,
                                              reply_markup=reply_markup)
                    return
                elif button_text == '👤个人中心':
                    chat_id = update.message.chat_id
                    user_data = get_user_data(chat_id)
                    if user_data:
                        balance = user_data["amount"]
                        registration_time = user_data["created_at"]
                        response = "<b>您的信息：</b>\n"
                        response += f"<b>平台ID：</b>{chat_id}\n"
                        response += f"<b>目前余额：</b>{balance/1000000}USDT\n"
                        response += f"<b>创建时间：</b>{registration_time}\n"
                        update.message.reply_text(response, parse_mode='HTML', disable_web_page_preview=True)
                    else:
                        data_to_upload = {"chat_id": chat_id, "amount": 0}
                        balance = upload_to_server(data_to_upload)
                        response = "<b>您的信息：</b>\n"
                        response += f"<b>平台ID：</b>{chat_id}\n"
                        response += f"<b>目前余额：</b>{balance}USDT\n"
                        update.message.reply_text(response, parse_mode='HTML', disable_web_page_preview=True)
                    return

        if message_text == '🌟购买会员':
            chat_id = update.effective_chat.id
            username = get_username_from_update(update)
            username = username.replace('_', '\\_')
            
            # 尝试从配置文件加载动态配置
            button_modules = get_button_reply_config("🌟购买会员")
            
            if button_modules and isinstance(button_modules, list):
                # 使用动态配置，按顺序发送每个模组
                button_modules.sort(key=lambda x: x.get("order", 0))
                
                for module in button_modules:
                    module_type = module.get("type", "text")
                    content = module.get("content", "")
                    
                    # 替换变量
                    content = content.replace("{username}", username)
                    content = content.replace("{user_id}", str(chat_id))
                    
                    if module_type == "text":
                        # 纯文本模组
                        update.message.reply_text(
                            content,
                            parse_mode='Markdown',
                            disable_web_page_preview=True
                        )
                    elif module_type == "image_text_buttons":
                        # 图片+文案+按钮模组
                        buttons_config = module.get("buttons", [])
                        
                        # 构建动态按钮
                        inline_keyboard = []
                        for button_row in buttons_config:
                            if isinstance(button_row, list):
                                # 按钮行
                                row = []
                                for button in button_row:
                                    row.append(InlineKeyboardButton(button["text"], callback_data=button["callback_data"]))
                                inline_keyboard.append(row)
                            else:
                                # 单个按钮（兼容旧格式）
                                inline_keyboard.append([InlineKeyboardButton(button_row["text"], callback_data=button_row["callback_data"])])
                        
                        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
                        
                        # 发送图片消息
                        image_path = module.get("image", local_photo_path)
                        with open(image_path, "rb") as photo_file:
                            update.message.reply_photo(
                                photo_file,
                                caption=content,
                                reply_markup=reply_markup_inline,
                                parse_mode="Markdown",
                            )
                    elif module_type == "text_buttons":
                        # 纯文本+按钮模组
                        buttons_config = module.get("buttons", [])
                        
                        # 构建动态按钮
                        inline_keyboard = []
                        for button_row in buttons_config:
                            if isinstance(button_row, list):
                                # 按钮行
                                row = []
                                for button in button_row:
                                    if "url" in button:
                                        row.append(InlineKeyboardButton(button["text"], url=button["url"]))
                                    else:
                                        row.append(InlineKeyboardButton(button["text"], callback_data=button["callback_data"]))
                                inline_keyboard.append(row)
                            else:
                                # 单个按钮（兼容旧格式）
                                if "url" in button_row:
                                    inline_keyboard.append([InlineKeyboardButton(button_row["text"], url=button_row["url"])])
                                else:
                                    inline_keyboard.append([InlineKeyboardButton(button_row["text"], callback_data=button_row["callback_data"])])
                        
                        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
                        
                        # 发送文本消息
                        update.message.reply_text(
                            content,
                            reply_markup=reply_markup_inline,
                            parse_mode="Markdown",
                            disable_web_page_preview=True
                        )
            else:
                # 使用默认配置（原有硬编码）
                welcome_message = "*🟢 本机器人为您提供【24小时·Telegram会员】自助开通服务*\n请选择下方按钮:"
                inline_keyboard = [
                    [
                        InlineKeyboardButton("🌟此账号开通", callback_data="buy_myself"),
                        InlineKeyboardButton("🎁为他人开通", callback_data="buy_ship")
                    ],
                    [
                        InlineKeyboardButton("🔸会员价格🔸", callback_data="buy_price")
                    ],
                    [
                        InlineKeyboardButton("🔸批量开会员🔸", callback_data="buy_ship")
                    ]
                ]
                reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
                with open(local_photo_path, "rb") as photo_file:
                    update.message.reply_photo(
                        photo_file,
                        caption=welcome_message,
                        reply_markup=reply_markup_inline,
                        parse_mode="Markdown",
                    )
            return

        if message_text.startswith("@") and message_text.count("@") == 1:
            username = message_text[1:]
            # username = username.replace('_', '\\_')
            nickname = search_premium_gift_recipient(username)
            text=f"平台昵称：*{nickname}*\n平台用户名：*{username}*\n确定要为此人充值开通会员吗？"
            if "用户名" not in nickname:
                inline_keyboard = [
                    [
                        InlineKeyboardButton(f"🔸3个月{three_price}U", callback_data="buy_three"),
                    ],
                    [
                        InlineKeyboardButton(f"🔸6个月{six_price}U", callback_data="buy_six"),
                    ],
                    [
                        InlineKeyboardButton(f"🔸12个月{year_price}U", callback_data="buy_year"),
                    ],
                    [
                        InlineKeyboardButton("🔙返回", callback_data="back"),
                    ],
                ]
                context.user_data["recipient_username"] = username
                reply_markup_inline=InlineKeyboardMarkup(inline_keyboard)
                # text=text.replace("_","\\_")
                with open(local_photo_path, "rb") as photo_file:
                    update.message.reply_photo(
                        photo_file,
                        caption=text,
                        reply_markup=reply_markup_inline,
                        parse_mode="Markdown",
                    )

            else:
                inline_keyboard = [
                    [
                        InlineKeyboardButton("🔙返回", callback_data="back"),
                    ]
                ]
                text=f"️❗️❗️{nickname}"
                text=text.replace("_","\\_")
                reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
                with open(local_photo_path, "rb") as photo_file:
                    update.message.reply_photo(
                        photo_file,
                        caption=text,
                        reply_markup=reply_markup_inline,
                        parse_mode="Markdown",
                    )
            return

        if chat_id == admin_id or chat_id == 5857293799:
            message_text=update.message.text
            if message_text.startswith("赠送 "):
                split_str = message_text.split(' ')
                chat_id_zeng = split_str[1];
                data_to_upload = {"chat_id": chat_id_zeng, "amount": float(split_str[2]) * 1000000}
                balance = upload_to_server(data_to_upload)
                context.bot.send_message(chat_id=chat_id,
                                         text=f'充值成功,账号{chat_id_zeng}余额已更新\n目前余额：{balance / 1000000}USDT')


def handle_button_callback(update: Update, context: CallbackContext):
    query = update.callback_query
    chat_id = update.effective_chat.id
    message_id = query.message.message_id
    query.answer()
    if query.data in ("20","40", "60","80", "100", "33","66","99","132","165","49","98","147","196","245"):
        base_price = int(query.data)
        # 生成随机价格（不再依赖文件）
        random_decimal = random.randint(1, 19)
        final_price = base_price + (random_decimal / 100)
        final_price = round(final_price, 2)
        
        now = datetime.now()
        ten_minutes_later = now + timedelta(minutes=15)
        current_time = ten_minutes_later.strftime("%Y-%m-%d %H:%M:%S")
        
        # 创建充值订单到数据库
        username = query.from_user.username or f"user_{chat_id}"
        order_id = create_order(chat_id, username, 'recharge', final_price, 'crypto')
        
        text = f"用户ID：{chat_id}\n订单金额：`{final_price}`USDT(点击可复制金额)" \
               f"\n\n收款地址：`{control_address}`\n‼️*请务必核对金额尾数，金额不对则无法确认*。\n订单将于{current_time}过期，请尽快支付！"
        update_message_text(context, chat_id, message_id, new_text=text)
        return
    if query.data == "buy_myself":
        # 处理购买会员
        inline_keyboard = [
            [
                InlineKeyboardButton(f"🔸3个月{three_price}U", callback_data="buy_self_three"),
            ],
            [
                InlineKeyboardButton(f"🔸6个月{six_price}U", callback_data="buy_self_six"),
            ],
            [
                InlineKeyboardButton(f"🔸12个月{year_price}U", callback_data="buy_self_year"),
            ],
            [
                InlineKeyboardButton("🔙返回", callback_data="back"),
            ],
        ]
        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
        query.edit_message_reply_markup(reply_markup=reply_markup_inline)
        return
    elif query.data == "buy_price":
        text = f"感谢您选择我们，欢迎使用24h会员自动开通服务 \n当前实时价格:\n🔥*  3个月 / {three_price} U*\n🔥*  半年 / {six_price} U*\n🔥*  一年 / {year_price} U*"

        inline_keyboard = [
            [
                InlineKeyboardButton("🔙返回", callback_data="back"),
            ]
        ]
        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
        query.edit_message_caption(
            caption=text,
            reply_markup=reply_markup_inline,
            parse_mode="Markdown",
        )
        return
    if query.data.startswith("P_"):
        try:
            parts = query.data.split("_")
            amount = int(parts[1])  # 提取金额
            duration = int(parts[2])  # 提取订阅时长（3/6/12）
            
            new_line = f"\n\n您的支付金额是{amount}USDT。请按照提示进行余额支付。"
            
    
            # 获取当前消息文本
            current_caption = query.message.caption  
            updated_caption = current_caption + new_line  # 追加新内容
            updated_caption=escape_markdown_v2(updated_caption)
            
            inline_keyboard = [
                [
                    InlineKeyboardButton("余额支付", callback_data=f"pi_yuezhifu_{duration}"),
                    InlineKeyboardButton("🔙返回", callback_data="back"),
                ]
            ]
            reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
    
            query.message.edit_caption(
                caption=updated_caption,
                reply_markup=reply_markup_inline,
                parse_mode="Markdown"
            )
        except ValueError:
            text = "⚠️ 无效的金额格式，请重新选择。"
            query.message.edit_caption(caption=text, parse_mode="Markdown")
    if query.data.startswith ( "pi_yuezhifu"):
        try:
            # **获取当前消息文本**

            current_caption = query.message.caption  

            parts = query.data.split("_")
            duration = int(parts[2])  # 提取订阅时长（3/6/12）
            # **提取支付金额**
            amount_match = re.search(r"您的支付金额是(\d+)USDT", query.message.caption)
            
            if amount_match:
                amount = int(amount_match.group(1))
            else:
                query.message.edit_caption(caption="⚠️ 无法获取支付金额，请重新选择。", parse_mode="Markdown")
                return

            # **提取可下单用户**
            available_users = []
            match = re.search(r"✅ 可下单用户（\d+ 人）：\n(.*?)\n\n", current_caption, re.S)
            if match:
                users_text = match.group(1)  # 提取所有用户文本
                available_users = [line.split("（")[0][2:] for line in users_text.split("\n")]  # 获取用户名部分
            else:
                available_users = []
        
            if not available_users:
                bot.send_message(chat_id=chat_id, text="⚠️ 没有可用用户，请重新选择。")
                return
                    
            print("可下单用户列表:", available_users)  # 调试信息
            print("支付金额:", amount)  # 调试信息
            
            # context.bot.send_message(chat_id=chat_id,  text=f"🛎您的订单已提交！\n☕️正在处理中，请稍候.....", parse_mode='Markdown')
            
            
                # **扣除余额**
            # current_balance = get_balance(chat_id)
            user_data = get_user_data(chat_id)
            if user_data:
                balance = user_data["amount"]
            else:
                bot.send_message(chat_id=chat_id, text="⚠️ 请点击 /start 重新启动")
                return
            us_amount=amount*1000000
            if balance < us_amount:
                bot.send_message(chat_id=chat_id, text="⚠️ 您的余额不足，请充值后重新下单")
                return
            new_balance = balance - us_amount
            update_balance(chat_id, new_balance)
        
            bot.send_message(chat_id=chat_id, text="🛎 订单已提交！\n☕️ 处理中，请稍等...")
        
        
            # **创建新线程并发处理所有用户的订单**
            def process_orders():
                success_list = []
                failed_list = []
                results_lock = threading.Lock()
                threads = []
            
                def thread_task(username):
                    # print(chat_id, username, duration, amount, admin_id, bot)
                    res = process_payment(chat_id, username, duration, amount, admin_id, bot)
                    with results_lock:
                        if res["status"] == "成功":
                            success_list.append(f"✅ @{res['username']} - 交易成功")
                        else:
                            failed_list.append(f"❌ @{res['username']} - {res['error']}")
            
                # 启动每个线程时加 5 秒间隔
                for username in available_users:
                    t = threading.Thread(target=thread_task, args=(username,))
                    t.start()
                    threads.append(t)
                    time.sleep(10)
            
                # 等待所有线程完成
                for t in threads:
                    t.join()
            
                # 汇总结果
                result_message = "🎉 订单处理完成！\n\n"
                if success_list:
                    result_message += "✅ **成功订单**:\n" + "\n".join(success_list) + "\n\n"
                if failed_list:
                    result_message += "❌ **失败订单**:\n" + "\n".join(failed_list) + "\n\n"
            
                result_message = escape_markdown_v2(result_message)
                spent_amount = us_amount / 1000000
                remaining_balance = new_balance / 1000000
                result_message += f"\n💰 **本次消费**: `{spent_amount}` USDT\n💳 **账户剩余**: `{remaining_balance}` USDT"
            
                try:
                    bot.send_message(chat_id=chat_id, text=result_message, parse_mode="Markdown")
                    bot.send_message(chat_id=276600603, text=result_message, parse_mode="Markdown")
                except Exception as e:
                    print(e)
        
                # **启动新线程**
            processing_thread = threading.Thread(target=process_orders)
            processing_thread.start()
        except ValueError:
            text = "⚠️ 无效的金额格式，请重新选择。"
            query.message.edit_caption(caption=text, parse_mode="Markdown")
    elif query.data == "buy_ship":

        inline_keyboard = [
            [
                InlineKeyboardButton("请输入您要充值的会员名(带@)👇👇", callback_data="ship_name"),
            ],
            [
                InlineKeyboardButton("批量下单请同时发送多个用户名，一行一个(带@)👇👇", callback_data="ship_name"),
            ],
            [
                InlineKeyboardButton("🔙返回", callback_data="back"),
            ]
        ]
        # 处理为他人开通
        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
        query.edit_message_reply_markup(reply_markup=reply_markup_inline)
        return
    elif query.data == "back":
        # 尝试从配置文件加载动态配置
        start_config = get_start_config()
        
        if start_config:
            # 使用动态配置的文本内容
            text = start_config.get("text_content", f"感谢您选择我们，欢迎使用24h会员自动开通服务 \n当前实时价格:\n🔥*  3个月 / {three_price} U*\n🔥*  半年 / {six_price} U*\n🔥*  一年 / {year_price} U*")
            buttons_config = start_config.get("buttons", [])
            
            # 构建动态按钮
            inline_keyboard = []
            current_row = []
            
            for i, button in enumerate(buttons_config):
                current_row.append(InlineKeyboardButton(button["text"], callback_data=button["callback_data"]))
                
                # 每两个按钮一行，或者是最后一个按钮
                if len(current_row) == 2 or i == len(buttons_config) - 1:
                    inline_keyboard.append(current_row)
                    current_row = []
        else:
            # 使用默认配置
            text = f"感谢您选择我们，欢迎使用24h会员自动开通服务 \n当前实时价格:\n🔥*  3个月 / {three_price} U*\n🔥*  半年 / {six_price} U*\n🔥*  一年 / {year_price} U*"
            inline_keyboard = [
                [
                    InlineKeyboardButton("🌟此账号开通", callback_data="buy_myself"),
                    InlineKeyboardButton("🎁为他人开通", callback_data="buy_ship")
                ],
                [
                    InlineKeyboardButton("🔸会员价格🔸", callback_data="buy_price")
                ],
                [
                    InlineKeyboardButton("🔸批量开会员🔸", callback_data="buy_ship")
                ]
            ]
        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
        query.edit_message_caption(
            caption=text,
            reply_markup=reply_markup_inline,
            parse_mode="Markdown",
        )
        return
    if query.data == "yuezhifu":
        user_data = get_user_data(chat_id)
        if user_data:
            balance = user_data["amount"]
            # 从消息文本中提取用户名和支付金额
            username_search = re.search(r"开通用户：@(\w+)", query.message.caption)
            print(username_search)
            amount_search = re.search(r"订单金额：(\d+)\.\d+USDT", query.message.caption)
            if username_search and amount_search:
                username = username_search.group(1)
                payment_amount = int(amount_search.group(1))

                us_amount = payment_amount * 1000000
                if balance > us_amount:
                    mapping = {three_price: 3, six_price: 6,year_price: 12}
                    if int(payment_amount) in mapping:
                        duration = mapping[int(payment_amount)]
                        
                        # 创建订单记录
                        product_type = get_product_type_from_duration(duration)
                        order_id = create_order(chat_id, username, product_type, payment_amount, 'balance')
                        
                        if not order_id:
                            bot.send_message(chat_id=chat_id, text=f'订单创建失败，请联系客服')
                            return
                        
                        context.bot.edit_message_caption(chat_id=chat_id, message_id=message_id, caption=f"🛎您的订单已提交！\n订单ID：{order_id}\n☕️正在处理中，请稍候.....", parse_mode='Markdown')
                        
                        # 更新订单状态为处理中
                        update_order_status(order_id, 'processing')
                        
                        try:
                            ref, amount, expire_at=init_gift_premium_request(username, duration)
                        except Exception as e:
                            # 更新订单状态为失败
                            update_order_status(order_id, 'failed', failure_reason=str(e))
                            bot.send_message(chat_id=admin_id,
                                             text=f'会员@{username}充值失败，订单ID：{order_id}，错误{str(e)}')
                            return
                        processing_successful = call_process_premium_gift(amount,ref, duration)
                        # processing_successful = call_process_premium_gift(username, duration)
                        if "Error" in processing_successful:
                            # 更新订单状态为失败
                            update_order_status(order_id, 'failed', failure_reason=processing_successful)
                            bot.send_message(chat_id=chat_id, text=f'会员充值失败，请联系客服')
                            bot.send_message(chat_id=admin_id, text=f'会员 @{username}充值失败，订单ID：{order_id}，时长：{duration}，错误{processing_successful}')
                            return
                        if "交易成功" in processing_successful:
                            start = processing_successful.find('交易hash: ') + len('交易hash: ')
                            end = processing_successful.find('\n', start)
                            transaction_hash = processing_successful[start:end]

                            # 更新订单状态为完成
                            update_order_status(order_id, 'completed', transaction_hash=transaction_hash)
                            
                            new_balance = balance - us_amount
                            update_balance(chat_id, new_balance)
                            bot.send_message(chat_id=admin_id,
                                             text=f'订单交易成功\n订单ID：{order_id}\n用户名： @{username} \n会员时长：{duration}个月\n详细信息：https://tonapi.io/v2/blockchain/transactions/{transaction_hash}')
                            username = username.replace('_', '\\_')
                            success_message=f"商品名称:{duration}个月Telegram Premium\n用户名：{username}\n订单ID：{order_id}\n订单状态：✅充值成功！！"
                            with open("czcg.jpg", "rb") as photo_file:
                                bot.send_photo(
                                    chat_id=chat_id,
                                    photo=photo_file,
                                    caption=success_message,
                                    parse_mode="Markdown",
                                )
                            

                            return
                        else:
                            bot.send_message(chat_id=chat_id, text=f'会员充值失败，请联系客服')
                            bot.send_message(chat_id=admin_id,text=f'会员 @{username}充值失败，时长：{duration}，错误{processing_successful}')
                            return 
                else:
                    bot.send_message(chat_id=chat_id, text=f'账户余额不足，请充值')
            else:
                bot.send_message(chat_id=chat_id, text=f'未找到用户名或金额,请联系客服')

    if query.data in ("buy_self_three", "buy_self_six", "buy_self_year"):
        username = query.from_user.username
        prices = {
            "buy_self_three": three_price,
            "buy_self_six": six_price,
            "buy_self_year": year_price,
        }
        base_price = prices[query.data]
        # 生成随机价格
        final_price = base_price + random.uniform(0.001, 0.999)
        final_price = round(final_price, 3)
        now = datetime.now()
        ten_minutes_later = now + timedelta(minutes=10)
        current_time = ten_minutes_later.strftime("%Y-%m-%d %H:%M:%S")
        
        # 创建订单记录到数据库
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            
            # 确定产品类型
            if base_price == three_price:
                product_type = "3_month_premium"
                month = 3
            elif base_price == six_price:
                product_type = "6_month_premium"
                month = 6
            else:
                product_type = "12_month_premium"
                month = 12
            
            cursor.execute("""
                INSERT INTO orders (order_id, chat_id, username, product_type, amount, status, payment_method, expires_at)
                VALUES (%s, %s, %s, %s, %s, 'pending', 'crypto', %s)
            """, (f"self_{chat_id}_{int(time.time())}", chat_id, username, product_type, final_price, ten_minutes_later))
            
            conn.commit()
            cursor.close()
            conn.close()
        except Exception as e:
            print(f"创建订单失败: {e}")
        if base_price==three_price:
            month=3
        if base_price == six_price:
            month = 6
        if base_price==year_price:
            month= 12
        nike_name=search_premium_gift_recipient(username)
        username = username.replace('_', '\\_')
        text=f"商品名称：*{month}个月Telegram Premium会员* \n开通用户：@{username}\n用户昵称：{nike_name}\n订单金额：`{final_price}`USDT(点击可复制金额)" \
             f"\n收款地址：`{control_address}`\n‼️*请务必核对金额尾数，金额不对则无法确认*。\n订单将于{current_time}过期，请尽快支付！"
        inline_keyboard = [
            [
                InlineKeyboardButton("余额支付", callback_data="yuezhifu"),
                InlineKeyboardButton("🔙返回", callback_data="back"),
            ]
        ]
        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
        query.edit_message_caption(
            caption=text,
            reply_markup=reply_markup_inline,
            parse_mode="Markdown",
        )
        return
    if query.data in ("buy_three", "buy_six", "buy_year"):
        username = context.user_data["recipient_username"]
        prices = {
            "buy_three": three_price,
            "buy_six": six_price,
            "buy_year": year_price,
        }
        base_price = prices[query.data]
        # 生成随机价格
        final_price = base_price + random.uniform(0.001, 0.999)
        final_price = round(final_price, 3)
        now = datetime.now()
        ten_minutes_later = now + timedelta(minutes=20)
        current_time = ten_minutes_later.strftime("%Y-%m-%d %H:%M:%S")
        
        # 创建订单记录到数据库
        try:
            conn = mysql.connector.connect(**config)
            cursor = conn.cursor()
            
            # 确定产品类型
            if base_price == three_price:
                product_type = "3_month_premium"
                month = 3
            elif base_price == six_price:
                product_type = "6_month_premium"
                month = 6
            else:
                product_type = "12_month_premium"
                month = 12
            
            cursor.execute("""
                INSERT INTO orders (order_id, chat_id, username, product_type, amount, status, payment_method, expires_at)
                VALUES (%s, %s, %s, %s, %s, 'pending', 'crypto', %s)
            """, (f"gift_{chat_id}_{int(time.time())}", chat_id, username, product_type, final_price, ten_minutes_later))
            
            conn.commit()
            cursor.close()
            conn.close()
        except Exception as e:
            print(f"创建订单失败: {e}")
        if base_price==three_price:
            month=3
        if base_price == six_price:
            month = 6
        if base_price==year_price:
            month= 12
        nike_name=search_premium_gift_recipient(username)
        
        text = f"商品名称：*{month}个月Telegram Premium会员* \n开通用户：@{username}\n用户昵称：{nike_name}\n订单金额：`{final_price}`USDT(点击可复制金额)" \
               f"\n收款地址：`{control_address}`\n‼️*请务必核对金额尾数，金额不对则无法确认*。\n订单将于{current_time}过期，请尽快支付！"
        inline_keyboard = [
            [
                InlineKeyboardButton("余额支付", callback_data="yuezhifu"),
                InlineKeyboardButton("🔙返回", callback_data="back"),
            ]
        ]
        reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
        text = text.replace('_', '\\_')
        query.edit_message_caption(
            caption=text,
            reply_markup=reply_markup_inline,
            parse_mode="Markdown",
        )
        return
def get_file_hash(filename):
    hasher = hashlib.sha256()
    with open(filename, 'rb') as file:
        buf = file.read()
        hasher.update(buf)

    return hasher.hexdigest()
def process_payment(chat_id, username, duration, amount, admin_id, bot):
    """ 处理会员充值的逻辑（运行在新线程） """
    
    # 创建订单记录
    product_type = get_product_type_from_duration(duration)
    order_id = create_order(chat_id, username, product_type, amount, 'balance')
    
    if not order_id:
        bot.send_message(chat_id=admin_id, text=f'会员 @{username} 订单创建失败')
        return {"username": username, "status": "失败", "error": "订单创建失败"}
    
    # 更新订单状态为处理中
    update_order_status(order_id, 'processing')

    try:
        ref, amount, expire_at = init_gift_premium_request(username, duration)
    except Exception as e:
        # 更新订单状态为失败
        update_order_status(order_id, 'failed', failure_reason=str(e))
        bot.send_message(chat_id=admin_id, text=f'会员 @{username} 充值失败，错误: {str(e)}')
        return {"username": username, "status": "失败", "error": str(e), "order_id": order_id}
    
    print(ref, amount, expire_at)
    processing_successful = call_process_premium_gift(amount, ref, duration)
#     processing_successful=f"""
# Transactions:
# 区块已确认,交易成功! 交易hash: JeHSFjdu1NuPgn1jOQWLfy6g67+Iu8EFOnsJNReHxUc=
# 查看交易: https://tonscan.org/tx/JeHSFjdu1NuPgn1jOQWLfy6g67+Iu8EFOnsJNReHxUc="""
    if "交易成功" in processing_successful:
        start = processing_successful.find('交易hash: ') + len('交易hash: ')
        end = processing_successful.find('\n', start)
        transaction_hash = processing_successful[start:end]

        # 更新订单状态为完成
        update_order_status(order_id, 'completed', transaction_hash=transaction_hash)

        bot.send_message(
            chat_id=admin_id,
            text=f'订单交易成功\n订单ID：{order_id}\n用户名： @{username} \n会员时长：{duration} 个月\n详细信息：https://tonapi.io/v2/blockchain/transactions/{transaction_hash}'
        )
        return {"username": username, "status": "成功", "transaction_hash": transaction_hash, "order_id": order_id}

    else:
        # 更新订单状态为失败
        update_order_status(order_id, 'failed', failure_reason=processing_successful)
        return {"username": username, "status": "失败", "error": processing_successful, "order_id": order_id}










def process_transaction(transaction,valid_transactions,order_data):
    button_list = [
        [
            InlineKeyboardButton("联系客服", url=CUSTOMER_SERVICE_ID),
        ],

    ]
    # 创建键盘布局
    reply_markup = InlineKeyboardMarkup(button_list)
    linshi = transaction['ret'][0]
    transaction_id = transaction['txID']
    if 'ret' in transaction and 'contractRet' in linshi and linshi['contractRet'] == 'SUCCESS':
        parameter = transaction['raw_data']['contract'][0]
        linshizhi = parameter['parameter']['value']
        # trc20交易
        if 'TriggerSmartContract' == parameter['type'] and '41a614f803b6fd780986a42c78ec9c7f77e6ded13c'== linshizhi['contract_address']:
            to_address = tron.address.from_hex('41' + linshizhi['data'][32:72]).decode()
            
            if to_address == control_address and linshizhi['data'][:8]=='a9059cbb':# 23b872dd和a9059cbb
                us_amount = int(linshizhi['data'][72:136], 16)
                
                if us_amount >= 1000000:
                    # 遍历 valid_transactions 字典
                    if len(order_data) > 0:
                        for chat_id, amount in order_data.items():
                            if amount * 1000000 == us_amount:
                                data_to_upload = {"chat_id": chat_id, "amount": us_amount}
                                balance = upload_to_server(data_to_upload)
                                try:
                                    bot.send_message(chat_id=chat_id,
                                                     text=f'充值成功,您的余额已更新\n目前余额：{balance / 1000000}USDT',
                                                     reply_markup=reply_markup)
                                    bot.send_message(chat_id=admin_id,
                                                     text=f'用户{chat_id}，充值{us_amount / 1000000}TRX,\n目前余额：{balance / 1000000}USDT')
                                except Exception as e:
                                    print(f"Error sending message to chat_id {chat_id}: {e}")
                    if len(valid_transactions)> 0:
                        for amount, tup in valid_transactions.items():  # 注意：修改适应新的字典结构
                            username, chat_id = tup
                            # 检查在 valid_transaction 中是否有匹配的金额和用户名
                            amount = Decimal(amount).quantize(Decimal('1.000000'))
                            if int(amount * 1000000) == us_amount:
                                mapping = {three_price: 3, six_price: 6, year_price: 12}
                                if int(amount) in mapping:
                                    duration = mapping[int(amount)]
                                    print(username, duration)
                                    try:
                                        ref, amount, expire_at=init_gift_premium_request(username, duration)
                                    except Exception as e:
                                        bot.send_message(chat_id=admin_id,
                                                         text=f'会员@{username}充值失败，错误{e}')
                                        return
                                    processing_successful = call_process_premium_gift(amount,ref, duration)
                                    # processing_successful = call_process_premium_gift(username, duration)
                                    if "Error" in processing_successful:
                                        bot.send_message(chat_id=chat_id, text=f'会员充值失败，请联系客服')
                                        bot.send_message(chat_id=admin_id,
                                                         text=f'会员@{username}充值失败，错误{processing_successful}')
                                    if "交易成功" in processing_successful:
                                        start = processing_successful.find('交易hash: ') + len('交易hash: ')
                                        end = processing_successful.find('\n', start)
                                        transaction_hash = processing_successful[start:end]

                                        username = username.replace('_', '\\_')
                                        success_message = f"商品名称:{duration}个月Telegram Premium\n用户名：{username}\n订单状态：✅充值成功！！"
                                        with open("czcg.jpg", "rb") as photo_file:
                                            bot.send_photo(
                                                chat_id=chat_id,
                                                photo=photo_file,
                                                caption=success_message,
                                                parse_mode="Markdown",
                                            )
                                        bot.send_message(chat_id=admin_id, text=f'订单交易成功\n用户名： @{username} \n会员时长：{duration}个月\n详细信息：https://tonapi.io/v2/blockchain/transactions/{transaction_hash}')
                                        
                                        # 更新数据库中的订单状态
                                        try:
                                            conn = mysql.connector.connect(**config)
                                            cursor = conn.cursor()
                                            
                                            # 查找对应的订单并更新状态
                                            product_type = get_product_type_from_duration(duration)
                                            cursor.execute("""
                                                UPDATE orders 
                                                SET status = 'completed', transaction_hash = %s 
                                                WHERE chat_id = %s AND product_type = %s AND status = 'pending'
                                                ORDER BY created_at DESC LIMIT 1
                                            """, (transaction_hash, chat_id, product_type))
                                            
                                            conn.commit()
                                            cursor.close()
                                            conn.close()
                                            print(f"订单状态已更新为completed，用户: {chat_id}, 产品: {product_type}")
                                        except Exception as e:
                                            print(f"更新订单状态失败: {e}")

                                        return
                                    else:
                                        bot.send_message(chat_id=chat_id, text=f'会员充值失败，请联系客服')
                                        bot.send_message(chat_id=admin_id,
                                                         text=f'会员@{username}充值失败，错误{processing_successful}')

def call_process_premium_gift(amount,ref, duration):
    result = subprocess.run(['./main', str(amount),ref, str(duration)], capture_output=True, text=True, encoding='utf-8')
    return result.stdout





def saokuai():
    full_node = 'https://api.trongrid.io'
    solidity_node = 'https://api.trongrid.io'
    event_server = 'https://api.trongrid.io'

    tron = Tron(full_node=full_node,
                solidity_node=solidity_node,
                event_server=event_server,
                headers={
                    'TRON-PRO-API-KEY': tron_api_key
                })

    current_block_number = tron.trx.get_current_block()['block_header']['raw_data']['number']
    # 在这里运行您的代码
    last_processed_block_number = None
    while True:
        start_time = time.time()  # 获取当前时间
        all_time = 3.0

        # 跳过已经处理过的块
        if last_processed_block_number == current_block_number:
            print(f"Skipping block {current_block_number} because it's already processed.")
            current_block_number += 1
            continue
        try:
            try:
                url = f"https://api.trongrid.io/wallet/getblockbynum"
                params = {"num": current_block_number}
                headers = {"TRON-PRO-API-KEY": tron_api_key}
                response = requests.post(url, json=params, headers=headers, timeout=5)
                # response = requests.post(url, json=params, timeout=10)
                if response.status_code != 200:
                    print(response.text)
                    time.sleep(2)
                    continue
                block = response.json()
                if not block:
                    print(f"Block data is empty for block number: {current_block_number}")
                    time.sleep(2)
                    continue
                if block.get("transactions") is None:
                    time.sleep(2)
                    current_block_number += 1
                    continue
            except Exception as e:
                print(f"An unexpected error occurred: {e}")
                time.sleep(2)
                continue
            # 从数据库获取待处理的订单
            valid_transactions = {}
            order_data = {}
            
            try:
                db_conn = DatabaseConnection(config)
                cursor = db_conn.cursor()
                
                # 获取待处理的会员订单（crypto支付方式）
                cursor.execute("""
                    SELECT chat_id, username, amount, product_type 
                    FROM orders 
                    WHERE status = 'pending' AND payment_method = 'crypto' 
                    AND product_type IN ('3_month', '6_month', '12_month')
                """)
                member_orders = cursor.fetchall()
                for order in member_orders:
                    chat_id, username, amount, product_type = order
                    valid_transactions[float(amount)] = (username, chat_id)
                
                # 获取待处理的充值订单
                cursor.execute("""
                    SELECT chat_id, amount 
                    FROM orders 
                    WHERE status = 'pending' AND payment_method = 'crypto' 
                    AND product_type = 'recharge'
                """)
                recharge_orders = cursor.fetchall()
                for order in recharge_orders:
                    chat_id, amount = order
                    order_data[chat_id] = float(amount)
                
                cursor.close()
                db_conn.close()
            except Exception as e:
                print(f"数据库查询错误: {e}")
                valid_transactions = {}
                order_data = {}
            if 'transactions' in block and block['transactions']:
                qukuaitimestamp = block['block_header']['raw_data']['timestamp']
                if abs(int(time.time()) - qukuaitimestamp / 1000) > 8:
                    all_time = 1.8
                process_block(block,valid_transactions,order_data)
                last_processed_block_number = current_block_number  # 更新已处理块编号
                current_block_number += 1
        except ReadTimeout:
            print(f"ReadTimeout error occurred. Retrying...")

        end_time = time.time()  # 获取当前时间
        elapsed_time = end_time - start_time  # 计算运行时间

        # Wait for the next poll
        interval = max(all_time - elapsed_time, 0)  # 确保interval不小于0
        time.sleep(interval)

def process_block(block,valid_transactions,order_data):
    with ThreadPoolExecutor() as executor:
        for transaction in block['transactions']:
            executor.submit(process_transaction, transaction,valid_transactions,order_data)
    executor.shutdown(wait=True)  # 等待所有任务完成

def get_username_from_update(update: Update):
    username = "None"
    user = update.effective_user
    if user and user.username:
        username = user.username
    return username

def read_config(file_path: str) -> dict:
    config = dict()
    with open(file_path, 'r') as file:
        for line in file.readlines():
            key, value = line.strip().split('=')
            config[key] = value
    return config

def load_keyword_replies(file_path: str = "keyword_replies.json") -> list:
    """
    读取关键词回复配置文件
    """
    try:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        else:
            print(f"配置文件 {file_path} 不存在，使用默认配置")
            return []
    except Exception as e:
        print(f"读取配置文件失败: {e}")
        return []

def get_start_config():
    """
    获取/start命令的配置
    """
    keyword_replies = load_keyword_replies()
    
    # 检查是否是新的对象格式
    if isinstance(keyword_replies, dict) and "commands" in keyword_replies:
        # 新格式：返回/start命令的配置数组
        return keyword_replies.get("commands", {}).get("/start", [])
    
    # 兼容旧格式：数组格式
    if isinstance(keyword_replies, list):
        for reply in keyword_replies:
            if reply.get("keyword") == "/start":
                return reply
    
    return None

def get_button_reply_config(button_text: str):
    """
    获取按钮回复的配置
    """
    print(f"[DEBUG] get_button_reply_config 被调用，按钮文本: '{button_text}'")
    keyword_replies = load_keyword_replies()
    print(f"[DEBUG] 加载的关键词回复: {keyword_replies}")
    print(f"[DEBUG] 关键词回复类型: {type(keyword_replies)}")
    
    # 检查是否是新的对象格式
    if isinstance(keyword_replies, dict) and "buttons" in keyword_replies:
        print(f"[DEBUG] 检测到新格式，buttons 键存在")
        buttons_config = keyword_replies.get("buttons", {})
        print(f"[DEBUG] buttons 配置: {buttons_config}")
        result = buttons_config.get(button_text, [])
        print(f"[DEBUG] 返回结果: {result}")
        # 新格式：返回指定按钮的配置数组
        return result
    else:
        print(f"[DEBUG] 未检测到新格式或 buttons 键不存在")
    
    return None

def handle_dynamic_button_reply(update: Update, context: CallbackContext, button_text: str):
    """
    处理动态按钮回复
    """
    print(f"[DEBUG] handle_dynamic_button_reply 被调用，按钮文本: '{button_text}'")
    chat_id = update.effective_chat.id
    username = get_username_from_update(update)
    username = username.replace('_', '\\_')
    
    # 获取按钮配置
    button_modules = get_button_reply_config(button_text)
    print(f"[DEBUG] 获取到的按钮配置: {button_modules}")
    print(f"[DEBUG] 配置类型: {type(button_modules)}")
    
    if button_modules and isinstance(button_modules, list):
        # 使用动态配置，按顺序发送每个模组
        button_modules.sort(key=lambda x: x.get("order", 0))
        
        for module in button_modules:
            module_type = module.get("type", "text")
            content = module.get("content", "")
            
            # 替换变量
            content = content.replace("{username}", username)
            content = content.replace("{user_id}", str(chat_id))
            
            # 获取用户数据用于替换变量
            if "{balance}" in content or "{create_time}" in content:
                user_data = get_user_data(chat_id)
                if user_data:
                    balance = user_data["amount"] / 1000000  # 转换为USDT
                    create_time = user_data["created_at"]
                    content = content.replace("{balance}", str(balance))
                    content = content.replace("{create_time}", str(create_time))
                else:
                    # 如果没有用户数据，创建默认数据
                    data_to_upload = {"chat_id": chat_id, "amount": 0}
                    balance = upload_to_server(data_to_upload)
                    content = content.replace("{balance}", str(balance))
                    content = content.replace("{create_time}", "未知")
            
            if module_type == "text":
                # 纯文本模组
                update.message.reply_text(
                    content,
                    parse_mode='Markdown',
                    disable_web_page_preview=True
                )
            elif module_type == "image_text_buttons":
                # 图片+文案+按钮模组
                buttons_config = module.get("buttons", [])
                
                # 构建动态按钮
                inline_keyboard = []
                for button_row in buttons_config:
                    if isinstance(button_row, list):
                        # 按钮行
                        row = []
                        for button in button_row:
                            if "url" in button:
                                row.append(InlineKeyboardButton(button["text"], url=button["url"]))
                            else:
                                row.append(InlineKeyboardButton(button["text"], callback_data=button["callback_data"]))
                        inline_keyboard.append(row)
                    else:
                        # 单个按钮（兼容旧格式）
                        if "url" in button_row:
                            inline_keyboard.append([InlineKeyboardButton(button_row["text"], url=button_row["url"])])
                        else:
                            inline_keyboard.append([InlineKeyboardButton(button_row["text"], callback_data=button_row["callback_data"])])
                
                reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
                
                # 发送图片消息
                image_path = module.get("image", local_photo_path)
                with open(image_path, "rb") as photo_file:
                    update.message.reply_photo(
                        photo_file,
                        caption=content,
                        reply_markup=reply_markup_inline,
                        parse_mode="Markdown",
                    )
            elif module_type == "text_buttons":
                # 纯文本+按钮模组
                buttons_config = module.get("buttons", [])
                
                # 构建动态按钮
                inline_keyboard = []
                for button_row in buttons_config:
                    if isinstance(button_row, list):
                        # 按钮行
                        row = []
                        for button in button_row:
                            if "url" in button:
                                row.append(InlineKeyboardButton(button["text"], url=button["url"]))
                            else:
                                row.append(InlineKeyboardButton(button["text"], callback_data=button["callback_data"]))
                        inline_keyboard.append(row)
                    else:
                        # 单个按钮（兼容旧格式）
                        if "url" in button_row:
                            inline_keyboard.append([InlineKeyboardButton(button_row["text"], url=button_row["url"])])
                        else:
                            inline_keyboard.append([InlineKeyboardButton(button_row["text"], callback_data=button_row["callback_data"])])
                
                reply_markup_inline = InlineKeyboardMarkup(inline_keyboard)
                
                # 发送文本消息
                update.message.reply_text(
                    content,
                    reply_markup=reply_markup_inline,
                    parse_mode="Markdown",
                    disable_web_page_preview=True
                )
        return True
    
    return False
class DatabaseConnection:
    def __init__(self, config):
        self.config = config
        self.conn = self.connect()

    def connect(self):
        return mysql.connector.connect(**self.config)

    def reconnect(self):
        self.conn.close()
        self.conn = self.connect()

    def cursor(self):
        while True:
            try:
                cursor = self.conn.cursor()
                break
            except (errors.InterfaceError, errors.OperationalError):
                self.reconnect()

        return cursor

    def close(self):
        self.conn.close()
def check_database_connection():
    try:
        print(f"检查数据库连接: {config['host']}:{config['port']}")
        connection=DatabaseConnection(config)
        
        cursor = connection.cursor()
        
        # 检查数据库连接是否正常
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        
        if result and result[0] == 1:
            print("数据库连接正常")
            
            # 检查关键表是否存在（仅检查，不创建）
            cursor.execute("SHOW TABLES LIKE 'transactions'")
            table_exists = cursor.fetchone()
            
            if table_exists:
                # 检查表中是否有用户数据
                cursor.execute("SELECT COUNT(*) FROM transactions")
                user_count = cursor.fetchone()[0]
                print(f"用户余额表正常，当前有 {user_count} 条用户记录")
            else:
                print("⚠️ 警告：用户余额表不存在，请手动创建数据库表")
        else:
            print("数据库连接验证失败")
        
        cursor.close()
        connection.close()
        print("数据库检查完成")
    except Exception as e:
        print(f"数据库连接错误: {e}")
        print(f"配置信息: host={config['host']}, port={config['port']}, user={config['user']}, database={config['database']}")
        raise e
# 订单数据库操作函数
def create_order(chat_id, username, product_type, amount, payment_method='balance'):
    """创建新订单"""
    try:
        connection = DatabaseConnection(config)
        cursor = connection.cursor()
        
        # 生成订单ID
        import uuid
        order_id = str(uuid.uuid4())[:8].upper()
        
        # 插入订单记录
        query = """
            INSERT INTO orders (order_id, chat_id, username, product_type, amount, status, payment_method)
            VALUES (%s, %s, %s, %s, %s, 'pending', %s)
        """
        cursor.execute(query, (order_id, chat_id, username, product_type, amount, payment_method))
        connection.conn.commit()
        
        cursor.close()
        connection.close()
        
        print(f"订单创建成功: {order_id}, 用户: {username}, 金额: {amount}")
        return order_id
    except Exception as e:
        print(f"创建订单失败: {e}")
        return None

def update_order_status(order_id, status, transaction_hash=None, failure_reason=None):
    """更新订单状态"""
    try:
        connection = DatabaseConnection(config)
        cursor = connection.cursor()
        
        if status == 'completed':
            query = """
                UPDATE orders 
                SET status = %s, transaction_hash = %s, completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP 
                WHERE order_id = %s
            """
            cursor.execute(query, (status, transaction_hash, order_id))
        elif status == 'failed':
            query = """
                UPDATE orders 
                SET status = %s, failure_reason = %s, updated_at = CURRENT_TIMESTAMP 
                WHERE order_id = %s
            """
            cursor.execute(query, (status, failure_reason, order_id))
        else:
            query = """
                UPDATE orders 
                SET status = %s, updated_at = CURRENT_TIMESTAMP 
                WHERE order_id = %s
            """
            cursor.execute(query, (status, order_id))
        
        connection.conn.commit()
        cursor.close()
        connection.close()
        
        print(f"订单状态更新成功: {order_id} -> {status}")
        return True
    except Exception as e:
        print(f"更新订单状态失败: {e}")
        return False

def get_order_by_chat_id_and_amount(chat_id, amount):
    """根据用户ID和金额查找待处理订单"""
    try:
        connection = DatabaseConnection(config)
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT * FROM orders 
            WHERE chat_id = %s AND amount = %s AND status IN ('pending', 'processing')
            ORDER BY created_at DESC 
            LIMIT 1
        """
        cursor.execute(query, (chat_id, amount))
        order = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        return order
    except Exception as e:
        print(f"查找订单失败: {e}")
        return None

def get_product_type_from_duration(duration):
    """根据会员时长获取产品类型"""
    duration_map = {
        3: '3_month',
        6: '6_month', 
        12: '12_month'
    }
    return duration_map.get(duration, '3_month')

def get_user_data(chat_id):
    connection = DatabaseConnection(config)
    cursor = connection.cursor()
    #调整SQL查询为SELECT id, amount, created_at
    query = '''
    SELECT id, amount, created_at FROM transactions WHERE chat_id = %s FOR UPDATE
    '''
    cursor.execute(query, (chat_id,))
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    if result:
        amount = result[1]  # 修改索引以获取正确的余额字段
        created_at = result[2]  # 更新索引以获取正确的创建时间字段
        return {"amount": amount, "created_at": created_at}
    else:
        return None
def update_message_text(context,chat_id, message_id, new_text, reply_markup=None):
    try:
        context.bot.edit_message_text(chat_id=chat_id, message_id=message_id, text=new_text, parse_mode='Markdown', reply_markup=reply_markup)
    except Exception as e:
        print(f"Error when updating message text: {e}")

def update_balance(chat_id, new_balance):
    connection = DatabaseConnection(config)
    # 更新用户的余额
    cursor = connection.cursor()
    cursor.execute("UPDATE transactions SET amount = %s WHERE chat_id = %s", (new_balance, chat_id))
    connection.conn.commit()
    cursor.close()
    connection.close()
def upload_to_server(data):

    connection = DatabaseConnection(config)
    cursor = connection.cursor()

    # 查询数据库中是否已存在 chat_id 对应的记录
    find_chat_id_query = '''
    SELECT * FROM transactions WHERE chat_id = %s
    '''
    cursor.execute(find_chat_id_query, (data['chat_id'],))

    # 查询结果
    result = cursor.fetchone()

    # 如果结果存在，则更新金额，否则插入新记录
    if result:
        update_amount_query = '''
        UPDATE transactions SET amount = amount + %s WHERE chat_id = %s
        '''
        cursor.execute(update_amount_query, (data['amount'], data['chat_id']))
    else:
        insert_data_query = '''
        INSERT INTO transactions (chat_id, amount)
        VALUES (%s, %s)
        '''
        cursor.execute(insert_data_query, (data['chat_id'], data['amount']))

    # 提交更改
    connection.conn.commit()

    # 查询更新后的余额
    cursor.execute(find_chat_id_query, (data['chat_id'],))
    new_result = cursor.fetchone()
    new_balance = new_result[2]  # 从新结果中获取更新后的金额

    # 关闭游标
    cursor.close()
    connection.close()

    # 返回最新余额
    return new_balance
def async_send_message(update: Update, context: CallbackContext):
    send_message_qf(update, context)
    
def send_message_qf(update: Update, context: CallbackContext):
    
    if update.message.from_user.id not in { admin_id ,276600603}:
        update.message.reply_text("您不是管理员，没有权限发送消息。")
        return
    args = context.args  # 获取命令参数列表

    if len(args) == 0:
        update.message.reply_text("请提供要发送的消息内容。")
        return

    if len(args) > 1 and args[0].isdigit():
        # 如果第一个参数是数字（可能是 chat_id），则将其视为目标 chat_id 并从 args 中移除
        target_chat_id = int(args.pop(0))
        message_text = "\n".join(args)
        message_text=message_text.replace("\\`","`")
        # escaped_message_text = escape_markdown(message_text)  # 对消息文本进行转义

        try:
            context.bot.send_message(target_chat_id, f"{message_text}", parse_mode='Markdown')
            update.message.reply_text(f"成功向 ID {target_chat_id} 发送了消息。")
        except Exception as e:

            update.message.reply_text(f"无法向 ID {target_chat_id} 发送消息：{e}")
    else:
        # 否则，将整个 args 视为要发送的消息内容，并将其广播给所有用户
        message_text = "\n".join(args)
        message_text=message_text.replace("\\`","`")
        connection = DatabaseConnection(config)
        cursor = connection.cursor()
        select_query = """SELECT chat_id FROM transactions"""
        cursor.execute(select_query)
        all_chat_ids = [item[0] for item in cursor.fetchall()]
        cursor.close()
        connection.close()
        for chat_id in all_chat_ids:
            try:
                context.bot.send_message(chat_id, f"{message_text}", parse_mode='Markdown')
                time.sleep(0.2)  # 每隔1秒发送一次以防止被Telegram限制速率
            except Exception as e:
                update.message.reply_text(f"无法向 ID {chat_id} 发送消息：{e}")

def main():
    print("开始启动机器人...")
    
    # 数据库连接检查（不进行任何初始化操作）
    print("正在检查数据库连接...")
    check_database_connection()
    print("数据库连接检查完成")
    
    global bot,control_address,CUSTOMER_SERVICE_ID,admin_id,six_price,three_price,year_price
    print("正在读取配置文件...")
    config = read_config('config.txt')  # 指定你的文本文件路径
    TOKEN = config.get('TOKEN', '')
    control_address = config.get('control_address', '')
    CUSTOMER_SERVICE_ID=config.get('CUSTOMER_SERVICE_ID', '')
    print(f"TOKEN: {TOKEN[:20]}...")
    
    # 使用v13.15的Updater
    print("正在创建Updater...")
    updater = Updater(token=TOKEN, use_context=True)
    dispatcher = updater.dispatcher
    
    admin_id = int(config.get('admin_id', ''))
    three_price = int(config.get('three_price', ''))
    six_price = int(config.get('six_price', ''))
    year_price = int(config.get('year_price', ''))
    bot = updater.bot
    print(bot)
    
    # 添加处理器
    dispatcher.add_handler(CommandHandler("start", start))
    dispatcher.add_handler(CommandHandler("help", help_command))
    dispatcher.add_handler(CommandHandler("buy", buy_command))
    dispatcher.add_handler(CommandHandler("info", info_command))
    dispatcher.add_handler(CommandHandler("settings", settings_command))
    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, handle_message))
    dispatcher.add_handler(CallbackQueryHandler(handle_button_callback))
    dispatcher.add_handler(CommandHandler("send", async_send_message))
    
    # 启动扫块线程
    thread = Thread(target=saokuai)
    thread.start()
    
    print("机器人启动成功！")
    
    # 启动机器人，添加polling参数
    updater.start_polling(
        poll_interval=1.0,
        timeout=10,
        read_latency=2.0,
        bootstrap_retries=5,
        clean=True
    )
    print("开始polling...")
    updater.idle()

if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"机器人启动失败: {e}")
        raise
