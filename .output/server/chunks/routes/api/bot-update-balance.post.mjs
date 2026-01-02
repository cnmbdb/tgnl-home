import { d as defineEventHandler, a as readBody, c as createError } from '../../nitro/nitro.mjs';
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

const botUpdateBalance_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { chat_id, amount } = body;
    if (!chat_id || amount === void 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "chat_id\u548Camount\u53C2\u6570\u662F\u5FC5\u9700\u7684"
      });
    }
    console.log(`\u6A21\u62DF\u66F4\u65B0\u7528\u6237 ${chat_id} \u7684\u4F59\u989D\uFF0C\u589E\u52A0 ${amount}`);
    return {
      success: true,
      message: "\u4F59\u989D\u66F4\u65B0\u6210\u529F",
      data: {
        chat_id,
        amount_added: amount,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u4F59\u989D\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u66F4\u65B0\u4F59\u989D\u5931\u8D25"
    });
  }
});

export { botUpdateBalance_post as default };
//# sourceMappingURL=bot-update-balance.post.mjs.map
