import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/index.js";
import { ErrorException } from "../utils/error.js";
import { JWT } from "../utils/helper.js";

interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

interface ILoginUser {
  email: string;
  password: string;
}

interface IAuthUserResult {
  user: {
    userId: string;
    username: string;
  };
  token: string;
}
export class AuthService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async register(user: IRegisterUser): Promise<void> {
    const userEmailExist = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: user.email }, { username: user.username }],
      },
    });

    if (userEmailExist) {
      throw ErrorException.badRequest("Email or username already in use");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  public async login(user: ILoginUser): Promise<IAuthUserResult> {
    console.log(user);
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) {
      throw ErrorException.badRequest("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw ErrorException.badRequest("Invalid email or password");
    }

    return this.authUserPayload(existingUser);
  }

  public async refreshUser(userId: string): Promise<IAuthUserResult> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!existingUser) {
      throw ErrorException.badRequest("User not found");
    }

    return this.authUserPayload(existingUser);
  }

  private authUserPayload(user: any): IAuthUserResult {
    const token = JWT.signPayload({
      userId: user.userId,
    });

    return {
      user: {
        userId: user.userId,
        username: user.username,
      },
      token,
    };
  }
}
