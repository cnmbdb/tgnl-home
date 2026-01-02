import { d as defineEventHandler, a as readBody, e as executeQuery } from '../../nitro/nitro.mjs';
import crypto from 'crypto';
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

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;
    if (!username || !password) {
      return {
        success: false,
        error: "\u7528\u6237\u540D\u548C\u5BC6\u7801\u4E3A\u5FC5\u586B\u9879"
      };
    }
    const users = await executeQuery(
      "SELECT id, username, password, role, status FROM system_users WHERE username = ?",
      [username]
    );
    if (users.length === 0) {
      return {
        success: false,
        error: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF"
      };
    }
    const user = users[0];
    if (user.status !== "active") {
      return {
        success: false,
        error: "\u8D26\u6237\u5DF2\u88AB\u7981\u7528"
      };
    }
    const [salt, hashedPassword] = user.password.split(":");
    const inputHashedPassword = crypto.pbkdf2Sync(password, salt, 1e4, 64, "sha512").toString("hex");
    if (inputHashedPassword !== hashedPassword) {
      return {
        success: false,
        error: "\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF"
      };
    }
    await executeQuery(
      "UPDATE system_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?",
      [user.id]
    );
    return {
      success: true,
      message: "\u767B\u5F55\u6210\u529F",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        status: user.status
      }
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      error: "\u767B\u5F55\u8FC7\u7A0B\u4E2D\u53D1\u751F\u9519\u8BEF"
    };
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
