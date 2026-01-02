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

const botRegisterUser_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { chat_id, username, first_name, last_name } = body;
    if (!chat_id) {
      throw createError({
        statusCode: 400,
        statusMessage: "chat_id\u53C2\u6570\u662F\u5FC5\u9700\u7684"
      });
    }
    console.log(`\u6A21\u62DF\u6CE8\u518C/\u66F4\u65B0\u7528\u6237: ${chat_id}, \u7528\u6237\u540D: ${username}, \u59D3\u540D: ${first_name} ${last_name}`);
    const existingUsers = ["123456", "789012"];
    const userExists = existingUsers.includes(chat_id);
    if (userExists) {
      return {
        success: true,
        message: "\u7528\u6237\u4FE1\u606F\u66F4\u65B0\u6210\u529F",
        action: "updated",
        data: {
          chat_id,
          username,
          first_name,
          last_name,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
    } else {
      return {
        success: true,
        message: "\u7528\u6237\u6CE8\u518C\u6210\u529F",
        action: "created",
        data: {
          chat_id,
          username,
          first_name,
          last_name,
          amount: 0,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
    }
  } catch (error) {
    console.error("\u6CE8\u518C/\u66F4\u65B0\u7528\u6237\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u6CE8\u518C/\u66F4\u65B0\u7528\u6237\u5931\u8D25"
    });
  }
});

export { botRegisterUser_post as default };
//# sourceMappingURL=bot-register-user.post.mjs.map
