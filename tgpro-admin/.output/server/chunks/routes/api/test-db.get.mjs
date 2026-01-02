import { d as defineEventHandler, e as executeQuery } from '../../nitro/nitro.mjs';
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

const testDb_get = defineEventHandler(async (event) => {
  try {
    const result = await executeQuery("SELECT COUNT(*) as count FROM system_users");
    return {
      success: true,
      message: "\u6570\u636E\u5E93\u8FDE\u63A5\u6B63\u5E38",
      data: {
        userCount: result[0].count,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("Database test error:", {
      message: error.message,
      code: error.code,
      errno: error.errno
    });
    return {
      success: false,
      error: `\u6570\u636E\u5E93\u8FDE\u63A5\u6D4B\u8BD5\u5931\u8D25: ${error.message}`,
      details: {
        code: error.code,
        errno: error.errno
      }
    };
  }
});

export { testDb_get as default };
//# sourceMappingURL=test-db.get.mjs.map
