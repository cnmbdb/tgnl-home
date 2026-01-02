import { d as defineEventHandler, b as requireAuth, c as createError } from '../../nitro/nitro.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  if (!user) {
    return {
      success: false,
      error: "\u672A\u6388\u6743\u8BBF\u95EE"
    };
  }
  try {
    const stats = {
      totalUsers: 2847,
      activeMembers: 1234,
      monthlyRevenue: 45678,
      botStatus: "running",
      userGrowth: {
        labels: ["1\u67081\u65E5", "1\u67082\u65E5", "1\u67083\u65E5", "1\u67084\u65E5", "1\u67085\u65E5", "1\u67086\u65E5", "1\u67087\u65E5"],
        data: [120, 135, 142, 158, 167, 175, 189]
      },
      revenueData: {
        labels: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708"],
        data: [12e3, 15e3, 18e3, 22e3, 25e3, 28e3]
      }
    };
    return {
      success: true,
      data: stats
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "\u83B7\u53D6\u7EDF\u8BA1\u6570\u636E\u5931\u8D25"
    });
  }
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
