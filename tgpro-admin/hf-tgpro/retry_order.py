#!/usr/bin/env python3
import sys
import os
import time
import mysql.connector
from dotenv import load_dotenv

# 添加机器人代码路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# 导入机器人函数
from hy import init_gift_premium_request, call_process_premium_gift

# 加载环境变量
load_dotenv()

# 数据库配置
config = {
    'user': os.getenv('DB_USER', 'hftgpro'),
    'password': os.getenv('DB_PASSWORD', 'hftgpro'),
    'host': os.getenv('DB_HOST', 'localhost'),
    'database': os.getenv('DB_NAME', 'hftgpro'),
    'port': int(os.getenv('DB_PORT', '3306')),
    'charset': 'utf8mb4'
}

def get_order_info(order_id):
    """获取订单信息"""
    try:
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor(dictionary=True)
        
        query = "SELECT * FROM orders WHERE order_id = %s"
        cursor.execute(query, (order_id,))
        order = cursor.fetchone()
        
        cursor.close()
        connection.close()
        
        return order
    except Exception as e:
        print(f"获取订单信息失败: {e}")
        return None

def update_order_status(order_id, status, transaction_hash=None, failure_reason=None):
    """更新订单状态"""
    try:
        connection = mysql.connector.connect(**config)
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
        
        connection.commit()
        cursor.close()
        connection.close()
        
        print(f"订单状态更新成功: {order_id} -> {status}")
        return True
    except Exception as e:
        print(f"更新订单状态失败: {e}")
        return False

def get_duration_from_product_type(product_type):
    """根据产品类型获取会员时长"""
    type_map = {
        '3_month': 3,
        '6_month': 6,
        '12_month': 12
    }
    return type_map.get(product_type, 3)

def retry_order_processing(order_id):
    """重新处理订单"""
    # 获取订单信息
    order = get_order_info(order_id)
    if not order:
        print(f"订单 {order_id} 不存在")
        return False
    
    if order['status'] not in ['failed', 'cancelled']:
        print(f"订单 {order_id} 状态为 {order['status']}，无法重新处理")
        return False
    
    # 更新订单状态为处理中
    update_order_status(order_id, 'processing')
    
    # 获取订单参数
    username = order['username']
    duration = get_duration_from_product_type(order['product_type'])
    
    try:
        print(f"开始重新处理订单 {order_id}，用户: {username}，时长: {duration}个月")
        
        # 调用机器人的处理函数
        ref, amount, expire_at = init_gift_premium_request(username, duration)
        print(f"初始化请求成功: ref={ref}, amount={amount}")
        
        processing_successful = call_process_premium_gift(amount, ref, duration)
        print(f"处理结果: {processing_successful}")
        
        if "交易成功" in processing_successful:
            # 提取交易哈希
            start = processing_successful.find('交易hash: ') + len('交易hash: ')
            end = processing_successful.find('\n', start)
            transaction_hash = processing_successful[start:end] if end > start else f"retry_hash_{order_id}_{int(time.time())}"
            
            update_order_status(order_id, 'completed', transaction_hash=transaction_hash)
            print(f"订单 {order_id} 重新开通成功，交易哈希: {transaction_hash}")
            return True
        else:
            update_order_status(order_id, 'failed', failure_reason=processing_successful)
            print(f"订单 {order_id} 重新开通失败: {processing_successful}")
            return False
            
    except Exception as e:
        update_order_status(order_id, 'failed', failure_reason=str(e))
        print(f"订单 {order_id} 重新开通异常: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("用法: python retry_order.py <order_id>")
        print("示例: python retry_order.py 12345")
        sys.exit(1)
    
    order_id = sys.argv[1]
    
    # 检查是否是帮助命令
    if order_id in ['--help', '-h', 'help']:
        print("重新开通订单脚本")
        print("用法: python retry_order.py <order_id>")
        print("参数:")
        print("  order_id    要重新开通的订单ID")
        print("示例: python retry_order.py 12345")
        sys.exit(0)
    
    success = retry_order_processing(order_id)
    
    if success:
        print("重新开通成功")
        sys.exit(0)
    else:
        print("重新开通失败")
        sys.exit(1)