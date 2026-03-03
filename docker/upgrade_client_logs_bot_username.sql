-- 添加机器人用户名字段到 client_logs 表
-- 用于显示 Telegram 机器人的用户名或标识

ALTER TABLE client_logs
ADD COLUMN IF NOT EXISTS bot_username VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_client_logs_bot_username ON client_logs(bot_username);


