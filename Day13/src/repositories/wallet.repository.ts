import { PrismaClient } from "@prisma/client";

export class WalletRepository {
  constructor(private tx: PrismaClient | any) {}

  async findByUserId(userId: number) {
    return this.tx.wallet.findUnique({
      where: {
        userId,
      },
    });
  }

  async deductBalance(userId: number, amount: any) {
    return this.tx.wallet.update({
      where: {
        userId,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
  }
}