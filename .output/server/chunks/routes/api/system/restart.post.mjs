import { d as defineEventHandler, b as getHeaders, c as createError, a as readBody } from '../../../nitro/nitro.mjs';
import { spawn, exec as exec$1 } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import 'mysql2/promise';
import 'fs';
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

const exec = promisify(exec$1);
const restart_post = defineEventHandler(async (event) => {
  try {
    const headers = getHeaders(event);
    const authHeader = headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError({
        statusCode: 401,
        statusMessage: "\u672A\u6388\u6743\u8BBF\u95EE"
      });
    }
    const body = await readBody(event);
    const { restartType = "all" } = body;
    setTimeout(async () => {
      console.log(`\u7CFB\u7EDF\u6B63\u5728\u91CD\u542F (${restartType})...`);
      try {
        if (restartType === "all" || restartType === "robot") {
          console.log("\u6B63\u5728\u91CD\u542F\u673A\u5668\u4EBA\u7AEF...");
          try {
            await exec('pkill -f "python.*al.py" || true');
            console.log("\u673A\u5668\u4EBA\u7AEF\u8FDB\u7A0B\u5DF2\u7EC8\u6B62");
            setTimeout(() => {
              const robotProcess = spawn("python3", ["al.py"], {
                cwd: join(process.cwd(), "nl-2333"),
                detached: true,
                stdio: "ignore"
              });
              robotProcess.unref();
              console.log("\u673A\u5668\u4EBA\u7AEF\u5DF2\u91CD\u65B0\u542F\u52A8");
            }, 1e3);
          } catch (error) {
            console.warn("\u91CD\u542F\u673A\u5668\u4EBA\u7AEF\u5931\u8D25:", error);
          }
        }
        if (restartType === "all" || restartType === "frontend") {
          console.log("\u6B63\u5728\u91CD\u542F\u524D\u7AEF...");
          const pm2Restart = spawn("pm2", ["restart", "all"], {
            detached: true,
            stdio: "ignore"
          });
          pm2Restart.on("error", (error) => {
            console.warn("PM2\u91CD\u542F\u5931\u8D25\uFF0C\u5C1D\u8BD5\u8FDB\u7A0B\u9000\u51FA:", error);
            process.exit(0);
          });
          pm2Restart.on("close", (code) => {
            if (code !== 0) {
              console.warn("PM2\u91CD\u542F\u8FD4\u56DE\u975E\u96F6\u4EE3\u7801\uFF0C\u5C1D\u8BD5\u8FDB\u7A0B\u9000\u51FA");
              process.exit(0);
            } else {
              console.log("\u524D\u7AEF\u5DF2\u91CD\u65B0\u542F\u52A8");
            }
          });
          setTimeout(() => {
            console.log("\u91CD\u542F\u8D85\u65F6\uFF0C\u5F3A\u5236\u9000\u51FA\u8FDB\u7A0B");
            process.exit(0);
          }, 15e3);
        }
      } catch (error) {
        console.error("\u91CD\u542F\u8FC7\u7A0B\u4E2D\u51FA\u73B0\u9519\u8BEF:", error);
        process.exit(1);
      }
    }, 2e3);
    return {
      success: true,
      message: "\u7CFB\u7EDF\u5C06\u57282\u79D2\u540E\u91CD\u542F",
      data: {
        restartAt: new Date(Date.now() + 2e3).toISOString()
      }
    };
  } catch (error) {
    console.error("\u7CFB\u7EDF\u91CD\u542F\u5931\u8D25:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u7CFB\u7EDF\u91CD\u542F\u5931\u8D25: " + ((error == null ? void 0 : error.message) || "\u672A\u77E5\u9519\u8BEF")
    });
  }
});

export { restart_post as default };
//# sourceMappingURL=restart.post.mjs.map
