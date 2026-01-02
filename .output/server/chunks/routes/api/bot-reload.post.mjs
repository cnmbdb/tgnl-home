import { d as defineEventHandler, c as createError, a as readBody } from '../../nitro/nitro.mjs';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
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

const execAsync = promisify(exec);
const botReload_post = defineEventHandler(async (event) => {
  try {
    if (event.node.req.method !== "POST") {
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed"
      });
    }
    const body = await readBody(event);
    if (!body.adminToken) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized: Admin token required"
      });
    }
    const botPath = path.join(process.cwd(), "nl-2333");
    const configPath = path.join(botPath, "config.txt");
    if (!fs.existsSync(configPath)) {
      throw createError({
        statusCode: 404,
        statusMessage: "Bot configuration file not found"
      });
    }
    try {
      const now = /* @__PURE__ */ new Date();
      fs.utimesSync(configPath, now, now);
      try {
        const { stdout } = await execAsync('pgrep -f "python.*al.py"');
        const pids = stdout.trim().split("\n").filter((pid) => pid);
        if (pids.length > 0) {
          for (const pid of pids) {
            try {
              await execAsync(`kill -USR1 ${pid}`);
            } catch (e) {
            }
          }
        }
      } catch (e) {
        console.log("Could not send reload signal to bot process:", e);
      }
      const reloadFlagPath = path.join(botPath, ".reload_flag");
      fs.writeFileSync(reloadFlagPath, (/* @__PURE__ */ new Date()).toISOString());
      return {
        success: true,
        message: "\u914D\u7F6E\u91CD\u8F7D\u8BF7\u6C42\u5DF2\u53D1\u9001",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        methods: [
          "Updated config file modification time",
          "Created reload flag file",
          "Attempted to send reload signal to bot process"
        ]
      };
    } catch (error) {
      console.error("Error during bot reload:", error);
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to reload bot configuration: ${error.message}`
      });
    }
  } catch (error) {
    console.error("Bot reload API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error during bot reload"
    });
  }
});

export { botReload_post as default };
//# sourceMappingURL=bot-reload.post.mjs.map
