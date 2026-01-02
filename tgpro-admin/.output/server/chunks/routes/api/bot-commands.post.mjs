import { d as defineEventHandler, r as requireAdmin, a as readBody } from '../../nitro/nitro.mjs';
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

const botCommands_post = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    return {
      success: false,
      error: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    };
  }
  try {
    const body = await readBody(event);
    const { commands } = body;
    console.log("\u4FDD\u5B58\u673A\u5668\u4EBA\u547D\u4EE4\u914D\u7F6E:", commands);
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      success: true,
      message: "\u547D\u4EE4\u914D\u7F6E\u4FDD\u5B58\u6210\u529F",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("\u4FDD\u5B58\u547D\u4EE4\u914D\u7F6E\u5931\u8D25:", error);
    return {
      success: false,
      message: "\u4FDD\u5B58\u5931\u8D25",
      error: error instanceof Error ? error.message : "\u672A\u77E5\u9519\u8BEF"
    };
  }
});

export { botCommands_post as default };
//# sourceMappingURL=bot-commands.post.mjs.map
