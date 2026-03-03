-- 上游信息缓存表：用于缓存上游余额/价格/成本等信息，避免每次页面刷新都打上游
-- 兼容已有数据库：如表或字段已存在则跳过

CREATE TABLE IF NOT EXISTS upstream_info (
  energy_pool_id VARCHAR(50) PRIMARY KEY REFERENCES energy_pools(id),
  balance_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
  upstream_username VARCHAR(255),

  -- 上游价格（sun）与笔数价格（trx）
  price_1hour_sun BIGINT,
  price_1day_sun BIGINT,
  price_3day_sun BIGINT,
  price_30day_sun BIGINT,
  price_bishu_trx NUMERIC(18,6),

  -- 上游成本（trx）
  cost_1hour_trx NUMERIC(18,6),
  cost_1day_trx NUMERIC(18,6),
  cost_3day_trx NUMERIC(18,6),
  cost_30day_trx NUMERIC(18,6),

  last_consumption_time TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 补齐可能缺失的字段
ALTER TABLE upstream_info
  ADD COLUMN IF NOT EXISTS balance_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS upstream_username VARCHAR(255),
  ADD COLUMN IF NOT EXISTS price_1hour_sun BIGINT,
  ADD COLUMN IF NOT EXISTS price_1day_sun BIGINT,
  ADD COLUMN IF NOT EXISTS price_3day_sun BIGINT,
  ADD COLUMN IF NOT EXISTS price_30day_sun BIGINT,
  ADD COLUMN IF NOT EXISTS price_bishu_trx NUMERIC(18,6),
  ADD COLUMN IF NOT EXISTS cost_1hour_trx NUMERIC(18,6),
  ADD COLUMN IF NOT EXISTS cost_1day_trx NUMERIC(18,6),
  ADD COLUMN IF NOT EXISTS cost_3day_trx NUMERIC(18,6),
  ADD COLUMN IF NOT EXISTS cost_30day_trx NUMERIC(18,6),
  ADD COLUMN IF NOT EXISTS last_consumption_time TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

