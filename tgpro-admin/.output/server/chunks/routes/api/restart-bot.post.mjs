import { d as defineEventHandler, r as requireAdmin } from '../../nitro/nitro.mjs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
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
const restartBot_post = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    return {
      success: false,
      error: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    };
  }
  try {
    const projectRoot = process.cwd();
    const actualRoot = projectRoot.endsWith(".output") ? path.dirname(projectRoot) : projectRoot;
    const botDir = path.join(actualRoot, "hf-tgpro");
    const botScript = "hy.py";
    const botPath = path.join(botDir, botScript);
    const pythonPath = "/www/server/pyporject_evn/versions/3.9.7/bin/python3.9";
    if (!fs.existsSync(botPath)) {
      return {
        success: false,
        error: "\u673A\u5668\u4EBA\u6587\u4EF6\u4E0D\u5B58\u5728: " + botPath
      };
    }
    console.log("\u5F00\u59CB\u91CD\u542F\u673A\u5668\u4EBA\u8FDB\u7A0B...");
    try {
      console.log("\u6B63\u5728\u6E05\u7406\u6240\u6709\u673A\u5668\u4EBA\u76F8\u5173\u8FDB\u7A0B...");
      try {
        console.log("\u68C0\u67E5\u5E76\u6E05\u7406PM2\u8FDB\u7A0B...");
        const { stdout: pm2List } = await execAsync("pm2 jlist");
        const pm2Processes = JSON.parse(pm2List);
        for (const process2 of pm2Processes) {
          if (process2.pm2_env && process2.pm2_env.pm_exec_path && (process2.pm2_env.pm_exec_path.includes("hy.py") || process2.name.includes("bot") || process2.name.includes("tgpro"))) {
            console.log(`\u53D1\u73B0PM2\u673A\u5668\u4EBA\u8FDB\u7A0B: ${process2.name} (ID: ${process2.pm_id})`);
            try {
              await execAsync(`pm2 delete ${process2.pm_id}`);
              console.log(`\u5DF2\u5220\u9664PM2\u8FDB\u7A0B: ${process2.name}`);
            } catch (error) {
              console.log(`\u5220\u9664PM2\u8FDB\u7A0B\u5931\u8D25: ${process2.name}`, error);
            }
          }
        }
      } catch (error) {
        console.log("\u68C0\u67E5PM2\u8FDB\u7A0B\u5931\u8D25\u6216\u65E0PM2\u8FDB\u7A0B:", error);
      }
      try {
        console.log("\u67E5\u627E\u5E76\u6740\u6389Python\u673A\u5668\u4EBA\u8FDB\u7A0B...");
        try {
          const { stdout: pythonProcesses } = await execAsync("ps aux | grep hy.py | grep -v grep");
          if (pythonProcesses.trim()) {
            console.log("\u53D1\u73B0Python\u673A\u5668\u4EBA\u8FDB\u7A0B:");
            console.log(pythonProcesses);
            const lines = pythonProcesses.trim().split("\n");
            for (const line of lines) {
              const parts = line.trim().split(/\s+/);
              if (parts.length >= 2) {
                const pid = parts[1];
                try {
                  await execAsync(`kill -9 ${pid}`);
                  console.log(`\u5DF2\u6740\u6389Python\u8FDB\u7A0B PID: ${pid}`);
                } catch (error) {
                  console.log(`\u6740\u6389\u8FDB\u7A0B\u5931\u8D25 PID: ${pid}`, error);
                }
              }
            }
          } else {
            console.log("\u672A\u53D1\u73B0Python\u673A\u5668\u4EBA\u8FDB\u7A0B");
          }
        } catch (error) {
          console.log("\u672A\u53D1\u73B0Python\u673A\u5668\u4EBA\u8FDB\u7A0B\u6216\u67E5\u627E\u5931\u8D25:", error);
        }
        try {
          await execAsync('pkill -f "hy.py"');
          console.log("\u5DF2\u4F7F\u7528pkill\u6E05\u7406hy.py\u8FDB\u7A0B");
        } catch (error) {
          console.log("pkill\u6E05\u7406hy.py\u8FDB\u7A0B\u5931\u8D25\u6216\u65E0\u8FDB\u7A0B:", error);
        }
        try {
          await execAsync('pkill -f "hf-tgpro"');
          console.log("\u5DF2\u4F7F\u7528pkill\u6E05\u7406hf-tgpro\u8FDB\u7A0B");
        } catch (error) {
          console.log("pkill\u6E05\u7406hf-tgpro\u8FDB\u7A0B\u5931\u8D25\u6216\u65E0\u8FDB\u7A0B:", error);
        }
        try {
          const { stdout: pathProcesses } = await execAsync("ps aux | grep hf-tgpro | grep -v grep");
          if (pathProcesses.trim()) {
            console.log("\u53D1\u73B0hf-tgpro\u76F8\u5173\u8FDB\u7A0B:");
            console.log(pathProcesses);
            const lines = pathProcesses.trim().split("\n");
            for (const line of lines) {
              const parts = line.trim().split(/\s+/);
              if (parts.length >= 2) {
                const pid = parts[1];
                try {
                  await execAsync(`kill -9 ${pid}`);
                  console.log(`\u5DF2\u6E05\u7406hf-tgpro\u76F8\u5173\u8FDB\u7A0B PID: ${pid}`);
                } catch (error) {
                  console.log(`\u6E05\u7406\u8FDB\u7A0B\u5931\u8D25 PID: ${pid}`, error);
                }
              }
            }
          }
        } catch (error) {
          console.log("\u672A\u53D1\u73B0hf-tgpro\u76F8\u5173\u8FDB\u7A0B\u6216\u67E5\u627E\u5931\u8D25:", error);
        }
      } catch (error) {
        console.log("\u6E05\u7406Python\u8FDB\u7A0B\u5931\u8D25:", error);
      }
      console.log("\u7B49\u5F85\u8FDB\u7A0B\u6E05\u7406\u5B8C\u6210...");
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      console.log("\u6B63\u5728\u4F7F\u7528\u5B9D\u5854\u9762\u677FPython3.9.7\u542F\u52A8\u673A\u5668\u4EBA...");
      console.log(`Python\u8DEF\u5F84: ${pythonPath}`);
      console.log(`\u673A\u5668\u4EBA\u811A\u672C: ${botScript}`);
      console.log(`\u5DE5\u4F5C\u76EE\u5F55: ${botDir}`);
      const logDir = path.join(botDir, "logs");
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
        console.log("\u5DF2\u521B\u5EFA\u65E5\u5FD7\u76EE\u5F55:", logDir);
      }
      const logFile = path.join(logDir, "bot.log");
      const startCommand = `cd ${botDir} && nohup ${pythonPath} ${botScript} > ${logFile} 2>&1 &`;
      console.log("\u6267\u884C\u542F\u52A8\u547D\u4EE4:", startCommand);
      console.log("\u5DE5\u4F5C\u76EE\u5F55:", botDir);
      await execAsync(startCommand, {
        cwd: botDir,
        env: { ...process.env, PYTHONPATH: botDir }
      });
      console.log("\u542F\u52A8\u547D\u4EE4\u6267\u884C\u5B8C\u6210");
      console.log("\u7B49\u5F85\u673A\u5668\u4EBA\u542F\u52A8...");
      await new Promise((resolve) => setTimeout(resolve, 3e3));
      try {
        const { stdout: checkProcesses } = await execAsync("ps aux | grep hy.py | grep -v grep");
        if (checkProcesses.trim()) {
          console.log("\u673A\u5668\u4EBA\u8FDB\u7A0B\u542F\u52A8\u6210\u529F:");
          console.log(checkProcesses);
          const lines = checkProcesses.trim().split("\n");
          const processInfo = [];
          for (const line of lines) {
            const parts = line.trim().split(/\s+/);
            if (parts.length >= 11) {
              processInfo.push({
                user: parts[0],
                pid: parts[1],
                cpu: parts[2],
                memory: parts[3],
                command: parts.slice(10).join(" ")
              });
            }
          }
          return {
            success: true,
            message: "\u673A\u5668\u4EBA\u91CD\u542F\u6210\u529F",
            processes: processInfo,
            python_path: pythonPath,
            log_file: logFile,
            bot_dir: botDir
          };
        } else {
          let errorInfo = "\u672A\u77E5\u9519\u8BEF";
          try {
            if (fs.existsSync(logFile)) {
              const logContent = fs.readFileSync(logFile, "utf8");
              const lastLines = logContent.split("\n").slice(-10).join("\n");
              errorInfo = lastLines || "\u65E5\u5FD7\u6587\u4EF6\u4E3A\u7A7A";
            } else {
              errorInfo = "\u65E5\u5FD7\u6587\u4EF6\u4E0D\u5B58\u5728";
            }
          } catch (logError) {
            errorInfo = "\u65E0\u6CD5\u8BFB\u53D6\u65E5\u5FD7\u6587\u4EF6: " + logError.message;
          }
          return {
            success: false,
            error: "\u673A\u5668\u4EBA\u542F\u52A8\u5931\u8D25\uFF0C\u672A\u53D1\u73B0\u8FD0\u884C\u8FDB\u7A0B",
            log_info: errorInfo,
            python_path: pythonPath,
            log_file: logFile
          };
        }
      } catch (error) {
        console.log("\u68C0\u67E5\u8FDB\u7A0B\u72B6\u6001\u5931\u8D25\uFF0C\u4F46\u542F\u52A8\u547D\u4EE4\u5DF2\u6267\u884C:", error.message);
        return {
          success: true,
          message: "\u673A\u5668\u4EBA\u542F\u52A8\u547D\u4EE4\u5DF2\u6267\u884C",
          processes: [],
          python_path: pythonPath,
          log_file: logFile,
          bot_dir: botDir,
          note: "\u8FDB\u7A0B\u68C0\u67E5\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u9A8C\u8BC1\u673A\u5668\u4EBA\u72B6\u6001"
        };
      }
    } catch (error) {
      console.error("\u91CD\u542F\u673A\u5668\u4EBA\u65F6\u53D1\u751F\u9519\u8BEF:", error);
      return {
        success: false,
        error: error.message || "\u91CD\u542F\u673A\u5668\u4EBA\u5931\u8D25"
      };
    }
  } catch (error) {
    console.error("\u91CD\u542F\u673A\u5668\u4EBA\u65F6\u53D1\u751F\u9519\u8BEF:", error);
    return {
      success: false,
      error: error.message || "\u91CD\u542F\u673A\u5668\u4EBA\u5931\u8D25"
    };
  }
});

export { restartBot_post as default };
//# sourceMappingURL=restart-bot.post.mjs.map
