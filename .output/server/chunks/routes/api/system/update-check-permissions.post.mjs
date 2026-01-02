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
const updateCheckPermissions_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sessionId, extractPath } = body || {};
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u4F1A\u8BDDID"
      });
    }
    if (!extractPath) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u89E3\u538B\u8DEF\u5F84"
      });
    }
    try {
      await promises.access(extractPath);
    } catch {
      throw createError({
        statusCode: 404,
        statusMessage: "\u89E3\u538B\u76EE\u5F55\u4E0D\u5B58\u5728"
      });
    }
    const projectRoot = process.cwd();
    const issues = [];
    const warnings = [];
    try {
      const extractedFiles = await promises.readdir(extractPath);
      const updateFiles = extractedFiles.filter((file) => !file.endsWith(".zip"));
      if (updateFiles.length === 0) {
        throw new Error("\u89E3\u538B\u76EE\u5F55\u4E2D\u6CA1\u6709\u627E\u5230\u66F4\u65B0\u6587\u4EF6");
      }
      const criticalPaths = [
        "package.json",
        "nuxt.config.ts",
        "server/",
        "pages/",
        "components/",
        "assets/",
        "public/"
      ];
      for (const criticalPath of criticalPaths) {
        const targetPath = join(projectRoot, criticalPath);
        const updatePath = join(extractPath, criticalPath);
        try {
          const targetStat = await promises.stat(targetPath);
          try {
            await promises.access(targetPath, promises.constants.W_OK);
          } catch {
            issues.push(`\u65E0\u6CD5\u5199\u5165 ${criticalPath}\uFF1A\u6743\u9650\u4E0D\u8DB3`);
          }
          try {
            await promises.stat(updatePath);
          } catch {
            warnings.push(`\u66F4\u65B0\u5305\u4E2D\u7F3A\u5C11 ${criticalPath}`);
          }
        } catch {
          warnings.push(`\u76EE\u6807\u8DEF\u5F84 ${criticalPath} \u4E0D\u5B58\u5728`);
        }
      }
      try {
        const { stdout } = await execAsync(`df -h "${projectRoot}" | tail -1 | awk '{print $4}'`);
        const availableSpace = stdout.trim();
        let totalSize = 0;
        for (const file of updateFiles) {
          const filePath = join(extractPath, file);
          const stat = await promises.stat(filePath);
          if (stat.isFile()) {
            totalSize += stat.size;
          } else if (stat.isDirectory()) {
            const { stdout: dirSize } = await execAsync(`du -sb "${filePath}" | cut -f1`);
            totalSize += parseInt(dirSize.trim());
          }
        }
        const totalSizeMB = Math.round(totalSize / 1024 / 1024);
        if (totalSizeMB > 100) {
          warnings.push(`\u66F4\u65B0\u6587\u4EF6\u8F83\u5927 (${totalSizeMB}MB)\uFF0C\u8BF7\u786E\u4FDD\u6709\u8DB3\u591F\u78C1\u76D8\u7A7A\u95F4`);
        }
      } catch (error) {
        warnings.push("\u65E0\u6CD5\u68C0\u67E5\u78C1\u76D8\u7A7A\u95F4");
      }
      try {
        const processUser = process.getuid ? process.getuid() : "unknown";
        const { stdout } = await execAsync(`ls -la "${projectRoot}" | head -2 | tail -1 | awk '{print $3}'`);
        const fileOwner = stdout.trim();
        if (processUser !== "unknown" && fileOwner !== "unknown") {
        }
      } catch (error) {
        warnings.push("\u65E0\u6CD5\u68C0\u67E5\u8FDB\u7A0B\u6743\u9650");
      }
      const hasIssues = issues.length > 0;
      const canProceed = !hasIssues;
      try {
        await $fetch("/api/system/update-state", {
          method: "POST",
          body: {
            action: "update",
            sessionId,
            error: hasIssues ? `\u6743\u9650\u68C0\u67E5\u5931\u8D25: ${issues.join(", ")}` : void 0
          }
        });
      } catch (error) {
        console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", error);
      }
      return {
        success: true,
        message: canProceed ? "\u6743\u9650\u68C0\u67E5\u901A\u8FC7" : "\u6743\u9650\u68C0\u67E5\u53D1\u73B0\u95EE\u9898",
        data: {
          canProceed,
          issues,
          warnings,
          updateFiles: updateFiles.length,
          sessionId
        }
      };
    } catch (error) {
      console.error("\u6743\u9650\u68C0\u67E5\u5931\u8D25:", error);
      try {
        await $fetch("/api/system/update-state", {
          method: "POST",
          body: {
            action: "update",
            sessionId,
            error: `\u6743\u9650\u68C0\u67E5\u5931\u8D25: ${error.message}`
          }
        });
      } catch (updateError) {
        console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", updateError);
      }
      throw createError({
        statusCode: 500,
        statusMessage: `\u6743\u9650\u68C0\u67E5\u5931\u8D25: ${error.message}`
      });
    }
  } catch (error) {
    console.error("\u6587\u4EF6\u6743\u9650\u68C0\u67E5\u5931\u8D25:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u6587\u4EF6\u6743\u9650\u68C0\u67E5\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});

export { updateCheckPermissions_post as default };
//# sourceMappingURL=update-check-permissions.post.mjs.map
