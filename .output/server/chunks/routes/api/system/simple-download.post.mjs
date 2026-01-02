import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
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

const simpleDownload_post = defineEventHandler(async (event) => {
  var _a;
  try {
    const githubRepo = "cnmbdb/hf-tgnl-admin";
    const releaseResponse = await fetch(`https://api.github.com/repos/${githubRepo}/releases/latest`, {
      headers: {
        "User-Agent": "HF-TGNL-Admin-Simple-Downloader",
        "Accept": "application/vnd.github.v3+json"
      }
    });
    if (!releaseResponse.ok) {
      throw new Error(`\u83B7\u53D6\u7248\u672C\u4FE1\u606F\u5931\u8D25: ${releaseResponse.status}`);
    }
    const releaseData = await releaseResponse.json();
    const zipAsset = (_a = releaseData.assets) == null ? void 0 : _a.find(
      (asset) => asset.name.endsWith(".zip") && asset.name.includes("nl-admin")
    );
    const downloadUrl = zipAsset ? zipAsset.browser_download_url : releaseData.zipball_url;
    const version = releaseData.tag_name;
    console.log(`\u4E0B\u8F7D\u6587\u4EF6: ${zipAsset ? zipAsset.name : "\u6E90\u7801\u538B\u7F29\u5305"}`);
    const downloadDir = join(process.cwd(), "\u66F4\u65B0\u6587\u4EF6");
    try {
      await promises.access(downloadDir);
    } catch {
      await promises.mkdir(downloadDir, { recursive: true });
    }
    const fileName = `${version}-${Date.now()}.zip`;
    const filePath = join(downloadDir, fileName);
    console.log(`\u5F00\u59CB\u4E0B\u8F7D: ${downloadUrl}`);
    const downloadResponse = await fetch(downloadUrl, {
      headers: {
        "User-Agent": "HF-TGNL-Admin-Simple-Downloader"
      }
    });
    if (!downloadResponse.ok) {
      throw new Error(`\u4E0B\u8F7D\u5931\u8D25: ${downloadResponse.status}`);
    }
    const arrayBuffer = await downloadResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await promises.writeFile(filePath, buffer);
    console.log(`\u4E0B\u8F7D\u5B8C\u6210: ${filePath}`);
    return {
      success: true,
      message: "\u4E0B\u8F7D\u5B8C\u6210",
      data: {
        version,
        filePath,
        fileName,
        fileSize: buffer.length,
        downloadedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("\u4E0B\u8F7D\u5931\u8D25:", error);
    return {
      success: false,
      message: "\u4E0B\u8F7D\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    };
  }
});

export { simpleDownload_post as default };
//# sourceMappingURL=simple-download.post.mjs.map
