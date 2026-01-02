import { d as defineEventHandler, b as requireAuth, c as createError, a as readBody } from '../../../nitro/nitro.mjs';
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

const validate_post = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "\u672A\u6388\u6743\u8BBF\u95EE"
    });
  }
  try {
    const body = await readBody(event);
    const { licenseKey } = body;
    if (!licenseKey) {
      return {
        valid: false,
        message: "\u6388\u6743\u5BC6\u94A5\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    const isValidFormat = licenseKey.length >= 20 && licenseKey.includes("-");
    if (!isValidFormat) {
      return {
        valid: false,
        message: "\u6388\u6743\u5BC6\u94A5\u683C\u5F0F\u65E0\u6548"
      };
    }
    return {
      valid: true,
      message: "\u6388\u6743\u5BC6\u94A5\u6709\u6548",
      info: {
        edition: "\u4F01\u4E1A\u7248",
        maxUsers: 100,
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1e3).toISOString()
      }
    };
  } catch (error) {
    console.error("\u9A8C\u8BC1\u5BC6\u94A5\u5931\u8D25:", error);
    return {
      valid: false,
      message: "\u9A8C\u8BC1\u5931\u8D25: " + error.message
    };
  }
});

export { validate_post as default };
//# sourceMappingURL=validate.post.mjs.map
