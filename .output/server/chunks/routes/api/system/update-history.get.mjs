import { d as defineEventHandler, g as getQuery } from '../../../nitro/nitro.mjs';
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

const HISTORY_FILE = path.join(process.cwd(), "data", "update-history.json");
const updateHistory_get = defineEventHandler(async (event) => {
  try {
    const historyData = await promises.readFile(HISTORY_FILE, "utf-8");
    const history = JSON.parse(historyData);
    const query = getQuery(event);
    const limit = parseInt(query.limit) || 50;
    const offset = parseInt(query.offset) || 0;
    const paginatedHistory = history.slice(offset, offset + limit);
    return {
      success: true,
      data: paginatedHistory,
      total: history.length,
      limit,
      offset
    };
  } catch (error) {
    if (error.code === "ENOENT") {
      return {
        success: true,
        data: [],
        total: 0,
        limit: 50,
        offset: 0
      };
    }
    console.error("\u83B7\u53D6\u66F4\u65B0\u5386\u53F2\u5931\u8D25:", error);
    return {
      success: false,
      message: error.message || "\u83B7\u53D6\u66F4\u65B0\u5386\u53F2\u5931\u8D25"
    };
  }
});

export { updateHistory_get as default };
//# sourceMappingURL=update-history.get.mjs.map
