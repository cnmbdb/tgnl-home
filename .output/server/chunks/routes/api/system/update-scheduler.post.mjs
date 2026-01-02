import { d as defineEventHandler, i as getMethod, a as readBody } from '../../../nitro/nitro.mjs';
import { promises } from 'fs';
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

const SCHEDULER_FILE = path.join(process.cwd(), "data", "update-scheduler.json");
const defaultConfig = {
  enabled: true,
  interval: 24,
  lastCheck: (/* @__PURE__ */ new Date()).toISOString(),
  autoDownload: false,
  autoApply: false
};
const updateScheduler_post = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method === "GET") {
    try {
      const configData = await promises.readFile(SCHEDULER_FILE, "utf-8");
      const config = JSON.parse(configData);
      return { success: true, config };
    } catch (error) {
      return { success: true, config: defaultConfig };
    }
  }
  if (method === "POST") {
    try {
      const body = await readBody(event);
      const { action, config } = body;
      const dataDir = path.dirname(SCHEDULER_FILE);
      await promises.mkdir(dataDir, { recursive: true });
      if (action === "start") {
        const newConfig = { ...defaultConfig, ...config, enabled: true };
        await promises.writeFile(SCHEDULER_FILE, JSON.stringify(newConfig, null, 2));
        return { success: true, message: "\u5B9A\u65F6\u68C0\u6D4B\u5DF2\u542F\u52A8", config: newConfig };
      }
      if (action === "stop") {
        const currentConfig = await getCurrentConfig();
        const newConfig = { ...currentConfig, enabled: false };
        await promises.writeFile(SCHEDULER_FILE, JSON.stringify(newConfig, null, 2));
        return { success: true, message: "\u5B9A\u65F6\u68C0\u6D4B\u5DF2\u505C\u6B62", config: newConfig };
      }
      if (action === "update") {
        const currentConfig = await getCurrentConfig();
        const newConfig = { ...currentConfig, ...config };
        await promises.writeFile(SCHEDULER_FILE, JSON.stringify(newConfig, null, 2));
        return { success: true, message: "\u914D\u7F6E\u5DF2\u66F4\u65B0", config: newConfig };
      }
      return { success: false, message: "\u672A\u77E5\u64CD\u4F5C" };
    } catch (error) {
      console.error("\u5B9A\u65F6\u68C0\u6D4B\u914D\u7F6E\u5931\u8D25:", error);
      return { success: false, message: error.message || "\u64CD\u4F5C\u5931\u8D25" };
    }
  }
  return { success: false, message: "\u4E0D\u652F\u6301\u7684\u8BF7\u6C42\u65B9\u6CD5" };
});
async function getCurrentConfig() {
  try {
    const configData = await promises.readFile(SCHEDULER_FILE, "utf-8");
    return JSON.parse(configData);
  } catch (error) {
    return defaultConfig;
  }
}

export { updateScheduler_post as default };
//# sourceMappingURL=update-scheduler.post.mjs.map
