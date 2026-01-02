import { d as defineEventHandler, g as getQuery, e as executeQuery } from '../../nitro/nitro.mjs';
import 'mysql2/promise';
import 'fs';
import 'path';
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

const orders_get = defineEventHandler(async (event) => {
  var _a;
  try {
    const query = getQuery(event);
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page - 1) * limit;
    console.log("\u67E5\u8BE2\u8BA2\u5355\u6570\u636E, page:", page, "limit:", limit);
    const transactions = await executeQuery(`
      SELECT id, chat_id, user_nickname, username, amount, created_at, updated_at
      FROM transactions 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `);
    console.log("\u67E5\u8BE2\u5230\u8BA2\u5355\u6570:", transactions.length);
    const totalResult = await executeQuery("SELECT COUNT(*) as count FROM transactions");
    const total = ((_a = totalResult[0]) == null ? void 0 : _a.count) || 0;
    console.log("\u8BA2\u5355\u603B\u6570:", total);
    const orders = transactions.map((transaction) => {
      const amountInSun = transaction.amount || 0;
      const amountInTRX = amountInSun / 1e6;
      return {
        id: transaction.id,
        orderNumber: `ORD-${String(transaction.id).padStart(6, "0")}`,
        chatId: transaction.chat_id,
        username: transaction.username || "N/A",
        nickname: transaction.user_nickname || "\u672A\u8BBE\u7F6E",
        amount: amountInTRX,
        // TRX金额
        amountSun: amountInSun,
        // Sun金额(原始值)
        status: amountInSun > 0 ? "completed" : "pending",
        createdAt: transaction.created_at,
        updatedAt: transaction.updated_at,
        type: "energy_rental"
      };
    });
    return {
      success: true,
      data: orders,
      total,
      page,
      limit
    };
  } catch (error) {
    console.error("\u8BFB\u53D6\u8BA2\u5355\u6570\u636E\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u8BFB\u53D6\u8BA2\u5355\u6570\u636E\u5931\u8D25",
      data: [],
      total: 0
    };
  }
});

export { orders_get as default };
//# sourceMappingURL=orders.get.mjs.map
