import { d as defineEventHandler } from '../../nitro/nitro.mjs';
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

const botConfig_get = defineEventHandler(async (event) => {
  try {
    const basePath = path.join(process.cwd(), "nl-2333");
    const configPath = path.join(basePath, "config.txt");
    const alPyPath = path.join(basePath, "al.py");
    const configData = {};
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, "utf-8");
      configContent.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
          configData[key.trim()] = value.trim();
        }
      });
    }
    const dbConfig = {};
    let apiKey = "";
    if (fs.existsSync(alPyPath)) {
      const alPyContent = fs.readFileSync(alPyPath, "utf-8");
      const apiKeyMatch = alPyContent.match(/API_KEY\s*=\s*["']([^"']*)["']/);
      if (apiKeyMatch) {
        apiKey = apiKeyMatch[1];
      }
      const configMatch = alPyContent.match(/config\s*=\s*\{([^}]+)\}/);
      if (configMatch) {
        const configBlock = configMatch[1];
        const userMatch = configBlock.match(/'user':\s*'([^']*)'/);
        const passwordMatch = configBlock.match(/'password':\s*'([^']*)'/);
        const hostMatch = configBlock.match(/'host':\s*'([^']*)'/);
        const databaseMatch = configBlock.match(/'database':\s*'([^']*)'/);
        const portMatch = configBlock.match(/'port':\s*(\d+)/);
        if (userMatch) dbConfig.user = userMatch[1];
        if (passwordMatch) dbConfig.password = passwordMatch[1];
        if (hostMatch) dbConfig.host = hostMatch[1];
        if (databaseMatch) dbConfig.database = databaseMatch[1];
        if (portMatch) dbConfig.port = portMatch[1];
      }
    }
    return {
      success: true,
      data: {
        // 基础配置 - 从config.txt读取
        token: configData.TOKEN || "",
        adminId: configData.admin_id || "",
        customerServiceId: configData.CUSTOMER_SERVICE_ID || "",
        botId: configData.bot_id || "",
        groupLink: configData.group_link || "",
        controlAddress: configData.control_address || "",
        privateKey: configData.privateKey || "",
        username: configData.username || "",
        password: configData.password || "",
        adTime: configData.ad_time || "",
        huilvZhekou: configData.huilv_zhekou || "",
        // 价格配置 - 从config.txt读取
        hourPrice: configData.hour_price || "",
        dayPrice: configData.day_price || "",
        threeDayPrice: configData.three_day_price || "",
        yucunPrice: configData.yucun_price || "",
        // 数据库配置 - 从al.py读取
        dbUser: dbConfig.user || "",
        dbPassword: dbConfig.password || "",
        dbHost: dbConfig.host || "",
        dbName: dbConfig.database || "",
        dbPort: dbConfig.port || "",
        // API配置 - 从al.py读取
        tronApiKey: apiKey
      }
    };
  } catch (error) {
    console.error("\u8BFB\u53D6\u914D\u7F6E\u6587\u4EF6\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u8BFB\u53D6\u914D\u7F6E\u6587\u4EF6\u5931\u8D25: " + error.message
    };
  }
});

export { botConfig_get as default };
//# sourceMappingURL=bot-config.get.mjs.map
