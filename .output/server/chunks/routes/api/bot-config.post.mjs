import { d as defineEventHandler, a as readBody, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
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

const botConfig_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body || typeof body !== "object") {
      throw new Error("\u65E0\u6548\u7684\u8BF7\u6C42\u6570\u636E");
    }
    const basePath = path.join(process.cwd(), "nl-2333");
    const configPath = path.join(basePath, "config.txt");
    const alPyPath = path.join(basePath, "al.py");
    const configContent = [
      `TOKEN=${body.token || ""}`,
      `CUSTOMER_SERVICE_ID=${body.customerServiceId || ""}`,
      `bot_id=${body.botId || ""}`,
      `group_link=${body.groupLink || ""}`,
      `control_address=${body.controlAddress || ""}`,
      `privateKey=${body.privateKey || ""}`,
      `username=${body.username || ""}`,
      `password=${body.password || ""}`,
      `ad_time=${body.adTime || ""}`,
      `huilv_zhekou=${body.huilvZhekou || ""}`,
      `admin_id=${body.adminId || ""}`,
      `hour_price=${body.hourPrice || ""}`,
      `day_price=${body.dayPrice || ""}`,
      `three_day_price=${body.threeDayPrice || ""}`,
      `yucun_price=${body.yucunPrice || ""}`
    ].join("\n");
    fs.writeFileSync(configPath, configContent, "utf-8");
    if (fs.existsSync(alPyPath)) {
      let alPyContent = fs.readFileSync(alPyPath, "utf-8");
      if (body.tronApiKey !== void 0) {
        alPyContent = alPyContent.replace(
          /API_KEY\s*=\s*["'][^"']*["']/,
          `API_KEY="${body.tronApiKey}"`
        );
      }
      if (body.dbUser !== void 0 || body.dbPassword !== void 0 || body.dbHost !== void 0 || body.dbName !== void 0 || body.dbPort !== void 0) {
        const config = useRuntimeConfig();
        const newConfig = {
          user: body.dbUser || config.dbUser,
          password: body.dbPassword || config.dbPassword,
          host: body.dbHost || config.dbHost,
          database: body.dbName || config.dbName,
          port: body.dbPort || config.dbPort
        };
        const configBlock = `config = {
        'user': '${newConfig.user}',
        'password': '${newConfig.password}',
        'host': '${newConfig.host}',
        'database': '${newConfig.database}',
        'port': ${newConfig.port},
        'charset': 'utf8mb4'
    }`;
        alPyContent = alPyContent.replace(
          /config\s*=\s*\{[^}]+\}/,
          configBlock
        );
      }
      fs.writeFileSync(alPyPath, alPyContent, "utf-8");
    }
    return {
      success: true,
      message: "\u914D\u7F6E\u4FDD\u5B58\u6210\u529F"
    };
  } catch (error) {
    console.error("\u4FDD\u5B58\u914D\u7F6E\u6587\u4EF6\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u4FDD\u5B58\u914D\u7F6E\u6587\u4EF6\u5931\u8D25: " + error.message
    };
  }
});

export { botConfig_post as default };
//# sourceMappingURL=bot-config.post.mjs.map
