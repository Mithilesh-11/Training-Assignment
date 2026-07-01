import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { WalletRepository } from "../repositories/wallet.repository";
import { ProductRepository } from "../repositories/product.repository";
import { OrderRepository } from "../repositories/order.repository";
import { CreateOrderDto, LockedProduct, OrderService } from "../types/order.types";

export class OrderOrmService implements OrderService {
  async createOrder(data: CreateOrderDto) {
    try {
      return await prisma.$transaction(async (tx) => {
        const walletRepository = new WalletRepository(tx);
        const productRepository = new ProductRepository(tx);
        const orderRepository = new OrderRepository(tx);

        const { userId, items } = data;

        if (!items.length) {
          throw new Error("Order must contain at least one item.");
        }

        // ---------------------------------
        // Get Wallet
        // ---------------------------------
        const wallet = await walletRepository.findByUserId(userId);

        if (!wallet) {
          throw new Error("Wallet not found.");
        }

        // ---------------------------------
        // Lock Products
        // ---------------------------------

        const productIds = items.map((item) => item.productId);
        const products : LockedProduct[] = await productRepository.lockProducts(productIds);

        if (products.length !== items.length) {
          throw new Error("One or more products not found.");
        }

        // ---------------------------------
        // Validate Stock
        // ---------------------------------

        let totalAmount = new Prisma.Decimal(0);

        for (const item of items) {
          const product = products.find(
            (p) => Number(p.id) === Number(item.productId)
          );

          if (!product) {
            throw new Error("Product not found.");
          }

          if (product.stock < item.quantity) {
            throw new Error(`Insufficient stock for ${product.name}`);
          }

          totalAmount = totalAmount.plus(
            product.price.mul(item.quantity)
          );
        }

        // ---------------------------------
        // Validate Wallet Balance
        // ---------------------------------
        if (wallet.balance.lessThan(totalAmount)) {
          throw new Error("Insufficient wallet balance.");
        }

        // ---------------------------------
        // Deduct Wallet
        // ---------------------------------

        await walletRepository.deductBalance(userId,totalAmount);

        // ---------------------------------
        // Reduce Stock
        // ---------------------------------
        for (const item of items) {
          await productRepository.decreaseStock(
            item.productId,
            item.quantity
          );
        }

        // ---------------------------------
        // Create Order
        // ---------------------------------
        const order = await orderRepository.createOrder(
          userId,
          totalAmount
        );

        // ---------------------------------
        // Prepare Order Items
        // ---------------------------------
        const orderItems = items.map((item) => {
          const product = products.find(
            (p) => Number(p.id) === Number(item.productId)
          );

          if (!product) {
            throw new Error(`Product with ID ${item.productId} not found.`);
          }

          return {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
          };
        });

        // ---------------------------------
        // Insert Order Items
        // ---------------------------------

        await orderRepository.createOrderItems(orderItems);

        // ---------------------------------
        // Return Complete Order
        // ---------------------------------
        
        return await orderRepository.findOrderById(order.id);
      },
      {
        isolationLevel:
          Prisma.TransactionIsolationLevel.Serializable,
      }
      );
    } catch (error) {
      console.error("Prisma transaction rolled back due to error:", error);
      throw error;
    }
  }
}