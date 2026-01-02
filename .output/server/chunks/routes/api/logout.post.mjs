import { d as defineEventHandler } from '../../nitro/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  try {
    return {
      success: true,
      message: "\u6CE8\u9500\u6210\u529F"
    };
  } catch (error) {
    console.error("Error during logout:", error);
    return {
      success: false,
      error: "\u6CE8\u9500\u8FC7\u7A0B\u4E2D\u53D1\u751F\u9519\u8BEF"
    };
  }
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
