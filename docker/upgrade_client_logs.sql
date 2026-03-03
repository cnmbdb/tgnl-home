-- 记录调用本系统能量池接口的客户端（服务器/机器人）信息
-- 主要用于机器人管理页展示：服务器IP、机器人（API账号）在哪个服务器调用

CREATE TABLE IF NOT EXISTS client_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  api_username VARCHAR(50),
  ip VARCHAR(64) NOT NULL,
  user_agent TEXT,
  endpoint VARCHAR(128) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_client_logs_ip ON client_logs(ip);
CREATE INDEX IF NOT EXISTS idx_client_logs_api_username ON client_logs(api_username);
CREATE INDEX IF NOT EXISTS idx_client_logs_created_at ON client_logs(created_at);


