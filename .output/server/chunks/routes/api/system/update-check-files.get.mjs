import { d as defineEventHandler, c as createError } from '../../../nitro/nitro.mjs';
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

const updateCheckFiles_get = defineEventHandler(async (event) => {
  try {
    const updateDir = join(process.cwd(), "\u66F4\u65B0\u6587\u4EF6");
    try {
      await promises.access(updateDir);
    } catch {
      return {
        success: true,
        data: {
          hasDownloadedFiles: false,
          files: []
        }
      };
    }
    const files = await promises.readdir(updateDir);
    const zipFiles = files.filter(
      (file) => file.endsWith(".zip") && (file.includes("update-nl-admin") || file.includes("nl-admin-") || file.includes("nl-admin"))
    );
    const fileDetails = [];
    for (const file of zipFiles) {
      const filePath = join(updateDir, file);
      try {
        const stats = await promises.stat(filePath);
        if (stats.size > 0) {
          fileDetails.push({
            name: file,
            path: filePath,
            size: stats.size,
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime
          });
        }
      } catch (error) {
        console.warn(`\u65E0\u6CD5\u83B7\u53D6\u6587\u4EF6 ${file} \u7684\u4FE1\u606F:`, error);
      }
    }
    fileDetails.sort((a, b) => new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime());
    return {
      success: true,
      data: {
        hasDownloadedFiles: fileDetails.length > 0,
        files: fileDetails,
        latestFile: fileDetails[0] || null
      }
    };
  } catch (error) {
    console.error("\u68C0\u67E5\u4E0B\u8F7D\u6587\u4EF6\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u68C0\u67E5\u4E0B\u8F7D\u6587\u4EF6\u5931\u8D25: " + error.message
    });
  }
});

export { updateCheckFiles_get as default };
//# sourceMappingURL=update-check-files.get.mjs.map
