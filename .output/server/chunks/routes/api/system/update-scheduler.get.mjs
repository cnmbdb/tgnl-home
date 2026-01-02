import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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
const updateScheduler_get = defineEventHandler(async (event) => {
  try {
    const configData = await promises.readFile(SCHEDULER_FILE, "utf-8");
    const config = JSON.parse(configData);
    return { success: true, config };
  } catch (error) {
    return { success: true, config: defaultConfig };
  }
});

export { updateScheduler_get as default };
//# sourceMappingURL=update-scheduler.get.mjs.map
