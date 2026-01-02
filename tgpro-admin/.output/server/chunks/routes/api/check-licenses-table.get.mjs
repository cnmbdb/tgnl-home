import { d as defineEventHandler, e as executeQuery } from '../../nitro/nitro.mjs';
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

const checkLicensesTable_get = defineEventHandler(async (event) => {
  try {
    const tables = await executeQuery("SHOW TABLES LIKE 'licenses'");
    if (tables.length === 0) {
      return {
        exists: false,
        message: "licenses\u8868\u4E0D\u5B58\u5728"
      };
    }
    const columns = await executeQuery("DESCRIBE licenses");
    return {
      exists: true,
      columns,
      columnNames: columns.map((col) => col.Field)
    };
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

export { checkLicensesTable_get as default };
//# sourceMappingURL=check-licenses-table.get.mjs.map
