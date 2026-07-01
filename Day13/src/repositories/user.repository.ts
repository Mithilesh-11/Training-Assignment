import { prisma } from "../config/prisma";

export class UserRepository {
  async findById(userId: number) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}