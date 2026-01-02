import { d as defineEventHandler, r as requireAdmin, a as readBody } from '../../nitro/nitro.mjs';
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
  const user = await requireAdmin(event);
  if (!user) {
    return {
      success: false,
      error: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    };
  }
  try {
    const body = await readBody(event);
    if (!body || typeof body !== "object") {
      throw new Error("\u65E0\u6548\u7684\u8BF7\u6C42\u6570\u636E");
    }
    const projectRoot = process.cwd();
    const actualRoot = projectRoot.endsWith(".output") ? path.dirname(projectRoot) : projectRoot;
    const basePath = path.join(actualRoot, "hf-tgpro");
    const configPath = path.join(basePath, "config.txt");
    const envPath = path.join(basePath, ".env");
    const hyPyPath = path.join(basePath, "hy.py");
    const configContent = [
      `TOKEN=${body.token || ""}`,
      `control_address=${body.controlAddress || ""}`,
      `CUSTOMER_SERVICE_ID=${body.customerServiceId || ""}`,
      `Tiaozhuan=${body.tiaozhuan || ""}`,
      `admin_id=${body.adminId || ""}`,
      `three_price=${body.threePrice || ""}`,
      `six_price=${body.sixPrice || ""}`,
      `year_price=${body.yearPrice || ""}`
    ].join("\n");
    const envContent = [
      `ResHash="${body.resHash || ""}" #fragment.com`,
      `ResCookie="${body.resCookie || ""}" # fragment.com`,
      "",
      "",
      `WalletMnemonic="${body.walletMnemonic || ""}" # \u94B1\u5305\u52A9\u8BB0\u8BCD \u7528\u7A7A\u683C\u5206\u9694`,
      "",
      "# \u6570\u636E\u5E93\u914D\u7F6E",
      `DB_HOST=${body.dbHost || ""}`,
      `DB_USER=${body.dbUser || ""}`,
      `DB_PASSWORD=${body.dbPassword || ""}`,
      `DB_NAME=${body.dbName || ""}`,
      `DB_PORT=${body.dbPort || ""}`,
      "",
      "",
      "",
      "",
      ""
    ].join("\n");
    if (body.tronApiKey !== void 0) {
      const hyPyContent = fs.readFileSync(hyPyPath, "utf-8");
      const updatedHyPyContent = hyPyContent.replace(
        /tron_api_key\s*=\s*["'][^"']*["']/,
        `tron_api_key="${body.tronApiKey}"`
      );
      fs.writeFileSync(hyPyPath, updatedHyPyContent, "utf-8");
    }
    fs.writeFileSync(configPath, configContent, "utf-8");
    fs.writeFileSync(envPath, envContent, "utf-8");
    if (body.hotReload) {
      try {
        const triggerPath = path.join(basePath, ".config_reload_trigger");
        fs.writeFileSync(triggerPath, Date.now().toString(), "utf-8");
        return {
          success: true,
          message: "\u914D\u7F6E\u4FDD\u5B58\u6210\u529F\uFF0C\u5DF2\u89E6\u53D1\u70ED\u66F4\u65B0"
        };
      } catch (triggerError) {
        console.error("\u89E6\u53D1\u70ED\u66F4\u65B0\u5931\u8D25:", triggerError);
        return {
          success: true,
          message: "\u914D\u7F6E\u4FDD\u5B58\u6210\u529F\uFF0C\u4F46\u70ED\u66F4\u65B0\u89E6\u53D1\u5931\u8D25"
        };
      }
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
