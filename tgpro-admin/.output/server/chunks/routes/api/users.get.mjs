import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
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

const users_get = defineEventHandler(async (event) => {
  try {
    const users = [
      {
        id: 1,
        username: "@user123",
        avatar: "https://avatars.githubusercontent.com/u/1?v=4",
        membership: "VIP\u4F1A\u5458",
        status: "active",
        createdAt: "2024-01-15",
        lastActive: "2024-01-20"
      },
      {
        id: 2,
        username: "@testuser",
        avatar: "https://avatars.githubusercontent.com/u/2?v=4",
        membership: "\u666E\u901A\u4F1A\u5458",
        status: "active",
        createdAt: "2024-01-10",
        lastActive: "2024-01-19"
      },
      {
        id: 3,
        username: "@newbie",
        avatar: "https://avatars.githubusercontent.com/u/3?v=4",
        membership: "\u514D\u8D39\u7528\u6237",
        status: "inactive",
        createdAt: "2024-01-18",
        lastActive: "2024-01-18"
      }
    ];
    return {
      success: true,
      data: users,
      total: users.length
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u83B7\u53D6\u7528\u6237\u5217\u8868\u5931\u8D25"
    });
  }
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
