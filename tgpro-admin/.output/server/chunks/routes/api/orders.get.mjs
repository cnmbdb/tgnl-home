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

const orders_get = defineEventHandler(async (event) => {
  try {
    const query = `
      SELECT 
        order_id as id,
        chat_id as chatId,
        username,
        product_type,
        amount,
        status,
        payment_method,
        transaction_hash,
        failure_reason,
        created_at as createdAt,
        updated_at as updatedAt,
        completed_at as completedAt,
        expires_at as expiresAt
      FROM orders 
      ORDER BY created_at DESC 
      LIMIT 100
    `;
    const orders = await executeQuery(query);
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      chatId: order.chatId,
      username: order.username,
      productType: order.product_type,
      amount: parseFloat(order.amount),
      status: order.status,
      paymentMethod: order.payment_method,
      transactionHash: order.transaction_hash,
      failureReason: order.failure_reason,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      completedAt: order.completedAt,
      expiresAt: order.expiresAt,
      type: "order"
    }));
    return {
      success: true,
      data: formattedOrders
    };
  } catch (error) {
    console.error("Error reading order data from database:", error);
    return {
      success: false,
      error: "Failed to read order data from database"
    };
  }
});

export { orders_get as default };
//# sourceMappingURL=orders.get.mjs.map
