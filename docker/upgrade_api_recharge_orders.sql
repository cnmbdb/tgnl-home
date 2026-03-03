-- 创建API用户充值订单表
CREATE TABLE IF NOT EXISTS api_recharge_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_username VARCHAR(255) NOT NULL,
    payment_address VARCHAR(255) NOT NULL,
    amount_trx DECIMAL(18, 6) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, paid, expired, cancelled
    tx_hash VARCHAR(255), -- 支付交易哈希
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE,
    telegram_chat_id BIGINT, -- 发起充值的Telegram用户ID
    telegram_message_id INTEGER, -- 关联的Telegram消息ID
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_api_recharge_orders_api_username ON api_recharge_orders(api_username);
CREATE INDEX IF NOT EXISTS idx_api_recharge_orders_status ON api_recharge_orders(status);
CREATE INDEX IF NOT EXISTS idx_api_recharge_orders_payment_address ON api_recharge_orders(payment_address);
CREATE INDEX IF NOT EXISTS idx_api_recharge_orders_tx_hash ON api_recharge_orders(tx_hash);
CREATE INDEX IF NOT EXISTS idx_api_recharge_orders_created_at ON api_recharge_orders(created_at);

