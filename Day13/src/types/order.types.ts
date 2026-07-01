import { Prisma } from "@prisma/client";
import { RowDataPacket } from "mysql2/promise";

export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface CreateOrderDto {
  userId: number;
  items: OrderItemInput[];
}

export interface OrderItemRecord {
  orderId: number;
  productId: number;
  quantity: number;
  price: unknown;
}

export interface LockedProduct {
  id: number;
  name: string;
  price: Prisma.Decimal;
  stock: number;
}

export interface WalletRow extends RowDataPacket {
  id: number;
  userId: number;
  balance: number;
}

export interface ProductRow extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface OrderService {
  createOrder(data: CreateOrderDto): Promise<unknown>;
}