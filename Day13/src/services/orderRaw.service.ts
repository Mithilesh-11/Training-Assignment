import { ResultSetHeader } from "mysql2/promise";
import { pool } from "../config/db";
import { CreateOrderDto, OrderService, ProductRow, WalletRow } from "../types/order.types";

export class OrderRawService implements OrderService {
  async createOrder(data: CreateOrderDto) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const { userId, items } = data;

      if (!items.length) {
        throw new Error("Order must contain at least one item.");
      }

      // -----------------------------------
      // 1. Lock Wallet
      // -----------------------------------
      const [walletRows] = await connection.query<WalletRow[]>(
        `
        SELECT *
        FROM wallet
        WHERE userId = ?
        FOR UPDATE
        `,
        [userId]
      );

      if (!walletRows.length) {
        throw new Error("Wallet not found.");
      }

      const wallet = walletRows[0];

      // -----------------------------------
      // 2. Lock Products
      // -----------------------------------
      const placeholders = items.map(() => "?").join(",");

      const [products] = await connection.query<ProductRow[]>(
        `
        SELECT id, name, price, stock
        FROM products
        WHERE id IN (${placeholders})
        FOR UPDATE
        `,
        items.map((i) => i.productId)
      );

      if (products.length !== items.length) {
        throw new Error("One or more products not found.");
      }

      // -----------------------------------
      // 3. Validate Stock
      // -----------------------------------
      let totalAmount = 0;

      for (const item of items) {
        const product = products.find(
          (p) => Number(p.id) === Number(item.productId)
        );

        if (!product) {
          throw new Error("Product not found.");
        }

        if (product.stock < item.quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}`
          );
        }

        totalAmount += product.price * item.quantity;
      }

      // -----------------------------------
      // 4. Validate Wallet
      // -----------------------------------
      if (wallet.balance < totalAmount) {
        throw new Error("Insufficient wallet balance.");
      }

      // -----------------------------------
      // 5. Deduct Wallet
      // -----------------------------------
      await connection.query(
        `
        UPDATE wallet
        SET balance = balance - ?
        WHERE userId = ?
        `,
        [totalAmount, userId]
      );

      // -----------------------------------
      // 6. Reduce Product Stock
      // -----------------------------------
      for (const item of items) {
        await connection.query(
          `
          UPDATE products
          SET stock = stock - ?
          WHERE id = ?
          `,
          [item.quantity, item.productId]
        );
      }

      // -----------------------------------
      // 7. Create Order
      // -----------------------------------
      const [orderResult] =
        await connection.query<ResultSetHeader>(
          `
          INSERT INTO orders
          (userId, totalAmount, status, createdAt, updatedAt)
          VALUES (?, ?, 'PAID', NOW(), NOW())
          `,
          [userId, totalAmount]
        );

      const orderId = orderResult.insertId;

      // -----------------------------------
      // 8. Insert Order Items
      // -----------------------------------
      for (const item of items) {
        const product = products.find(
          (p) => Number(p.id) === Number(item.productId)
        )!;

        await connection.query(
          `
          INSERT INTO order_items
          (orderId, productId, quantity, price, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, NOW(), NOW())
          `,
          [
            orderId,
            item.productId,
            item.quantity,
            product.price,
          ]
        );
      }

      // -----------------------------------
      // 9. Commit
      // -----------------------------------
      await connection.commit();

      return {
        success: true,
        message: "Order created successfully.",
        orderId,
        totalAmount,
      };
    } catch (error) {
      await connection.rollback();

      console.error("Raw SQL transaction rolled back due to error:", error);

      throw error;
    } finally {
      connection.release();
    }
  }
}