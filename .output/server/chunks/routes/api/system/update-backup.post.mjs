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
const updateBackup_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sessionId } = body || {};
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u4F1A\u8BDDID"
      });
    }
    const projectRoot = process.cwd();
    const backupDir = join(projectRoot, "\u5907\u4EFD\u6587\u4EF6");
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").split("T")[0] + "_" + (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").split("T")[1].split(".")[0];
    const backupPath = join(backupDir, `backup-${timestamp}`);
    try {
      try {
        await promises.access(backupDir);
      } catch {
        await promises.mkdir(backupDir, { recursive: true });
      }
      await promises.mkdir(backupPath, { recursive: true });
      const excludeItems = [
        ".nuxt",
        ".output",
        "node_modules",
        ".git",
        "\u5907\u4EFD\u6587\u4EF6",
        "\u66F4\u65B0\u6587\u4EF6",
        "logs",
        "*.log"
      ];
      const excludeArgs = excludeItems.map((item) => `--exclude='${item}'`).join(" ");
      const projectName = projectRoot.split("/").pop() || "10-15-0energy-robot";
      const fullBackupPath = join(backupPath, projectName);
      await execAsync(`rsync -av ${excludeArgs} "${projectRoot}/" "${fullBackupPath}/"`);
      console.log(`\u9879\u76EE\u5B8C\u6574\u5907\u4EFD\u5B8C\u6210: ${fullBackupPath}`);
      const backedUpItems = 1;
      const skippedItems = excludeItems;
      const backupInfo = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        sessionId,
        backedUpItems,
        skippedItems,
        projectRoot,
        backupPath: fullBackupPath,
        backupType: "full_project",
        excludedItems: excludeItems
      };
      await promises.writeFile(
        join(backupPath, "backup-info.json"),
        JSON.stringify(backupInfo, null, 2)
      );
      let backupSize = 0;
      try {
        const { stdout } = await execAsync(`du -sb "${fullBackupPath}" | cut -f1`);
        backupSize = parseInt(stdout.trim());
      } catch (error) {
        console.warn("\u65E0\u6CD5\u8BA1\u7B97\u5907\u4EFD\u5927\u5C0F:", error);
      }
      try {
        await $fetch("/api/system/update-state", {
          method: "POST",
          body: {
            action: "update",
            sessionId,
            backupPath: fullBackupPath
          }
        });
      } catch (error) {
        console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", error);
      }
      return {
        success: true,
        message: "\u6574\u4E2A\u9879\u76EE\u5907\u4EFD\u6210\u529F",
        data: {
          backupPath: fullBackupPath,
          backedUpItems,
          skippedItems,
          backupSize: Math.round(backupSize / 1024 / 1024 * 100) / 100,
          // MB
          timestamp,
          sessionId,
          backupType: "full_project"
        }
      };
    } catch (error) {
      console.error("\u5907\u4EFD\u5931\u8D25:", error);
      try {
        await promises.rm(backupPath, { recursive: true, force: true });
      } catch (cleanupError) {
        console.warn("\u6E05\u7406\u5931\u8D25\u7684\u5907\u4EFD\u76EE\u5F55\u5931\u8D25:", cleanupError);
      }
      try {
        await $fetch("/api/system/update-state", {
          method: "POST",
          body: {
            action: "update",
            sessionId,
            error: `\u5907\u4EFD\u5931\u8D25: ${error.message}`
          }
        });
      } catch (updateError) {
        console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", updateError);
      }
      throw createError({
        statusCode: 500,
        statusMessage: `\u5907\u4EFD\u5931\u8D25: ${error.message}`
      });
    }
  } catch (error) {
    console.error("\u521B\u5EFA\u5907\u4EFD\u5931\u8D25:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u521B\u5EFA\u5907\u4EFD\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});

export { updateBackup_post as default };
//# sourceMappingURL=update-backup.post.mjs.map
