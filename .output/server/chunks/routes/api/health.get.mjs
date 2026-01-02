import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
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

const health_get = defineEventHandler(async (event) => {
  try {
    return {
      success: true,
      status: "healthy",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      message: "\u670D\u52A1\u8FD0\u884C\u6B63\u5E38"
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u670D\u52A1\u4E0D\u53EF\u7528"
    });
  }
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
