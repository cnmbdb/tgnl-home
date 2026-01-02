# Zibll Order API WordPress 插件

## 功能说明

此插件为子比主题（Zibll）的订单系统提供REST API查询接口，主要功能包括：

1. **订单查询**：通过订单号查询订单详情
2. **服务器IP绑定与验证**：为订单绑定授权的服务器IP地址
3. **许可证验证**：验证服务器IP是否有权使用指定订单的服务

## 安装步骤

### 方法一：手动上传

1. 在您的WordPress网站创建插件目录：
   ```bash
   mkdir -p /path/to/wordpress/wp-content/plugins/zibll-order-api
   ```

2. 上传 `zibll-order-api.php` 文件到上述目录

3. 登录WordPress后台，进入"插件"页面

4. 找到"Zibll Order API"插件，点击"启用"

### 方法二：使用SFTP/FTP

1. 连接到您的WordPress服务器

2. 导航到 `wp-content/plugins/` 目录

3. 创建文件夹 `zibll-order-api`

4. 上传 `zibll-order-api.php` 到该文件夹

5. 在WordPress后台启用插件

## API 使用说明

### 1. 查询订单详情

#### 端点地址

```
GET https://your-domain.com/wp-json/zibll/v1/order/{order_number}
```

#### 认证方式

使用WordPress Application Password或基本认证（Basic Auth）：

```bash
curl -u "username:application_password" \
  "https://your-domain.com/wp-json/zibll/v1/order/2511041721391842247"
```

#### 响应示例

成功响应（HTTP 200）：
```json
{
  "order_id": "123",
  "order_num": "2511041721391842247",
  "order_type": "vip",
  "product_id": "2101",
  "product_name": "【HF-v1-hy-bot】Telegram会员机器人+可视化后台",
  "user_id": "456",
  "user_email": "user@example.com",
  "user_name": "用户名",
  "order_price": "3650",
  "pay_price": "3650",
  "pay_type": "wechat",
  "pay_status": "1",
  "create_time": "2025-11-04 12:00:00",
  "pay_time": "2025-11-04 12:05:00",
  "status": "1"
}
```

### 2. 绑定服务器IP（激活订单）

#### 端点地址

```
POST https://your-domain.com/wp-json/zibll/v1/bind-server
```

#### 请求参数

```json
{
  "order_num": "2511041721391842247",
  "server_ip": "123.456.789.0"
}
```

#### 响应示例

首次绑定成功（HTTP 200）：
```json
{
  "success": true,
  "message": "服务器IP绑定成功",
  "data": {
    "order_num": "2511041721391842247",
    "server_ip": "123.456.789.0",
    "bound_at": "2025-01-15 10:30:00"
  }
}
```

IP已被其他订单绑定（HTTP 409）：
```json
{
  "code": "ip_already_bound",
  "message": "该IP已被其他订单绑定",
  "data": {
    "status": 409,
    "bound_order": "2511041721391842999"
  }
}
```

订单已绑定其他IP（HTTP 409）：
```json
{
  "code": "order_already_bound",
  "message": "该订单已绑定其他服务器IP",
  "data": {
    "status": 409,
    "bound_ip": "111.222.333.444"
  }
}
```

#### 使用示例

```bash
curl -X POST -u "username:application_password" \
  -H "Content-Type: application/json" \
  -d '{"order_num":"2511041721391842247","server_ip":"123.456.789.0"}' \
  "https://your-domain.com/wp-json/zibll/v1/bind-server"
```

### 3. 添加授权IP（多IP授权）

#### 端点地址

```
POST https://your-domain.com/wp-json/zibll/v1/add-authorized-ip
```

#### 请求参数

```json
{
  "order_num": "2511041721391842247",
  "server_ip": "123.456.789.1"
}
```

#### 响应示例

成功添加（HTTP 200）：
```json
{
  "success": true,
  "message": "授权IP添加成功",
  "data": {
    "order_num": "2511041721391842247",
    "authorized_ips": [
      "123.456.789.0",
      "123.456.789.1"
    ]
  }
}
```

#### 使用示例

```bash
curl -X POST -u "username:application_password" \
  -H "Content-Type: application/json" \
  -d '{"order_num":"2511041721391842247","server_ip":"123.456.789.1"}' \
  "https://your-domain.com/wp-json/zibll/v1/add-authorized-ip"
```

### 4. 验证服务器授权

#### 端点地址

```
POST https://your-domain.com/wp-json/zibll/v1/verify-server
```

#### 请求参数

```json
{
  "order_num": "2511041721391842247",
  "server_ip": "123.456.789.0"
}
```

#### 响应示例

授权通过（HTTP 200）：
```json
{
  "success": true,
  "message": "服务器授权验证通过",
  "data": {
    "order_num": "2511041721391842247",
    "server_ip": "123.456.789.0",
    "authorized": true,
    "product_name": "【HF-v1-hy-bot】Telegram会员机器人+可视化后台",
    "verified_at": "2025-01-15 10:35:00"
  }
}
```

IP未授权（HTTP 403）：
```json
{
  "code": "unauthorized_ip",
  "message": "该服务器IP未授权",
  "data": {
    "status": 403,
    "order_num": "2511041721391842247",
    "server_ip": "123.456.789.0"
  }
}
```

订单不存在或未支付（HTTP 404）：
```json
{
  "code": "order_not_found",
  "message": "订单不存在或未支付",
  "data": {
    "status": 404
  }
}
```

#### 使用示例

```bash
curl -X POST -u "username:application_password" \
  -H "Content-Type: application/json" \
  -d '{"order_num":"2511041721391842247","server_ip":"123.456.789.0"}' \
  "https://your-domain.com/wp-json/zibll/v1/verify-server"
```

## API端点总览

| 方法 | 端点 | 功能 | 认证要求 |
|------|------|------|----------|
| GET | `/wp-json/zibll/v1/order/{order_number}` | 查询订单详情 | 管理员 |
| POST | `/wp-json/zibll/v1/bind-server` | 绑定服务器IP（首次激活） | 管理员 |
| POST | `/wp-json/zibll/v1/add-authorized-ip` | 添加授权IP（多IP支持） | 管理员 |
| POST | `/wp-json/zibll/v1/verify-server` | 验证服务器授权 | 管理员 |

## 错误响应示例

## 字段说明

### 订单字段

| 字段 | 类型 | 说明 |
|------|------|------|
| order_id | string | 订单ID |
| order_num | string | 订单号（唯一标识） |
| order_type | string | 订单类型（如：vip, course等） |
| product_id | string | 商品ID |
| product_name | string | 商品名称 |
| user_id | string | 用户ID |
| user_email | string | 用户邮箱 |
| user_name | string | 用户名称 |
| order_price | string | 订单原价 |
| pay_price | string | 实际支付价格 |
| pay_type | string | 支付方式 |
| pay_status | string | 支付状态（1=已支付） |
| create_time | string | 创建时间 |
| pay_time | string | 支付时间 |
| status | string | 订单状态 |

### 用户元数据（授权相关）

插件会在用户元数据中存储以下授权信息：

| Meta Key | 类型 | 说明 |
|----------|------|------|
| `order_{order_num}_server_ip` | string | 订单绑定的服务器IP |
| `server_ip_{ip}_order` | string | IP绑定的订单号 |
| `order_{order_num}_authorized_ips` | array | 订单授权的所有IP列表（序列化数组） |

## 授权流程说明

### 典型使用场景

1. **客户购买产品**
   - 客户在WordPress网站完成购买
   - 订单状态变为已支付

2. **首次激活（绑定服务器IP）**
   - 客户在管理后台输入订单号
   - 系统自动获取服务器公网IP
   - 调用 `/bind-server` API绑定IP和订单
   - 绑定成功后，该IP可以使用该订单的服务

3. **添加额外授权IP（可选）**
   - 如需更换服务器或使用多台服务器
   - 管理员可调用 `/add-authorized-ip` 添加新的授权IP
   - 支持一个订单授权多个IP地址

4. **服务启动时验证**
   - 应用启动时调用 `/verify-server` 验证授权
   - 系统检查当前服务器IP是否在授权列表中
   - 验证通过后允许服务运行
   - 建议定期重新验证（如每小时或每天）

### 绑定规则

1. **一个IP只能绑定一个订单**（首次绑定）
   - 防止一个服务器IP被多个订单同时使用
   - 如需解绑，需要管理员手动操作

2. **一个订单可以授权多个IP**（通过add-authorized-ip）
   - 支持主服务器 + 备用服务器
   - 支持开发环境 + 生产环境
   - 灵活的多服务器部署方案

3. **验证机制**
   - 订单必须存在且已支付（pay_status = 1）
   - IP必须在订单的授权列表中
   - 支持实时验证和定期验证

## 权限要求

- 需要管理员权限（`manage_options`能力）
- 建议使用Application Password而非主密码

## 数据表依赖

此插件依赖子比主题的订单数据表：`wp_zibpay_order`

确保您的WordPress安装了子比主题并且订单表存在。

## 安全说明

1. **仅管理员访问**：所有API只允许拥有管理员权限的用户访问
2. **HTTPS推荐**：生产环境请使用HTTPS协议保护传输数据
3. **Application Password**：建议使用Application Password而非WordPress账号密码
4. **数据验证**：所有输入都经过WordPress内置的安全验证
5. **IP绑定保护**：
   - 一个IP只能绑定一个订单（防止滥用）
   - 订单绑定后需管理员手动解绑才能更换
   - 支持多IP授权以满足合理的多服务器需求
6. **定期验证**：建议应用定期验证授权状态，而非仅在启动时验证

## 集成到Nuxt应用

### Nuxt管理后台授权页面

#### 页面功能

Nuxt管理后台提供了完整的授权管理界面（`/license`），主要功能包括：

1. **实时授权状态显示**
   - 当前订单号（已激活/未激活/未知）
   - 授权状态（已激活/未激活）
   - 当前服务器IP
   - 已授权IP数量及列表

2. **订单激活功能**
   - 输入WordPress订单号
   - 自动验证订单有效性
   - 一键激活授权
   - 自动绑定当前服务器IP

3. **取消授权功能**
   - 已激活状态下显示"取消授权"按钮
   - 确认对话框防止误操作
   - 删除授权记录并更新状态

#### 页面布局

**已激活状态：**
```
┌─────────────────────────────────────┐
│ 授权管理                    [刷新状态] │
├─────────────────────────────────────┤
│ 当前授权状态                          │
│ ┌────────────────────────────────┐ │
│ │ 订单号: 202501010001234         │ │
│ │ 授权状态: ✅ 已激活              │ │
│ │ 服务器IP: 123.456.789.0        │ │
│ │ 授权IP数: 3                    │ │
│ └────────────────────────────────┘ │
│                                     │
│ 已授权IP地址                         │
│ • 127.0.0.1 (当前服务器)            │
│ • 0.0.0.0                          │
│ • localhost                        │
│                                     │
│ ⚠️ 警告                             │
│ 当前订单已激活授权，如需更换其他订单， │
│ 请先取消当前授权。                   │
│                                     │
│         [🗑️ 取消授权]               │
└─────────────────────────────────────┘
```

**未激活状态：**
```
┌─────────────────────────────────────┐
│ 授权管理                    [刷新状态] │
├─────────────────────────────────────┤
│ 当前授权状态                          │
│ ┌────────────────────────────────┐ │
│ │ 订单号: 未激活                  │ │
│ │ 授权状态: ❌ 未激活              │ │
│ │ 服务器IP: localhost            │ │
│ │ 授权IP数: 0                    │ │
│ └────────────────────────────────┘ │
│                                     │
│ WordPress订单号                      │
│ ┌────────────────────────────────┐ │
│ │ 请输入订单号，例如：202501010001234│ │
│ └────────────────────────────────┘ │
│                                     │
│ 订单详情（验证成功后显示）             │
│ ┌────────────────────────────────┐ │
│ │ 授权版本: 旗舰版                │ │
│ │ 客户邮箱: user@example.com      │ │
│ │ 订单号: 202501010001234         │ │
│ └────────────────────────────────┘ │
│                                     │
│    [🛡️ 验证订单]  [✨ 立即激活]      │
└─────────────────────────────────────┘
```

#### 使用流程

**首次激活流程：**

1. 用户登录管理后台，进入 `/license` 页面
2. 输入从WordPress商城购买的订单号（例如：`202501010001234`）
3. 点击"验证订单"按钮
   - 系统调用 `/api/license/validate-order` API
   - 后端访问WordPress REST API验证订单
   - 检查订单支付状态和产品ID
   - 显示订单详情（版本、邮箱、订单号）
4. 验证成功后，点击"立即激活"按钮
   - 系统调用 `/api/license/activate-order` API
   - 自动获取服务器IP（localhost或公网IP）
   - 调用WordPress `/verify-server` 端点验证IP授权
   - 将授权信息保存到本地数据库
5. 激活成功，页面自动刷新显示已激活状态

**取消授权流程：**

1. 在已激活状态下，点击"取消授权"按钮
2. 弹出确认对话框：`确定要取消授权吗？此操作不可恢复！`
3. 确认后，系统调用 `/api/license/deactivate` API
   - 删除本地数据库中的授权记录
   - 记录操作历史到 `license_history` 表
4. 页面自动刷新，恢复到未激活状态
5. 用户可以重新激活相同或不同的订单

#### API端点说明

Nuxt后端提供以下授权管理API：

| 端点 | 方法 | 功能 | 权限 |
|------|------|------|------|
| `/api/license/info` | GET | 获取当前授权状态 | 管理员 |
| `/api/license/validate-order` | POST | 验证WordPress订单 | 管理员 |
| `/api/license/activate-order` | POST | 激活订单授权 | 管理员 |
| `/api/license/deactivate` | POST | 取消授权 | 管理员 |

**1. 获取授权信息**
```typescript
// GET /api/license/info
// 返回示例
{
  "isActive": true,
  "orderNumber": "202501010001234",
  "serverIp": "localhost",
  "authorizedIps": ["127.0.0.1", "0.0.0.0", "localhost"],
  "edition": "旗舰版",
  "expiryDate": "2026-11-04"
}
```

**2. 验证订单**
```typescript
// POST /api/license/validate-order
// 请求
{
  "orderNumber": "202501010001234"
}

// 响应
{
  "valid": true,
  "message": "订单验证成功",
  "license": {
    "orderNumber": "202501010001234",
    "customerEmail": "user@example.com",
    "edition": "旗舰版",
    "duration": "永久",
    "productName": "Telegram会员机器人+可视化后台"
  }
}
```

**3. 激活订单**
```typescript
// POST /api/license/activate-order
// 请求
{
  "orderNumber": "202501010001234"
}

// 响应
{
  "success": true,
  "message": "授权已激活",
  "license": {
    "orderNumber": "202501010001234",
    "activatedAt": "2025-11-06 10:30:00",
    "serverIp": "localhost"
  }
}
```

**4. 取消授权**
```typescript
// POST /api/license/deactivate
// 请求
{
  "orderNumber": "202501010001234"
}

// 响应
{
  "success": true,
  "message": "授权已取消"
}
```

#### 数据库表结构

授权信息存储在MySQL数据库中：

**licenses表（授权记录）：**
```sql
CREATE TABLE `licenses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(255) NOT NULL UNIQUE,
  `order_id` VARCHAR(255),
  `email` VARCHAR(255),
  `customer_name` VARCHAR(255),
  `product_info` TEXT,
  `license_type` ENUM('standard', 'professional', 'enterprise') DEFAULT 'standard',
  `status` ENUM('active', 'inactive', 'expired') DEFAULT 'active',
  `activated_at` DATETIME,
  `expiry_date` DATE,
  INDEX `idx_order_number` (`order_number`),
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`)
);
```

**license_history表（操作历史）：**
```sql
CREATE TABLE `license_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(255) NOT NULL,
  `action` ENUM('activate', 'deactivate', 'renew', 'expire') NOT NULL,
  `server_ip` VARCHAR(50),
  `details` TEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_order_number` (`order_number`),
  INDEX `idx_action` (`action`),
  INDEX `idx_created_at` (`created_at`)
);
```

#### 环境配置

在 `.env` 文件中配置WordPress连接信息：

```env
# WordPress API配置
WORDPRESS_URL=https://hfz.pw
WORDPRESS_USERNAME=123@qq.com
WORDPRESS_APP_PASSWORD=5HfT RWJX QOjl cYYS xc0T s6xo

# 订单信息
ORDER_NUMBER=2511041721391842247

# 服务器IP（可选，不设置则自动获取）
SERVER_IP=
```

### 许可证验证工具类

```typescript
// server/utils/license-validator.ts
import crypto from 'crypto'

export class LicenseValidator {
  private static instance: LicenseValidator
  private config: any
  private validationTimer: NodeJS.Timeout | null = null

  private constructor() {
    this.config = loadConfig()
  }

  static getInstance(): LicenseValidator {
    if (!LicenseValidator.instance) {
      LicenseValidator.instance = new LicenseValidator()
    }
    return LicenseValidator.instance
  }

  async initialize() {
    // 初始验证
    await this.validate()
    
    // 定期重新验证（每小时）
    this.validationTimer = setInterval(() => {
      this.validate()
    }, 60 * 60 * 1000)
  }

  async validate(): Promise<boolean> {
    try {
      const serverIp = this.config.SERVER_IP || await this.getPublicIP()
      
      const response = await $fetch(`${this.config.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${this.config.WORDPRESS_USERNAME}:${this.config.WORDPRESS_APP_PASSWORD}`).toString('base64')}`,
          'Content-Type': 'application/json'
        },
        body: {
          order_num: this.config.ORDER_NUMBER,
          server_ip: serverIp
        }
      })

      if (response.success) {
        console.log('✅ 许可证验证通过')
        return true
      } else {
        console.error('❌ 许可证验证失败')
        process.exit(1)
      }
    } catch (error) {
      console.error('❌ 许可证验证错误:', error)
      process.exit(1)
    }
  }

  private async getPublicIP(): Promise<string> {
    const response = await $fetch('https://api.ipify.org?format=json')
    return response.ip
  }

  destroy() {
    if (this.validationTimer) {
      clearInterval(this.validationTimer)
    }
  }
}
```

### Nitro插件集成

```typescript
// server/plugins/license.ts
export default defineNitroPlugin(async (nitroApp) => {
  console.log('🔐 初始化许可证验证...')
  
  try {
    const validator = LicenseValidator.getInstance()
    await validator.initialize()
    
    console.log('✅ 许可证验证插件已启动')
  } catch (error) {
    console.error('❌ 许可证验证失败，服务将退出:', error)
    process.exit(1)
  }
})
```

### 前端激活页面示例代码

```vue
<!-- pages/license/index.vue -->
<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">授权管理</h1>
        <p class="text-sm text-gray-500">管理许可证授权和服务器IP绑定</p>
      </div>
      <UButton @click="refreshLicenseInfo" :loading="loading" variant="outline">
        <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 mr-2" />
        刷新状态
      </UButton>
    </div>

    <!-- 当前授权状态卡片 -->
    <UCard v-if="licenseInfo">
      <template #header>
        <h3 class="text-lg font-medium">当前授权状态</h3>
      </template>

      <!-- 授权概况（4个指标） -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="border rounded-lg p-4">
          <p class="text-xs text-gray-500 mb-1">订单号</p>
          <p class="text-lg font-bold" :class="!licenseInfo.isActive ? 'text-gray-500' : ''">
            {{ licenseInfo.orderNumber || '未知' }}
          </p>
        </div>
        
        <div class="border rounded-lg p-4">
          <p class="text-xs text-gray-500 mb-1">授权状态</p>
          <p class="text-lg font-bold" :class="licenseInfo.isActive ? 'text-green-500' : 'text-red-500'">
            {{ licenseInfo.isActive ? '已激活' : '未激活' }}
          </p>
        </div>
        
        <div class="border rounded-lg p-4">
          <p class="text-xs text-gray-500 mb-1">服务器IP</p>
          <p class="text-lg font-bold">{{ licenseInfo.serverIp || 'localhost' }}</p>
        </div>
        
        <div class="border rounded-lg p-4">
          <p class="text-xs text-gray-500 mb-1">授权IP数</p>
          <p class="text-lg font-bold">{{ licenseInfo.authorizedIps?.length || 0 }}</p>
        </div>
      </div>

      <!-- 已授权IP列表 -->
      <div v-if="licenseInfo.authorizedIps?.length > 0" class="mb-6">
        <h4 class="text-sm font-medium mb-3">已授权IP地址</h4>
        <div class="space-y-2">
          <div v-for="(ip, index) in licenseInfo.authorizedIps" :key="index" 
               class="border rounded-md p-3 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 text-green-500" />
              <div>
                <p class="font-mono">{{ ip }}</p>
                <p v-if="ip === licenseInfo.serverIp" class="text-xs text-green-500 mt-0.5">当前服务器</p>
              </div>
            </div>
            <UBadge color="green" variant="subtle">已授权</UBadge>
          </div>
        </div>
      </div>

      <!-- 已激活 - 只显示取消按钮 -->
      <div v-if="licenseInfo?.isActive">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-yellow-600" />
            <div>
              <h4 class="text-sm font-medium text-yellow-800 mb-1">警告</h4>
              <p class="text-sm text-yellow-700">
                当前订单已激活授权，如需更换其他订单，请先取消当前授权。
                取消授权后，当前授权记录将被永久删除，不可恢复！
              </p>
            </div>
          </div>
        </div>
        
        <UButton @click="deactivateLicense" :loading="deactivating" color="red" size="lg" class="w-full">
          <UIcon name="i-heroicons-trash" class="w-5 h-5 mr-2" />
          取消授权
        </UButton>
      </div>

      <!-- 未激活 - 显示激活表单 -->
      <template v-else>
        <!-- 提示信息 -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div class="flex items-start gap-3">
            <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600" />
            <div class="text-sm text-blue-700">
              <p class="mb-2">在 <a href="https://hfz.pw/shop/2101.html" target="_blank" class="text-blue-600 hover:text-blue-800 underline">HFZ商城</a> 购买授权后，使用订单号即可激活</p>
              <p>订单号可在确认邮件或商城订单页面找到</p>
            </div>
          </div>
        </div>

        <!-- 订单号输入 -->
        <div class="mb-4">
          <label class="block font-medium mb-2">WordPress订单号</label>
          <UInput 
            v-model="orderNumber" 
            placeholder="请输入订单号，例如：202501010001234"
            size="lg"
            :disabled="validating || activating"
          />
        </div>

        <!-- 验证结果 -->
        <div v-if="orderValidation?.message" 
             class="p-4 rounded-lg border mb-4"
             :class="orderValidation?.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'">
          <div class="flex items-start gap-3">
            <UIcon :name="orderValidation?.valid ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                   class="w-5 h-5 mt-0.5"
                   :class="orderValidation?.valid ? 'text-green-600' : 'text-red-600'" />
            <div class="flex-1">
              <div class="font-medium mb-1" :class="orderValidation?.valid ? 'text-green-700' : 'text-red-700'">
                {{ orderValidation?.valid ? '订单验证成功' : '订单验证失败' }}
              </div>
              <div class="text-sm text-gray-600">{{ orderValidation?.message }}</div>
              
              <!-- 授权详情 -->
              <div v-if="orderValidation?.valid && orderValidation?.license" class="mt-4 grid grid-cols-3 gap-4">
                <div class="border rounded-md p-3 text-center">
                  <p class="text-lg font-bold">{{ orderValidation.license.edition || 'N/A' }}</p>
                  <p class="text-xs text-gray-500 mt-1">授权版本</p>
                </div>
                <div class="border rounded-md p-3 text-center">
                  <p class="text-lg font-bold">{{ orderValidation.license.customerEmail || 'N/A' }}</p>
                  <p class="text-xs text-gray-500 mt-1">客户邮箱</p>
                </div>
                <div class="border rounded-md p-3 text-center">
                  <p class="text-lg font-bold">{{ orderValidation.license.orderNumber }}</p>
                  <p class="text-xs text-gray-500 mt-1">订单号</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <UButton @click="validateOrder" :loading="validating" :disabled="!orderNumber || activating"
                   variant="outline" size="lg" class="flex-1">
            <UIcon name="i-heroicons-shield-check" class="w-5 h-5 mr-2" />
            验证订单
          </UButton>
          <UButton @click="activateWithOrder" :loading="activating" :disabled="!orderValidation?.valid || validating"
                   size="lg" class="flex-1 bg-green-600 hover:bg-green-700">
            <UIcon name="i-heroicons-sparkles" class="w-5 h-5 mr-2" />
            立即激活
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  title: '授权管理',
  middleware: 'auth'
})

const toast = useToast()

// 响应式数据
const orderNumber = ref('')
const orderValidation = ref(null)
const licenseInfo = ref(null)

// 加载状态
const loading = ref(false)
const validating = ref(false)
const activating = ref(false)
const deactivating = ref(false)

// 获取当前授权信息
const fetchLicenseInfo = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/license/info')
    licenseInfo.value = data
  } catch (error) {
    licenseInfo.value = {
      isActive: false,
      orderNumber: null,
      serverIp: null,
      authorizedIps: []
    }
  } finally {
    loading.value = false
  }
}

// 刷新授权信息
const refreshLicenseInfo = async () => {
  await fetchLicenseInfo()
  toast.add({ title: '刷新成功', color: 'green' })
}

// 验证订单
const validateOrder = async () => {
  if (!orderNumber.value) return
  
  validating.value = true
  orderValidation.value = null
  
  try {
    const data = await $fetch('/api/license/validate-order', {
      method: 'POST',
      body: { orderNumber: orderNumber.value }
    })
    
    orderValidation.value = { ...data, activated: false }
    
    if (data?.valid) {
      toast.add({ title: '验证成功', color: 'green' })
    } else {
      toast.add({ title: '验证失败', description: data?.message, color: 'red' })
    }
  } catch (error) {
    orderValidation.value = { valid: false, message: error.message }
    toast.add({ title: '验证失败', description: error.message, color: 'red' })
  } finally {
    validating.value = false
  }
}

// 激活订单
const activateWithOrder = async () => {
  if (!orderNumber.value || !orderValidation.value?.valid) return
  
  activating.value = true
  try {
    const data = await $fetch('/api/license/activate-order', {
      method: 'POST',
      body: { orderNumber: orderNumber.value }
    })
    
    if (data?.success) {
      toast.add({ title: '激活成功', color: 'green' })
      await fetchLicenseInfo()
      
      setTimeout(() => {
        orderNumber.value = ''
        orderValidation.value = null
      }, 3000)
    }
  } catch (error) {
    toast.add({ title: '激活失败', description: error.message, color: 'red' })
  } finally {
    activating.value = false
  }
}

// 取消授权
const deactivateLicense = async () => {
  if (!confirm('确定要取消授权吗？此操作将删除当前授权记录，不可恢复！')) return
  
  deactivating.value = true
  try {
    const data = await $fetch('/api/license/deactivate', {
      method: 'POST',
      body: { orderNumber: licenseInfo.value.orderNumber }
    })
    
    if (data?.success) {
      toast.add({ title: '取消成功', color: 'green' })
      await fetchLicenseInfo()
    }
  } catch (error) {
    toast.add({ title: '取消失败', description: error.message, color: 'red' })
  } finally {
    deactivating.value = false
  }
}

onMounted(() => {
  fetchLicenseInfo()
})
</script>
```

### 后端API实现示例

**1. 获取授权信息 (`server/api/license/info.get.ts`)**

```typescript
import { executeQuery } from '~/server/utils/database'

export default defineEventHandler(async (event) => {
  const config = loadConfig()
  const orderNumber = config.ORDER_NUMBER
  
  if (!orderNumber) {
    return {
      isActive: false,
      orderNumber: '未知',
      serverIp: 'localhost',
      authorizedIps: []
    }
  }
  
  // 查询数据库
  const licenses = await executeQuery(
    'SELECT * FROM licenses WHERE order_number = ? AND status = ?',
    [orderNumber, 'active']
  )
  
  if (licenses.length === 0) {
    return {
      isActive: false,
      orderNumber: '未激活',
      serverIp: 'localhost',
      authorizedIps: []
    }
  }
  
  // 从WordPress获取授权IP列表
  const wpResponse = await $fetch(`${config.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${config.WORDPRESS_USERNAME}:${config.WORDPRESS_APP_PASSWORD}`).toString('base64')}`
    },
    body: {
      order_num: orderNumber,
      server_ip: 'localhost'
    }
  })
  
  return {
    isActive: true,
    orderNumber: licenses[0].order_number,
    serverIp: 'localhost',
    authorizedIps: wpResponse.data?.authorized_ips || [],
    edition: licenses[0].license_type,
    expiryDate: licenses[0].expiry_date
  }
})
```

**2. 验证订单 (`server/api/license/validate-order.post.ts`)**

```typescript
export default defineEventHandler(async (event) => {
  const { orderNumber } = await readBody(event)
  const config = loadConfig()
  
  // 调用WordPress API查询订单
  const order = await $fetch(`${config.WORDPRESS_URL}/wp-json/zibll/v1/order/${orderNumber}`, {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${config.WORDPRESS_USERNAME}:${config.WORDPRESS_APP_PASSWORD}`).toString('base64')}`
    }
  })
  
  if (!order || order.pay_status !== '1' || order.product_id !== 2101) {
    return {
      valid: false,
      message: '订单不存在、未支付或产品不匹配'
    }
  }
  
  return {
    valid: true,
    message: '订单验证成功',
    license: {
      orderNumber: order.order_num,
      customerEmail: order.user_email,
      edition: getEditionFromProduct(order.product_name),
      duration: '永久',
      productName: order.product_name
    }
  }
})
```

**3. 激活订单 (`server/api/license/activate-order.post.ts`)**

```typescript
export default defineEventHandler(async (event) => {
  const { orderNumber } = await readBody(event)
  const config = loadConfig()
  const serverIp = 'localhost'
  
  // 调用WordPress验证IP授权
  const wpResponse = await $fetch(`${config.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${config.WORDPRESS_USERNAME}:${config.WORDPRESS_APP_PASSWORD}`).toString('base64')}`
    },
    body: {
      order_num: orderNumber,
      server_ip: serverIp
    }
  })
  
  if (!wpResponse.success) {
    throw createError({
      statusCode: 403,
      message: '当前服务器IP未在WordPress中授权'
    })
  }
  
  // 保存到数据库
  await executeQuery(
    `INSERT INTO licenses (order_number, order_id, email, customer_name, status, activated_at)
     VALUES (?, ?, ?, ?, 'active', NOW())`,
    [orderNumber, wpResponse.data.order_id, wpResponse.data.user_email, wpResponse.data.user_name]
  )
  
  // 记录历史
  await executeQuery(
    `INSERT INTO license_history (order_number, action, server_ip, created_at)
     VALUES (?, 'activate', ?, NOW())`,
    [orderNumber, serverIp]
  )
  
  return { success: true, message: '授权已激活' }
})
```

**4. 取消授权 (`server/api/license/deactivate.post.ts`)**

```typescript
export default defineEventHandler(async (event) => {
  requireAdmin(event) // 验证管理员权限
  
  const { orderNumber } = await readBody(event)
  
  // 检查是否存在
  const existing = await executeQuery(
    'SELECT * FROM licenses WHERE order_number = ?',
    [orderNumber]
  )
  
  if (existing.length === 0) {
    throw createError({ statusCode: 404, message: '授权记录不存在' })
  }
  
  // 删除授权
  await executeQuery('DELETE FROM licenses WHERE order_number = ?', [orderNumber])
  
  // 记录历史
  await executeQuery(
    `INSERT INTO license_history (order_number, action, server_ip, created_at)
     VALUES (?, 'deactivate', ?, NOW())`,
    [orderNumber, 'localhost']
  )
  
  return { success: true, message: '授权已取消' }
})
```

### 前端激活页面示例代码（旧版）

```vue
<!-- pages/license/index.vue -->
<template>
  <UCard>
    <template #header>
      <h2>许可证激活</h2>
    </template>

    <UForm :state="form" @submit="handleActivate">
      <UFormGroup label="订单号" name="orderNumber">
        <UInput v-model="form.orderNumber" />
      </UFormGroup>

      <UButton type="submit" :loading="loading">
        激活许可证
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
const form = ref({
  orderNumber: ''
})

const loading = ref(false)

async function handleActivate() {
  loading.value = true
  try {
    const result = await $fetch('/api/license/activate-order', {
      method: 'POST',
      body: { orderNumber: form.value.orderNumber }
    })
    
    if (result.success) {
      // 激活成功，显示提示并刷新页面
      alert('激活成功！')
      location.reload()
    }
  } catch (error) {
    alert('激活失败：' + error.message)
  } finally {
    loading.value = false
  }
}
</script>
```

### 前端激活页面示例代码（旧版 - 简化版）

```vue
<!-- pages/license/index.vue - 简化版示例 -->
<template>
  <UCard>
    <template #header>
      <h2>许可证激活</h2>
    </template>

    <UForm :state="form" @submit="handleActivate">
      <UFormGroup label="订单号" name="orderNumber">
        <UInput v-model="form.orderNumber" placeholder="请输入订单号，例如：202501010001234" />
      </UFormGroup>

      <UButton type="submit" :loading="loading">
        激活许可证
      </UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
const form = ref({
  orderNumber: ''
})

const loading = ref(false)

async function handleActivate() {
  loading.value = true
  try {
    const result = await $fetch('/api/license/activate-order', {
      method: 'POST',
      body: { orderNumber: form.value.orderNumber }
    })
    
    if (result.success) {
      alert('激活成功！')
      location.reload()
    }
  } catch (error) {
    alert('激活失败：' + error.message)
  } finally {
    loading.value = false
  }
}
</script>
```

### 完整功能特性

#### 授权状态管理
- ✅ 实时显示授权状态（已激活/未激活）
- ✅ 订单号显示（激活后显示真实订单号，未激活显示"未激活"或"未知"）
- ✅ 服务器IP显示（当前服务器IP和授权IP列表）
- ✅ 授权IP数量统计

#### 订单激活功能
- ✅ 输入WordPress订单号
- ✅ 订单验证（检查支付状态、产品ID、用户信息）
- ✅ 显示订单详情（版本、邮箱、订单号）
- ✅ 一键激活授权
- ✅ 自动绑定当前服务器IP
- ✅ WordPress API集成验证

#### 取消授权功能
- ✅ 已激活状态显示"取消授权"按钮
- ✅ 确认对话框防止误操作
- ✅ 删除本地授权记录
- ✅ 记录操作历史
- ✅ 自动刷新页面状态

#### UI/UX优化
- ✅ 条件渲染（激活/未激活状态切换）
- ✅ 加载状态提示（验证中、激活中、取消中）
- ✅ Toast通知（成功/失败反馈）
- ✅ 响应式布局（支持移动端）
- ✅ 暗色模式支持
- ✅ 友好的错误提示

#### 安全特性
- ✅ 管理员权限验证
- ✅ 订单信息加密存储
- ✅ WordPress API认证
- ✅ IP验证机制
- ✅ 操作历史记录

## 测试命令

### 测试环境变量设置

```bash
# 替换为您的实际信息
export WP_URL="https://hfz.pw"
export WP_USER="123@qq.com"
export WP_PASS="5HfT RWJX QOjl cYYS xc0T s6xo"
export ORDER_NO="2511041721391842247"
export SERVER_IP="123.456.789.0"
```

### 1. 测试查询订单

```bash
curl -u "$WP_USER:$WP_PASS" \
  "$WP_URL/wp-json/zibll/v1/order/$ORDER_NO" \
  | jq .
```

### 2. 测试绑定服务器IP（首次激活）

```bash
curl -X POST -u "$WP_USER:$WP_PASS" \
  -H "Content-Type: application/json" \
  -d "{\"order_num\":\"$ORDER_NO\",\"server_ip\":\"$SERVER_IP\"}" \
  "$WP_URL/wp-json/zibll/v1/bind-server" \
  | jq .
```

### 3. 测试添加授权IP

```bash
# 添加第二个IP
export SERVER_IP_2="123.456.789.1"

curl -X POST -u "$WP_USER:$WP_PASS" \
  -H "Content-Type: application/json" \
  -d "{\"order_num\":\"$ORDER_NO\",\"server_ip\":\"$SERVER_IP_2\"}" \
  "$WP_URL/wp-json/zibll/v1/add-authorized-ip" \
  | jq .
```

### 4. 测试验证服务器授权

```bash
curl -X POST -u "$WP_USER:$WP_PASS" \
  -H "Content-Type: application/json" \
  -d "{\"order_num\":\"$ORDER_NO\",\"server_ip\":\"$SERVER_IP\"}" \
  "$WP_URL/wp-json/zibll/v1/verify-server" \
  | jq .
```

### 完整测试流程

```bash
#!/bin/bash
# 完整的授权流程测试脚本

WP_URL="https://hfz.pw"
WP_USER="123@qq.com"
WP_PASS="5HfT RWJX QOjl cYYS xc0T s6xo"
ORDER_NO="2511041721391842247"
SERVER_IP="123.456.789.0"

echo "=== 1. 查询订单信息 ==="
curl -s -u "$WP_USER:$WP_PASS" \
  "$WP_URL/wp-json/zibll/v1/order/$ORDER_NO" | jq .

echo -e "\n=== 2. 绑定服务器IP ==="
curl -s -X POST -u "$WP_USER:$WP_PASS" \
  -H "Content-Type: application/json" \
  -d "{\"order_num\":\"$ORDER_NO\",\"server_ip\":\"$SERVER_IP\"}" \
  "$WP_URL/wp-json/zibll/v1/bind-server" | jq .

echo -e "\n=== 3. 验证服务器授权 ==="
curl -s -X POST -u "$WP_USER:$WP_PASS" \
  -H "Content-Type: application/json" \
  -d "{\"order_num\":\"$ORDER_NO\",\"server_ip\":\"$SERVER_IP\"}" \
  "$WP_URL/wp-json/zibll/v1/verify-server" | jq .

echo -e "\n=== 测试完成 ==="
```

## 故障排除

### API相关问题

#### 404 Not Found

- 检查插件是否已启用
- 检查WordPress固定链接设置（Settings -> Permalinks）
- 尝试重新保存固定链接设置
- 确认API端点路径正确（注意大小写）

#### 401 Unauthorized

- 检查Application Password是否正确
- 确认用户是否有管理员权限
- 验证用户名和密码格式是否正确

#### 订单不存在

- 确认订单号是否正确
- 检查数据库表 `wp_zibpay_order` 是否存在
- 确认子比主题已正确安装
- 检查订单支付状态（pay_status必须为1）

### 授权相关问题

#### IP绑定失败

**问题：** 提示"该IP已被其他订单绑定"

**解决方案：**
1. 检查是否之前已用该IP绑定过其他订单
2. 如需解绑，在WordPress后台删除用户元数据：
   ```php
   // 在WordPress后台或phpMyAdmin中执行
   DELETE FROM wp_usermeta 
   WHERE meta_key = 'server_ip_123.456.789.0_order';
   ```
3. 或使用WordPress用户管理界面删除相关元数据

**问题：** 提示"该订单已绑定其他服务器IP"

**解决方案：**
1. 如需更换IP，先删除旧的绑定：
   ```php
   DELETE FROM wp_usermeta 
   WHERE meta_key = 'order_2511041721391842247_server_ip';
   ```
2. 或使用 `add-authorized-ip` API添加新IP而不是替换

#### 验证失败

**问题：** 提示"该服务器IP未授权"

**检查步骤：**
1. 确认IP地址是否正确（包括点分隔符）
2. 检查订单是否已完成首次绑定
3. 验证用户元数据中是否存在授权记录：
   ```sql
   SELECT * FROM wp_usermeta 
   WHERE meta_key LIKE '%2511041721391842247%';
   ```
4. 确认订单支付状态为已支付

**问题：** 公网IP获取不正确

**解决方案：**
1. 在Nuxt应用中检查IP获取逻辑
2. 如果在代理或负载均衡器后面，确保正确读取 `X-Forwarded-For` 或 `X-Real-IP` 头
3. 手动指定IP地址（在环境变量中设置 `SERVER_IP`）

### 数据库问题

#### 检查授权数据

```sql
-- 查看订单的所有授权IP
SELECT meta_value FROM wp_usermeta 
WHERE meta_key = 'order_2511041721391842247_authorized_ips';

-- 查看IP绑定的订单
SELECT meta_value FROM wp_usermeta 
WHERE meta_key = 'server_ip_123.456.789.0_order';

-- 查看某个用户的所有授权相关元数据
SELECT * FROM wp_usermeta 
WHERE user_id = 456 
AND (meta_key LIKE 'order_%' OR meta_key LIKE 'server_ip_%');
```

#### 手动清理授权数据

```sql
-- 清除订单的服务器IP绑定
DELETE FROM wp_usermeta 
WHERE meta_key = 'order_2511041721391842247_server_ip';

-- 清除IP的订单绑定
DELETE FROM wp_usermeta 
WHERE meta_key = 'server_ip_123.456.789.0_order';

-- 清除订单的授权IP列表
DELETE FROM wp_usermeta 
WHERE meta_key = 'order_2511041721391842247_authorized_ips';
```

### 调试建议

1. **启用WordPress调试模式**
   ```php
   // wp-config.php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```

2. **查看错误日志**
   ```bash
   tail -f wp-content/debug.log
   ```

3. **测试API连通性**
   ```bash
   # 测试基本连接
   curl -I https://hfz.pw/wp-json/
   
   # 测试插件端点
   curl -I -u "user:pass" https://hfz.pw/wp-json/zibll/v1/order/test
   ```

## 版本历史

- **1.2.0** (2025-01-15): 
  - ✨ 新增服务器IP绑定功能（bind-server）
  - ✨ 新增多IP授权支持（add-authorized-ip）
  - ✨ 新增服务器授权验证（verify-server）
  - 📝 完善API文档和使用示例
  - 🔒 增强安全性和授权管理

- **1.1.0** (2025-01-15):
  - 🐛 修复订单查询的边界情况
  - 📝 更新API文档

- **1.0.0** (2025-01-15): 
  - 🎉 初始版本，支持通过订单号查询订单详情

## 常见问题（FAQ）

### Q1: 如何获取WordPress Application Password？

A: 
1. 登录WordPress后台
2. 进入 用户 -> 个人资料
3. 滚动到底部的"应用密码"部分
4. 输入应用名称（如"Nuxt Admin"），点击"添加新应用密码"
5. 复制生成的密码（格式类似：`xxxx xxxx xxxx xxxx xxxx xxxx`）

### Q2: 一个订单可以授权几个IP？

A: 
- 首次绑定（bind-server）：只能绑定1个IP
- 后续添加（add-authorized-ip）：理论上无限制，但建议控制在3-5个以内
- 实际使用：建议1个生产IP + 1-2个备用/开发IP

### Q3: 如何更换服务器IP？

A: 有两种方式：
1. **添加新IP**（推荐）：
   ```bash
   curl -X POST -u "user:pass" \
     -H "Content-Type: application/json" \
     -d '{"order_num":"xxx","server_ip":"new_ip"}' \
     "https://your-site.com/wp-json/zibll/v1/add-authorized-ip"
   ```

2. **完全替换**（需要管理员操作）：
   - 在WordPress后台删除旧的绑定数据
   - 重新调用 bind-server API

### Q4: 验证失败会怎样？

A: 
- Nuxt应用会在启动时验证许可证
- 如果验证失败，应用会退出并显示错误信息
- 建议在生产环境启用定期验证，验证失败时记录日志但不立即退出

### Q5: 如何在本地开发环境测试？

A:
1. 在 `.env` 中设置测试订单号
2. 方式一：暂时禁用许可证验证（仅开发环境）
3. 方式二：将本地公网IP添加到授权列表
4. 方式三：使用 `SERVER_IP` 环境变量指定一个已授权的IP

### Q6: 数据存储在哪里？

A: 所有授权数据存储在WordPress的 `wp_usermeta` 表中：
- 订单绑定的IP
- IP绑定的订单号  
- 订单授权的IP列表

这样设计的好处：
- 与WordPress原生数据结构整合
- 支持WordPress的用户管理功能
- 便于备份和迁移

### Q7: 如何监控授权状态？

A: 可以在WordPress后台查看用户元数据，或使用SQL查询：
```sql
-- 查看所有授权记录
SELECT * FROM wp_usermeta 
WHERE meta_key LIKE 'order_%' OR meta_key LIKE 'server_ip_%'
ORDER BY umeta_id DESC;
```

## 相关资源

- [Nuxt 3 文档](https://nuxt.com/)
- [WordPress REST API 文档](https://developer.wordpress.org/rest-api/)
- [子比主题官网](https://www.zibll.com/)
- [Application Passwords 文档](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)

## 技术支持

如有问题，请：
1. 查看本文档的"故障排除"部分
2. 检查WordPress错误日志
3. 联系开发者或提交Issue
