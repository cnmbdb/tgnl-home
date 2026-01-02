import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import 'mysql2/promise';
import 'fs';
import 'path';
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
    const GITHUB_REPO = "cnmbdb/hf-tgnl-admin";
    const RELEASES_URL = `https://github.com/${GITHUB_REPO}/releases`;
    let currentVersion = "1.0.4";
    try {
      const fs = await import('fs');
      const path = await import('path');
      const packageJsonPath = path.default.resolve(process.cwd(), "package.json");
      const packageJsonContent = await fs.promises.readFile(packageJsonPath, "utf-8");
      const packageJson = JSON.parse(packageJsonContent);
      currentVersion = packageJson.version || "1.0.4";
    } catch (error) {
      console.warn("\u65E0\u6CD5\u8BFB\u53D6package.json\uFF0C\u4F7F\u7528\u9ED8\u8BA4\u7248\u672C\u53F7");
    }
    let hasUpdate = false;
    let updateInfo = null;
    let latestVersion = currentVersion;
    try {
      const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
        headers: {
          "Accept": "application/vnd.github+json",
          "User-Agent": "tgnl-admin"
        }
      });
      if (response.ok) {
        const release = await response.json();
        let versionStr = release.tag_name;
        const versionMatch = versionStr.match(/(\d+\.\d+\.\d+)/);
        if (versionMatch) {
          latestVersion = versionMatch[1];
        } else {
          latestVersion = versionStr.replace(/^v/, "");
        }
        console.log("GitHub\u6700\u65B0\u7248\u672C:", latestVersion, "\u5F53\u524D\u7248\u672C:", currentVersion);
        if (compareVersions(latestVersion, currentVersion) > 0) {
          hasUpdate = true;
          updateInfo = {
            version: latestVersion,
            name: release.name || `Release ${latestVersion}`,
            description: release.body || "\u65E0\u8BE6\u7EC6\u63CF\u8FF0",
            publishedAt: release.published_at,
            downloadUrl: RELEASES_URL,
            // 直接跳转到releases页面
            htmlUrl: release.html_url,
            changelog: release.body || "\u8BF7\u8BBF\u95EEGitHub\u67E5\u770B\u8BE6\u7EC6\u66F4\u65B0\u65E5\u5FD7"
          };
        }
      }
    } catch (error) {
      console.error("\u83B7\u53D6GitHub\u7248\u672C\u4FE1\u606F\u5931\u8D25:", error);
    }
    return {
      success: true,
      data: {
        currentVersion,
        latestVersion,
        hasUpdate,
        updateInfo,
        releasesUrl: RELEASES_URL,
        // 添加releases页面链接
        lastChecked: (/* @__PURE__ */ new Date()).toISOString(),
        source: "github-releases"
      }
    };
  } catch (error) {
    console.error("\u7248\u672C\u68C0\u67E5\u5931\u8D25:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      data: {
        currentVersion: "1.0.4",
        latestVersion: "1.0.4",
        hasUpdate: false,
        updateInfo: null,
        releasesUrl: "https://github.com/cnmbdb/hf-tgnl-admin/releases",
        lastChecked: (/* @__PURE__ */ new Date()).toISOString(),
        source: "fallback"
      }
    };
  }
});
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
