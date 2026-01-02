import { d as defineEventHandler, b as requireAuth, c as createError, a as readBody, e as executeQuery, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
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

async function getWordPressOrder(orderNumber, productId) {
  const config = useRuntimeConfig();
  const wpUrl = config.wordpressUrl;
  const username = config.wordpressUsername;
  const appPassword = config.wordpressAppPassword;
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
const validateOrder_post = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "\u672A\u6388\u6743\u8BBF\u95EE"
    });
  }
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
      const license = existingLicense[0];
      let productInfo = {};
      try {
        productInfo = typeof license.product_info === "string" ? JSON.parse(license.product_info) : license.product_info || {};
      } catch (e) {
        productInfo = {};
      }
      return {
        valid: true,
        message: "\u8BA2\u5355\u5DF2\u6FC0\u6D3B",
        activated: true,
        license: {
          orderId: license.order_id,
          orderNumber: license.order_number,
          customerEmail: license.email,
          customerName: license.customer_name,
          edition: productInfo.edition || "\u6807\u51C6\u7248",
          duration: productInfo.duration_days || 365,
          expiryDate: license.expiry_date,
          activatedAt: license.activated_at
        }
      };
    }
    const config = useRuntimeConfig();
    const productId = parseInt(config.wordpressProductId || "2101");
    const orderInfo = await getWordPressOrder(orderNumber, productId);
    if (!orderInfo) {
      return {
        valid: false,
        message: "\u8BA2\u5355\u4E0D\u5B58\u5728\u6216\u9A8C\u8BC1\u5931\u8D25"
      };
    }
    const productName = orderInfo.product_name || "";
    const duration = getProductDuration(productName);
    const payTime = orderInfo.pay_time || (/* @__PURE__ */ new Date()).toISOString();
    const expiryDate = calculateExpiryDate(payTime, duration);
    const edition = getEditionFromProduct(productName);
    return {
      valid: true,
      message: "\u8BA2\u5355\u9A8C\u8BC1\u6210\u529F",
      license: {
        orderId: orderInfo.order_id,
        orderNumber,
        customerEmail: orderInfo.user_email,
        customerName: orderInfo.user_name,
        edition,
        duration,
        expiryDate,
        activatedAt: payTime
      }
    };
  } catch (error) {
    console.error("WordPress\u8BA2\u5355\u9A8C\u8BC1\u5931\u8D25:", error);
    if (error.statusCode) {
      throw error;
    }
    return {
      valid: false,
      message: `\u9A8C\u8BC1\u5931\u8D25: ${error.message}`
    };
  }
});

export { validateOrder_post as default };
//# sourceMappingURL=validate-order.post.mjs.map
