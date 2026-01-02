# WordPress/WooCommerce 集成配置指南

## 📋 概述

本系统支持使用 WordPress 商城（WooCommerce）的订单号作为授权激活码。用户在您的 WordPress 网站购买授权商品后，可以使用订单号直接激活系统授权。

## 🔧 配置步骤

### 1. 获取 WooCommerce API 密钥

1. 登录您的 WordPress 后台：`https://hfz.pw/wp-admin`

2. 进入 **WooCommerce** → **设置** → **高级** → **REST API**

3. 点击 **"添加密钥"** 按钮

4. 填写以下信息：
   - **描述**: `TG Pro Admin Integration`
   - **用户**: 选择管理员账户
   - **权限**: 选择 `读取` (Read)

5. 点击 **"生成 API 密钥"**

6. **重要**：复制并保存以下信息（只显示一次）：
   ```
   Consumer Key: ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Consumer Secret: cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 2. 配置环境变量

编辑项目根目录的 `.env` 文件，添加以下配置：

```env
# WordPress 订单授权集成文档

## 概述

本系统支持使用 WordPress 博客（子比主题）的订单号作为授权激活码。用户在博客商品页面购买后，可以使用订单号直接激活授权。

## 子比主题介绍

子比主题（Zibll）是一款功能强大的 WordPress 主题，内置完整的商城系统，支持：
- 虚拟商品销售
- 订单管理
- 用户中心
- 支付集成

**商品链接**: https://hfz.pw/shop/2101.html

## 认证方式

子比主题通过 WordPress REST API 进行集成，支持以下认证方式：

### 1. Application Passwords（推荐）

**优点**：
- 安全性高
- 易于管理和撤销
- WordPress 5.6+ 原生支持

**设置步骤**：

1. 登录 WordPress 后台
2. 进入「用户」→「个人资料」
3. 滚动到底部找到「应用程序密码」
4. 输入名称（如 "TGPRO Admin"），点击「添加新应用程序密码」
5. 复制生成的密码（格式：xxxx xxxx xxxx xxxx xxxx xxxx）

**环境变量配置**：
```bash
WORDPRESS_URL=https://hfz.pw
WORDPRESS_USERNAME=你的用户名
WORDPRESS_APP_PASSWORD=生成的应用程序密码
WORDPRESS_PRODUCT_ID=2101
```

### 2. JWT Token

**优点**：
- 支持更复杂的认证场景
- Token 过期机制

**设置步骤**：

1. 安装 JWT Authentication 插件
2. 配置插件获取 Token
3. 设置环境变量

**环境变量配置**：
```bash
WORDPRESS_URL=https://hfz.pw
WORDPRESS_USERNAME=你的用户名
WORDPRESS_JWT_TOKEN=你的JWT令牌
WORDPRESS_PRODUCT_ID=2101
```

### 3. 数据库直连（备选方案）

如果 REST API 受限，可以直接连接 WordPress 数据库：

```bash
WP_DB_HOST=数据库地址
WP_DB_PORT=3306
WP_DB_USER=数据库用户名
WP_DB_PASSWORD=数据库密码
WP_DB_NAME=数据库名
```

## 子比主题订单数据结构

子比主题的订单存储在 WordPress 的 `posts` 表中，类型为自定义文章类型 `shop_order`：

### 订单字段

| 字段 | 说明 |
|------|------|
| `ID` | 订单ID |
| `post_title` | 订单标题 |
| `post_status` | 订单状态 |
| `post_date` | 创建时间 |
| `post_type` | 固定为 `shop_order` |

### 订单元数据（postmeta 表）

| Meta Key | 说明 |
|----------|------|
| `order_no` | 订单号 |
| `order_price` | 订单金额 |
| `order_status` | 订单状态 |
| `order_product_id` | 商品ID |
| `order_product_name` | 商品名称 |
| `order_user_id` | 用户ID |
| `pay_type` | 支付方式 |
| `pay_time` | 支付时间 |

### 订单状态

- `paid` - 已支付
- `pending` - 待支付
- `cancelled` - 已取消
- `refunded` - 已退款

## API 接口说明

### 1. 验证订单

**接口**: `POST /api/license/validate-order`

**请求**：
```json
{
  "orderNumber": "订单号"
}
```

**响应**：
```json
{
  "valid": true,
  "order": {
    "id": 123,
    "orderNumber": "2025010112345",
    "productId": "2101",
    "productName": "TGPRO 管理系统授权",
    "status": "paid",
    "purchaseDate": "2025-01-01T12:00:00Z",
    "customerName": "张三",
    "customerEmail": "user@example.com",
    "price": "99.00"
  },
  "productMatched": true
}
```

### 2. 激活授权

**接口**: `POST /api/license/activate-order`

**请求**：
```json
{
  "orderNumber": "订单号",
  "userId": "用户ID（可选）"
}
```

**响应**：
```json
{
  "success": true,
  "message": "授权激活成功",
  "license": {
    "id": 1,
    "userId": null,
    "orderNumber": "2025010112345",
    "licenseType": "企业版",
    "expiresAt": "2026-01-01T12:00:00Z",
    "status": "active"
  }
}
```

## 前端使用

在授权管理页面 (`/pages/license/index.vue`)，用户可以：

1. 输入在博客购买的订单号
2. 点击「验证订单」查看订单信息
3. 确认无误后点击「激活授权」

## 安全注意事项

1. **保护认证凭据**：
   - Application Password 和 JWT Token 必须存储在环境变量中
   - 不要将密码提交到代码库

2. **订单验证**：
   - 验证订单状态必须为已支付
   - 验证商品ID匹配
   - 防止同一订单重复激活

3. **日志记录**：
   - 记录所有激活操作
   - 保存订单验证历史

4. **错误处理**：
   - API 请求失败时提供友好提示
   - 记录详细错误日志便于排查

## 测试步骤

1. 在博客完成一笔测试订单
2. 获取订单号
3. 在系统中输入订单号进行验证
4. 确认订单信息正确
5. 激活授权并验证结果

## 故障排查

### 1. 无法连接到 WordPress

**检查**：
- WORDPRESS_URL 是否正确
- 网络连接是否正常
- WordPress REST API 是否启用

### 2. 认证失败

**检查**：
- Application Password 格式是否正确（包含空格）
- 用户名是否正确
- 用户是否有足够权限

### 3. 找不到订单

**可能原因**：
- 订单号输入错误
- 订单尚未支付
- 数据库查询条件不匹配

**解决方案**：
- 直接访问 WordPress REST API 测试：
  ```bash
  curl -u "用户名:应用程序密码" \
    "https://hfz.pw/wp-json/wp/v2/posts?post_type=shop_order"
  ```

### 4. 商品ID不匹配

**检查**：
- WORDPRESS_PRODUCT_ID 环境变量是否正确
- 商品 URL 中的 ID 是否为 2101

## 下一步

完成配置后，请提供以下信息以完成测试：

1. WordPress 认证方式（Application Password 或 JWT Token）
2. 对应的认证凭据
3. 一个已完成支付的测试订单号

我将帮您验证集成是否正常工作。
WOOCOMMERCE_URL=https://hfz.pw
WOOCOMMERCE_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WOOCOMMERCE_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WOOCOMMERCE_PRODUCT_ID=2101
```

**配置说明**：
- `WOOCOMMERCE_URL`: WordPress 网站地址
- `WOOCOMMERCE_KEY`: Consumer Key（消费者密钥）
- `WOOCOMMERCE_SECRET`: Consumer Secret（消费者密钥）
- `WOOCOMMERCE_PRODUCT_ID`: 授权商品的ID（从商品URL中获取，如：https://hfz.pw/shop/2101.html）

### 3. 初始化数据库

执行以下 SQL 创建必要的数据库表：

```bash
mysql -u hftgpro -p hftgpro < database/licenses.sql
```

或手动执行 `database/licenses.sql` 中的 SQL 语句。

### 4. 重新构建并启动应用

```bash
# 停止应用
pm2 stop tgpro-admin

# 重新构建
npm run build

# 启动应用
pm2 start ecosystem.config.js --only tgpro-admin
```

## 📊 数据库表结构

### licenses 表
存储授权许可信息：
- `order_number`: 订单号（作为激活码，唯一）
- `order_id`: WordPress订单ID
- `customer_email`: 客户邮箱
- `customer_name`: 客户姓名
- `edition`: 授权版本（从商品名称自动识别）
- `duration_days`: 授权时长（天数）
- `expiry_date`: 到期日期
- `status`: 状态（active/expired/revoked）

### license_history 表
记录授权操作历史：
- `order_number`: 关联的订单号
- `action`: 操作类型（activate/verify/renew等）
- `description`: 操作描述
- `performed_by`: 操作人ID

## 🔐 工作流程

### 用户购买流程

1. **用户在 WordPress 商城购买**
   ```
   https://hfz.pw/shop/2101.html
   ```

2. **订单完成后**
   - 用户收到订单确认邮件
   - 邮件中包含订单号（如：#12345）

3. **激活授权**
   - 用户登录 TG Pro Admin 后台
   - 进入"设置" → "更新授权"
   - 选择"WordPress订单"选项卡
   - 输入订单号：12345
   - 点击"验证订单"
   - 验证成功后，点击"激活授权"

### 系统验证流程

```
用户输入订单号
    ↓
系统调用 WooCommerce API
    ↓
验证订单存在 ✓
    ↓
验证订单状态为"已完成" ✓
    ↓
验证订单包含商品 #2101 ✓
    ↓
验证订单未被使用 ✓
    ↓
提取授权信息（版本、时长）
    ↓
保存到数据库
    ↓
激活成功
```

## 🎯 授权信息自动识别

系统会自动从订单信息中提取授权配置：

### 授权版本识别
从商品名称中自动识别：
- 包含"企业版"或"Enterprise" → 企业版
- 包含"专业版"或"Professional" → 专业版
- 包含"基础版"或"Basic" → 基础版
- 默认 → 标准版

### 授权时长识别
从商品名称中自动提取：
- "3个月" → 90天
- "6个月" → 180天
- "1年" → 365天
- 默认 → 365天

**示例商品名称**：
- `TG Pro 企业版授权（1年）` → 企业版，365天
- `TG Pro 专业版（6个月）` → 专业版，180天

## 🛡️ 安全措施

1. **API 密钥保护**
   - API密钥存储在环境变量中
   - 使用 HTTPS 加密传输
   - 只需要"读取"权限

2. **防止重复激活**
   - 每个订单号只能激活一次
   - 数据库中 `order_number` 字段设置为 UNIQUE

3. **订单状态验证**
   - 只接受状态为"completed"的订单
   - 确保订单已付款

4. **商品验证**
   - 验证订单中必须包含指定的商品ID
   - 防止使用其他商品订单激活

## 🔍 测试

### 测试 WooCommerce API 连接

使用 curl 命令测试：

```bash
curl https://hfz.pw/wp-json/wc/v3/orders/12345 \
  -u "ck_xxxxx:cs_xxxxx"
```

成功返回示例：
```json
{
  "id": 12345,
  "status": "completed",
  "line_items": [
    {
      "product_id": 2101,
      "name": "TG Pro 授权"
    }
  ]
}
```

### 测试系统 API

```bash
# 验证订单
curl -X POST http://localhost:3000/api/license/validate-order \
  -H "Content-Type: application/json" \
  -d '{"orderNumber": "12345"}'

# 激活授权
curl -X POST http://localhost:3000/api/license/activate-order \
  -H "Content-Type: application/json" \
  -d '{"orderNumber": "12345"}'
```

## 📝 常见问题

### Q: 如何找到商品ID？
A: 访问商品页面，从URL中获取：`https://hfz.pw/shop/2101.html` → 商品ID是 `2101`

### Q: 订单号在哪里找？
A: 
1. 订单确认邮件
2. WordPress后台 → WooCommerce → 订单
3. 用户账户页面 → 我的订单

### Q: 如果API密钥泄露怎么办？
A: 立即在 WordPress 后台删除该密钥，并重新生成新的密钥，然后更新 `.env` 文件。

### Q: 可以支持多个商品吗？
A: 可以。修改 `WOOCOMMERCE_PRODUCT_ID` 为逗号分隔的多个ID，或修改验证逻辑支持多商品。

## 🚀 高级配置

### 自定义授权时长

修改 `server/utils/wordpress.ts` 中的 `getProductDuration` 方法：

```typescript
private getProductDuration(order: WooCommerceOrder): number {
  // 从 meta_data 中读取自定义字段
  const durationMeta = order.meta_data.find(m => m.key === '_license_duration')
  if (durationMeta) {
    return parseInt(durationMeta.value)
  }
  
  // 原有逻辑...
}
```

### Webhook 自动激活

可以配置 WooCommerce Webhook，在订单完成时自动通知系统激活授权：

1. WordPress后台 → WooCommerce → 设置 → 高级 → Webhooks
2. 添加 Webhook：
   - 主题：Order updated
   - 传送URL：`https://your-domain.com/api/webhook/order-completed`
   - 密钥：生成一个随机密钥

## 📞 技术支持

如有问题，请访问：https://t.me/HFTGID
