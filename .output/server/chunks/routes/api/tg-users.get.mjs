import { d as defineEventHandler, f as requireAuth, g as getQuery, e as executeQuery } from '../../nitro/nitro.mjs';
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

const tgUsers_get = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  if (!user) {
    return {
      success: false,
      error: "\u672A\u6388\u6743\u8BBF\u95EE"
    };
  }
  try {
    console.log("\u80FD\u91CF\u51FA\u79DF\u7528\u6237API\u8C03\u7528 (\u57FA\u4E8Etransactions\u8868)");
    const query = getQuery(event);
    console.log("Query params:", query);
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const search = query.search || "";
    const status = query.status || "";
    const membership = query.membership || "";
    console.log("Parsed params:", { page, limit, search, status, membership });
    const offset = (page - 1) * limit;
    let whereConditions = [];
    let params = [];
    if (search) {
      whereConditions.push("(CAST(t.chat_id AS CHAR) LIKE ?)");
      params.push(`%${search}%`);
    }
    if (status) {
      if (status === "active") {
        whereConditions.push("t.amount > 0");
      } else if (status === "inactive") {
        whereConditions.push("t.amount = 0");
      }
    }
    if (membership) {
      if (membership === "vip") {
        whereConditions.push("t.amount >= 50000000");
      } else if (membership === "premium") {
        whereConditions.push("t.amount >= 100000000");
      } else if (membership === "free") {
        whereConditions.push("t.amount < 50000000");
      }
    }
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";
    let countQuery = `SELECT COUNT(DISTINCT chat_id) as total FROM transactions`;
    let countParams = [];
    if (whereConditions.length > 0) {
      let countWhereConditions = [];
      countParams = [];
      if (search) {
        countWhereConditions.push("(CAST(chat_id AS CHAR) LIKE ?)");
        countParams.push(`%${search}%`);
      }
      if (status) {
        if (status === "active") {
          countWhereConditions.push("amount > 0");
        } else if (status === "inactive") {
          countWhereConditions.push("amount = 0");
        }
      }
      if (membership) {
        if (membership === "vip") {
          countWhereConditions.push("amount >= 50000000");
        } else if (membership === "premium") {
          countWhereConditions.push("amount >= 100000000");
        } else if (membership === "free") {
          countWhereConditions.push("amount < 50000000");
        }
      }
      if (countWhereConditions.length > 0) {
        countQuery += ` WHERE ${countWhereConditions.join(" AND ")}`;
      }
    }
    const countResult = await executeQuery(countQuery, countParams);
    const total = countResult[0].total;
    let baseQuery = `
      SELECT 
        id,
        chat_id,
        amount,
        created_at
      FROM transactions
    `;
    let usersParams = [];
    if (whereConditions.length > 0) {
      let usersWhereConditions = [];
      if (search) {
        usersWhereConditions.push("(CAST(chat_id AS CHAR) LIKE ?)");
        usersParams.push(`%${search}%`);
      }
      if (status) {
        if (status === "active") {
          usersWhereConditions.push("amount > 0");
        } else if (status === "inactive") {
          usersWhereConditions.push("amount = 0");
        }
      }
      if (membership) {
        if (membership === "vip") {
          usersWhereConditions.push("amount >= 50000000");
        } else if (membership === "premium") {
          usersWhereConditions.push("amount >= 100000000");
        } else if (membership === "free") {
          usersWhereConditions.push("amount < 50000000");
        }
      }
      if (usersWhereConditions.length > 0) {
        baseQuery += ` WHERE ${usersWhereConditions.join(" AND ")}`;
      }
    }
    baseQuery += ` ORDER BY created_at DESC`;
    const allTransactions = await executeQuery(baseQuery, usersParams);
    const userMap = /* @__PURE__ */ new Map();
    for (const transaction of allTransactions) {
      if (!userMap.has(transaction.chat_id)) {
        userMap.set(transaction.chat_id, {
          id: transaction.id,
          tg_user_id: transaction.chat_id,
          username: `\u80FD\u91CF\u7528\u6237_${transaction.chat_id}`,
          first_name: `\u80FD\u91CF\u7528\u6237${String(transaction.chat_id).slice(-4)}`,
          last_name: "",
          membership_type: transaction.amount >= 1e8 ? "premium" : transaction.amount >= 5e7 ? "vip" : "free",
          status: transaction.amount > 0 ? "active" : "inactive",
          is_premium: transaction.amount >= 1e8 ? 1 : 0,
          last_activity: transaction.created_at,
          created_at: transaction.created_at,
          updated_at: transaction.created_at,
          energy_balance: transaction.amount
        });
      }
    }
    const allUsers = Array.from(userMap.values());
    const users = allUsers.slice(offset, offset + limit);
    const totalUsers = allUsers.length;
    const freeCount = allUsers.filter((u) => u.membership_type === "free").length;
    const vipCount = allUsers.filter((u) => u.membership_type === "vip").length;
    const premiumCount = allUsers.filter((u) => u.membership_type === "premium").length;
    const activeCount = allUsers.filter((u) => u.status === "active").length;
    const inactiveCount = allUsers.filter((u) => u.status === "inactive").length;
    const premiumTelegramCount = allUsers.filter((u) => u.is_premium === 1).length;
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const todayNewUsers = allUsers.filter((u) => {
      const userDate = new Date(u.created_at).toISOString().split("T")[0];
      return userDate === today;
    }).length;
    const stats = [{
      total_users: totalUsers,
      free_count: freeCount,
      vip_count: vipCount,
      premium_count: premiumCount,
      active_count: activeCount,
      banned_count: 0,
      inactive_count: inactiveCount,
      premium_telegram_count: premiumTelegramCount,
      today_new_users: todayNewUsers
    }];
    return {
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        },
        stats: stats[0]
      }
    };
  } catch (error) {
    console.error("Error fetching users from transactions:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { tgUsers_get as default };
//# sourceMappingURL=tg-users.get.mjs.map
