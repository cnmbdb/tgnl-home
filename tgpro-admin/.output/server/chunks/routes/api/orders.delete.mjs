import { d as defineEventHandler, a as readBody, e as executeQuery } from '../../nitro/nitro.mjs';
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

const orders_delete = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { orderId } = body;
    if (!orderId) {
      return {
        success: false,
        error: "\u8BA2\u5355ID\u4E0D\u80FD\u4E3A\u7A7A"
      };
    }
    const deleteQuery = "DELETE FROM orders WHERE order_id = ?";
    await executeQuery(deleteQuery, [orderId]);
    return {
      success: true,
      message: "\u8BA2\u5355\u5220\u9664\u6210\u529F"
    };
  } catch (error) {
    console.error("\u5220\u9664\u8BA2\u5355\u5931\u8D25:", error);
    return {
      success: false,
      error: "\u5220\u9664\u8BA2\u5355\u5931\u8D25"
    };
  }
});

export { orders_delete as default };
//# sourceMappingURL=orders.delete.mjs.map
