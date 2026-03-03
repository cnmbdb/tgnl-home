-- 创建消费订单表（记录能量下发、交易委托等消费操作）
CREATE TABLE IF NOT EXISTS api_consumption_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    api_username VARCHAR(255) NOT NULL,
    order_type VARCHAR(50) NOT NULL, -- 'delegate_meal', 'delegate_tran', 'other'
    amount_trx DECIMAL(18, 6) NOT NULL, -- 扣费金额（TRX）
    energy INTEGER, -- 下发的能量值（可选）
    day INTEGER, -- 委托天数（可选）
    receiver_address VARCHAR(255), -- 接收地址（可选）
    status VARCHAR(20) NOT NULL DEFAULT 'completed', -- 'completed', 'failed'
    error_message TEXT, -- 失败时的错误信息
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_api_consumption_orders_api_username ON api_consumption_orders(api_username);
CREATE INDEX IF NOT EXISTS idx_api_consumption_orders_order_type ON api_consumption_orders(order_type);
CREATE INDEX IF NOT EXISTS idx_api_consumption_orders_status ON api_consumption_orders(status);
CREATE INDEX IF NOT EXISTS idx_api_consumption_orders_created_at ON api_consumption_orders(created_at DESC);
