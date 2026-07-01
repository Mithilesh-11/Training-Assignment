import { Prisma, PrismaClient } from "@prisma/client";


export class ProductRepository {

  constructor(private tx: PrismaClient | any) {}

  async lockProducts(productIds: number[]) {
    return this.tx.$queryRaw<
      {
        id: number;
        name: string;
        price: Prisma.Decimal;
        stock: number;
      }[]
    >`
      SELECT id, name, price, stock
      FROM products
      WHERE id IN (${Prisma.join(productIds)})
      FOR UPDATE
    `;
  }

  async decreaseStock( productId: number,quantity: number
  ) {
    return this.tx.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }
}