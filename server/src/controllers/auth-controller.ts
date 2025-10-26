import { StatusCodes } from "http-status-codes";
import { AuthService } from "../services/auth-services.js";
import { BaseController } from "./base-controller.js";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../interface.js";

export class AuthController extends BaseController {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      this.successResponse(
        res,
        result,
        "User registered successfully",
        StatusCodes.CREATED
      );
    } catch (error) {
      next(error);
    }
  };
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);
      this.successResponse(
        res,
        result,
        "User logged in successfully",
        StatusCodes.OK
      );
    } catch (error) {
      next(error);
    }
  };

  public refreshUser = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId as string;
      const result = await this.authService.refreshUser(userId);
      this.successResponse(
        res,
        result,
        "User refreshed successfully",
        StatusCodes.OK
      );
    } catch (error) {
      next(error);
    }
  };
}
