import { d as defineEventHandler, r as requireAdmin, a as readBody, e as executeQuery } from '../../nitro/nitro.mjs';
import crypto from 'crypto';
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

const systemUsers_post = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    return {
      success: false,
      error: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    };
  }
  try {
    const body = await readBody(event);
    const { username, password, email, role = "user", status = "active" } = body;
    if (!username || !password) {
      return {
        success: false,
        error: "\u7528\u6237\u540D\u548C\u5BC6\u7801\u4E3A\u5FC5\u586B\u9879"
      };
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return {
        success: false,
        error: "\u7528\u6237\u540D\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u4E0B\u5212\u7EBF\uFF0C\u957F\u5EA63-20\u4F4D"
      };
    }
    if (password.length < 6) {
      return {
        success: false,
        error: "\u5BC6\u7801\u957F\u5EA6\u81F3\u5C116\u4F4D"
      };
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        success: false,
        error: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"
      };
    }
    if (!["admin", "user"].includes(role)) {
      return {
        success: false,
        error: "\u89D2\u8272\u53EA\u80FD\u662Fadmin\u6216user"
      };
    }
    if (!["active", "inactive"].includes(status)) {
      return {
        success: false,
        error: "\u72B6\u6001\u53EA\u80FD\u662Factive\u6216inactive"
      };
    }
    const existingUser = await executeQuery(
      "SELECT id FROM system_users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      return {
        success: false,
        error: "\u7528\u6237\u540D\u5DF2\u5B58\u5728"
      };
    }
    if (email) {
      const existingEmail = await executeQuery(
        "SELECT id FROM system_users WHERE email = ?",
        [email]
      );
      if (existingEmail.length > 0) {
        return {
          success: false,
          error: "\u90AE\u7BB1\u5DF2\u5B58\u5728"
        };
      }
    }
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1e4, 64, "sha512").toString("hex");
    const finalPassword = `${salt}:${hashedPassword}`;
    const result = await executeQuery(
      "INSERT INTO system_users (username, password, email, role, status) VALUES (?, ?, ?, ?, ?)",
      [username, finalPassword, email, role, status]
    );
    const newUser = await executeQuery(
      "SELECT id, username, email, role, status, created_at FROM system_users WHERE id = ?",
      [result.insertId]
    );
    return {
      success: true,
      message: "\u7528\u6237\u521B\u5EFA\u6210\u529F",
      data: newUser[0]
    };
  } catch (error) {
    console.error("Error creating system user:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { systemUsers_post as default };
//# sourceMappingURL=system-users.post.mjs.map
