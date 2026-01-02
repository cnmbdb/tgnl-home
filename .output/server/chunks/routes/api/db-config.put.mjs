import { d as defineEventHandler, r as requireAdmin, a as readBody, c as createError } from '../../nitro/nitro.mjs';
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

const dbConfig_put = defineEventHandler(async (event) => {
  try {
    await requireAdmin(event);
    const body = await readBody(event);
    if (!body || typeof body !== "object") {
      throw createError({
        statusCode: 400,
        statusMessage: "\u8BF7\u6C42\u4F53\u683C\u5F0F\u9519\u8BEF"
      });
    }
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) {
      throw createError({
        statusCode: 404,
        statusMessage: ".env \u6587\u4EF6\u4E0D\u5B58\u5728"
      });
    }
    const envContent = fs.readFileSync(envPath, "utf-8");
    const envLines = envContent.split("\n");
    const envMap = /* @__PURE__ */ new Map();
    const comments = /* @__PURE__ */ new Map();
    envLines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("#")) {
        const nextLineIndex = envLines.indexOf(line) + 1;
        if (nextLineIndex < envLines.length) {
          const nextLine = envLines[nextLineIndex].trim();
          if (nextLine && !nextLine.startsWith("#")) {
            const [key] = nextLine.split("=", 2);
            if (key) {
              comments.set(key.trim(), line);
            }
          }
        }
      } else if (trimmedLine && trimmedLine.includes("=")) {
        const [key, value] = trimmedLine.split("=", 2);
        if (key && value !== void 0) {
          envMap.set(key.trim(), value.trim());
        }
      }
    });
    const updateMapping = {
      dbHost: "DB_HOST",
      dbPort: "DB_PORT",
      dbName: "DB_NAME",
      dbUser: "DB_USER",
      dbPassword: "DB_PASSWORD",
      tgDbHost: "TG_DB_HOST",
      tgDbPort: "TG_DB_PORT",
      tgDbName: "TG_DB_NAME",
      tgDbUser: "TG_DB_USER",
      tgDbPassword: "TG_DB_PASSWORD",
      viteDbHost: "VITE_DB_HOST",
      viteDbName: "VITE_DB_NAME",
      viteDbUser: "VITE_DB_USER",
      viteDbPassword: "VITE_DB_PASSWORD"
    };
    Object.entries(updateMapping).forEach(([bodyKey, envKey]) => {
      if (body[bodyKey] !== void 0 && body[bodyKey] !== null) {
        envMap.set(envKey, String(body[bodyKey]));
      }
    });
    const newEnvLines = [];
    const sections = [
      {
        title: "# \u524D\u7AEF\u6570\u636E\u5E93\u914D\u7F6E (\u4ECE config.txt \u81EA\u52A8\u540C\u6B65\uFF0C\u8BF7\u52FF\u624B\u52A8\u4FEE\u6539)",
        keys: ["VITE_DB_HOST", "VITE_DB_PORT", "VITE_DB_NAME", "VITE_DB_USER", "VITE_DB_PASSWORD"]
      },
      {
        title: "# \u540E\u7AEFAPI\u6570\u636E\u5E93\u914D\u7F6E (\u4ECE config.txt \u81EA\u52A8\u540C\u6B65\uFF0C\u8BF7\u52FF\u624B\u52A8\u4FEE\u6539)",
        keys: ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"]
      },
      {
        title: "# Telegram\u673A\u5668\u4EBA\u6570\u636E\u5E93\u914D\u7F6E (\u4ECE config.txt \u81EA\u52A8\u540C\u6B65\uFF0C\u8BF7\u52FF\u624B\u52A8\u4FEE\u6539)",
        keys: ["TG_DB_HOST", "TG_DB_PORT", "TG_DB_NAME", "TG_DB_USER", "TG_DB_PASSWORD"]
      }
    ];
    envLines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key] = trimmedLine.split("=", 2);
        if (key) {
          const keyName = key.trim();
          if (!keyName.includes("DB_") && !keyName.startsWith("VITE_DB_") && !keyName.startsWith("TG_DB_")) {
            newEnvLines.push(line);
          }
        }
      } else if (trimmedLine.startsWith("#") && !trimmedLine.includes("\u6570\u636E\u5E93\u914D\u7F6E")) {
        newEnvLines.push(line);
      }
    });
    if (newEnvLines.length > 0) {
      newEnvLines.push("");
    }
    sections.forEach((section, index) => {
      if (index > 0) {
        newEnvLines.push("");
      }
      newEnvLines.push(section.title);
      section.keys.forEach((key) => {
        if (envMap.has(key)) {
          newEnvLines.push(`${key}=${envMap.get(key)}`);
        }
      });
    });
    fs.writeFileSync(envPath, newEnvLines.join("\n"), "utf-8");
    const configPath = path.join(process.cwd(), "nl-2333", "config.txt");
    if (fs.existsSync(configPath)) {
      try {
        const configContent = fs.readFileSync(configPath, "utf-8");
        let updatedConfig = configContent;
        if (envMap.has("TG_DB_HOST")) {
          updatedConfig = updatedConfig.replace(/host=.*/g, `host=${envMap.get("TG_DB_HOST")}`);
        }
        if (envMap.has("TG_DB_USER")) {
          updatedConfig = updatedConfig.replace(/user=.*/g, `user=${envMap.get("TG_DB_USER")}`);
        }
        if (envMap.has("TG_DB_PASSWORD")) {
          updatedConfig = updatedConfig.replace(/password=.*/g, `password=${envMap.get("TG_DB_PASSWORD")}`);
        }
        if (envMap.has("TG_DB_NAME")) {
          updatedConfig = updatedConfig.replace(/database=.*/g, `database=${envMap.get("TG_DB_NAME")}`);
        }
        if (envMap.has("TG_DB_PORT")) {
          updatedConfig = updatedConfig.replace(/port=.*/g, `port=${envMap.get("TG_DB_PORT")}`);
        }
        fs.writeFileSync(configPath, updatedConfig, "utf-8");
      } catch (configError) {
        console.warn("\u66F4\u65B0 config.txt \u5931\u8D25:", configError);
      }
    }
    return {
      success: true,
      message: "\u6570\u636E\u5E93\u914D\u7F6E\u66F4\u65B0\u6210\u529F",
      data: {
        updated: Object.keys(updateMapping).filter((key) => body[key] !== void 0)
      }
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u6570\u636E\u5E93\u914D\u7F6E\u5931\u8D25:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u66F4\u65B0\u6570\u636E\u5E93\u914D\u7F6E\u5931\u8D25: " + error.message
    });
  }
});

export { dbConfig_put as default };
//# sourceMappingURL=db-config.put.mjs.map
