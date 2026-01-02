import { d as defineEventHandler, g as getQuery, c as createError } from '../../../nitro/nitro.mjs';
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

const downloadProgress = /* @__PURE__ */ new Map();
const updateProgress_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const downloadId = query.downloadId;
    if (!downloadId) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u7F3A\u5C11\u4E0B\u8F7DID"
      });
    }
    const progress = downloadProgress.get(downloadId) || {
      progress: 0,
      status: "pending",
      message: "\u51C6\u5907\u4E0B\u8F7D...",
      downloadedBytes: 0,
      totalBytes: 0
    };
    console.log(`\u83B7\u53D6\u4E0B\u8F7D\u8FDB\u5EA6\uFF0CdownloadId: ${downloadId}, progress:`, progress);
    return {
      success: true,
      data: progress
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u4E0B\u8F7D\u8FDB\u5EA6\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u83B7\u53D6\u4E0B\u8F7D\u8FDB\u5EA6\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});
const setDownloadProgress = (downloadId, progress) => {
  downloadProgress.set(downloadId, progress);
};
const getDownloadProgress = (downloadId) => {
  return downloadProgress.get(downloadId);
};
const clearDownloadProgress = (downloadId) => {
  downloadProgress.delete(downloadId);
};

export { clearDownloadProgress, updateProgress_get as default, getDownloadProgress, setDownloadProgress };
//# sourceMappingURL=update-progress.get.mjs.map
