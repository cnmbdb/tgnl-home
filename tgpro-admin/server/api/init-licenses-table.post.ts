import { executeQuery } from '../utils/database'

export default defineEventHandler(async (event) => {
  try {
    // 创建licenses表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS licenses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号（激活码）',
        order_id INT NOT NULL COMMENT 'WordPress订单ID',
        customer_email VARCHAR(255) NOT NULL COMMENT '客户邮箱',
        customer_name VARCHAR(255) DEFAULT NULL COMMENT '客户姓名',
        edition VARCHAR(50) DEFAULT '标准版' COMMENT '授权版本',
        duration_days INT DEFAULT 365 COMMENT '授权时长（天）',
        expiry_date DATE NOT NULL COMMENT '到期日期',
        activated_at DATETIME NOT NULL COMMENT '激活时间',
        status ENUM('active', 'expired', 'revoked') DEFAULT 'active' COMMENT '状态',
        max_users INT DEFAULT 100 COMMENT '最大用户数',
        features TEXT DEFAULT NULL COMMENT '功能列表（JSON）',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_customer_email (customer_email),
        INDEX idx_status (status),
        INDEX idx_expiry_date (expiry_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='授权许可表'
    `)

    console.log('✅ licenses表创建成功')

    // 创建license_history表
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS license_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL COMMENT '订单号',
        action VARCHAR(50) NOT NULL COMMENT '操作类型',
        description TEXT DEFAULT NULL COMMENT '操作描述',
        performed_by INT DEFAULT NULL COMMENT '操作人ID',
        ip_address VARCHAR(45) DEFAULT NULL COMMENT 'IP地址',
        user_agent TEXT DEFAULT NULL COMMENT '用户代理',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_action (action),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='授权历史记录表'
    `)

    console.log('✅ license_history表创建成功')

    return {
      success: true,
      message: '数据表初始化成功',
      tables: ['licenses', 'license_history']
    }
  } catch (error: any) {
    console.error('数据表初始化失败:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '数据表初始化失败: ' + error.message
    })
  }
})
