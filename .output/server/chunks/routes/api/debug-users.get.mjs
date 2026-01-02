import { d as defineEventHandler, e as executeQuery } from '../../nitro/nitro.mjs';
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

const debugUsers_get = defineEventHandler(async (event) => {
  try {
    const allUsersQuery = "SELECT * FROM tg_users ORDER BY created_at DESC";
    const allUsers = await executeQuery(allUsersQuery);
    const allTransactionsQuery = "SELECT * FROM transactions";
    const allTransactions = await executeQuery(allTransactionsQuery);
    return {
      success: true,
      data: {
        users: allUsers,
        transactions: allTransactions,
        userCount: allUsers.length,
        transactionCount: allTransactions.length
      }
    };
  } catch (error) {
    console.error("Debug users error:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { debugUsers_get as default };
//# sourceMappingURL=debug-users.get.mjs.map
