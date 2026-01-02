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

const folderStatus_get = defineEventHandler(async (event) => {
  try {
    const projectRoot = process.cwd();
    const updateFolder = path.join(projectRoot, "\u66F4\u65B0\u6587\u4EF6");
    const backupFolder = path.join(projectRoot, "\u5907\u4EFD\u6587\u4EF6");
    let extractStatus = "pending";
    try {
      const updateFiles = await promises.readdir(updateFolder);
      if (updateFiles.includes("__MACOSX")) {
        extractStatus = "completed";
      } else if (updateFiles.some((file) => file.endsWith(".zip"))) {
        extractStatus = "ready";
      } else {
        extractStatus = "pending";
      }
    } catch (error) {
      extractStatus = "pending";
    }
    let backupStatus = "pending";
    try {
      const backupFiles = await promises.readdir(backupFolder);
      const actualBackupFiles = backupFiles.filter(
        (file) => !file.startsWith(".") && file !== "Thumbs.db" && file !== "desktop.ini"
      );
      if (actualBackupFiles.length > 0) {
        backupStatus = "completed";
      } else {
        backupStatus = "ready";
      }
    } catch (error) {
      try {
        await promises.mkdir(backupFolder, { recursive: true });
        backupStatus = "ready";
      } catch (createError2) {
        backupStatus = "pending";
      }
    }
    return {
      success: true,
      data: {
        step2: {
          status: extractStatus,
          description: extractStatus === "completed" ? "\u89E3\u538B\u5B8C\u6210" : extractStatus === "ready" ? "\u53EF\u4EE5\u89E3\u538B" : "\u7B49\u5F85\u4E2D"
        },
        step3: {
          status: backupStatus,
          description: backupStatus === "completed" ? "\u5907\u4EFD\u5B8C\u6210" : backupStatus === "ready" ? "\u53EF\u4EE5\u5907\u4EFD" : "\u7B49\u5F85\u4E2D"
        }
      }
    };
  } catch (error) {
    console.error("\u68C0\u67E5\u6587\u4EF6\u5939\u72B6\u6001\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u68C0\u67E5\u6587\u4EF6\u5939\u72B6\u6001\u5931\u8D25",
      data: {
        step2: { status: "pending", description: "\u7B49\u5F85\u4E2D" },
        step3: { status: "pending", description: "\u7B49\u5F85\u4E2D" }
      }
    };
  }
});

export { folderStatus_get as default };
//# sourceMappingURL=folder-status.get.mjs.map
