import { d as defineEventHandler } from '../../nitro/nitro.mjs';
import { exec } from 'child_process';
import { promisify } from 'util';
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

const execAsync = promisify(exec);
const botStatus_get = defineEventHandler(async (event) => {
  try {
    const botProcesses = await getBotProcesses();
    return {
      success: true,
      data: {
        processes: botProcesses,
        processCount: botProcesses.length,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u673A\u5668\u4EBA\u72B6\u6001\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u83B7\u53D6\u673A\u5668\u4EBA\u72B6\u6001\u5931\u8D25",
      data: {
        processes: [],
        processCount: 0,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  }
});
async function getBotProcesses() {
  try {
    const processes = [];
    const { stdout } = await execAsync(`ps aux | grep "hy.py" | grep -v grep`);
    if (stdout.trim()) {
      const lines = stdout.trim().split("\n");
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 11) {
          const user = parts[0];
          const pid = parseInt(parts[1]);
          const cpuUsage = parseFloat(parts[2]);
          const memUsage = parseFloat(parts[3]);
          const startTime = parts[8];
          const command = parts.slice(10).join(" ");
          const processInfo = await getProcessDetails(pid);
          processes.push({
            pid,
            name: "Telegram Bot (hy.py)",
            cpuUsage,
            memUsage,
            status: "running",
            uptime: processInfo.uptime,
            startedAt: processInfo.startedAt,
            command,
            workingDir: (() => {
              const projectRoot = process.cwd();
              const actualRoot = projectRoot.endsWith(".output") ? path.dirname(projectRoot) : projectRoot;
              return path.join(actualRoot, "hf-tgpro");
            })(),
            user,
            startTime
          });
        }
      }
    }
    return processes;
  } catch (error) {
    console.error("\u83B7\u53D6\u8FDB\u7A0B\u4FE1\u606F\u5931\u8D25:", error);
    return [];
  }
}
async function getProcessDetails(pid) {
  try {
    const { stdout: statOutput } = await execAsync(`ps -o lstart= -p ${pid}`);
    const startedAt = new Date(statOutput.trim()).toISOString();
    const now = /* @__PURE__ */ new Date();
    const startTime = new Date(startedAt);
    const uptimeSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1e3);
    return {
      startedAt,
      uptime: formatUptime(uptimeSeconds)
    };
  } catch (error) {
    const now = /* @__PURE__ */ new Date();
    return {
      startedAt: now.toISOString(),
      uptime: "\u672A\u77E5"
    };
  }
}
function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

export { botStatus_get as default };
//# sourceMappingURL=bot-status.get.mjs.map
