import { d as defineEventHandler, g as getQuery, c as createError } from '../../../nitro/nitro.mjs';
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

const progressStore = /* @__PURE__ */ new Map();
const updateProgress_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { sessionId } = query;
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u4F1A\u8BDDID"
      });
    }
    const progress = progressStore.get(sessionId) || {
      step: "idle",
      progress: 0,
      status: "\u7B49\u5F85\u5F00\u59CB",
      logs: [],
      startTime: null,
      endTime: null
    };
    return {
      success: true,
      data: progress
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u8FDB\u5EA6\u5931\u8D25:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "\u83B7\u53D6\u8FDB\u5EA6\u5931\u8D25"
    };
  }
});
function updateProgress(sessionId, step, progress, status, log) {
  const current = progressStore.get(sessionId) || {
    step: "idle",
    progress: 0,
    status: "\u7B49\u5F85\u5F00\u59CB",
    logs: [],
    startTime: null,
    endTime: null
  };
  const updated = {
    ...current,
    step,
    progress,
    status,
    lastUpdate: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (log) {
    updated.logs.push({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      message: log
    });
  }
  if (progress === 0 && !current.startTime) {
    updated.startTime = (/* @__PURE__ */ new Date()).toISOString();
  }
  if (progress === 100) {
    updated.endTime = (/* @__PURE__ */ new Date()).toISOString();
  }
  progressStore.set(sessionId, updated);
}

export { updateProgress_get as default, updateProgress };
//# sourceMappingURL=update-progress.get.mjs.map
