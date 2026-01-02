import { d as defineEventHandler, a as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const restart_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) || {};
    const { sessionId } = body;
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u4F1A\u8BDDID"
      });
    }
    console.log("\u51C6\u5907\u91CD\u542F\u7CFB\u7EDF...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    return {
      success: true,
      message: "\u7CFB\u7EDF\u91CD\u542F\u6307\u4EE4\u5DF2\u53D1\u9001",
      data: {
        sessionId,
        restartAt: (/* @__PURE__ */ new Date()).toISOString(),
        estimatedDowntime: "30\u79D2"
      }
    };
  } catch (error) {
    console.error("\u91CD\u542F\u5931\u8D25:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "\u91CD\u542F\u5931\u8D25"
    };
  }
});

export { restart_post as default };
//# sourceMappingURL=restart.post.mjs.map
