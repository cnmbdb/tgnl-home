import { d as defineEventHandler, a as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { promises } from 'fs';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
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

const execAsync = promisify(exec);
const updateExtract_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sessionId, downloadPath } = body || {};
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u4F1A\u8BDDID"
      });
    }
    if (!downloadPath) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u4E0B\u8F7D\u6587\u4EF6\u8DEF\u5F84"
      });
    }
    try {
      await promises.access(downloadPath);
    } catch {
      throw createError({
        statusCode: 404,
        statusMessage: "\u4E0B\u8F7D\u6587\u4EF6\u4E0D\u5B58\u5728"
      });
    }
    const extractDir = join(process.cwd(), "\u66F4\u65B0\u6587\u4EF6");
    try {
      await promises.access(extractDir);
    } catch {
      await promises.mkdir(extractDir, { recursive: true });
    }
    const files = await promises.readdir(extractDir);
    for (const file of files) {
      const filePath = join(extractDir, file);
      const stat = await promises.stat(filePath);
      if (filePath === downloadPath) {
        continue;
      }
      if (stat.isDirectory()) {
        await promises.rm(filePath, { recursive: true, force: true });
      } else {
        await promises.unlink(filePath);
      }
    }
    try {
      const { stdout, stderr } = await execAsync(`cd "${extractDir}" && unzip -o "${downloadPath}"`, {
        maxBuffer: 1024 * 1024 * 10
        // 10MB buffer
      });
      if (stderr && !stderr.includes("Archive:")) {
        console.warn("\u89E3\u538B\u8B66\u544A:", stderr);
      }
      const extractedFiles = await promises.readdir(extractDir);
      const extractedCount = extractedFiles.filter((file) => file !== downloadPath.split("/").pop()).length;
      if (extractedCount === 0) {
        throw new Error("\u89E3\u538B\u540E\u6CA1\u6709\u627E\u5230\u6587\u4EF6");
      }
      try {
        await $fetch("/api/system/update-state", {
          method: "POST",
          body: {
            action: "update",
            sessionId,
            extractPath: extractDir
          }
        });
      } catch (error) {
        console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", error);
      }
      return {
        success: true,
        message: "\u6587\u4EF6\u89E3\u538B\u6210\u529F",
        data: {
          extractPath: extractDir,
          extractedFiles: extractedCount,
          sessionId
        }
      };
    } catch (error) {
      console.error("\u89E3\u538B\u5931\u8D25:", error);
      try {
        await $fetch("/api/system/update-state", {
          method: "POST",
          body: {
            action: "update",
            sessionId,
            error: `\u89E3\u538B\u5931\u8D25: ${error.message}`
          }
        });
      } catch (updateError) {
        console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", updateError);
      }
      throw createError({
        statusCode: 500,
        statusMessage: `\u89E3\u538B\u5931\u8D25: ${error.message}`
      });
    }
  } catch (error) {
    console.error("\u89E3\u538B\u6587\u4EF6\u5931\u8D25:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u89E3\u538B\u6587\u4EF6\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});

export { updateExtract_post as default };
//# sourceMappingURL=update-extract.post.mjs.map
