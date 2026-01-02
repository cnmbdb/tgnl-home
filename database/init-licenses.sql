-- 创建 licenses 表（如果不存在）
CREATE TABLE IF NOT EXISTS `licenses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(255) NOT NULL UNIQUE COMMENT '订单号',
  `order_id` VARCHAR(255) COMMENT 'WordPress订单ID',
  `email` VARCHAR(255) COMMENT '客户邮箱',
  `customer_name` VARCHAR(255) COMMENT '客户姓名',
  `product_info` TEXT COMMENT '产品信息(JSON)',
  `license_type` ENUM('standard', 'professional', 'enterprise', 'monthly', 'yearly') DEFAULT 'standard' COMMENT '授权类型',
  `status` ENUM('active', 'inactive', 'expired') DEFAULT 'active' COMMENT '授权状态',
  `activated_at` DATETIME COMMENT '激活时间',
  `expiry_date` DATE COMMENT '到期日期',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  INDEX `idx_order_number` (`order_number`),
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='授权许可证表';

-- 创建 license_history 表（如果不存在）
CREATE TABLE IF NOT EXISTS `license_history` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_number` VARCHAR(255) NOT NULL COMMENT '订单号',
  `action` ENUM('activate', 'deactivate', 'renew', 'expire') NOT NULL COMMENT '操作类型',
  `server_ip` VARCHAR(50) COMMENT '服务器IP',
  `details` TEXT COMMENT '操作详情',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  INDEX `idx_order_number` (`order_number`),
  INDEX `idx_action` (`action`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='授权操作历史表';
