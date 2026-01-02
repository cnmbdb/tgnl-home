import { d as defineEventHandler, a as readBody, e as executeQuery, s as setCookie } from '../../nitro/nitro.mjs';
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
    const userInfo = {
      id: user.id,
      username: user.username,
      role: user.role,
      status: user.status
    };
    console.log("Setting cookies for user:", userInfo);
    setCookie(event, "isLoggedIn", "true", {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
      // 7天
    });
    setCookie(event, "userInfo", JSON.stringify(userInfo), {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
      // 7天
    });
    console.log("Cookies set successfully");
    return {
      success: true,
      message: "\u767B\u5F55\u6210\u529F",
      data: userInfo
    };
  } catch (error) {
    console.error("Error during login:", {
      message: error.message,
      code: error.code,
      errno: error.errno,
      stack: error.stack
    });
    if (error.code === "ETIMEDOUT" || error.code === "ECONNREFUSED") {
      return {
        success: false,
        error: "\u6570\u636E\u5E93\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"
      };
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      return {
        success: false,
        error: "\u6570\u636E\u5E93\u8BBF\u95EE\u6743\u9650\u9519\u8BEF"
      };
    } else if (error.code === "ER_BAD_DB_ERROR") {
      return {
        success: false,
        error: "\u6570\u636E\u5E93\u4E0D\u5B58\u5728"
      };
    } else {
      return {
        success: false,
        error: `\u767B\u5F55\u5931\u8D25: ${error.message}`
      };
    }
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
