-- 为 api_users 增加余额字段（微单位，1 TRX = 1,000,000 micro）
ALTER TABLE api_users
  ADD COLUMN IF NOT EXISTS balance_micro BIGINT NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_api_users_balance ON api_users(balance_micro);

