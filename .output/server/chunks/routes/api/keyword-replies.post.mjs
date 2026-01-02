import { d as defineEventHandler, r as requireAdmin, a as readBody } from '../../nitro/nitro.mjs';
import { writeFileSync } from 'fs';
import { join } from 'path';
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

const keywordReplies_post = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    return {
      success: false,
      error: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    };
  }
  try {
    const body = await readBody(event);
    const { keywordReplies } = body;
    if (!keywordReplies) {
      return {
        success: false,
        error: "\u7F3A\u5C11\u5173\u952E\u8BCD\u56DE\u590D\u6570\u636E"
      };
    }
    if (!keywordReplies.commands || !keywordReplies.buttons) {
      return {
        success: false,
        error: "\u5173\u952E\u8BCD\u56DE\u590D\u6570\u636E\u7ED3\u6784\u4E0D\u6B63\u786E"
      };
    }
    const keywordRepliesPath = join(process.cwd(), "nl-2333", "keyword_replies.json");
    writeFileSync(keywordRepliesPath, JSON.stringify(keywordReplies, null, 2), "utf-8");
    return {
      success: true,
      message: "\u5173\u952E\u8BCD\u56DE\u590D\u4FDD\u5B58\u6210\u529F"
    };
  } catch (error) {
    console.error("\u4FDD\u5B58\u5173\u952E\u8BCD\u56DE\u590D\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u4FDD\u5B58\u5173\u952E\u8BCD\u56DE\u590D\u5931\u8D25"
    };
  }
});

export { keywordReplies_post as default };
//# sourceMappingURL=keyword-replies.post.mjs.map
