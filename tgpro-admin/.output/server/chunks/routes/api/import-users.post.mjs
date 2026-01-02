import { d as defineEventHandler, r as requireAdmin, a as readBody, e as executeQuery } from '../../nitro/nitro.mjs';
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

const importUsers_post = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    return {
      success: false,
      message: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    };
  }
  try {
    const body = await readBody(event);
    if (!body.users || !Array.isArray(body.users)) {
      return {
        success: false,
        message: "\u8BF7\u63D0\u4F9B\u6709\u6548\u7684\u7528\u6237\u6570\u636E\u6570\u7EC4"
      };
    }
    const users = body.users;
    let imported = 0;
    let skipped = 0;
    const errors = [];
    for (const user2 of users) {
      try {
        if (!user2.tg_user_id || typeof user2.tg_user_id !== "number") {
          errors.push(`\u7528\u6237 ${user2.username || "unknown"}: tg_user_id \u662F\u5FC5\u9700\u7684\u4E14\u5FC5\u987B\u662F\u6570\u5B57`);
          continue;
        }
        const existingUser = await executeQuery(
          "SELECT id FROM tg_users WHERE tg_user_id = ?",
          [user2.tg_user_id]
        );
        if (existingUser.length > 0) {
          skipped++;
          continue;
        }
        const insertResult = await executeQuery(`
          INSERT INTO tg_users (
            tg_user_id, username, first_name, last_name, phone_number,
            is_bot, is_premium, language_code, status, membership_type,
            membership_expires, last_activity
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `, [
          user2.tg_user_id,
          user2.username || null,
          user2.first_name || null,
          user2.last_name || null,
          user2.phone_number || null,
          user2.is_bot ? 1 : 0,
          user2.is_premium ? 1 : 0,
          user2.language_code || "en",
          user2.status || "active",
          user2.membership_type || "free",
          user2.membership_expires || null
        ]);
        if (user2.balance !== void 0 && user2.balance !== null) {
          const balanceAmount = Math.round(user2.balance);
          await executeQuery(`
            INSERT INTO transactions (chat_id, amount) VALUES (?, ?)
            ON DUPLICATE KEY UPDATE amount = VALUES(amount)
          `, [user2.tg_user_id, balanceAmount]);
        }
        imported++;
      } catch (userError) {
        errors.push(`\u7528\u6237 ${user2.username || user2.tg_user_id}: ${userError.message}`);
      }
    }
    return {
      success: true,
      message: `\u5BFC\u5165\u5B8C\u6210: ${imported} \u4E2A\u7528\u6237\u6210\u529F\u5BFC\u5165, ${skipped} \u4E2A\u7528\u6237\u5DF2\u5B58\u5728\u88AB\u8DF3\u8FC7`,
      data: {
        imported,
        skipped,
        errors
      }
    };
  } catch (error) {
    console.error("Import users error:", error);
    return {
      success: false,
      message: `\u5BFC\u5165\u5931\u8D25: ${error.message}`
    };
  }
});

export { importUsers_post as default };
//# sourceMappingURL=import-users.post.mjs.map
