import { PrismaClient } from "../generated/prisma/index.js";
import type { IPaginationResult } from "../interface.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface IGetOtherUsersParams {
  userId: string;
  page: number;
  limit: number;
}

interface IUserResponse {
  userId: string;
  username: string;
}

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public async getOtherUsers(params: IGetOtherUsersParams): Promise<{
    data: IUserResponse[];
    pagination: IPaginationResult["pagination"];
  }> {
    const { userId, page, limit } = params;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          userId: {
            not: userId,
          },
        },
        skip,
        take: limit,
        select: {
          userId: true,
          username: true,
        },
      }),
      this.prisma.user.count({
        where: {
          userId: {
            not: userId,
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      pagination: {
        total,
        currentPage: page,
        totalPages,
      },
    };
  }

  public async updateUserAccountPassword(
    userId: string,
    newPassword: string
  ): Promise<string> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: {
        userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return "Password updated successfully";
  }
}
