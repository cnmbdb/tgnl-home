import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import { promises } from 'fs';
import path from 'path';
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

const checkUpdateFolder_get = defineEventHandler(async (event) => {
  try {
    const updateFolderPath = path.join(process.cwd(), "\u66F4\u65B0\u6587\u4EF6");
    try {
      await promises.access(updateFolderPath);
    } catch {
      await promises.mkdir(updateFolderPath, { recursive: true });
      return {
        success: true,
        data: {
          isEmpty: true,
          fileCount: 0,
          files: []
        }
      };
    }
    const files = await promises.readdir(updateFolderPath);
    const validFiles = files.filter(
      (file) => !file.startsWith(".") && !file.startsWith("__") && file !== "Thumbs.db"
    );
    const fileDetails = [];
    for (const file of validFiles) {
      try {
        const filePath = path.join(updateFolderPath, file);
        const stats = await promises.stat(filePath);
        fileDetails.push({
          name: file,
          size: stats.size,
          isDirectory: stats.isDirectory(),
          modifiedAt: stats.mtime
        });
      } catch (error) {
        console.error(`\u83B7\u53D6\u6587\u4EF6\u4FE1\u606F\u5931\u8D25: ${file}`, error);
      }
    }
    return {
      success: true,
      data: {
        isEmpty: validFiles.length === 0,
        fileCount: validFiles.length,
        files: fileDetails
      }
    };
  } catch (error) {
    console.error("\u68C0\u67E5\u66F4\u65B0\u6587\u4EF6\u5939\u5931\u8D25:", error);
    return {
      success: false,
      message: "\u68C0\u67E5\u66F4\u65B0\u6587\u4EF6\u5939\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    };
  }
});

export { checkUpdateFolder_get as default };
//# sourceMappingURL=check-update-folder.get.mjs.map
