import { d as defineEventHandler, b as getHeaders, a as readBody, c as createError, e as executeQuery, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
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

async function getWordPressOrder(orderNumber, productId) {
  const config = useRuntimeConfig();
  const wpUrl = config.WORDPRESS_URL;
  const username = config.WORDPRESS_USERNAME;
  const appPassword = config.WORDPRESS_APP_PASSWORD;
  try {
    const auth = Buffer.from(`${username}:${appPassword}`).toString("base64");
    const response = await $fetch(`${wpUrl}/wp-json/zibll/v1/order/${orderNumber}`, {
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      }
    });
    console.log("[WordPress API] \u8BA2\u5355\u67E5\u8BE2\u6210\u529F:", response);
    const order = response;
    if (order.pay_status !== "1") {
      throw new Error("\u8BA2\u5355\u672A\u652F\u4ED8");
    }
    if (order.product_id !== productId) {
      throw new Error(`\u5546\u54C1ID\u4E0D\u5339\u914D\uFF0C\u671F\u671B${productId}\uFF0C\u5B9E\u9645${order.product_id}`);
    }
    return order;
  } catch (error) {
    console.error("[WordPress API] \u8BA2\u5355\u67E5\u8BE2\u5931\u8D25:", error);
    throw error;
  }
}
const activateOrder_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  console.log("[\u6FC0\u6D3B\u8BA2\u5355] \u5F00\u59CB\u5904\u7406\u6FC0\u6D3B\u8BF7\u6C42");
  const headers = getHeaders(event);
  let clientIp = ((_a = headers["x-forwarded-for"]) == null ? void 0 : _a.split(",")[0].trim()) || headers["x-real-ip"] || event.node.req.socket.remoteAddress || "localhost";
  if (clientIp === "::1" || clientIp === "::ffff:127.0.0.1") {
    clientIp = "localhost";
  }
  console.log("[\u6FC0\u6D3B\u8BA2\u5355] \u5BA2\u6237\u7AEFIP:", clientIp);
  try {
    const body = await readBody(event);
    const { orderNumber } = body;
    if (!orderNumber) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u8BA2\u5355\u53F7\u4E0D\u80FD\u4E3A\u7A7A"
      });
    }
    const existingLicense = await executeQuery(
      "SELECT * FROM licenses WHERE order_number = ?",
      [orderNumber]
    );
    if (existingLicense.length > 0) {
      console.log("[\u6FC0\u6D3B] \u8BA2\u5355\u5DF2\u6FC0\u6D3B,\u9A8C\u8BC1\u5F53\u524D\u670D\u52A1\u5668IP\u662F\u5426\u5DF2\u6388\u6743");
      const config2 = useRuntimeConfig();
      try {
        const auth = Buffer.from(`${config2.WORDPRESS_USERNAME}:${config2.WORDPRESS_APP_PASSWORD}`).toString("base64");
        const wpResponse = await $fetch(`${config2.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json"
          },
          body: {
            order_num: orderNumber,
            server_ip: clientIp
            // 使用动态获取的客户端IP
          }
        });
        console.log("[WordPress] IP\u9A8C\u8BC1\u54CD\u5E94:", wpResponse);
        if (wpResponse.status === "success") {
          return {
            success: true,
            message: "\u5F53\u524D\u670D\u52A1\u5668\u5DF2\u6388\u6743,\u65E0\u9700\u91CD\u590D\u6FC0\u6D3B",
            license: {
              id: existingLicense[0].order_id,
              orderNumber,
              edition: getEditionFromProduct(existingLicense[0].license_type),
              expiryDate: existingLicense[0].expiry_date,
              activatedAt: existingLicense[0].activated_at
            }
          };
        }
      } catch (wpError) {
        console.error("[WordPress] IP\u9A8C\u8BC1\u5931\u8D25:", wpError);
        console.error("[WordPress] \u9519\u8BEF\u8BE6\u60C5:", wpError.data);
        throw createError({
          statusCode: 403,
          statusMessage: ((_b = wpError.data) == null ? void 0 : _b.message) || "\u5F53\u524D\u670D\u52A1\u5668IP\u672A\u6388\u6743,\u8BF7\u5148\u5728WordPress\u7528\u6237\u8D44\u6599\u4E2D\u7ED1\u5B9A\u6B64\u670D\u52A1\u5668IP"
        });
      }
    }
    const config = useRuntimeConfig();
    const productId = parseInt(config.WORDPRESS_PRODUCT_ID || "2061");
    console.log("[\u6FC0\u6D3B] \u6B63\u5728\u67E5\u8BE2\u8BA2\u5355:", orderNumber);
    const orderInfo = await getWordPressOrder(orderNumber, productId);
    if (!orderInfo) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u8BA2\u5355\u4E0D\u5B58\u5728\u6216\u9A8C\u8BC1\u5931\u8D25"
      });
    }
    console.log("[\u6FC0\u6D3B] \u8BA2\u5355\u9A8C\u8BC1\u6210\u529F:", orderInfo);
    console.log("[\u6FC0\u6D3B] \u9A8C\u8BC1\u670D\u52A1\u5668IP:", clientIp);
    try {
      const auth = Buffer.from(`${config.WORDPRESS_USERNAME}:${config.WORDPRESS_APP_PASSWORD}`).toString("base64");
      const verifyResponse = await $fetch(`${config.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/json"
        },
        body: {
          order_num: orderNumber,
          server_ip: clientIp
          // 使用动态获取的客户端IP
        }
      });
      console.log("[WordPress] IP\u9A8C\u8BC1\u6210\u529F:", verifyResponse);
    } catch (verifyError) {
      console.error("[WordPress] IP\u9A8C\u8BC1\u5931\u8D25:", verifyError);
      console.error("[WordPress] \u9519\u8BEF\u8BE6\u60C5:", verifyError.data);
      throw createError({
        statusCode: 403,
        statusMessage: ((_c = verifyError.data) == null ? void 0 : _c.message) || "\u5F53\u524D\u670D\u52A1\u5668IP\u672A\u6388\u6743\u3002\u8BF7\u5148\u8BBF\u95EEWordPress\u7F51\u7AD9,\u5728\u4E2A\u4EBA\u8D44\u6599\u4E2D\u7ED1\u5B9A\u6B64\u670D\u52A1\u5668IP (\u6700\u591A4\u4E2A)"
      });
    }
    const productName = orderInfo.product_name || "";
    const duration = getProductDuration(productName);
    const payTime = orderInfo.pay_time || (/* @__PURE__ */ new Date()).toISOString();
    const expiryDate = calculateExpiryDate(payTime, duration);
    const edition = getEditionFromProduct(productName);
    await executeQuery(
      `INSERT INTO licenses (
        order_number, 
        order_id, 
        email, 
        customer_name, 
        product_info,
        license_type,
        expiry_date, 
        activated_at,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [
        orderNumber,
        orderInfo.order_id,
        orderInfo.user_email,
        orderInfo.user_name,
        JSON.stringify({
          product_name: orderInfo.product_name,
          edition,
          duration_days: duration,
          price: orderInfo.pay_price
        }),
        duration >= 365 ? "yearly" : "monthly",
        expiryDate,
        payTime
      ]
    );
    await executeQuery(
      `INSERT INTO license_history (
        order_number,
        action,
        server_ip,
        details,
        created_at
      ) VALUES (?, 'activate', ?, ?, NOW())`,
      [
        orderNumber,
        config.SERVER_IP || "localhost",
        `\u4F7F\u7528WordPress\u8BA2\u5355 #${orderInfo.order_id} \u6FC0\u6D3B\u6388\u6743`
      ]
    );
    return {
      success: true,
      message: "\u6388\u6743\u6FC0\u6D3B\u6210\u529F",
      license: {
        id: orderInfo.order_id,
        orderNumber,
        edition,
        expiryDate,
        activatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("\u8BA2\u5355\u6FC0\u6D3B\u5931\u8D25:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u6FC0\u6D3B\u5931\u8D25: " + error.message
    });
  }
});
function getProductDuration(productName) {
  if (productName.includes("\u6708")) {
    const match = productName.match(/(\d+)个?月/);
    if (match) {
      return parseInt(match[1]) * 30;
    }
  }
  if (productName.includes("\u5E74")) {
    const match = productName.match(/(\d+)年/);
    if (match) {
      return parseInt(match[1]) * 365;
    }
  }
  return 365;
}
function calculateExpiryDate(startDate, durationDays) {
  const start = new Date(startDate);
  const expiry = new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1e3);
  return expiry.toISOString().split("T")[0];
}
function getEditionFromProduct(productName) {
  if (productName.includes("\u4F01\u4E1A\u7248") || productName.includes("Enterprise")) {
    return "\u4F01\u4E1A\u7248";
  }
  if (productName.includes("\u4E13\u4E1A\u7248") || productName.includes("Professional")) {
    return "\u4E13\u4E1A\u7248";
  }
  if (productName.includes("\u57FA\u7840\u7248") || productName.includes("Basic")) {
    return "\u57FA\u7840\u7248";
  }
  return "\u6807\u51C6\u7248";
}

export { activateOrder_post as default };
//# sourceMappingURL=activate-order.post.mjs.map
