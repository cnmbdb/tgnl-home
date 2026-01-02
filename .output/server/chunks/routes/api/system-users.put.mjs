import { d as defineEventHandler, r as requireAdmin, a as readBody, e as executeQuery } from '../../nitro/nitro.mjs';
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

const systemUsers_put = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    return {
      success: false,
      error: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    };
  }
  try {
    const body = await readBody(event);
    const { id, username, password, email, role, status } = body;
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
    const updateFields = [];
    const updateValues = [];
    if (username !== void 0) {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
        return {
          success: false,
          error: "\u7528\u6237\u540D\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u4E0B\u5212\u7EBF\uFF0C\u957F\u5EA63-20\u4F4D"
        };
      }
      const duplicateUser = await executeQuery(
        "SELECT id FROM system_users WHERE username = ? AND id != ?",
        [username, id]
      );
      if (duplicateUser.length > 0) {
        return {
          success: false,
          error: "\u7528\u6237\u540D\u5DF2\u5B58\u5728"
        };
      }
      updateFields.push("username = ?");
      updateValues.push(username);
    }
    if (password !== void 0 && password !== "") {
      if (password.length < 6) {
        return {
          success: false,
          error: "\u5BC6\u7801\u957F\u5EA6\u81F3\u5C116\u4F4D"
        };
      }
      const salt = crypto.randomBytes(16).toString("hex");
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 1e4, 64, "sha512").toString("hex");
      const finalPassword = `${salt}:${hashedPassword}`;
      updateFields.push("password = ?");
      updateValues.push(finalPassword);
    }
    if (email !== void 0) {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
          success: false,
          error: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E"
        };
      }
      if (email) {
        const duplicateEmail = await executeQuery(
          "SELECT id FROM system_users WHERE email = ? AND id != ?",
          [email, id]
        );
        if (duplicateEmail.length > 0) {
          return {
            success: false,
            error: "\u90AE\u7BB1\u5DF2\u5B58\u5728"
          };
        }
      }
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (role !== void 0) {
      if (!["admin", "user"].includes(role)) {
        return {
          success: false,
          error: "\u89D2\u8272\u53EA\u80FD\u662Fadmin\u6216user"
        };
      }
      updateFields.push("role = ?");
      updateValues.push(role);
    }
    if (status !== void 0) {
      if (!["active", "inactive"].includes(status)) {
        return {
          success: false,
          error: "\u72B6\u6001\u53EA\u80FD\u662Factive\u6216inactive"
        };
      }
      updateFields.push("status = ?");
      updateValues.push(status);
    }
    if (updateFields.length === 0) {
      return {
        success: false,
        error: "\u6CA1\u6709\u8981\u66F4\u65B0\u7684\u5B57\u6BB5"
      };
    }
    updateFields.push("updated_at = CURRENT_TIMESTAMP");
    updateValues.push(id);
    await executeQuery(
      `UPDATE system_users SET ${updateFields.join(", ")} WHERE id = ?`,
      updateValues
    );
    const updatedUser = await executeQuery(
      "SELECT id, username, email, role, status, last_login, created_at, updated_at FROM system_users WHERE id = ?",
      [id]
    );
    return {
      success: true,
      message: "\u7528\u6237\u66F4\u65B0\u6210\u529F",
      data: updatedUser[0]
    };
  } catch (error) {
    console.error("Error updating system user:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { systemUsers_put as default };
//# sourceMappingURL=system-users.put.mjs.map
