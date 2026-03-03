-- 能量池系统数据库完整初始化脚本
-- 包含所有表结构和当前数据

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 导入完整的数据库结构（包含 DROP 和 CREATE）
\i /docker-entrypoint-initdb.d/init-full.sql

-- 导入数据（如果有单独的数据文件）
-- \i /docker-entrypoint-initdb.d/init-data-full.sql

-- 执行所有升级脚本（确保表结构是最新的，如果 init-full.sql 已是最新则不会重复创建）
\i /docker-entrypoint-initdb.d/upgrade_api_users.sql
\i /docker-entrypoint-initdb.d/upgrade_api_users_balance.sql
\i /docker-entrypoint-initdb.d/upgrade_api_recharge_orders.sql
\i /docker-entrypoint-initdb.d/upgrade_api_consumption_orders.sql
\i /docker-entrypoint-initdb.d/upgrade_api_keys.sql
\i /docker-entrypoint-initdb.d/upgrade_bot_configs_notify_url.sql
\i /docker-entrypoint-initdb.d/upgrade_client_logs.sql
\i /docker-entrypoint-initdb.d/upgrade_client_logs_bot_username.sql
\i /docker-entrypoint-initdb.d/upgrade_downstream_pricing.sql
\i /docker-entrypoint-initdb.d/upgrade_energy_pools_provider.sql
\i /docker-entrypoint-initdb.d/upgrade_upstream_info.sql
