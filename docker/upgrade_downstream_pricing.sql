-- 下游成本配置表，用于存储每个能量池对下游 API 用户的计费配置
-- 兼容已有数据库：如果表或字段已存在则跳过

-- 创建表（如不存在）
CREATE TABLE IF NOT EXISTS downstream_pricing (
    energy_pool_id VARCHAR(50) PRIMARY KEY REFERENCES energy_pools(id),
    cost_1hour_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    cost_1day_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    cost_3day_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    cost_30day_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    cost_bishu_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    auto_follow_upstream BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 补齐可能缺失的字段
ALTER TABLE downstream_pricing
    ADD COLUMN IF NOT EXISTS cost_1hour_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS cost_1day_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS cost_3day_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS cost_30day_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS cost_bishu_trx NUMERIC(18,6) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS auto_follow_upstream BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 方便按能量池查询
CREATE INDEX IF NOT EXISTS idx_downstream_pricing_energy_pool_id
    ON downstream_pricing(energy_pool_id);

