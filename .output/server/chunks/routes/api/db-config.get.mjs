import { d as defineEventHandler, r as requireAdmin, c as createError } from '../../nitro/nitro.mjs';
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

const dbConfig_get = defineEventHandler(async (event) => {
  try {
    await requireAdmin(event);
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) {
      throw createError({
        statusCode: 404,
        statusMessage: ".env \u6587\u4EF6\u4E0D\u5B58\u5728"
      });
    }
    const envContent = fs.readFileSync(envPath, "utf-8");
    const envLines = envContent.split("\n");
    const config = {
      // 后端API数据库配置
      dbHost: "",
      dbPort: "",
      dbName: "",
      dbUser: "",
      dbPassword: "",
      // Telegram机器人数据库配置
      tgDbHost: "",
      tgDbPort: "",
      tgDbName: "",
      tgDbUser: "",
      tgDbPassword: "",
      // 前端数据库配置
      viteDbHost: "",
      viteDbName: "",
      viteDbUser: "",
      viteDbPassword: ""
    };
    envLines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, value] = trimmedLine.split("=", 2);
        if (key && value) {
          switch (key.trim()) {
            case "DB_HOST":
              config.dbHost = value.trim();
              break;
            case "DB_PORT":
              config.dbPort = value.trim();
              break;
            case "DB_NAME":
              config.dbName = value.trim();
              break;
            case "DB_USER":
              config.dbUser = value.trim();
              break;
            case "DB_PASSWORD":
              config.dbPassword = value.trim();
              break;
            case "TG_DB_HOST":
              config.tgDbHost = value.trim();
              break;
            case "TG_DB_PORT":
              config.tgDbPort = value.trim();
              break;
            case "TG_DB_NAME":
              config.tgDbName = value.trim();
              break;
            case "TG_DB_USER":
              config.tgDbUser = value.trim();
              break;
            case "TG_DB_PASSWORD":
              config.tgDbPassword = value.trim();
              break;
            case "VITE_DB_HOST":
              config.viteDbHost = value.trim();
              break;
            case "VITE_DB_NAME":
              config.viteDbName = value.trim();
              break;
            case "VITE_DB_USER":
              config.viteDbUser = value.trim();
              break;
            case "VITE_DB_PASSWORD":
              config.viteDbPassword = value.trim();
              break;
          }
        }
      }
    });
    return {
      success: true,
      data: config
    };
  } catch (error) {
    console.error("\u8BFB\u53D6\u6570\u636E\u5E93\u914D\u7F6E\u5931\u8D25:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u8BFB\u53D6\u6570\u636E\u5E93\u914D\u7F6E\u5931\u8D25: " + error.message
    });
  }
});

export { dbConfig_get as default };
//# sourceMappingURL=db-config.get.mjs.map
