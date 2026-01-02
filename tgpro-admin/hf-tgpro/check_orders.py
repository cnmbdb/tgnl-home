#!/usr/bin/env python3
import mysql.connector
import json
from datetime import datetime

# 数据库配置
db_config = {
    'host': '127.0.0.1',
    'user': 'hftgpro',
    'password': 'hftgpro',
    'database': 'hftgpro'
}

try:
    # 连接数据库
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    # 查询订单数据
    query = """
    SELECT 
        order_id, 
        chat_id, 
        username, 
        product_type, 
        amount, 
        status, 
        payment_method, 
        transaction_hash,
        failure_reason,
        created_at, 
        updated_at,
        completed_at,
        expires_at
    FROM orders 
    ORDER BY created_at DESC 
    LIMIT 10
    """
    
    cursor.execute(query)
    orders = cursor.fetchall()
    
    print(f"找到 {len(orders)} 条订单记录:")
    print("=" * 80)
    
    for order in orders:
        print(f"订单ID: {order['order_id']}")
        print(f"聊天ID: {order['chat_id']}")
        print(f"用户名: {order['username']}")
        print(f"产品类型: {order['product_type']}")
        print(f"金额: {order['amount']}")
        print(f"状态: {order['status']}")
        print(f"支付方式: {order['payment_method']}")
        print(f"交易哈希: {order['transaction_hash']}")
        print(f"失败原因: {order['failure_reason']}")
        print(f"创建时间: {order['created_at']}")
        print(f"更新时间: {order['updated_at']}")
        print(f"完成时间: {order['completed_at']}")
        print(f"过期时间: {order['expires_at']}")
        print("-" * 40)
    
    # 检查表结构
    cursor.execute("DESCRIBE orders")
    columns = cursor.fetchall()
    
    print("\n订单表结构:")
    print("=" * 50)
    for col in columns:
        print(f"{col['Field']}: {col['Type']} - {col['Null']} - {col['Key']} - {col['Default']}")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"数据库查询失败: {e}")