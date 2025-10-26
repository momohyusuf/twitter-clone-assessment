import jwt from "jsonwebtoken";
import { ErrorException } from "./error.js";

export class JWT {
  static secret: string = process.env.JWT_SECRET!;

  static signPayload = (payload: any) => {
    // @ts-ignore
    return jwt.sign(payload, this.secret, {
      expiresIn: process.env.JWT_EXPIRES_IN!,
    });
  };

  static verifyToken = (token: string) => {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw ErrorException.unauthorized("Invalid token");
    }
  };
}
