# Telegram 机器人对接能量池系统 API 说明

本文档用于指导机器人系统（下游）对接当前能量池系统（上游网关），包含：

- 对接流程
- 业务 API（下发能量、查询账号）
- 充值与余额变动相关 API
- 机器人侧回调通知协议（重点）
- 错误码与联调建议

---

## 1. 总体对接架构

机器人系统主要通过能量池系统的 `v1` 接口完成业务调用：

- 下发能量（套餐）
  - `POST /v1/delegate_meal`
- 下发交易能量
  - `POST /v1/delegate_tran`
- 查询上游账户信息（透传）
  - `GET /v1/get_user_info`
- 查询本系统 API 用户余额（推荐机器人展示余额时用）
  - `GET /v1/get_api_user_info`

余额变动通知由能量池系统主动回调机器人系统：

- 回调地址来源：`bot_configs.bot_notify_url`（机器人需上报）
- 通知事件：
  - 充值到账 `changeType=recharge`
  - 消费扣费 `changeType=deduct`
  - 后台手动调账 `changeType=adjust`
  - 下发失败 `changeType=delegation_failed`

---

## 2. 鉴权与通用约定

### 2.1 API 账号鉴权

`/v1/*` 接口统一使用本系统 API 用户账号密码鉴权（`api_users` 表）：

- 用户状态必须为 `active`
- 鉴权失败返回：`401` + `{ "error": "invalid api username/password" }`

### 2.2 传参方式

- `POST /v1/delegate_meal`、`POST /v1/delegate_tran`
  - 从 JSON Body 读取 `username` / `password`
- `GET /v1/get_api_user_info`
  - 从 query 读取 `username` / `password`
- `GET /v1/get_user_info`
  - 支持 query 或 `Authorization: Basic base64(username:password)`

### 2.3 CORS

接口支持跨域，响应头包含：

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization, Accept`

---

## 3. 业务 API（机器人 -> 能量池）

## 3.1 下发能量套餐

`POST /v1/delegate_meal`

### 请求体

```json
{
  "username": "api_xxx",
  "password": "pw_xxx",
  "energy": 65000,
  "day": 0,
  "receiver_address": "T...",
  "bot_username": "YourBotName"
}
```

### 字段说明

- `username`：API 用户名（本系统）
- `password`：API 密码（本系统）
- `energy`：下发能量数值（建议传）
- `day`：套餐天数
  - `0` 或不传：按 1 小时成本扣费
  - `1`：按 1 天成本
  - `3`：按 3 天成本
  - `>=30`：按 30 天成本
- `receiver_address`：接收地址
- `bot_username`：机器人用户名（用于日志追踪）

### 处理规则

- 调用前先检查余额，不足返回 `402`
- 成功后异步扣费并触发余额回调（`changeType=deduct`）
- 若上游返回非 200 但响应内容判定成功，网关仍按成功处理并返回 `200`

### 典型响应

- 成功：`200`（响应体基本为上游成功结果或网关构造成功结果）
- 参数错误：`400`
- 鉴权失败：`401`
- 余额不足：`402`
- 上游请求失败：`502`

---

## 3.2 下发交易能量

`POST /v1/delegate_tran`

### 请求体

```json
{
  "username": "api_xxx",
  "password": "pw_xxx",
  "energy": 65000,
  "day": 0,
  "receiver_address": "T...",
  "bot_username": "YourBotName"
}
```

### 处理规则

- 扣费策略：
  - `day=0`：按 1 小时成本，并按 `energy/65000` 四舍五入倍数乘算
  - `day=1/3/30+`：按配置成本
- 调用前检查余额，不足返回 `402`
- 成功后异步扣费并触发 `changeType=deduct`
- 若上游失败或请求异常，会记录失败消费单，并触发失败通知 `changeType=delegation_failed`

### 典型响应

- 成功：透传上游状态和内容
- 参数错误：`400`
- 鉴权失败：`401`
- 余额不足：`402`
- 上游请求失败：`502`

---

## 3.3 查询上游用户信息（透传）

`GET /v1/get_user_info`

### 鉴权

- 使用本系统 API 账号密码（query 或 Basic Auth）

### 返回

- 成功时返回上游 `/v1/get_user_info` 原始响应
- 鉴权失败：`401`
- 上游未配置：`400`
- 上游不可用：`502`

---

## 3.4 查询本系统 API 用户信息（推荐）

`GET /v1/get_api_user_info?username=api_xxx&password=pw_xxx&bot_username=YourBot`

### 返回示例

```json
{
  "用户名": "api_xxx",
  "状态": "active",
  "创建时间": "2026-03-07T08:00:00.000Z",
  "当前余额(TRX)": 128.336521
}
```

### 说明

- 该接口直接查本系统 `api_users` 余额，适合机器人“个人中心/余额”展示

---

## 4. 充值相关 API（可选对接）

如需机器人在能量池系统内完成“创建充值订单 + 轮询到账”，可对接以下 API。

## 4.1 创建充值订单

`POST /api/api-recharge-orders`

### 请求体

```json
{
  "apiUsername": "api_xxx",
  "paymentAddress": "TJdtCWfm4iaqcQVMJchrobkbP5Y9yqNpPf",
  "amountTrx": 100,
  "telegramChatId": 123456789,
  "telegramMessageId": 456
}
```

### 返回示例

```json
{
  "success": true,
  "data": {
    "orderId": 123,
    "apiUsername": "api_xxx",
    "paymentAddress": "TJdtCWfm4iaqcQVMJchrobkbP5Y9yqNpPf",
    "amountTrx": 100.23,
    "expiresAt": "2026-03-08T12:10:00.000Z",
    "createdAt": "2026-03-08T12:00:00.000Z"
  }
}
```

说明：系统会在整数金额上附加随机两位小数（用于订单唯一匹配）。

## 4.2 查询充值订单

`GET /api/api-recharge-orders?orderId=123`

可按 `orderId` / `apiUsername` / `status` 过滤。

## 4.3 触发支付检测（后台或脚本）

- `POST /api/api-recharge-orders/check-payments`（批量检测）
- `POST /api/api-recharge-orders/check-payment`（单笔检测）

检测到到账后会：

1. 更新订单为 `paid`
2. 给 `api_users.balance_micro` 充值
3. 触发余额回调 `changeType=recharge`

---

## 5. 机器人配置同步 API（强烈建议接入）

为了让能量池系统知道“要把余额变化通知到哪里”，机器人需上报自己的通知地址。

## 5.1 上报机器人配置

`POST /api/bots/config`

### 请求体

```json
{
  "botUsername": "YourBotName",
  "apiUsername": "api_xxx",
  "configContent": "username=api_xxx\npassword=pw_xxx\n...",
  "botNotifyUrl": "https://your-bot-domain.com/api/recharge-notify"
}
```

### 说明

- `botNotifyUrl` 为余额/充值/失败通知统一回调地址
- 支持 UPSERT（机器人重复上报会更新）

## 5.2 查询机器人配置

`GET /api/bots/config?botUsername=YourBotName`

---

## 6. 回调通知协议（能量池 -> 机器人）

回调 URL：使用 `botNotifyUrl`（或库中 fallback 环境变量）。

机器人回调接口要求：

- Method: `POST`
- Header: `Content-Type: application/json`
- 建议 10 秒内返回 `200`

## 6.1 充值到账通知（recharge）

触发场景：充值订单支付成功入账。

```json
{
  "apiUsername": "api_xxx",
  "changeType": "recharge",
  "amountTrx": 100.23,
  "newBalanceTrx": "300.560000",
  "orderId": "123",
  "txHash": "xxxx",
  "telegramChatId": 123456789,
  "telegramMessageId": 456
}
```

## 6.2 消费扣费通知（deduct）

触发场景：`delegate_meal` / `delegate_tran` 成功后异步扣费。

```json
{
  "apiUsername": "api_xxx",
  "changeType": "deduct",
  "amountTrx": -2.7,
  "newBalanceTrx": "297.860000"
}
```

说明：`amountTrx` 为负数表示扣费。

## 6.3 手动调账通知（adjust）

触发场景：后台管理修改 API 用户余额。

```json
{
  "apiUsername": "api_xxx",
  "changeType": "adjust",
  "amountTrx": 50,
  "newBalanceTrx": "347.860000"
}
```

说明：`amountTrx` 可正可负。

## 6.4 下发失败通知（delegation_failed）

触发场景：下发前余额不足、上游失败等。

```json
{
  "apiUsername": "api_xxx",
  "changeType": "delegation_failed",
  "error": "insufficient balance: current=1.000000 TRX, required=2.700000 TRX",
  "energy": 65000,
  "receiverAddress": "T...",
  "orderType": "delegate_meal",
  "currentBalanceTrx": "1.000000",
  "timestamp": "2026-03-08T12:00:00.000Z"
}
```

---

## 7. 机器人侧回调接口建议实现

建议你的机器人系统提供统一入口，例如：`POST /api/recharge-notify`。

处理逻辑建议：

1. 校验来源（IP 白名单或签名）
2. 按 `changeType` 分流处理
3. 使用 `orderId + txHash`（充值）做幂等
4. 快速返回 `200`，复杂业务异步处理
5. 记录完整回调日志，便于追踪

建议返回：

```json
{
  "success": true
}
```

---

## 8. 错误码速查

- `200`：成功
- `400`：参数错误 / 上游未配置
- `401`：API 账号密码错误或用户不可用
- `402`：余额不足（业务拒绝）
- `404`：资源不存在（如未找到订单/机器人配置）
- `500`：系统内部错误
- `502`：上游请求失败

---

## 9. 联调最小步骤（推荐）

1. 在能量池创建 `apiUsername/password`
2. 机器人启动后调用 `POST /api/bots/config` 上报 `botNotifyUrl`
3. 机器人调用 `GET /v1/get_api_user_info` 验证账号
4. 调用 `POST /v1/delegate_meal` 做一次小额测试
5. 确认机器人成功收到 `changeType=deduct`
6. 创建并支付一笔充值订单，确认收到 `changeType=recharge`

---

## 10. 备注（当前实现特性）

- 当前系统默认使用 `EP001` 作为能量池上游配置来源
- 回调地址优先取 `bot_configs.bot_notify_url`，其次可使用环境变量 fallback
- 回调发送超时时间为 10 秒
- 余额单位内部使用 `micro`（`1 TRX = 1,000,000 micro`）

