import { d as defineEventHandler, a as readBody, e as executeQuery } from '../../../nitro/nitro.mjs';
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

const retry_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { orderId, order_id } = body;
    const finalOrderId = orderId || order_id;
    if (!finalOrderId) {
      return {
        success: false,
        error: "\u8BA2\u5355ID\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    const getOrderQuery = "SELECT * FROM orders WHERE order_id = ?";
    const orders = await executeQuery(getOrderQuery, [finalOrderId]);
    if (orders.length === 0) {
      return {
        success: false,
        error: "\u8BA2\u5355\u4E0D\u5B58\u5728"
      };
    }
    const order = orders[0];
    if (order.status !== "failed") {
      return {
        success: false,
        error: "\u53EA\u80FD\u91CD\u65B0\u5F00\u901A\u5931\u8D25\u7684\u8BA2\u5355"
      };
    }
    const updateQuery = `
      UPDATE orders 
      SET status = 'processing', 
          failure_reason = NULL, 
          updated_at = CURRENT_TIMESTAMP 
      WHERE order_id = ?
    `;
    await executeQuery(updateQuery, [finalOrderId]);
    try {
      console.log(`\u91CD\u65B0\u5F00\u901A\u8BA2\u5355: ${finalOrderId}, \u7528\u6237: ${order.username}, \u91D1\u989D: ${order.amount}`);
      const { spawn } = require("child_process");
      const pythonPath = "/www/server/pyporject_evn/versions/3.9.7/bin/python3.9";
      const scriptPath = "/www/wwwroot/tgpro-admin/hf-tgpro/retry_order.py";
      const retryProcess = spawn(pythonPath, [scriptPath, finalOrderId], {
        cwd: "/www/wwwroot/tgpro-admin/hf-tgpro",
        stdio: ["pipe", "pipe", "pipe"]
      });
      let stdout = "";
      let stderr = "";
      retryProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });
      retryProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });
      await new Promise((resolve, reject) => {
        retryProcess.on("close", (code) => {
          console.log(`\u91CD\u65B0\u5F00\u901A\u811A\u672C\u6267\u884C\u5B8C\u6210\uFF0C\u9000\u51FA\u4EE3\u7801: ${code}`);
          console.log(`\u6807\u51C6\u8F93\u51FA: ${stdout}`);
          if (stderr) {
            console.log(`\u6807\u51C6\u9519\u8BEF: ${stderr}`);
          }
          if (code === 0) {
            console.log(`\u8BA2\u5355 ${orderId} \u91CD\u65B0\u5F00\u901A\u6210\u529F`);
            resolve(true);
          } else {
            console.log(`\u8BA2\u5355 ${orderId} \u91CD\u65B0\u5F00\u901A\u5931\u8D25`);
            resolve(false);
          }
        });
        retryProcess.on("error", (error) => {
          console.error("\u6267\u884C\u91CD\u65B0\u5F00\u901A\u811A\u672C\u5931\u8D25:", error);
          reject(error);
        });
        setTimeout(() => {
          retryProcess.kill();
          reject(new Error("\u91CD\u65B0\u5F00\u901A\u811A\u672C\u6267\u884C\u8D85\u65F6"));
        }, 6e4);
      });
    } catch (retryError) {
      console.error("\u91CD\u65B0\u5F00\u901A\u8BA2\u5355\u5931\u8D25:", retryError);
      const failQuery = `
        UPDATE orders 
        SET status = 'failed', 
            failure_reason = '\u91CD\u65B0\u5F00\u901A\u8FC7\u7A0B\u4E2D\u51FA\u73B0\u9519\u8BEF',
            updated_at = CURRENT_TIMESTAMP 
        WHERE order_id = ?
      `;
      await executeQuery(failQuery, [orderId]);
    }
    return {
      success: true,
      message: "\u8BA2\u5355\u91CD\u65B0\u5F00\u901A\u8BF7\u6C42\u5DF2\u63D0\u4EA4"
    };
  } catch (error) {
    console.error("\u91CD\u65B0\u5F00\u901A\u8BA2\u5355\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u91CD\u65B0\u5F00\u901A\u8BA2\u5355\u5931\u8D25"
    };
  }
});

export { retry_post as default };
//# sourceMappingURL=retry.post.mjs.map
