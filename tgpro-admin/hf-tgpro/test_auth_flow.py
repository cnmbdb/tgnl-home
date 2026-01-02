#!/usr/bin/env python3
import requests
import json

# 测试完整的认证流程
def test_auth_flow():
    base_url = "http://43.163.127.57:3000"
    session = requests.Session()
    
    print("=== 测试认证流程 ===")
    
    # 1. 测试登录
    print("\n1. 测试登录...")
    login_data = {
        "username": "admin",
        "password": "admin123"
    }
    
    login_response = session.post(f"{base_url}/api/login", json=login_data)
    print(f"登录响应状态码: {login_response.status_code}")
    print(f"登录响应内容: {login_response.text}")
    print(f"登录响应头: {dict(login_response.headers)}")
    print(f"登录响应Cookie: {login_response.cookies}")
    print(f"Session Cookie: {session.cookies}")
    
    if login_response.status_code == 200:
        login_result = login_response.json()
        if login_result.get("success"):
            print("✅ 登录成功")
        else:
            print("❌ 登录失败:", login_result.get("error"))
            return
    else:
        print("❌ 登录请求失败")
        return
    
    # 2. 测试访问订单API
    print("\n2. 测试访问订单API...")
    orders_response = session.get(f"{base_url}/api/orders")
    print(f"订单API响应状态码: {orders_response.status_code}")
    print(f"订单API响应内容: {orders_response.text[:500]}...")  # 只显示前500字符
    
    if orders_response.status_code == 200:
        try:
            orders_result = orders_response.json()
            if orders_result.get("success"):
                orders = orders_result.get("data", [])
                print(f"✅ 订单API访问成功，获取到 {len(orders)} 条订单")
                if orders:
                    print("第一条订单示例:")
                    print(json.dumps(orders[0], indent=2, ensure_ascii=False))
            else:
                print("❌ 订单API返回错误:", orders_result.get("error"))
        except json.JSONDecodeError:
            print("❌ 订单API响应不是有效的JSON")
    else:
        print("❌ 订单API请求失败")
    
    print("\n=== 测试完成 ===")

if __name__ == "__main__":
    test_auth_flow()