import { d as defineEventHandler, b as requireAuth, c as createError, u as useRuntimeConfig, e as executeQuery } from '../../../nitro/nitro.mjs';
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

const info_get = defineEventHandler(async (event) => {
  var _a;
  const user = await requireAuth(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "\u672A\u6388\u6743\u8BBF\u95EE"
    });
  }
  try {
    const config = useRuntimeConfig();
    const orderNumber = config.ORDER_NUMBER || config.orderNumber;
    if (!orderNumber) {
      return {
        isActive: false,
        orderNumber: "\u672A\u77E5",
        serverIp: config.SERVER_IP || "localhost",
        authorizedIps: [],
        message: "\u672A\u914D\u7F6E\u6388\u6743\u8BA2\u5355\u53F7"
      };
    }
    const licenseResult = await executeQuery(
      'SELECT * FROM licenses WHERE order_number = ? AND status = "active" LIMIT 1',
      [orderNumber]
    );
    if (licenseResult.length === 0) {
      return {
        isActive: false,
        orderNumber: "\u672A\u6FC0\u6D3B",
        serverIp: config.SERVER_IP || "localhost",
        authorizedIps: [],
        message: "\u6388\u6743\u672A\u6FC0\u6D3B\uFF0C\u8BF7\u4F7F\u7528\u8BA2\u5355\u53F7\u6FC0\u6D3B"
      };
    }
    const license = licenseResult[0];
    const serverIp = config.SERVER_IP || "localhost";
    let authorizedIps = [];
    try {
      const wpResponse = await $fetch(`${config.WORDPRESS_URL}/wp-json/zibll/v1/verify-server`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${Buffer.from(`${config.WORDPRESS_USERNAME}:${config.WORDPRESS_APP_PASSWORD}`).toString("base64")}`,
          "Content-Type": "application/json"
        },
        body: {
          order_num: orderNumber,
          server_ip: serverIp
        }
      });
      if (wpResponse.success && ((_a = wpResponse.data) == null ? void 0 : _a.authorized_ips)) {
        authorizedIps = wpResponse.data.authorized_ips;
      }
    } catch (error) {
      console.error("Failed to fetch authorized IPs from WordPress:", error);
      authorizedIps = serverIp ? [serverIp] : [];
    }
    return {
      isActive: true,
      orderNumber,
      orderInfo: {
        orderId: license.order_id,
        customerEmail: license.customer_email,
        customerName: license.customer_name,
        edition: license.edition,
        activatedAt: license.activated_at,
        expiryDate: license.expiry_date
      },
      serverIp,
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
