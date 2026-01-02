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
    const projectRoot = process.cwd();
    const actualRoot = projectRoot.endsWith(".output") ? path.dirname(projectRoot) : projectRoot;
    const basePath = path.join(actualRoot, "hf-tgpro");
    const configPath = path.join(basePath, "config.txt");
    const envPath = path.join(basePath, ".env");
    const hyPyPath = path.join(basePath, "hy.py");
    const configContent = fs.readFileSync(configPath, "utf-8");
    const configLines = configContent.split("\n").filter((line) => line.trim() && !line.startsWith("#"));
    const config = {};
    configLines.forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        config[key.trim()] = value.trim();
      }
    });
    const envContent = fs.readFileSync(envPath, "utf-8");
    const envLines = envContent.split("\n").filter((line) => line.trim() && !line.startsWith("#"));
    const env = {};
    envLines.forEach((line) => {
      const equalIndex = line.indexOf("=");
      if (equalIndex > 0) {
        const key = line.substring(0, equalIndex).trim();
        let value = line.substring(equalIndex + 1).trim();
        const commentIndex = value.indexOf(" #");
        if (commentIndex > 0) {
          value = value.substring(0, commentIndex).trim();
        }
        if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        env[key] = value;
      }
    });
    const hyPyContent = fs.readFileSync(hyPyPath, "utf-8");
    const tronApiKeyMatch = hyPyContent.match(/tron_api_key\s*=\s*["']([^"']+)["']/);
    const tronApiKey = tronApiKeyMatch ? tronApiKeyMatch[1] : "";
    return {
      success: true,
      data: {
        // 基础配置 (来自 config.txt)
        token: config.TOKEN || "",
        controlAddress: config.control_address || "",
        adminId: config.admin_id || "",
        customerServiceId: config.CUSTOMER_SERVICE_ID || "",
        tiaozhuan: config.Tiaozhuan || "",
        // 价格配置 (来自 config.txt)
        threePrice: config.three_price || "",
        sixPrice: config.six_price || "",
        yearPrice: config.year_price || "",
        // 资源配置 (来自 .env)
        resHash: env.ResHash || "",
        resCookie: env.ResCookie || "",
        walletMnemonic: env.WalletMnemonic || "",
        // 数据库配置 (来自 .env)
        dbHost: env.DB_HOST || "",
        dbUser: env.DB_USER || "",
        dbPassword: env.DB_PASSWORD || "",
        dbName: env.DB_NAME || "",
        dbPort: env.DB_PORT || "",
        // Tron API 配置 (来自 hy.py)
        tronApiKey
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
