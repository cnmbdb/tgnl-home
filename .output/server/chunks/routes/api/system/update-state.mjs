import { d as defineEventHandler, i as getMethod, a as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { promises } from 'fs';
import { join } from 'path';
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

const UPDATE_STATE_FILE = join(process.cwd(), "data", "update-state.json");
const UPDATE_STEPS = {
  DOWNLOAD: 1,
  EXTRACT: 2,
  BACKUP: 3,
  APPLY: 4,
  RESTART: 5
};
const STEP_NAMES = {
  [UPDATE_STEPS.DOWNLOAD]: "\u4E0B\u8F7D\u66F4\u65B0\u5305",
  [UPDATE_STEPS.EXTRACT]: "\u89E3\u538B\u6587\u4EF6",
  [UPDATE_STEPS.BACKUP]: "\u5907\u4EFD\u5F53\u524D\u7248\u672C",
  [UPDATE_STEPS.APPLY]: "\u5E94\u7528\u66F4\u65B0",
  [UPDATE_STEPS.RESTART]: "\u91CD\u542F\u7CFB\u7EDF"
};
const STEP_DESCRIPTIONS = {
  [UPDATE_STEPS.DOWNLOAD]: "\u4ECEGitHub\u4E0B\u8F7D\u6700\u65B0\u7248\u672C",
  [UPDATE_STEPS.EXTRACT]: "\u89E3\u538B\u4E0B\u8F7D\u7684\u66F4\u65B0\u5305",
  [UPDATE_STEPS.BACKUP]: "\u521B\u5EFA\u5F53\u524D\u7248\u672C\u7684\u5907\u4EFD",
  [UPDATE_STEPS.APPLY]: "\u8986\u76D6\u65E7\u6587\u4EF6\u5E76\u68C0\u67E5\u6743\u9650",
  [UPDATE_STEPS.RESTART]: "\u91CD\u542F\u524D\u7AEF\u548C\u673A\u5668\u4EBA\u7AEF"
};
async function ensureDataDir() {
  const dataDir = join(process.cwd(), "data");
  try {
    await promises.access(dataDir);
  } catch {
    await promises.mkdir(dataDir, { recursive: true });
  }
}
async function readUpdateState() {
  try {
    await ensureDataDir();
    const data = await promises.readFile(UPDATE_STATE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}
async function saveUpdateState(state) {
  await ensureDataDir();
  await promises.writeFile(UPDATE_STATE_FILE, JSON.stringify(state, null, 2));
}
const updateState = defineEventHandler(async (event) => {
  const method = getMethod(event);
  try {
    if (method === "GET") {
      const state = await readUpdateState();
      if (!state) {
        return {
          success: true,
          data: {
            hasActiveUpdate: false,
            steps: Object.keys(UPDATE_STEPS).map((key) => ({
              id: UPDATE_STEPS[key],
              name: STEP_NAMES[UPDATE_STEPS[key]],
              description: STEP_DESCRIPTIONS[UPDATE_STEPS[key]],
              completed: false,
              current: false
            }))
          }
        };
      }
      const steps = Object.keys(UPDATE_STEPS).map((key) => {
        const stepId = UPDATE_STEPS[key];
        return {
          id: stepId,
          name: STEP_NAMES[stepId],
          description: STEP_DESCRIPTIONS[stepId],
          completed: state.completedSteps.includes(stepId),
          current: state.currentStep === stepId
        };
      });
      return {
        success: true,
        data: {
          hasActiveUpdate: true,
          sessionId: state.sessionId,
          currentStep: state.currentStep,
          completedSteps: state.completedSteps,
          version: state.version,
          startedAt: state.startedAt,
          lastUpdatedAt: state.lastUpdatedAt,
          error: state.error,
          canProceed: state.canProceed,
          steps
        }
      };
    }
    if (method === "POST") {
      const body = await readBody(event);
      const { action, sessionId, step, version, downloadPath, extractPath, backupPath, error } = body;
      if (action === "start") {
        const newSessionId = `update-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newState = {
          sessionId: newSessionId,
          currentStep: UPDATE_STEPS.DOWNLOAD,
          completedSteps: [],
          version,
          startedAt: (/* @__PURE__ */ new Date()).toISOString(),
          lastUpdatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          canProceed: true
        };
        await saveUpdateState(newState);
        return {
          success: true,
          message: "\u66F4\u65B0\u4F1A\u8BDD\u5DF2\u521B\u5EFA",
          data: { sessionId: newSessionId }
        };
      }
      if (action === "update") {
        const currentState = await readUpdateState();
        if (!currentState || currentState.sessionId !== sessionId) {
          throw createError({
            statusCode: 404,
            statusMessage: "\u66F4\u65B0\u4F1A\u8BDD\u4E0D\u5B58\u5728\u6216\u5DF2\u8FC7\u671F"
          });
        }
        const updatedState = {
          ...currentState,
          lastUpdatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        if (step !== void 0) {
          updatedState.currentStep = step;
        }
        if (downloadPath !== void 0) {
          updatedState.downloadPath = downloadPath;
        }
        if (extractPath !== void 0) {
          updatedState.extractPath = extractPath;
        }
        if (backupPath !== void 0) {
          updatedState.backupPath = backupPath;
        }
        if (error !== void 0) {
          updatedState.error = error;
          updatedState.canProceed = !error;
        }
        await saveUpdateState(updatedState);
        return {
          success: true,
          message: "\u72B6\u6001\u5DF2\u66F4\u65B0"
        };
      }
      if (action === "complete-step") {
        const currentState = await readUpdateState();
        if (!currentState || currentState.sessionId !== sessionId) {
          throw createError({
            statusCode: 404,
            statusMessage: "\u66F4\u65B0\u4F1A\u8BDD\u4E0D\u5B58\u5728\u6216\u5DF2\u8FC7\u671F"
          });
        }
        const updatedState = {
          ...currentState,
          completedSteps: [...currentState.completedSteps, currentState.currentStep],
          currentStep: currentState.currentStep + 1,
          lastUpdatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          canProceed: currentState.currentStep < UPDATE_STEPS.RESTART
        };
        await saveUpdateState(updatedState);
        return {
          success: true,
          message: "\u6B65\u9AA4\u5DF2\u5B8C\u6210"
        };
      }
      if (action === "clear") {
        try {
          await promises.unlink(UPDATE_STATE_FILE);
        } catch {
        }
        return {
          success: true,
          message: "\u66F4\u65B0\u72B6\u6001\u5DF2\u6E05\u9664"
        };
      }
    }
    throw createError({
      statusCode: 405,
      statusMessage: "\u4E0D\u652F\u6301\u7684\u8BF7\u6C42\u65B9\u6CD5"
    });
  } catch (error) {
    console.error("\u66F4\u65B0\u72B6\u6001\u7BA1\u7406\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u66F4\u65B0\u72B6\u6001\u7BA1\u7406\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});

export { STEP_DESCRIPTIONS, STEP_NAMES, UPDATE_STEPS, updateState as default };
//# sourceMappingURL=update-state.mjs.map
