import { d as defineEventHandler, r as requireAdmin, c as createError } from '../../../nitro/nitro.mjs';
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

const upload_post = defineEventHandler(async (event) => {
  const user = await requireAdmin(event);
  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650"
    });
  }
  try {
    return {
      success: true,
      message: "\u6388\u6743\u6587\u4EF6\u4E0A\u4F20\u6210\u529F",
      license: {
        id: "TGP-ENT-2024-" + Date.now(),
        uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  } catch (error) {
    console.error("\u4E0A\u4F20\u6388\u6743\u6587\u4EF6\u5931\u8D25:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "\u4E0A\u4F20\u6388\u6743\u6587\u4EF6\u5931\u8D25: " + error.message
    });
  }
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
