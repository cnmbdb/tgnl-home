import { d as defineEventHandler, h as getRouterParam, e as executeQuery } from '../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      return {
        success: false,
        error: "\u7528\u6237ID\u4E3A\u5FC5\u586B\u9879"
      };
    }
    const user = await executeQuery(
      "SELECT id, username, email, role, status, last_login, created_at, updated_at FROM system_users WHERE id = ?",
      [id]
    );
    if (user.length === 0) {
      return {
        success: false,
        error: "\u7528\u6237\u4E0D\u5B58\u5728"
      };
    }
    return {
      success: true,
      data: user[0]
    };
  } catch (error) {
    console.error("Error fetching system user:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
