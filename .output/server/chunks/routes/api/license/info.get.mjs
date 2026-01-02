import { d as defineEventHandler, u as useRuntimeConfig, b as getHeaders, e as executeQuery, c as createError } from '../../../nitro/nitro.mjs';
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

const info_get = defineEventHandler(async (event) => {
  var _a;
  try {
    const config = useRuntimeConfig();
    const headers = getHeaders(event);
    const clientIp = ((_a = headers["x-forwarded-for"]) == null ? void 0 : _a.split(",")[0].trim()) || headers["x-real-ip"] || event.node.req.socket.remoteAddress || "localhost";
    const normalizedIp = clientIp === "::1" || clientIp === "127.0.0.1" ? "localhost" : clientIp;
    const licenseResult = await executeQuery(
      'SELECT * FROM licenses WHERE status = "active" ORDER BY activated_at DESC LIMIT 1',
      []
    );
    if (licenseResult.length === 0) {
      return {
        isActive: false,
        orderNumber: "",
        serverIp: normalizedIp,
        authorizedIps: [],
        message: "\u6388\u6743\u672A\u6FC0\u6D3B\uFF0C\u8BF7\u4F7F\u7528\u8BA2\u5355\u53F7\u6FC0\u6D3B"
      };
    }
    const license = licenseResult[0];
    const orderNumber = license.order_number;
    let authorizedIps = [];
    try {
      const wpResponse = await $fetch(`${config.WORDPRESS_URL}/wp-json/zibll/v1/servers`, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${Buffer.from(`${config.WORDPRESS_USERNAME}:${config.WORDPRESS_APP_PASSWORD}`).toString("base64")}`,
          "Content-Type": "application/json"
        }
      });
      if (Array.isArray(wpResponse)) {
        authorizedIps = wpResponse.map((s) => s.server_ip);
      }
    } catch (error) {
      console.error("[Info] \u83B7\u53D6WordPress\u6388\u6743IP\u5217\u8868\u5931\u8D25:", error);
      authorizedIps = normalizedIp ? [normalizedIp] : [];
    }
    return {
      isActive: true,
      orderNumber,
      orderInfo: {
        orderId: license.order_id,
        customerEmail: license.email,
        customerName: license.customer_name,
        edition: license.license_type,
        activatedAt: license.activated_at,
        expiryDate: license.expiry_date
      },
      serverIp: normalizedIp,
      authorizedIps,
      message: "\u6388\u6743\u5DF2\u6FC0\u6D3B"
    };
  } catch (error) {
    console.error("\u83B7\u53D6\u6388\u6743\u4FE1\u606F\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u83B7\u53D6\u6388\u6743\u4FE1\u606F\u5931\u8D25: " + error.message
    });
  }
});

export { info_get as default };
//# sourceMappingURL=info.get.mjs.map
