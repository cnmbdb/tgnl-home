import { d as defineEventHandler, a as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const updateDownload_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) || {};
    const { version, sessionId } = body;
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u4F1A\u8BDDID"
      });
    }
    const githubRepo = "cnmbdb/hf-tgnl-admin";
    let downloadUrl;
    let actualVersion = version;
    try {
      const { githubCache } = await import('../../../nitro/nitro.mjs').then(function (n) { return n.T; });
      const releasesData = await githubCache.getGitHubReleases(githubRepo);
      let targetRelease = null;
      let targetAsset = null;
      if (version) {
        console.log(`\u6B63\u5728\u67E5\u627E\u6307\u5B9A\u7248\u672C: ${version}`);
        targetRelease = releasesData.find((release) => {
          var _a;
          const asset = (_a = release.assets) == null ? void 0 : _a.find(
            (asset2) => asset2.name.includes("nl-admin") && asset2.name.endsWith(".zip")
          );
          if (asset) {
            const fileName = asset.name;
            if (fileName === version || fileName === `${version}.zip`) {
              return true;
            }
            const versionMatch = fileName.match(/nl-admin-(v?\d+\.\d+\.\d+)\.zip/);
            if (versionMatch && (versionMatch[1] === version || `v${versionMatch[1]}` === version)) {
              return true;
            }
          }
          return false;
        });
      } else {
        console.log("\u6B63\u5728\u67E5\u627E\u6700\u65B0\u7248\u672C...");
        for (const release of releasesData) {
          if (release.assets && release.assets.length > 0) {
            const zipAsset = release.assets.find(
              (asset) => asset.name.includes("nl-admin") && asset.name.endsWith(".zip")
            );
            if (zipAsset) {
              targetRelease = release;
              break;
            }
          }
        }
      }
      if (targetRelease) {
        targetAsset = targetRelease.assets.find(
          (asset) => asset.name.includes("nl-admin") && asset.name.endsWith(".zip")
        );
        if (targetAsset) {
          downloadUrl = targetAsset.browser_download_url;
          const fileName = targetAsset.name;
          actualVersion = fileName;
          console.log(`\u627E\u5230\u76EE\u6807\u7248\u672C: ${actualVersion}, \u4E0B\u8F7D\u94FE\u63A5: ${downloadUrl}`);
        } else {
          throw new Error(`\u7248\u672C ${targetRelease.tag_name} \u4E2D\u672A\u627E\u5230nl-admin\u538B\u7F29\u5305\u6587\u4EF6`);
        }
      } else {
        throw new Error(version ? `\u672A\u627E\u5230\u6307\u5B9A\u7248\u672C: ${version}` : "\u672A\u627E\u5230\u4EFB\u4F55\u53EF\u7528\u7248\u672C");
      }
      if (!downloadUrl) {
        throw new Error("\u672A\u627E\u5230\u53EF\u4E0B\u8F7D\u7684\u538B\u7F29\u5305");
      }
    } catch (error) {
      console.error("\u83B7\u53D6GitHub\u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25:", error);
      let errorMessage = (error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF";
      let statusCode = 500;
      if (error.name === "TimeoutError" || error.name === "AbortError") {
        errorMessage = "\u8FDE\u63A5GitHub\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u540E\u91CD\u8BD5";
      } else if (error.message.includes("fetch")) {
        errorMessage = "\u65E0\u6CD5\u8FDE\u63A5\u5230GitHub\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8BBE\u7F6E";
      } else if (error.message.includes("\u901F\u7387\u9650\u5236") || error.message.includes("rate limit")) {
        errorMessage = error.message;
        statusCode = 429;
      } else if (error.message.includes("403")) {
        errorMessage = "GitHub API\u8BBF\u95EE\u53D7\u9650\uFF0C\u53EF\u80FD\u662F\u901F\u7387\u9650\u5236\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5";
        statusCode = 429;
      }
      throw createError({
        statusCode,
        statusMessage: "GitHub API: " + errorMessage
      });
    }
    const updateDir = join(process.cwd(), "\u66F4\u65B0\u6587\u4EF6");
    try {
      await promises.access(updateDir);
    } catch {
      await promises.mkdir(updateDir, { recursive: true });
    }
    const backupDir = join(process.cwd(), "backup");
    try {
      await promises.mkdir(backupDir, { recursive: true });
    } catch (error) {
      console.warn("\u521B\u5EFA\u5907\u4EFD\u76EE\u5F55\u5931\u8D25\uFF0C\u53EF\u80FD\u5DF2\u5B58\u5728");
    }
    const downloadId = `download-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const updateFileName = `update-${actualVersion}-${Date.now()}.zip`;
    const updateFilePath = join(updateDir, updateFileName);
    try {
      const { setDownloadProgress } = await import('./update-progress.get.mjs');
      console.log(`\u521D\u59CB\u5316\u4E0B\u8F7D\u8FDB\u5EA6\uFF0CdownloadId: ${downloadId}`);
      setDownloadProgress(downloadId, {
        progress: 0,
        status: "downloading",
        message: "\u5F00\u59CB\u4E0B\u8F7D...",
        downloadedBytes: 0,
        totalBytes: 0
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 9e5);
      const response = await fetch(downloadUrl, {
        headers: {
          "User-Agent": "HF-TGNL-Admin-OTA-Updater"
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`\u4E0B\u8F7D\u5931\u8D25: ${response.status} ${response.statusText}`);
      }
      const totalBytes = parseInt(response.headers.get("content-length") || "0");
      let downloadedBytes = 0;
      let lastProgressUpdate = 0;
      let lastProgress = 0;
      setDownloadProgress(downloadId, {
        progress: 0,
        status: "downloading",
        message: "\u6B63\u5728\u4E0B\u8F7D...",
        downloadedBytes: 0,
        totalBytes
      });
      const chunks = [];
      if (response.body) {
        const reader = response.body.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
              downloadedBytes += value.length;
              chunks.push(Buffer.from(value));
              const progress = totalBytes > 0 ? Math.round(downloadedBytes / totalBytes * 100) : 0;
              const now = Date.now();
              if (now - lastProgressUpdate > 500 || progress - lastProgress >= 1) {
                setDownloadProgress(downloadId, {
                  progress,
                  status: "downloading",
                  message: `\u5DF2\u4E0B\u8F7D ${Math.round(downloadedBytes / 1024 / 1024 * 100) / 100} MB / ${Math.round(totalBytes / 1024 / 1024 * 100) / 100} MB`,
                  downloadedBytes,
                  totalBytes
                });
                lastProgressUpdate = now;
                lastProgress = progress;
                console.log(`\u4E0B\u8F7D\u8FDB\u5EA6 ${downloadId}: ${progress}% (${Math.round(downloadedBytes / 1024 / 1024 * 100) / 100} MB / ${Math.round(totalBytes / 1024 / 1024 * 100) / 100} MB)`);
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      }
      const buffer = Buffer.concat(chunks);
      console.log(`\u51C6\u5907\u5199\u5165\u6587\u4EF6: ${updateFilePath}, \u5927\u5C0F: ${buffer.length} bytes`);
      await promises.writeFile(updateFilePath, buffer);
      console.log(`\u6587\u4EF6\u5199\u5165\u5B8C\u6210: ${updateFilePath}`);
      setDownloadProgress(downloadId, {
        progress: 100,
        status: "completed",
        message: "\u4E0B\u8F7D\u5B8C\u6210",
        downloadedBytes: buffer.length,
        totalBytes: buffer.length
      });
      try {
        await $fetch("/api/system/update-state", {
          method: "POST",
          body: {
            action: "update",
            sessionId,
            downloadPath: updateFilePath
          }
        });
      } catch (error) {
        console.warn("\u66F4\u65B0\u72B6\u6001\u5931\u8D25:", error);
      }
      return {
        success: true,
        message: "\u66F4\u65B0\u6587\u4EF6\u4E0B\u8F7D\u6210\u529F",
        data: {
          version: actualVersion,
          filePath: updateFilePath,
          fileSize: buffer.length,
          downloadedAt: (/* @__PURE__ */ new Date()).toISOString(),
          downloadId,
          sessionId
        }
      };
    } catch (error) {
      console.error("\u4E0B\u8F7D\u66F4\u65B0\u6587\u4EF6\u5931\u8D25:", error);
      try {
        const { setDownloadProgress } = await import('./update-progress.get.mjs');
        setDownloadProgress(downloadId, {
          progress: 0,
          status: "failed",
          message: "\u4E0B\u8F7D\u5931\u8D25",
          downloadedBytes: 0,
          totalBytes: 0
        });
      } catch (progressError) {
        console.warn("\u66F4\u65B0\u4E0B\u8F7D\u8FDB\u5EA6\u5931\u8D25:", progressError);
      }
      let errorMessage = "\u4E0B\u8F7D\u66F4\u65B0\u6587\u4EF6\u5931\u8D25";
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "\u4E0B\u8F7D\u8D85\u65F6\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u540E\u91CD\u8BD5";
        } else if (error.message.includes("fetch")) {
          errorMessage = "\u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8BBE\u7F6E";
        } else {
          errorMessage = `\u4E0B\u8F7D\u5931\u8D25: ${error.message}`;
        }
      }
      throw createError({
        statusCode: 500,
        statusMessage: errorMessage
      });
    }
  } catch (error) {
    console.error("\u66F4\u65B0\u4E0B\u8F7D\u5931\u8D25:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u66F4\u65B0\u4E0B\u8F7D\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});

export { updateDownload_post as default };
//# sourceMappingURL=update-download.post.mjs.map
