import { d as defineEventHandler, a as readBody, c as createError } from '../../../nitro/nitro.mjs';
import { promises } from 'fs';
import { join } from 'path';
import { exec, spawn } from 'child_process';
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
async function getFilePermissions(filePath) {
  try {
    const { stdout } = await execAsync(`stat -f "%Mp%Lp" "${filePath}"`);
    return stdout.trim();
  } catch {
    return "644";
  }
}
async function setFilePermissions(filePath, permissions) {
  try {
    await execAsync(`chmod ${permissions} "${filePath}"`);
  } catch (error) {
    console.warn(`\u8BBE\u7F6E\u6587\u4EF6\u6743\u9650\u5931\u8D25: ${filePath}`, error);
  }
}
async function getDirectoryPermissions(dirPath) {
  const permissions = {};
  async function traverse(currentPath, relativePath = "") {
    try {
      const items = await promises.readdir(currentPath);
      for (const item of items) {
        const fullPath = join(currentPath, item);
        const relativeItemPath = relativePath ? join(relativePath, item) : item;
        try {
          const stat = await promises.stat(fullPath);
          permissions[relativeItemPath] = await getFilePermissions(fullPath);
          if (stat.isDirectory()) {
            await traverse(fullPath, relativeItemPath);
          }
        } catch (error) {
          console.warn(`\u83B7\u53D6\u6743\u9650\u5931\u8D25: ${fullPath}`, error);
        }
      }
    } catch (error) {
      console.warn(`\u8BFB\u53D6\u76EE\u5F55\u5931\u8D25: ${currentPath}`, error);
    }
  }
  await traverse(dirPath);
  return permissions;
}
async function stopCurrentServices() {
  const stopped = [];
  const errors = [];
  try {
    try {
      await execAsync(`pkill -f "npm run dev"`);
      stopped.push("npm run dev");
    } catch (error) {
      console.log("npm run dev \u8FDB\u7A0B\u53EF\u80FD\u5DF2\u505C\u6B62");
    }
    try {
      await execAsync(`pkill -f "node.*nuxt"`);
      stopped.push("nuxt dev server");
    } catch (error) {
      console.log("nuxt dev server \u8FDB\u7A0B\u53EF\u80FD\u5DF2\u505C\u6B62");
    }
    try {
      await execAsync(`pkill -f "python.*al.py"`);
      stopped.push("python al.py");
    } catch (error) {
      console.log("python al.py \u8FDB\u7A0B\u53EF\u80FD\u5DF2\u505C\u6B62");
    }
    try {
      await execAsync(`pkill -f "python3.*al.py"`);
      stopped.push("python3 al.py");
    } catch (error) {
      console.log("python3 al.py \u8FDB\u7A0B\u53EF\u80FD\u5DF2\u505C\u6B62");
    }
    await new Promise((resolve) => setTimeout(resolve, 2e3));
  } catch (error) {
    errors.push(`\u505C\u6B62\u670D\u52A1\u65F6\u51FA\u9519: ${error.message}`);
  }
  return { stopped, errors };
}
async function startServices(projectRoot) {
  const started = [];
  const errors = [];
  try {
    const frontendProcess = spawn("npm", ["run", "dev"], {
      cwd: projectRoot,
      detached: true,
      stdio: "ignore"
    });
    frontendProcess.unref();
    started.push("\u524D\u7AEF\u670D\u52A1 (npm run dev)");
    await new Promise((resolve) => setTimeout(resolve, 2e3));
    const botProcess = spawn("python3", ["al.py"], {
      cwd: join(projectRoot, "nl-2333"),
      detached: true,
      stdio: "ignore"
    });
    botProcess.unref();
    started.push("\u673A\u5668\u4EBA\u670D\u52A1 (python3 al.py)");
  } catch (error) {
    errors.push(`\u542F\u52A8\u670D\u52A1\u5931\u8D25: ${error.message}`);
  }
  return { started, errors };
}
const updateApply_post = defineEventHandler(async (event) => {
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
    const updateDir = join(projectRoot, "\u66F4\u65B0\u6587\u4EF6");
    const appliedFiles = [];
    const skippedFiles = [];
    const errors = [];
    try {
      console.log("\u5F00\u59CB\u5E94\u7528\u66F4\u65B0\u6D41\u7A0B...");
      console.log("\u6B65\u9AA41: \u505C\u6B62\u5F53\u524D\u670D\u52A1...");
      const { stopped, errors: stopErrors } = await stopCurrentServices();
      errors.push(...stopErrors);
      console.log("\u5DF2\u505C\u6B62\u670D\u52A1:", stopped);
      console.log("\u6B65\u9AA42: \u8BB0\u5F55\u5F53\u524D\u7248\u672C\u6587\u4EF6\u6743\u9650...");
      const currentPermissions = await getDirectoryPermissions(projectRoot);
      const permissionsFile = join(projectRoot, "data", "file-permissions.json");
      await promises.writeFile(permissionsFile, JSON.stringify(currentPermissions, null, 2));
      console.log("\u6587\u4EF6\u6743\u9650\u5DF2\u8BB0\u5F55\u5230:", permissionsFile);
      console.log("\u6B65\u9AA43: \u67E5\u627E\u66F4\u65B0\u6587\u4EF6...");
      const updateItems = await promises.readdir(updateDir);
      const nonZipItems = updateItems.filter((item) => !item.endsWith(".zip"));
      if (nonZipItems.length === 0) {
        throw new Error("\u66F4\u65B0\u76EE\u5F55\u4E2D\u6CA1\u6709\u627E\u5230\u975Ezip\u6587\u4EF6");
      }
      const updateSourceDir = join(updateDir, nonZipItems[0]);
      const updateStat = await promises.stat(updateSourceDir);
      if (!updateStat.isDirectory()) {
        throw new Error("\u627E\u5230\u7684\u66F4\u65B0\u9879\u76EE\u4E0D\u662F\u76EE\u5F55");
      }
      console.log("\u627E\u5230\u66F4\u65B0\u6E90\u76EE\u5F55:", updateSourceDir);
      console.log("\u6B65\u9AA44: \u5E94\u7528\u66F4\u65B0\u6587\u4EF6...");
      const updateContents = await promises.readdir(updateSourceDir);
      for (const item of updateContents) {
        const sourcePath = join(updateSourceDir, item);
        const targetPath = join(projectRoot, item);
        try {
          const sourceStat = await promises.stat(sourcePath);
          if (sourceStat.isDirectory()) {
            try {
              await promises.access(targetPath);
              await promises.rm(targetPath, { recursive: true, force: true });
            } catch {
            }
            await execAsync(`mv "${sourcePath}" "${targetPath}"`);
            appliedFiles.push(item);
            const itemPermissions = await getDirectoryPermissions(targetPath);
            for (const [relativePath, _] of Object.entries(itemPermissions)) {
              const fullPath = join(targetPath, relativePath);
              const originalPermission = currentPermissions[join(item, relativePath)] || currentPermissions[relativePath] || "644";
              await setFilePermissions(fullPath, originalPermission);
            }
          } else {
            await execAsync(`mv "${sourcePath}" "${targetPath}"`);
            appliedFiles.push(item);
            const originalPermission = currentPermissions[item] || "644";
            await setFilePermissions(targetPath, originalPermission);
          }
        } catch (error) {
          errors.push(`\u5904\u7406 ${item} \u5931\u8D25: ${error.message}`);
          skippedFiles.push(item);
        }
      }
      await $fetch("/api/system/update-state", {
        method: "POST",
        body: {
          action: "complete-step",
          sessionId
        }
      });
      console.log("\u6B65\u9AA44\u5B8C\u6210\uFF0C8\u79D2\u540E\u81EA\u52A8\u542F\u52A8\u7B2C5\u6B65...");
      setTimeout(async () => {
        try {
          console.log("\u6B65\u9AA45: \u91CD\u542F\u670D\u52A1...");
          let retryCount = 0;
          const maxRetries = 3;
          let success2 = false;
          while (retryCount < maxRetries && !success2) {
            try {
              const { started, errors: startErrors } = await startServices(projectRoot);
              if (startErrors.length === 0) {
                success2 = true;
                console.log("\u670D\u52A1\u542F\u52A8\u6210\u529F:", started);
                await $fetch("/api/system/update-state", {
                  method: "POST",
                  body: {
                    action: "complete-step",
                    sessionId
                  }
                });
              } else {
                throw new Error(startErrors.join(", "));
              }
            } catch (error) {
              retryCount++;
              console.error(`\u7B2C${retryCount}\u6B21\u542F\u52A8\u5931\u8D25:`, error.message);
              if (retryCount >= maxRetries) {
                console.log("\u8FBE\u5230\u6700\u5927\u91CD\u8BD5\u6B21\u6570\uFF0C\u5F00\u59CB\u91CD\u65B0\u6784\u5EFA...");
                try {
                  await execAsync(`chmod -R 755 ${projectRoot}`);
                  await execAsync(`chmod 644 ${projectRoot}/package.json`);
                  await execAsync("npm install", { cwd: projectRoot });
                  await execAsync("npm run build", { cwd: projectRoot });
                  const { started, errors: finalErrors } = await startServices(projectRoot);
                  if (finalErrors.length === 0) {
                    console.log("\u91CD\u65B0\u6784\u5EFA\u540E\u542F\u52A8\u6210\u529F:", started);
                    success2 = true;
                    await $fetch("/api/system/update-state", {
                      method: "POST",
                      body: {
                        action: "complete-step",
                        sessionId
                      }
                    });
                  }
                } catch (buildError) {
                  console.error("\u91CD\u65B0\u6784\u5EFA\u5931\u8D25:", buildError.message);
                }
              } else {
                await new Promise((resolve) => setTimeout(resolve, 2e3));
              }
            }
          }
        } catch (error) {
          console.error("\u7B2C5\u6B65\u6267\u884C\u5931\u8D25:", error.message);
        }
      }, 8e3);
      const applyInfo = {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        sessionId,
        appliedFiles,
        skippedFiles,
        errors,
        stoppedServices: stopped,
        updateSourceDir
      };
      await promises.writeFile(
        join(projectRoot, "data", "last-update.json"),
        JSON.stringify(applyInfo, null, 2)
      );
      const hasErrors = errors.length > 0;
      const success = appliedFiles.length > 0;
      return {
        success,
        message: success ? "\u66F4\u65B0\u5E94\u7528\u6210\u529F\uFF0C8\u79D2\u540E\u81EA\u52A8\u91CD\u542F\u670D\u52A1" : "\u66F4\u65B0\u5E94\u7528\u65F6\u51FA\u73B0\u9519\u8BEF",
        data: {
          appliedFiles,
          skippedFiles,
          errors,
          stoppedServices: stopped,
          totalFiles: (updateContents == null ? void 0 : updateContents.length) || 0,
          successCount: appliedFiles.length,
          sessionId,
          autoRestartIn: 8
        }
      };
    } catch (error) {
      console.error("\u5E94\u7528\u66F4\u65B0\u5931\u8D25:", error);
      try {
        await $fetch("/api/system/update-state", {
          method: "POST",
          body: {
            action: "update",
            sessionId,
            error: `\u5E94\u7528\u66F4\u65B0\u5931\u8D25: ${error.message}`
          }
        });
      } catch (updateError) {
        console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", updateError);
      }
      throw createError({
        statusCode: 500,
        statusMessage: `\u5E94\u7528\u66F4\u65B0\u5931\u8D25: ${error.message}`
      });
    }
  } catch (error) {
    console.error("\u5E94\u7528\u66F4\u65B0\u5931\u8D25:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "\u5E94\u7528\u66F4\u65B0\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});

export { updateApply_post as default };
//# sourceMappingURL=update-apply.post.mjs.map
