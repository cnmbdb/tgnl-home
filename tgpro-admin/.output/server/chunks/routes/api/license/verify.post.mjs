import { d as defineEventHandler, b as requireAuth, c as createError } from '../../../nitro/nitro.mjs';
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

const verify_post = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "\u672A\u6388\u6743\u8BBF\u95EE"
    });
  }
  try {
    const expiryDate = /* @__PURE__ */ new Date("2024-12-31");
    const today = /* @__PURE__ */ new Date();
    const isValid = expiryDate > today;
    return {
      success: true,
      valid: isValid,
      message: isValid ? "\u6388\u6743\u72B6\u6001\u6B63\u5E38" : "\u6388\u6743\u5DF2\u8FC7\u671F",
      verifiedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("\u9A8C\u8BC1\u6388\u6743\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u9A8C\u8BC1\u6388\u6743\u5931\u8D25: " + error.message
    });
  }
});

export { verify_post as default };
//# sourceMappingURL=verify.post.mjs.map
