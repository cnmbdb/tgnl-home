import { d as defineEventHandler, a as readBody, c as createError, e as executeQuery } from '../../nitro/nitro.mjs';
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

const botSetBalance_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { chat_id, new_balance } = body;
    if (!chat_id || new_balance === void 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "chat_id\u548Cnew_balance\u53C2\u6570\u662F\u5FC5\u9700\u7684"
      });
    }
    console.log(`\u8BBE\u7F6E\u7528\u6237 ${chat_id} \u7684\u4F59\u989D\u4E3A ${new_balance} (${new_balance / 1e6} TRX)`);
    const checkResult = await executeQuery(
      "SELECT id, amount FROM transactions WHERE chat_id = ?",
      [chat_id]
    );
    if (checkResult.length > 0) {
      await executeQuery(
        "UPDATE transactions SET amount = ?, updated_at = NOW() WHERE chat_id = ?",
        [new_balance, chat_id]
      );
      console.log(`\u7528\u6237 ${chat_id} \u4F59\u989D\u5DF2\u66F4\u65B0: ${checkResult[0].amount} -> ${new_balance}`);
    } else {
      await executeQuery(
        "INSERT INTO transactions (chat_id, amount, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
        [chat_id, new_balance]
      );
      console.log(`\u65B0\u7528\u6237 ${chat_id} \u4F59\u989D\u5DF2\u8BBE\u7F6E\u4E3A: ${new_balance}`);
    }
    return {
      success: true,
      message: "\u4F59\u989D\u8BBE\u7F6E\u6210\u529F",
      data: {
        chat_id,
        new_balance,
        balance_trx: new_balance / 1e6,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("\u8BBE\u7F6E\u4F59\u989D\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u8BBE\u7F6E\u4F59\u989D\u5931\u8D25: " + error.message
    });
  }
});

export { botSetBalance_post as default };
//# sourceMappingURL=bot-set-balance.post.mjs.map
