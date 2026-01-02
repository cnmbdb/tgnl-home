import { d as defineEventHandler, r as requireAdmin, c as createError, a as readBody } from '../../../nitro/nitro.mjs';
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

const update_post = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    });
  }
  try {
    const body = await readBody(event);
    const { licenseKey } = body;
    if (!licenseKey) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u6388\u6743\u5BC6\u94A5\u4E0D\u80FD\u4E3A\u7A7A"
      });
    }
    if (licenseKey.length < 20) {
      throw createError({
        statusCode: 400,
        statusMessage: "\u6388\u6743\u5BC6\u94A5\u683C\u5F0F\u65E0\u6548"
      });
    }
    return {
      success: true,
      message: "\u6388\u6743\u66F4\u65B0\u6210\u529F",
      license: {
        id: "TGP-ENT-2024-" + Date.now(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("\u66F4\u65B0\u6388\u6743\u5931\u8D25:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "\u66F4\u65B0\u6388\u6743\u5931\u8D25: " + error.message
    });
  }
});

export { update_post as default };
//# sourceMappingURL=update.post.mjs.map
