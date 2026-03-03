-- 为 energy_pools 增加上游能量池（provider）配置字段
-- ⚠️ 现阶段按你的需求先明文存储账号密码，后续建议改为加密存储

ALTER TABLE energy_pools
  ADD COLUMN IF NOT EXISTS provider_type VARCHAR(50) NOT NULL DEFAULT 'zhangpu',
  ADD COLUMN IF NOT EXISTS provider_base_url TEXT NOT NULL DEFAULT 'https://zhangpu.online',
  ADD COLUMN IF NOT EXISTS provider_username VARCHAR(255),
  ADD COLUMN IF NOT EXISTS provider_password VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_energy_pools_provider_type ON energy_pools(provider_type);


