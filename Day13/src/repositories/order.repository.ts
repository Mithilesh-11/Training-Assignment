import { PrismaClient } from "@prisma/client";
import { OrderItemRecord } from "../types/order.types";

export class OrderRepository {

  constructor(private tx: PrismaClient | any) {}

  async createOrder( userId: number, totalAmount: any) {
    return this.tx.order.create({
      data: {
        userId,
        totalAmount,
        status: "PAID",
      },
    });
  }

  async createOrderItems(items: OrderItemRecord[]) {
    return this.tx.orderItem.createMany({
      data: items,
    });
  }

  async findOrderById(orderId: number) {
    return this.tx.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
  }
}