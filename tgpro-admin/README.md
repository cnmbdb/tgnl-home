# TG Pro Admin - Telegram机器人管理后台

一个现代化的Telegram机器人管理后台系统，用于管理用户、监控机器人状态和查看数据统计。基于交易数据提供全面的用户管理和业务分析功能。

## 🎯 快速导航

- **🚀 [生产环境快速部署](#-生产环境快速部署推荐)** - 直接上传项目文件，无需重新构建
- **🔧 [PM2 进程管理](#-pm2-进程管理)** - 进程监控和管理命令
- **📊 [数据库配置](#-数据库配置)** - MySQL数据库设置和初始化
- **🛠️ [开发环境安装](#️-安装和运行)** - 本地开发环境搭建

## 🚀 技术栈

- **前端框架**: Nuxt 3 + Vue 3 + TypeScript
- **UI组件库**: Nuxt UI v2.11.1
- **样式系统**: Tailwind CSS
- **图标库**: Heroicons
- **状态管理**: Pinia
- **数据库**: MySQL
- **图表库**: Chart.js + Vue-ChartJS

## 💰 机器人支付架构

### 🔗 双重支付体系设计

本系统采用创新的**TRON + TON双重支付体系**，巧妙结合了用户友好性和技术先进性：

#### 🌐 TRON链（用户支付层）
- **支付方式**: TRC20 USDT（用户熟悉的主流支付方式）
- **收款地址**: `TA22y9tyEGNNDM2FS2yzwBksHD9LqGf5Bp`
- **监控机制**: 系统自动监控TRON区块链交易
- **验证流程**: 自动识别用户支付并触发服务开通

#### ⚡ TON链（服务执行层）
- **核心功能**: 与Fragment.com平台深度集成
- **钱包管理**: 内置TON钱包（通过助记词管理）
- **服务执行**: 负责实际的Telegram Premium开通操作
- **成本优化**: 利用TON网络的低费用优势

### 🔄 支付流程详解

#### 方式一：余额支付（完全自助，即时开通）
```
用户选择余额支付 → 系统扣除USDT余额 → 调用Fragment.com API → 
检查TON钱包余额 → 生成Premium Gift链接 → 用户完成开通
```

**技术实现**：
1. 用户点击"余额支付"按钮
2. 系统调用 `init_gift_premium_request` 函数
3. 通过 `FragmentPaymentProcessor` 处理支付请求
4. 验证TON钱包余额是否足够支付Fragment.com费用
5. 生成Fragment.com Premium Gift链接
6. 用户通过链接完成Telegram Premium开通

#### 方式二：TRON链上支付（区块链监控，自动开通）
```
用户转账TRC20 USDT → 系统监控区块链 → 验证交易地址和金额 → 
自动触发开通流程 → 调用TON钱包 → 完成Fragment.com操作
```

**技术实现**：
1. 用户向指定地址转账TRC20 USDT
2. `saokuai` 函数持续监控TRON区块链
3. 验证 `to_address == control_address` 确保支付有效
4. 确认金额后自动调用支付处理流程
5. 同样通过TON钱包完成Fragment.com操作

### 🏗️ 核心技术组件

#### 📦 关键模块说明
- **`fragment_payment_processor.py`**: Fragment.com平台集成核心
  - 处理Fragment.com API认证和请求
  - 管理Premium Gift的创建和验证
  - 集成TON钱包余额检查

- **`ton_wallet.py`**: TON钱包操作和管理
  - 钱包创建、导入和管理
  - 交易发送和状态跟踪
  - 余额查询和地址验证

- **`premium_gift_sync.py`**: 异步支付处理协调器
  - 协调TRON支付确认和TON服务执行
  - 处理异步支付流程和超时管理
  - 提供统一的支付结果格式

- **`hy.py`**: 主机器人逻辑和用户交互
  - Telegram Bot API集成
  - 用户界面和交互逻辑
  - 支付流程的用户端控制

#### 🔧 TON钱包的核心作用

TON钱包在系统中扮演**支付执行器**的关键角色：

1. **余额验证**: 确保有足够TON余额支付Fragment.com费用
2. **API认证**: 使用钱包助记词与Fragment.com平台进行安全认证
3. **交易执行**: 实际完成Telegram Premium的购买和赠送操作
4. **状态监控**: 实时跟踪支付状态和交易确认情况

#### 🛡️ 安全性设计

- **地址验证**: 严格验证TRON交易的目标地址
- **金额确认**: 精确匹配支付金额和服务价格
- **助记词保护**: TON钱包助记词安全存储在环境变量中
- **API认证**: Fragment.com集成使用安全的认证机制

### 🎯 架构优势

1. **用户友好**: 支持主流USDT支付，降低用户学习成本
2. **成本优化**: TON网络费用低廉，提高利润率
3. **自动化程度高**: 无需人工干预，全自动处理
4. **安全可靠**: 分离支付接收和执行逻辑，提高安全性
5. **灵活性强**: 支持余额和直接支付两种模式
6. **技术先进**: 结合两个区块链的优势，技术架构领先

### 📊 支付数据流

```
用户USDT支付 → TRON区块链确认 → 系统数据库记录 → 
TON钱包验证 → Fragment.com API调用 → Telegram Premium开通 → 
用户通知 → 管理后台统计
```

## ✨ 功能特性

### 📊 仪表板
- 关键数据统计概览
- 用户增长趋势图表
- 最近活动记录
- 快速操作入口

### 👥 用户管理
- 基于交易数据的用户列表展示
- 智能会员等级分类（Free/VIP/Premium）
- 用户搜索和状态筛选
- 实时余额统计
- 分页浏览和批量操作

### 🤖 机器人管理
- 机器人状态实时监控
- 配置参数动态管理
- 机器人启动/停止/重启控制
- 系统日志查看

### 📈 数据分析
- 交易数据统计分析
- 订单管理和追踪
- 用户活跃度分析
- 收入趋势图表

### ⚙️ 高级功能
- 机器人指令管理
- 内联键盘配置
- 键盘按钮设置
- 关键词自动回复
- 开发者工具和贡献指南

## 🔧 技术实现详解

### 🌐 Fragment.com集成技术

#### 📋 API集成架构
Fragment.com是Telegram官方的Premium服务平台，本系统通过深度集成实现自动化Premium开通：

**核心集成组件**：
- **`FragmentPaymentProcessor`类**: 主要的Fragment.com API处理器
- **HTTP会话管理**: 维持与Fragment.com的持久连接
- **认证机制**: 基于TON钱包助记词的安全认证
- **请求头配置**: 模拟真实浏览器环境，确保API调用成功

#### 🔐 认证和安全机制
```python
# Fragment.com认证流程
1. 加载TON钱包助记词 (从环境变量)
2. 初始化TON钱包实例
3. 生成钱包地址和私钥
4. 使用钱包信息进行Fragment.com认证
5. 获取访问令牌用于后续API调用
```

**安全特性**：
- 助记词加密存储在环境变量中
- 每次API调用都进行身份验证
- 支持会话超时和自动重连
- 错误处理和重试机制

#### 🎁 Premium Gift处理流程
```python
# Premium Gift创建和处理
def process_premium_gift_payment(self, username, months):
    1. 验证输入参数 (用户名和月数)
    2. 检查TON钱包余额是否充足
    3. 搜索目标用户 (通过Telegram用户名)
    4. 计算Premium费用 (基于月数)
    5. 创建Premium Gift订单
    6. 生成支付链接
    7. 返回交易信息和链接
```

**支持的订阅时长**：
- 3个月 Premium
- 6个月 Premium  
- 12个月 Premium

### ⚡ TON钱包技术实现

#### 🏗️ 钱包架构设计
TON钱包模块采用模块化设计，支持完整的钱包生命周期管理：

**核心数据结构**：
```python
# 钱包类型枚举
class WalletType(Enum):
    V3R1 = "v3r1"
    V3R2 = "v3r2" 
    V4R1 = "v4r1"
    V4R2 = "v4r2"

# 交易状态跟踪
class TransactionStatus(Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    FAILED = "failed"

# 钱包信息结构
@dataclass
class WalletInfo:
    address: str
    balance: float
    wallet_type: WalletType
    is_active: bool
```

#### 💰 余额管理和验证
```python
# TON钱包余额检查机制
async def check_ton_wallet_balance(self):
    """
    检查TON钱包余额，支持多种API格式
    - 支持v2和v3 API格式
    - 自动重试机制
    - 余额不足时抛出专门异常
    """
    try:
        # 获取钱包余额
        balance = await self.get_wallet_balance()
        
        # 检查是否足够支付Fragment.com费用
        if balance < required_amount:
            raise InsufficientBalanceError(
                f"TON钱包余额不足: {balance} TON < {required_amount} TON"
            )
        
        return balance
    except Exception as e:
        logger.error(f"余额检查失败: {e}")
        raise
```

#### 🔄 交易处理和状态跟踪
```python
# 交易发送和状态监控
class TONWallet:
    async def send_transaction(self, to_address: str, amount: float):
        """
        发送TON交易
        - 构建交易请求
        - 签名和广播
        - 返回交易哈希
        """
        
    async def get_transaction_status(self, tx_hash: str):
        """
        查询交易状态
        - 实时状态查询
        - 确认数检查
        - 失败原因分析
        """
```

### 🔄 异步支付协调机制

#### 📡 `premium_gift_sync.py` 协调器
这个模块是连接TRON支付确认和TON服务执行的关键桥梁：

```python
# 异步支付处理协调
async def call_process_premium_gift(username, months):
    """
    协调整个支付流程：
    1. 接收来自hy.py的支付请求
    2. 调用FragmentPaymentProcessor处理
    3. 处理异步操作和超时
    4. 格式化返回结果
    5. 错误处理和重试逻辑
    """
    try:
        # 创建Fragment处理器实例
        processor = FragmentPaymentProcessor()
        
        # 处理Premium Gift支付
        result = await processor.process_premium_gift_payment(
            username, months
        )
        
        # 格式化返回结果
        if result['success']:
            return f"{result['ref']},{result['amount']},{result['expire_at']},{result['payment_link']}"
        else:
            return f"错误: {result['error']}"
            
    except Exception as e:
        return f"处理失败: {str(e)}"
```

#### ⏱️ 超时和重试机制
- **连接超时**: 30秒HTTP请求超时
- **支付超时**: 10分钟支付链接有效期
- **重试策略**: 指数退避重试算法
- **错误恢复**: 自动故障转移和状态恢复

### 🛡️ 错误处理和监控

#### 📊 错误分类和处理
```python
# 专门的异常类型
class InsufficientBalanceError(Exception):
    """TON钱包余额不足异常"""
    
class FragmentAPIError(Exception):
    """Fragment.com API调用异常"""
    
class WalletConnectionError(Exception):
    """TON钱包连接异常"""
```

#### 📝 日志和监控
- **详细日志记录**: 所有支付操作都有完整日志
- **性能监控**: API调用时间和成功率统计
- **错误追踪**: 异常堆栈和错误上下文记录
- **实时告警**: 关键错误的即时通知机制

### 🔧 配置管理

#### ⚙️ 环境变量配置
```env
# TON钱包配置
WalletMnemonic=your_ton_wallet_mnemonic_words_here

# Fragment.com配置  
FRAGMENT_API_BASE=https://fragment.com
FRAGMENT_TIMEOUT=30

# TRON网络配置
TRON_API_KEY=your_tron_api_key
TRON_NETWORK=mainnet
```

#### 🔄 动态配置加载
- **热重载**: 支持配置文件的动态重载
- **环境隔离**: 开发/测试/生产环境配置分离
- **安全存储**: 敏感信息加密存储和访问控制

## 🛠️ 安装和运行

### 环境要求
- Node.js >= 18.0.0
- npm >= 8.0.0
- MySQL >= 5.7

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 环境配置
1. 创建环境变量文件 `.env`，配置数据库连接信息：
\`\`\`env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306
\`\`\`

### 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

访问 http://localhost:3000 查看应用。

### 构建生产版本
\`\`\`bash
npm run build
\`\`\`

### 预览生产版本
\`\`\`bash
npm run preview
\`\`\`

## 📁 项目结构

\`\`\`
tgpro-admin/
├── assets/              # 静态资源
│   ├── avatars/        # 用户头像SVG文件
│   └── css/            # 样式文件
├── hf-tgpro/           # Python机器人核心
│   ├── hy.py           # 主要机器人脚本
│   ├── logs/           # 日志文件
│   └── requirements.txt # Python依赖
├── layouts/            # 布局组件
│   └── default.vue     # 默认布局
├── middleware/         # 中间件
│   └── auth.ts         # 认证中间件
├── pages/              # 页面组件
│   ├── index.vue       # 仪表板首页
│   ├── users/          # 用户管理页面
│   ├── orders/         # 订单管理页面
│   ├── bots/           # 机器人管理页面
│   ├── analytics/      # 数据分析页面
│   ├── bot-commands/   # 机器人指令管理
│   ├── inline-keyboards/ # 内联键盘配置
│   ├── keyboard-buttons/ # 键盘按钮设置
│   ├── keyword-replies/ # 关键词回复
│   └── development/    # 开发者工具
├── public/             # 公共静态文件
│   └── avatars/        # 公共头像文件
├── server/             # 服务端代码
│   ├── api/            # API路由
│   │   ├── tg-users.get.ts    # 用户数据API
│   │   ├── orders.get.ts      # 订单数据API
│   │   ├── stats.get.ts       # 统计数据API
│   │   ├── bot-status.get.ts  # 机器人状态API
│   │   ├── bot-config.*.ts    # 机器人配置API
│   └── utils/          # 工具函数
│       └── database.ts # 数据库连接
├── app.vue             # 根组件
├── nuxt.config.ts      # Nuxt配置
└── package.json        # 项目配置
\`\`\`

## 🔧 配置说明

### 数据库配置
项目使用MySQL数据库，需要在 `.env` 文件中配置连接信息。

#### 数据库结构
- **transactions表** - 存储用户交易记录，作为用户数据的主要来源
  - `id` - 主键
  - `chat_id` - Telegram用户ID
  - `amount` - 交易金额
  - `created_at` - 创建时间

#### 智能用户分类
系统基于交易金额自动分类用户等级：
- **Free用户** - 交易总额 < 100,000
- **VIP用户** - 100,000 ≤ 交易总额 < 1,000,000,000
- **Premium用户** - 交易总额 ≥ 1,000,000,000

#### 机器人集成
- Python机器人脚本位于 `hf-tgpro/` 目录
- 支持通过Web界面控制机器人启停
- 实时日志监控和状态查看

### API端点

#### 用户管理
- \`GET /api/tg-users\` - 获取Telegram用户列表（支持分页、搜索、筛选）
- \`GET /api/users\` - 获取系统用户数据
- \`GET /api/system-users\` - 获取系统用户信息
- \`GET /api/debug-users\` - 调试用户数据
- \`POST /api/import-users\` - 批量导入用户

#### 数据统计
- \`GET /api/stats\` - 获取系统统计数据
- \`GET /api/orders\` - 获取订单数据

#### 机器人管理
- \`GET /api/bot-status\` - 获取机器人运行状态
- \`GET /api/bot-config\` - 获取机器人配置
- \`POST /api/bot-config\` - 更新机器人配置
- \`POST /api/restart-bot\` - 重启机器人



## 🎨 界面预览

### 仪表板 (`/`)
- 显示关键业务指标和统计数据
- 用户增长趋势图表
- 最近活动时间线
- 快速导航和操作入口

### 用户管理 (`/users`)
- 基于交易数据的用户列表展示
- 智能搜索（支持chat_id搜索）
- 状态筛选（Active/Banned/Inactive）
- 会员类型筛选（Free/VIP/Premium）
- 实时余额显示和统计
- 分页浏览和数据导出

### 订单管理 (`/orders`)
- 交易订单列表查看
- 订单状态跟踪
- 金额统计分析
- 时间范围筛选

### 机器人管理 (`/bots`)
- 实时运行状态监控
- 配置参数动态管理
- 启动/停止/重启控制
- 系统日志实时查看

### 高级配置
- **机器人指令** (`/bot-commands`) - 自定义指令管理
- **内联键盘** (`/inline-keyboards`) - 交互式键盘配置
- **键盘按钮** (`/keyboard-buttons`) - 快捷按钮设置
- **关键词回复** (`/keyword-replies`) - 智能自动回复

### 数据分析 (`/analytics`)
- 多维度数据统计分析
- 交互式图表展示
- 用户活跃度分析
- 收入趋势可视化

### 开发者工具 (`/development`)
- 开发指南和文档
- 贡献者指南
- 系统调试工具

## 🚀 部署

### 🎯 生产环境快速部署（推荐）

> **适用场景**: 直接上传项目文件到服务器，无需重新构建，快速启动前端应用

#### 1. 服务器环境要求
- **操作系统**: CentOS 7+ / Ubuntu 18+ / Debian 9+
- **Node.js**: >= 18.0.0 (推荐使用宝塔面板的Node.js v22.19.0)
- **Python**: >= 3.8
- **MySQL**: >= 5.7
- **PM2**: 进程管理器
- **宝塔面板**: 7.0+ (推荐使用)

#### 2. 📦 项目文件上传部署

##### 2.1 上传项目文件
```bash
# 方式1: 直接上传压缩包到服务器
# 将整个项目文件夹上传到 /www/wwwroot/tgpro-admin

# 方式2: 使用Git克隆（如果有代码仓库）
cd /www/wwwroot/
git clone your-repo-url tgpro-admin
cd tgpro-admin
```

##### 2.2 环境配置
```bash
# 1. 进入项目目录
cd /www/wwwroot/tgpro-admin

# 2. 配置环境变量
# 确保 .env 文件存在并配置数据库连接信息
vim .env
```

**重要**: 确保 `.env` 文件包含正确的数据库配置：
```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=3306
```

##### 2.3 依赖安装（仅生产依赖）
```bash
# 安装Node.js生产依赖（跳过开发依赖）
npm ci --production

# 安装Python机器人依赖
cd hf-tgpro
pip3 install -r requirements.txt
cd ..
```

##### 2.4 🚀 启动前端应用（无需构建）

**前提条件**: 确保项目中已包含构建好的 `.output/` 目录

```bash
# 检查构建文件是否存在
ls -la .output/server/index.mjs

# 如果存在构建文件，直接启动
# 方式1: 使用宝塔面板的PM2
/www/server/nodejs/v22.19.0/bin/pm2 start ecosystem.config.js --only tgpro-admin

# 方式2: 使用系统PM2（如果已安装）
pm2 start ecosystem.config.js --only tgpro-admin

# 方式3: 使用root权限的PM2（推荐，便于宝塔面板监控）
sudo pm2 start ecosystem.config.js --only tgpro-admin
```

##### 2.5 验证部署
```bash
# 检查PM2进程状态
sudo pm2 status

# 测试前端是否正常运行
curl http://localhost:3000

# 测试API是否正常
curl http://localhost:3000/api/bot-config
```

##### 2.6 保存PM2配置
```bash
# 保存当前PM2进程列表，确保重启后自动启动
sudo pm2 save

# 设置开机自启动（可选）
sudo pm2 startup
```

#### 3. 🔧 宝塔面板集成部署

##### 3.1 使用宝塔面板Node.js管理
1. **安装Node.js版本管理器**
   - 在宝塔面板中安装 "Node.js版本管理器"
   - 安装Node.js v22.19.0或更高版本

2. **创建项目**
   - 在"Node项目"中添加新项目
   - 项目路径: `/www/wwwroot/tgpro-admin`
   - 启动文件: `.output/server/index.mjs`
   - 端口: `3000`

3. **配置环境变量**
   - 在项目设置中添加环境变量
   - 或直接编辑项目目录下的 `.env` 文件

##### 3.2 使用宝塔面板PM2管理
```bash
# 使用宝塔面板提供的PM2路径
/www/server/nodejs/v22.19.0/bin/pm2 start ecosystem.config.js --only tgpro-admin

# 在宝塔面板的PM2管理器中可以看到进程
```

#### 4. 📋 快速启动检查清单

**部署前检查**:
- [ ] 服务器已安装Node.js >= 18.0.0
- [ ] MySQL数据库已创建并配置
- [ ] 项目文件已上传到 `/www/wwwroot/tgpro-admin`
- [ ] `.output/server/index.mjs` 文件存在（构建产物）

**配置检查**:
- [ ] `.env` 文件已配置数据库连接
- [ ] `ecosystem.config.js` 配置正确
- [ ] 端口3000未被占用

**启动步骤**:
```bash
# 1. 进入项目目录
cd /www/wwwroot/tgpro-admin

# 2. 安装依赖
npm ci --production

# 3. 启动应用
sudo pm2 start ecosystem.config.js --only tgpro-admin

# 4. 验证运行
curl http://localhost:3000

# 5. 保存配置
sudo pm2 save
```

#### 5. 🛠️ 故障排除

##### 5.1 常见问题
**问题1**: `__dirname is not defined`
```bash
# 解决方案: 确保使用的是构建后的文件
ls -la .output/server/index.mjs
# 如果文件不存在，需要先构建: npm run build
```

**问题2**: 端口被占用
```bash
# 检查端口占用
sudo lsof -i :3000
# 杀死占用进程
sudo kill -9 <PID>
```

**问题3**: PM2进程无法在宝塔面板中显示
```bash
# 使用root权限启动PM2
sudo pm2 start ecosystem.config.js --only tgpro-admin
# 这样宝塔面板可以监控到进程
```

##### 5.2 日志查看
```bash
# 查看PM2日志
sudo pm2 logs tgpro-admin

# 查看应用日志
tail -f /var/log/tgpro/combined.log

# 查看错误日志
tail -f /var/log/tgpro/error.log
```

#### 6. 🔄 更新部署

当需要更新应用时：
```bash
# 1. 停止当前进程
sudo pm2 stop tgpro-admin

# 2. 更新项目文件（上传新文件或git pull）
# 如果有新的构建文件，替换 .output/ 目录

# 3. 更新依赖（如果package.json有变化）
npm ci --production

# 4. 重启应用
sudo pm2 restart tgpro-admin
```

### 🏗️ 完整构建部署（开发环境）

#### 1. 环境准备
- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **MySQL**: >= 5.7

#### 2. 从源码构建部署
```bash
# 1. 克隆项目
git clone your-repo-url tgpro-admin
cd tgpro-admin

# 2. 安装所有依赖
npm install

# 3. 安装Python依赖
./install-python-deps.sh

# 4. 配置环境
# 确保 .env 文件存在并正确配置

# 5. 构建项目
npm run build
# 或使用构建脚本
./build-production.sh

# 6. 启动服务
pm2 start ecosystem.config.js --env production
```

#### 3. Nginx配置（可选）
```bash
# 复制Nginx配置
cp nginx.conf /etc/nginx/sites-available/tgpro-admin
ln -s /etc/nginx/sites-available/tgpro-admin /etc/nginx/sites-enabled/

# 重启Nginx
sudo systemctl restart nginx
```

### 🔧 PM2 进程管理

#### 常用命令
```bash
# 查看服务状态
sudo pm2 status

# 查看日志
sudo pm2 logs tgpro-admin

# 重启服务
sudo pm2 restart tgpro-admin

# 停止服务
sudo pm2 stop tgpro-admin

# 删除服务
sudo pm2 delete tgpro-admin

# 监控服务
sudo pm2 monit
```

#### 使用启动脚本（如果存在）
```bash
# 启动所有服务
./start-production.sh start

# 停止所有服务
./start-production.sh stop

# 重启所有服务
./start-production.sh restart

# 查看服务状态
./start-production.sh status

# 重启并重新构建
./start-production.sh restart --rebuild
```

### 📊 数据库配置

#### MySQL 数据库设置
```sql
-- 创建数据库
CREATE DATABASE hftgpro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户
CREATE USER 'hftgpro'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON hftgpro.* TO 'hftgpro'@'localhost';
FLUSH PRIVILEGES;
```

#### 初始化数据库
```bash
# 通过 API 初始化
curl -X POST http://localhost:3000/api/init-db

# 或通过管理界面初始化
# 访问前端界面并点击初始化数据库按钮
```

## 🤖 机器人端部署

### 📋 部署前准备

#### 1. 系统环境要求
- Python 3.8+
- pip3
- 虚拟环境支持

#### 2. 项目文件结构
```
hf-tgpro/
├── hy.py              # 机器人主程序
├── requirements.txt   # Python依赖
├── .env              # 环境变量配置
├── config.txt        # 机器人配置
├── keyword_replies.json # 关键词回复配置
└── logs/             # 日志目录
```

### 🚀 宝塔面板部署步骤

#### 1. 使用宝塔面板Python环境
```bash
cd /www/wwwroot/tgpro-admin/hf-tgpro

# 使用宝塔面板的Python 3.9.7
/www/server/python/3.9.7/bin/python3 --version

# 使用宝塔面板的pip安装依赖
/www/server/python/3.9.7/bin/pip3 install -r requirements.txt
```

#### 2. 创建Python依赖安装脚本（可选）
如果需要重复安装，可以创建脚本：
```bash
# 创建安装脚本
cat > install-bot-deps.sh << 'EOF'
#!/bin/bash
echo "使用宝塔面板Python 3.9.7安装机器人依赖..."
cd /www/wwwroot/tgpro-admin/hf-tgpro
/www/server/python/3.9.7/bin/pip3 install -r requirements.txt
echo "依赖安装完成！"
EOF

# 设置执行权限
chmod +x install-bot-deps.sh

# 运行安装脚本
./install-bot-deps.sh
```

#### 3. 配置机器人环境

##### 3.1 编辑 config.txt
```bash
nano config.txt
```

配置内容：
```
TOKEN=your_telegram_bot_token
CUSTOMER_SERVICE_ID=https://t.me/your_customer_service
Tiaozhuan=https://t.me/your_bot_username
admin_id=your_admin_telegram_id
three_price=15
six_price=20
year_price=35
```

##### 3.2 编辑 .env 文件
```bash
nano .env
```

配置内容：
```env
# Fragment.com 配置
ResHash="your_fragment_hash"
ResCookie="your_fragment_cookie"

# 钱包配置
WalletMnemonic="your wallet mnemonic words"

# 数据库配置（与前端共享）
DB_HOST=localhost
DB_USER=hftgpro
DB_PASSWORD=your_password
DB_NAME=hftgpro
DB_PORT=3306
```

#### 4. 创建日志目录
```bash
sudo mkdir -p /var/log/tgpro
sudo chown -R $USER:$USER /var/log/tgpro
```

#### 5. 启动机器人

##### 5.1 使用PM2启动（推荐）
```bash
# 启动机器人（从项目根目录）
cd /www/wwwroot/tgpro-admin

# 使用宝塔面板的PM2启动
/www/server/nodejs/v22.19.0/bin/pm2 start ecosystem.config.js --only tgpro-bot

# 或使用sudo权限启动（推荐，便于宝塔面板监控）
sudo pm2 start ecosystem.config.js --only tgpro-bot

# 查看状态
sudo pm2 status

# 查看日志
sudo pm2 logs tgpro-bot

# 保存PM2配置
sudo pm2 save
```

##### 5.2 手动启动（测试用）
```bash
cd /www/wwwroot/tgpro-admin/hf-tgpro

# 使用宝塔面板的Python启动
/www/server/python/3.9.7/bin/python3 hy.py

# 或使用虚拟环境（如果已配置）
source venv/bin/activate
python3 hy.py
```

##### 5.3 在宝塔面板中添加Python项目（可选）
1. 进入宝塔面板 → 软件商店 → Python项目管理
2. 添加Python项目：
   - 项目名称：`tgpro-bot`
   - Python版本：`3.9.7`
   - 项目路径：`/www/wwwroot/tgpro-admin/hf-tgpro`
   - 启动文件：`hy.py`
   - 端口：无需设置（机器人不需要端口）
   - 启动方式：`python3 hy.py`

### 🔧 机器人管理命令

```bash
# 查看机器人状态
sudo pm2 status tgpro-bot

# 重启机器人
sudo pm2 restart tgpro-bot

# 停止机器人
sudo pm2 stop tgpro-bot

# 查看机器人日志
sudo pm2 logs tgpro-bot --lines 50

# 监控机器人性能
sudo pm2 monit
```

### 📝 配置说明

#### Telegram Bot Token 获取
1. 联系 [@BotFather](https://t.me/BotFather)
2. 发送 `/newbot` 创建新机器人
3. 按提示设置机器人名称和用户名
4. 获取 Bot Token 并填入 `config.txt`

#### Fragment.com 配置
1. 登录 [Fragment.com](https://fragment.com)
2. 打开浏览器开发者工具
3. 在 Network 标签页找到 API 请求
4. 复制 `ResHash` 和 `ResCookie` 值

#### 管理员ID获取
1. 向机器人发送任意消息
2. 查看日志获取您的 Telegram ID
3. 将ID填入 `config.txt` 的 `admin_id`

### 🛠️ 故障排除

#### 宝塔面板环境常见问题

1. **Python依赖安装失败**
   ```bash
   # 检查宝塔面板Python版本
   /www/server/python/3.9.7/bin/python3 --version
   
   # 升级pip
   /www/server/python/3.9.7/bin/pip3 install --upgrade pip
   
   # 如果某些包安装失败，尝试单独安装
   /www/server/python/3.9.7/bin/pip3 install python-telegram-bot
   /www/server/python/3.9.7/bin/pip3 install mysql-connector-python
   ```

2. **PM2路径问题**
   ```bash
   # 确认宝塔面板PM2路径
   which pm2
   /www/server/nodejs/v22.19.0/bin/pm2 --version
   
   # 如果PM2命令不存在，创建软链接
   sudo ln -s /www/server/nodejs/v22.19.0/bin/pm2 /usr/local/bin/pm2
   ```

3. **权限问题**
   ```bash
   # 修复文件权限（宝塔面板通常使用www用户）
   sudo chown -R www:www /www/wwwroot/tgpro-admin/hf-tgpro
   chmod +x /www/wwwroot/tgpro-admin/hf-tgpro/hy.py
   
   # 如果使用ubuntu用户
   sudo chown -R ubuntu:ubuntu /www/wwwroot/tgpro-admin/hf-tgpro
   ```

4. **数据库连接失败**
   ```bash
   # 检查宝塔面板MySQL状态
   sudo systemctl status mysql
   
   # 在宝塔面板中检查数据库配置
   # 面板 → 数据库 → 查看数据库信息
   
   # 测试数据库连接
   /www/server/python/3.9.7/bin/python3 -c "
   import mysql.connector
   try:
       conn = mysql.connector.connect(
           host='localhost',
           user='hftgpro',
           password='your_password',
           database='hftgpro'
       )
       print('数据库连接成功')
       conn.close()
   except Exception as e:
       print(f'数据库连接失败: {e}')
   "
   ```

5. **机器人无响应**
   ```bash
   # 检查机器人进程（使用宝塔面板PM2）
   /www/server/nodejs/v22.19.0/bin/pm2 logs tgpro-bot
   
   # 检查网络连接
   curl -I https://api.telegram.org
   
   # 检查防火墙设置（宝塔面板）
   # 面板 → 安全 → 防火墙 → 确保443和80端口开放
   ```

6. **宝塔面板Python项目管理问题**
   ```bash
   # 如果在宝塔面板中添加Python项目失败
   # 1. 检查Python版本是否正确安装
   # 2. 确认项目路径和启动文件
   # 3. 查看宝塔面板错误日志
   
   # 手动测试启动
   cd /www/wwwroot/tgpro-admin/hf-tgpro
   /www/server/python/3.9.7/bin/python3 hy.py
   ```

#### 调试命令
```bash
# 检查所有相关服务状态
echo "=== Python版本 ==="
/www/server/python/3.9.7/bin/python3 --version

echo "=== PM2状态 ==="
/www/server/nodejs/v22.19.0/bin/pm2 status

echo "=== MySQL状态 ==="
sudo systemctl status mysql

echo "=== 文件权限 ==="
ls -la /www/wwwroot/tgpro-admin/hf-tgpro/

echo "=== 网络连接 ==="
curl -I https://api.telegram.org
```

### 📊 监控和日志

#### 日志文件位置
- **机器人日志**: `/var/log/tgpro/bot-combined.log`
- **错误日志**: `/var/log/tgpro/bot-error.log`
- **输出日志**: `/var/log/tgpro/bot-out.log`

#### 实时监控
```bash
# 查看实时日志
tail -f /var/log/tgpro/bot-combined.log

# PM2 监控界面
sudo pm2 monit
```

## 📝 开发说明

### 添加新页面
1. 在 \`pages/\` 目录下创建Vue文件
2. Nuxt会自动生成路由
3. 在布局组件中添加导航链接

### 添加新API
1. 在 \`server/api/\` 目录下创建文件
2. 使用 \`defineEventHandler\` 定义处理函数
3. 支持GET、POST、PUT、DELETE等方法

### 自定义样式
1. 在 \`assets/css/main.css\` 中添加全局样式
2. 使用Tailwind CSS工具类
3. 支持响应式设计

## 📋 更新日志

### v1.0.0 - 最新版本
- ✅ 重构用户管理系统，基于交易数据展示用户信息
- ✅ 智能用户等级分类（Free/VIP/Premium）
- ✅ 完善的搜索和筛选功能
- ✅ 实时余额统计和分页展示
- ✅ 机器人状态监控和控制
- ✅ 多模块管理界面（指令、键盘、回复等）
- ✅ 开发者工具和贡献指南

### 核心特性
- 🔄 **数据驱动** - 基于真实交易数据的用户管理
- 🎯 **智能分类** - 自动根据交易金额分类用户等级
- 🔍 **高效搜索** - 支持chat_id精确搜索和多条件筛选
- 📊 **实时统计** - 动态计算用户统计数据
- 🤖 **机器人集成** - 无缝集成Python Telegram机器人
- 🎨 **现代界面** - 基于Nuxt UI的现代化管理界面

## 机器人支付架构完整解析
### 1. 双重支付体系设计
您的机器人采用了一个非常巧妙的双重支付体系：

TRON链（用户支付层） ：

- 用户使用 TRC20 USDT 进行支付
- 支付地址： TA22y9tyEGNNDM2FS2yzwBksHD9LqGf5Bp
- 系统监控TRON区块链交易，自动识别用户支付
TON链（服务执行层） ：

- 机器人内置TON钱包（通过助记词管理）
- 用于与Fragment.com平台交互
- 负责实际的Telegram Premium开通操作
### 2. 支付流程详解 方式一：余额支付（完全自助）
1. 用户选择"余额支付"
2. 系统从用户USDT余额中扣除相应金额
3. 调用 init_gift_premium_request → FragmentPaymentProcessor
4. 检查TON钱包余额是否足够
5. 通过Fragment.com API生成Premium Gift链接
6. 用户通过链接完成Telegram Premium开通 方式二：TRON链上支付（监控模式）
1. 用户转账TRC20 USDT到指定地址
2. 系统监控TRON区块链交易（ saokuai 函数）
3. 验证 to_address == control_address
4. 确认金额后自动触发开通流程
5. 同样调用TON钱包完成Fragment.com操作
### 3. TON钱包的核心作用
TON钱包在系统中扮演 支付执行器 的角色：

- 余额验证 ：确保有足够TON余额支付Fragment.com费用
- API认证 ：使用钱包助记词与Fragment.com平台认证
- 交易执行 ：实际完成Telegram Premium的购买和赠送
- 状态监控 ：跟踪支付状态和交易确认
### 4. 关键技术组件
- fragment_payment_processor.py ：Fragment.com平台集成核心
- ton_wallet.py ：TON钱包操作和管理
- premium_gift_sync.py ：异步支付处理协调器
- hy.py ：主机器人逻辑和用户交互
### 5. 智能设计优势
这种架构设计非常聪明：

- 用户友好 ：支持主流的USDT支付
- 成本优化 ：TON网络费用低廉
- 自动化 ：无需人工干预
- 安全性 ：分离支付接收和执行逻辑
- 灵活性 ：支持余额和直接支付两种模式

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目。请查看 `/development/contribution-guide` 页面了解详细的贡献指南。

## 📄 许可证

MIT License