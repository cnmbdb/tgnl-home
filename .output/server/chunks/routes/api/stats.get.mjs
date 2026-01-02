import { d as defineEventHandler, f as requireAuth, e as executeQuery, c as createError } from '../../nitro/nitro.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const user = await requireAuth(event);
  if (!user) {
    return {
      success: false,
      error: "\u672A\u6388\u6743\u8BBF\u95EE"
    };
  }
  try {
    const totalUsersResult = await executeQuery("SELECT COUNT(*) as count FROM transactions");
    const activeUsersResult = await executeQuery("SELECT COUNT(*) as count FROM transactions WHERE amount > 0");
    const totalEnergyResult = await executeQuery("SELECT SUM(amount) as total FROM transactions");
    const stats = {
      totalUsers: ((_a = totalUsersResult[0]) == null ? void 0 : _a.count) || 0,
      activeUsers: ((_b = activeUsersResult[0]) == null ? void 0 : _b.count) || 0,
      totalEnergyRented: ((_c = totalEnergyResult[0]) == null ? void 0 : _c.total) || 0,
      botStatus: "running",
      energyRentalGrowth: {
        labels: ["1\u67081\u65E5", "1\u67082\u65E5", "1\u67083\u65E5", "1\u67084\u65E5", "1\u67085\u65E5", "1\u67086\u65E5", "1\u67087\u65E5"],
        data: [12e5, 135e4, 142e4, 158e4, 167e4, 175e4, 189e4]
      },
      dailyTransactions: {
        labels: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708"],
        data: [120, 150, 180, 220, 250, 280]
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
