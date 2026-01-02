import { d as defineEventHandler, g as getQuery } from '../../../nitro/nitro.mjs';
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

const versionCheck_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const testMode = query.test === "true";
    const GITHUB_REPO = "cnmbdb/hf-tgpro-admin";
    let currentVersion = "1.0.0";
    try {
      const fs = await import('fs');
      const path = await import('path');
      const packageJsonPath = path.default.resolve(process.cwd(), "package.json");
      const packageJsonContent = await fs.promises.readFile(packageJsonPath, "utf-8");
      const packageJson = JSON.parse(packageJsonContent);
      currentVersion = packageJson.version || "1.0.0";
    } catch (error) {
      console.warn("\u65E0\u6CD5\u8BFB\u53D6package.json\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u7248\u672C\u53F7:", error instanceof Error ? error.message : String(error));
    }
    if (testMode) {
      const hasUpdate = true;
      const updateInfo = {
        version: "1.1.0",
        description: "\u6D4B\u8BD5\u66F4\u65B0\u7248\u672C",
        downloadUrl: "https://example.com/update.zip",
        size: 1024e3,
        publishedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        success: true,
        data: {
          currentVersion,
          latestVersion: "1.1.0",
          hasUpdate,
          updateInfo,
          lastChecked: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
    }
    try {
      console.log("\u6B63\u5728\u68C0\u67E5GitHub\u6700\u65B0\u7248\u672C...");
      const latestUrl = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
      const response = await fetch(latestUrl, {
        headers: {
          "User-Agent": "TGPro-Admin-Update-Checker",
          "Accept": "application/vnd.github.v3+json"
        }
      });
      if (!response.ok) {
        throw new Error(`GitHub API\u8BF7\u6C42\u5931\u8D25: ${response.status} ${response.statusText}`);
      }
      const latestRelease = await response.json();
      console.log("GitHub API\u54CD\u5E94:", {
        tag_name: latestRelease.tag_name,
        name: latestRelease.name,
        published_at: latestRelease.published_at
      });
      const latestVersion = latestRelease.name || latestRelease.tag_name || "1.0.0";
      console.log("Latest version name:", latestVersion);
      const hasUpdate = compareVersions(extractVersionNumber(latestVersion), currentVersion) > 0;
      console.log("\u7248\u672C\u6BD4\u8F83\u7ED3\u679C:", { hasUpdate, comparison: compareVersions(latestVersion, currentVersion) });
      let downloadUrl = latestRelease.zipball_url;
      let fileSize = 0;
      if (latestRelease.assets && latestRelease.assets.length > 0) {
        const zipAsset = latestRelease.assets.find(
          (asset) => asset.name.endsWith(".zip") && asset.name.includes("tgpro-admin")
        );
        if (zipAsset) {
          downloadUrl = zipAsset.browser_download_url;
          fileSize = zipAsset.size;
        }
      }
      const updateInfo = hasUpdate ? {
        version: latestVersion,
        description: latestRelease.body || "\u65B0\u7248\u672C\u53EF\u7528",
        downloadUrl,
        size: fileSize,
        publishedAt: latestRelease.published_at
      } : null;
      return {
        success: true,
        data: {
          currentVersion,
          latestVersion,
          hasUpdate,
          updateInfo,
          lastChecked: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
    } catch (fetchError) {
      console.error("GitHub\u7248\u672C\u68C0\u67E5\u5931\u8D25:", fetchError);
      return {
        success: true,
        data: {
          currentVersion,
          latestVersion: currentVersion,
          hasUpdate: false,
          updateInfo: null,
          lastChecked: (/* @__PURE__ */ new Date()).toISOString(),
          error: "\u65E0\u6CD5\u8FDE\u63A5\u5230GitHub\u68C0\u67E5\u66F4\u65B0: " + (fetchError instanceof Error ? fetchError.message : String(fetchError))
        }
      };
    }
  } catch (error) {
    console.error("\u7248\u672C\u68C0\u67E5\u5931\u8D25:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "\u7248\u672C\u68C0\u67E5\u5931\u8D25"
    };
  }
});
function extractVersionNumber(versionString) {
  let cleanVersion = versionString.replace(/^tgpro-admin-v/, "").replace(/^v/, "");
  const match = cleanVersion.match(/(\d+\.\d+\.\d+)/);
  if (match) {
    return match[1];
  }
  const simpleMatch = cleanVersion.match(/(\d+(?:\.\d+)*)/);
  if (simpleMatch) {
    return simpleMatch[1];
  }
  return cleanVersion || "1.0.0";
}
function compareVersions(version1, version2) {
  const v1Parts = version1.split(".").map(Number);
  const v2Parts = version2.split(".").map(Number);
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;
    if (v1Part > v2Part) return 1;
    if (v1Part < v2Part) return -1;
  }
  return 0;
}

export { versionCheck_get as default };
//# sourceMappingURL=version-check.get.mjs.map
