import { d as defineEventHandler, r as requireAdmin, g as getQuery, e as executeQuery } from '../../nitro/nitro.mjs';
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

const systemUsers_delete = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    return {
      success: false,
      error: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    };
  }
  try {
    const query = getQuery(event);
    const id = query.id;
    if (!id) {
      return {
        success: false,
        error: "\u7528\u6237ID\u4E3A\u5FC5\u586B\u9879"
      };
    }
    const existingUser = await executeQuery(
      "SELECT * FROM system_users WHERE id = ?",
      [id]
    );
    if (existingUser.length === 0) {
      return {
        success: false,
        error: "\u7528\u6237\u4E0D\u5B58\u5728"
      };
    }
    const user2 = existingUser[0];
    if (user2.role === "admin") {
      const adminCount = await executeQuery(
        'SELECT COUNT(*) as count FROM system_users WHERE role = "admin" AND status = "active"'
      );
      if (adminCount[0].count <= 1) {
        return {
          success: false,
          error: "\u4E0D\u80FD\u5220\u9664\u6700\u540E\u4E00\u4E2A\u7BA1\u7406\u5458\u8D26\u6237"
        };
      }
    }
    await executeQuery(
      "DELETE FROM system_users WHERE id = ?",
      [id]
    );
    return {
      success: true,
      message: "\u7528\u6237\u5220\u9664\u6210\u529F",
      data: {
        id: user2.id,
        username: user2.username
      }
    };
  } catch (error) {
    console.error("Error deleting system user:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { systemUsers_delete as default };
//# sourceMappingURL=system-users.delete.mjs.map
