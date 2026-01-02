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

const systemUsers_get = defineEventHandler(async (event) => {
  const user = await requireAuth(event);
  if (!user) {
    return {
      success: false,
      error: "\u672A\u6388\u6743\u8BBF\u95EE"
    };
  }
  try {
    const query = getQuery(event);
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const search = query.search || "";
    const status = query.status || "";
    const role = query.role || "";
    const offset = (page - 1) * limit;
    let whereConditions = [];
    let params = [];
    if (search) {
      whereConditions.push("(username LIKE ? OR email LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }
    if (status) {
      whereConditions.push("status = ?");
      params.push(status);
    }
    if (role) {
      whereConditions.push("role = ?");
      params.push(role);
    }
    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";
    const countQuery = `SELECT COUNT(*) as total FROM system_users ${whereClause}`;
    const countResult = await executeQuery(countQuery, params);
    const total = countResult[0].total;
    const usersQuery = `
      SELECT id, username, email, role, status, last_login, created_at, updated_at 
      FROM system_users 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;
    const users = await executeQuery(usersQuery, params);
    const statsQuery = `
      SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as admin_count,
        SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) as user_count,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_count,
        SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive_count
      FROM system_users
    `;
    const stats = await executeQuery(statsQuery);
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
    console.error("Error fetching system users:", error);
    return {
      success: false,
      error: error.message
    };
  }
});

export { systemUsers_get as default };
//# sourceMappingURL=system-users.get.mjs.map
