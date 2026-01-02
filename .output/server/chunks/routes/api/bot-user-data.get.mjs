import { d as defineEventHandler, g as getQuery, c as createError, e as executeQuery } from '../../nitro/nitro.mjs';
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

const botUserData_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const chatId = query.chat_id;
    if (!chatId) {
      throw createError({
        statusCode: 400,
        statusMessage: "chat_id\u53C2\u6570\u662F\u5FC5\u9700\u7684"
      });
    }
    const sql = "SELECT * FROM transactions WHERE chat_id = ? LIMIT 1";
    const result = await executeQuery(sql, [chatId]);
    if (result && result.length > 0) {
      const userData = result[0];
      return {
        success: true,
        data: {
          id: userData.id,
          chat_id: userData.chat_id,
          amount: userData.amount || 0,
          // amount存储的是sun单位(1 TRX = 1000000 sun)
          created_at: userData.created_at
        }
      };
    } else {
      const insertSql = "INSERT INTO transactions (chat_id, amount, created_at) VALUES (?, ?, NOW())";
      await executeQuery(insertSql, [chatId, 0]);
      const newUserResult = await executeQuery(sql, [chatId]);
      return {
        success: true,
        data: {
          id: newUserResult[0].id,
          chat_id: chatId,
          amount: 0,
          created_at: newUserResult[0].created_at
        }
      };
    }
  } catch (error) {
    console.error("\u83B7\u53D6\u7528\u6237\u6570\u636E\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u83B7\u53D6\u7528\u6237\u6570\u636E\u5931\u8D25"
    });
  }
});

export { botUserData_get as default };
//# sourceMappingURL=bot-user-data.get.mjs.map
