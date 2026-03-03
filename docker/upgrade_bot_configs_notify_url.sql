-- 为 bot_configs 表添加 bot_notify_url 字段
-- 用于存储每个机器人系统的通知地址

ALTER TABLE bot_configs
ADD COLUMN IF NOT EXISTS bot_notify_url VARCHAR(500);

CREATE INDEX IF NOT EXISTS idx_bot_configs_bot_notify_url ON bot_configs(bot_notify_url);

COMMENT ON COLUMN bot_configs.bot_notify_url IS '机器人系统的通知地址，例如：http://bot-server-ip:8080/api/recharge-notify';




