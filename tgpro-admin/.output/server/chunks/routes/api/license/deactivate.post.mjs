import { d as defineEventHandler, r as requireAdmin, c as createError, a as readBody, e as executeQuery } from '../../../nitro/nitro.mjs';
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

const deactivate_post = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
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
    if (existingLicense.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "\u672A\u627E\u5230\u8BE5\u6388\u6743\u8BB0\u5F55"
      });
    }
    await executeQuery(
      "DELETE FROM licenses WHERE order_number = ?",
      [orderNumber]
    );
    await executeQuery(
      `INSERT INTO license_history (
        order_number,
        action,
        description,
        performed_by,
        created_at
      ) VALUES (?, 'deactivate', ?, ?, NOW())`,
      [
        orderNumber,
        `\u53D6\u6D88\u6388\u6743\uFF0C\u8BA2\u5355\u53F7: ${orderNumber}`,
        user.id
      ]
    );
    console.log(`[\u53D6\u6D88\u6388\u6743] \u8BA2\u5355 ${orderNumber} \u5DF2\u53D6\u6D88\u6388\u6743`);
    return {
      success: true,
      message: "\u6388\u6743\u5DF2\u53D6\u6D88"
    };
  } catch (error) {
    console.error("\u53D6\u6D88\u6388\u6743\u5931\u8D25:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u53D6\u6D88\u6388\u6743\u5931\u8D25: " + error.message
    });
  }
});

export { deactivate_post as default };
//# sourceMappingURL=deactivate.post.mjs.map
