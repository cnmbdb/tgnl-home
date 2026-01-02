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
const updateAutoApply_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sessionId, extractPath, backupPath } = body || {};
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
    if (!backupPath) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u5907\u4EFD\u8DEF\u5F84"
      });
    }
    const projectRoot = process.cwd();
    const appliedFiles = [];
    const skippedFiles = [];
    const errors = [];
    const logs = [];
    logs.push("\u5F00\u59CB\u505C\u6B62\u5F53\u524D\u670D\u52A1...");
    try {
      try {
        await execAsync('pkill -f "npm run dev"');
        logs.push("\u2713 Web\u5F00\u53D1\u670D\u52A1\u5668\u5DF2\u505C\u6B62");
      } catch (error) {
        logs.push("\u26A0 Web\u5F00\u53D1\u670D\u52A1\u5668\u53EF\u80FD\u5DF2\u7ECF\u505C\u6B62\u6216\u672A\u8FD0\u884C");
      }
      try {
        await execAsync('pkill -f "python3 al.py"');
        logs.push("\u2713 Python\u673A\u5668\u4EBA\u670D\u52A1\u5DF2\u505C\u6B62");
      } catch (error) {
        logs.push("\u26A0 Python\u673A\u5668\u4EBA\u670D\u52A1\u53EF\u80FD\u5DF2\u7ECF\u505C\u6B62\u6216\u672A\u8FD0\u884C");
      }
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      logs.push("\u2713 \u670D\u52A1\u505C\u6B62\u5B8C\u6210");
    } catch (error) {
      errors.push(`\u505C\u6B62\u670D\u52A1\u5931\u8D25: ${error.message}`);
      logs.push(`\u2717 \u505C\u6B62\u670D\u52A1\u5931\u8D25: ${error.message}`);
    }
    logs.push("\u5F00\u59CB\u8BB0\u5F55\u5F53\u524D\u7248\u672C\u6587\u4EF6\u6743\u9650...");
    const permissionsMap = {};
    try {
      const { stdout } = await execAsync(`find "${projectRoot}" -type f -exec stat -f "%N:%Mp%Lp" {} \\;`);
      const permissionLines = stdout.trim().split("\n");
      for (const line of permissionLines) {
        if (line.includes(":")) {
          const [filePath, permissions] = line.split(":");
          const relativePath = filePath.replace(projectRoot + "/", "");
          permissionsMap[relativePath] = permissions;
        }
      }
      await promises.writeFile(
        join(projectRoot, "data", "file-permissions-backup.json"),
        JSON.stringify(permissionsMap, null, 2)
      );
      logs.push(`\u2713 \u5DF2\u8BB0\u5F55 ${Object.keys(permissionsMap).length} \u4E2A\u6587\u4EF6\u7684\u6743\u9650`);
    } catch (error) {
      errors.push(`\u8BB0\u5F55\u6587\u4EF6\u6743\u9650\u5931\u8D25: ${error.message}`);
      logs.push(`\u2717 \u8BB0\u5F55\u6587\u4EF6\u6743\u9650\u5931\u8D25: ${error.message}`);
    }
    logs.push("\u5F00\u59CB\u5904\u7406\u65B0\u6587\u4EF6\u6743\u9650\u548C\u79FB\u52A8\u6587\u4EF6...");
    try {
      await promises.access(extractPath);
      const extractedItems = await promises.readdir(extractPath);
      const updateItems = extractedItems.filter((item) => !item.endsWith(".zip"));
      if (updateItems.length === 0) {
        throw new Error("\u89E3\u538B\u76EE\u5F55\u4E2D\u6CA1\u6709\u627E\u5230\u66F4\u65B0\u6587\u4EF6");
      }
      const updateFolder = updateItems.find((item) => {
        const itemPath = join(extractPath, item);
        try {
          const stat = require("fs").statSync(itemPath);
          return stat.isDirectory();
        } catch {
          return false;
        }
      });
      if (!updateFolder) {
        throw new Error("\u672A\u627E\u5230\u66F4\u65B0\u6587\u4EF6\u5939");
      }
      const updateFolderPath = join(extractPath, updateFolder);
      logs.push(`\u2713 \u627E\u5230\u66F4\u65B0\u6587\u4EF6\u5939: ${updateFolder}`);
      const updateFolderItems = await promises.readdir(updateFolderPath);
      for (const item of updateFolderItems) {
        const sourcePath = join(updateFolderPath, item);
        const targetPath = join(projectRoot, item);
        try {
          const sourceStat = await promises.stat(sourcePath);
          if (sourceStat.isDirectory()) {
            try {
              try {
                await promises.access(targetPath);
                await promises.rm(targetPath, { recursive: true, force: true });
              } catch {
              }
              await execAsync(`cp -r "${sourcePath}" "${targetPath}"`);
              await setDirectoryPermissions(sourcePath, targetPath, permissionsMap, projectRoot);
              appliedFiles.push(item);
              logs.push(`\u2713 \u5DF2\u590D\u5236\u76EE\u5F55: ${item}`);
            } catch (error) {
              errors.push(`\u590D\u5236\u76EE\u5F55 ${item} \u5931\u8D25: ${error.message}`);
              skippedFiles.push(item);
              logs.push(`\u2717 \u590D\u5236\u76EE\u5F55 ${item} \u5931\u8D25: ${error.message}`);
            }
          } else {
            try {
              await promises.copyFile(sourcePath, targetPath);
              const relativePath = item;
              if (permissionsMap[relativePath]) {
                await execAsync(`chmod ${permissionsMap[relativePath]} "${targetPath}"`);
              }
              appliedFiles.push(item);
              logs.push(`\u2713 \u5DF2\u590D\u5236\u6587\u4EF6: ${item}`);
            } catch (error) {
              errors.push(`\u590D\u5236\u6587\u4EF6 ${item} \u5931\u8D25: ${error.message}`);
              skippedFiles.push(item);
              logs.push(`\u2717 \u590D\u5236\u6587\u4EF6 ${item} \u5931\u8D25: ${error.message}`);
            }
          }
        } catch (error) {
          errors.push(`\u5904\u7406 ${item} \u5931\u8D25: ${error.message}`);
          skippedFiles.push(item);
          logs.push(`\u2717 \u5904\u7406 ${item} \u5931\u8D25: ${error.message}`);
        }
      }
    } catch (error) {
      errors.push(`\u5904\u7406\u65B0\u6587\u4EF6\u5931\u8D25: ${error.message}`);
      logs.push(`\u2717 \u5904\u7406\u65B0\u6587\u4EF6\u5931\u8D25: ${error.message}`);
    }
    const criticalFiles = ["package.json", "nuxt.config.ts", "server/"];
    const failedCriticalFiles = criticalFiles.filter(
      (file) => skippedFiles.some((skipped) => skipped.includes(file))
    );
    if (failedCriticalFiles.length > 0) {
      errors.push(`\u5173\u952E\u6587\u4EF6\u66F4\u65B0\u5931\u8D25: ${failedCriticalFiles.join(", ")}`);
      logs.push(`\u2717 \u5173\u952E\u6587\u4EF6\u66F4\u65B0\u5931\u8D25: ${failedCriticalFiles.join(", ")}`);
    }
    let needsNpmInstall = false;
    if (appliedFiles.includes("package.json") || appliedFiles.includes("package-lock.json")) {
      needsNpmInstall = true;
      logs.push("\u2713 \u68C0\u6D4B\u5230package.json\u66F4\u65B0\uFF0C\u5C06\u91CD\u65B0\u5B89\u88C5\u4F9D\u8D56");
    }
    const applyInfo = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      sessionId,
      appliedFiles,
      skippedFiles,
      errors,
      logs,
      needsNpmInstall,
      extractPath,
      backupPath,
      autoRestart: true
    };
    await promises.writeFile(
      join(projectRoot, "data", "last-update.json"),
      JSON.stringify(applyInfo, null, 2)
    );
    const hasErrors = errors.length > 0;
    const success = appliedFiles.length > 0 && !hasErrors;
    if (success) {
      logs.push("\u2713 \u6587\u4EF6\u66F4\u65B0\u5B8C\u6210\uFF0C8\u79D2\u540E\u5C06\u81EA\u52A8\u91CD\u542F\u670D\u52A1...");
      setTimeout(async () => {
        await restartServices(projectRoot, needsNpmInstall, sessionId);
      }, 8e3);
    }
    try {
      await $fetch("/api/system/update-state", {
        method: "POST",
        body: {
          action: "update",
          sessionId,
          error: hasErrors ? `\u5E94\u7528\u66F4\u65B0\u65F6\u51FA\u73B0\u9519\u8BEF: ${errors.join(", ")}` : void 0
        }
      });
    } catch (error) {
      console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", error);
    }
    return {
      success,
      message: success ? "\u81EA\u52A8\u66F4\u65B0\u6D41\u7A0B\u5DF2\u542F\u52A8\uFF0C8\u79D2\u540E\u5C06\u81EA\u52A8\u91CD\u542F\u670D\u52A1" : "\u66F4\u65B0\u5E94\u7528\u65F6\u51FA\u73B0\u9519\u8BEF",
      data: {
        appliedFiles,
        skippedFiles,
        errors,
        logs,
        needsNpmInstall,
        totalFiles: appliedFiles.length + skippedFiles.length,
        successCount: appliedFiles.length,
        sessionId,
        autoRestart: success
      }
    };
  } catch (error) {
    console.error("\u81EA\u52A8\u66F4\u65B0\u5931\u8D25:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u81EA\u52A8\u66F4\u65B0\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});
async function setDirectoryPermissions(sourceDir, targetDir, permissionsMap, projectRoot) {
  try {
    const items = await promises.readdir(sourceDir);
    for (const item of items) {
      const sourcePath = join(sourceDir, item);
      const targetPath = join(targetDir, item);
      const stat = await promises.stat(sourcePath);
      if (stat.isDirectory()) {
        await setDirectoryPermissions(sourcePath, targetPath, permissionsMap, projectRoot);
      } else {
        const relativePath = targetPath.replace(projectRoot + "/", "");
        if (permissionsMap[relativePath]) {
          await execAsync(`chmod ${permissionsMap[relativePath]} "${targetPath}"`);
        }
      }
    }
  } catch (error) {
    console.warn("\u8BBE\u7F6E\u76EE\u5F55\u6743\u9650\u5931\u8D25:", error);
  }
}
async function restartServices(projectRoot, needsNpmInstall, sessionId) {
  const logs = [];
  const errors = [];
  try {
    logs.push("\u5F00\u59CB\u91CD\u542F\u670D\u52A1\u6D41\u7A0B...");
    if (needsNpmInstall) {
      logs.push("\u6B63\u5728\u91CD\u65B0\u5B89\u88C5\u4F9D\u8D56...");
      try {
        await execAsync("npm install", { cwd: projectRoot });
        logs.push("\u2713 \u4F9D\u8D56\u5B89\u88C5\u5B8C\u6210");
      } catch (error) {
        errors.push(`\u4F9D\u8D56\u5B89\u88C5\u5931\u8D25: ${error.message}`);
        logs.push(`\u2717 \u4F9D\u8D56\u5B89\u88C5\u5931\u8D25: ${error.message}`);
      }
    }
    let frontendStarted = false;
    for (let i = 0; i < 3; i++) {
      try {
        logs.push(`\u5C1D\u8BD5\u542F\u52A8\u524D\u7AEF\u670D\u52A1 (\u7B2C${i + 1}\u6B21)...`);
        exec("npm run dev", { cwd: projectRoot });
        await new Promise((resolve) => setTimeout(resolve, 3e3));
        try {
          await execAsync('pgrep -f "npm run dev"');
          frontendStarted = true;
          logs.push("\u2713 \u524D\u7AEF\u670D\u52A1\u542F\u52A8\u6210\u529F");
          break;
        } catch {
          logs.push(`\u2717 \u524D\u7AEF\u670D\u52A1\u542F\u52A8\u5931\u8D25 (\u7B2C${i + 1}\u6B21)`);
        }
      } catch (error) {
        logs.push(`\u2717 \u524D\u7AEF\u670D\u52A1\u542F\u52A8\u5931\u8D25 (\u7B2C${i + 1}\u6B21): ${error.message}`);
      }
    }
    if (!frontendStarted) {
      logs.push("\u524D\u7AEF\u670D\u52A13\u6B21\u542F\u52A8\u5931\u8D25\uFF0C\u5F00\u59CB\u91CD\u65B0\u6784\u5EFA...");
      try {
        await execAsync("rm -rf .nuxt .output node_modules/.cache", { cwd: projectRoot });
        logs.push("\u2713 \u6E05\u7406\u7F13\u5B58\u5B8C\u6210");
        await execAsync("npm install", { cwd: projectRoot });
        logs.push("\u2713 \u91CD\u65B0\u5B89\u88C5\u4F9D\u8D56\u5B8C\u6210");
        await execAsync(`chmod -R 755 "${projectRoot}/node_modules"`, { cwd: projectRoot });
        await execAsync(`chmod -R 755 "${projectRoot}/.nuxt"`, { cwd: projectRoot });
        logs.push("\u2713 \u6743\u9650\u95EE\u9898\u5DF2\u4FEE\u590D");
        exec("npm run dev", { cwd: projectRoot });
        await new Promise((resolve) => setTimeout(resolve, 5e3));
        try {
          await execAsync('pgrep -f "npm run dev"');
          frontendStarted = true;
          logs.push("\u2713 \u91CD\u65B0\u6784\u5EFA\u540E\u524D\u7AEF\u670D\u52A1\u542F\u52A8\u6210\u529F");
        } catch {
          errors.push("\u91CD\u65B0\u6784\u5EFA\u540E\u524D\u7AEF\u670D\u52A1\u4ECD\u7136\u542F\u52A8\u5931\u8D25");
          logs.push("\u2717 \u91CD\u65B0\u6784\u5EFA\u540E\u524D\u7AEF\u670D\u52A1\u4ECD\u7136\u542F\u52A8\u5931\u8D25");
        }
      } catch (error) {
        errors.push(`\u91CD\u65B0\u6784\u5EFA\u5931\u8D25: ${error.message}`);
        logs.push(`\u2717 \u91CD\u65B0\u6784\u5EFA\u5931\u8D25: ${error.message}`);
      }
    }
    try {
      logs.push("\u6B63\u5728\u542F\u52A8Python\u673A\u5668\u4EBA\u670D\u52A1...");
      exec("cd nl-2333 && python3 al.py", { cwd: projectRoot });
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      try {
        await execAsync('pgrep -f "python3 al.py"');
        logs.push("\u2713 Python\u673A\u5668\u4EBA\u670D\u52A1\u542F\u52A8\u6210\u529F");
      } catch {
        logs.push("\u26A0 Python\u673A\u5668\u4EBA\u670D\u52A1\u53EF\u80FD\u542F\u52A8\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u68C0\u67E5");
      }
    } catch (error) {
      errors.push(`Python\u673A\u5668\u4EBA\u670D\u52A1\u542F\u52A8\u5931\u8D25: ${error.message}`);
      logs.push(`\u2717 Python\u673A\u5668\u4EBA\u670D\u52A1\u542F\u52A8\u5931\u8D25: ${error.message}`);
    }
    const restartInfo = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      sessionId,
      logs,
      errors,
      frontendStarted,
      needsNpmInstall
    };
    await promises.writeFile(
      join(projectRoot, "data", "restart-log.json"),
      JSON.stringify(restartInfo, null, 2)
    );
    logs.push("\u2713 \u670D\u52A1\u91CD\u542F\u6D41\u7A0B\u5B8C\u6210");
  } catch (error) {
    errors.push(`\u91CD\u542F\u670D\u52A1\u5931\u8D25: ${error.message}`);
    logs.push(`\u2717 \u91CD\u542F\u670D\u52A1\u5931\u8D25: ${error.message}`);
  }
}

export { updateAutoApply_post as default };
//# sourceMappingURL=update-auto-apply.post.mjs.map
