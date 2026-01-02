import { d as defineEventHandler, e as executeQuery, c as createError } from '../../nitro/nitro.mjs';
import 'mysql2/promise';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const initLicensesTable_post = defineEventHandler(async (event) => {
  try {
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS licenses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL UNIQUE COMMENT '\u8BA2\u5355\u53F7\uFF08\u6FC0\u6D3B\u7801\uFF09',
        order_id INT NOT NULL COMMENT 'WordPress\u8BA2\u5355ID',
        customer_email VARCHAR(255) NOT NULL COMMENT '\u5BA2\u6237\u90AE\u7BB1',
        customer_name VARCHAR(255) DEFAULT NULL COMMENT '\u5BA2\u6237\u59D3\u540D',
        edition VARCHAR(50) DEFAULT '\u6807\u51C6\u7248' COMMENT '\u6388\u6743\u7248\u672C',
        duration_days INT DEFAULT 365 COMMENT '\u6388\u6743\u65F6\u957F\uFF08\u5929\uFF09',
        expiry_date DATE NOT NULL COMMENT '\u5230\u671F\u65E5\u671F',
        activated_at DATETIME NOT NULL COMMENT '\u6FC0\u6D3B\u65F6\u95F4',
        status ENUM('active', 'expired', 'revoked') DEFAULT 'active' COMMENT '\u72B6\u6001',
        max_users INT DEFAULT 100 COMMENT '\u6700\u5927\u7528\u6237\u6570',
        features TEXT DEFAULT NULL COMMENT '\u529F\u80FD\u5217\u8868\uFF08JSON\uFF09',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_customer_email (customer_email),
        INDEX idx_status (status),
        INDEX idx_expiry_date (expiry_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='\u6388\u6743\u8BB8\u53EF\u8868'
    `);
    console.log("\u2705 licenses\u8868\u521B\u5EFA\u6210\u529F");
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS license_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL COMMENT '\u8BA2\u5355\u53F7',
        action VARCHAR(50) NOT NULL COMMENT '\u64CD\u4F5C\u7C7B\u578B',
        description TEXT DEFAULT NULL COMMENT '\u64CD\u4F5C\u63CF\u8FF0',
        performed_by INT DEFAULT NULL COMMENT '\u64CD\u4F5C\u4EBAID',
        ip_address VARCHAR(45) DEFAULT NULL COMMENT 'IP\u5730\u5740',
        user_agent TEXT DEFAULT NULL COMMENT '\u7528\u6237\u4EE3\u7406',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_action (action),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='\u6388\u6743\u5386\u53F2\u8BB0\u5F55\u8868'
    `);
    console.log("\u2705 license_history\u8868\u521B\u5EFA\u6210\u529F");
    return {
      success: true,
      message: "\u6570\u636E\u8868\u521D\u59CB\u5316\u6210\u529F",
      tables: ["licenses", "license_history"]
    };
  } catch (error) {
    console.error("\u6570\u636E\u8868\u521D\u59CB\u5316\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u6570\u636E\u8868\u521D\u59CB\u5316\u5931\u8D25: " + error.message
    });
  }
});

export { initLicensesTable_post as default };
//# sourceMappingURL=init-licenses-table.post.mjs.map
