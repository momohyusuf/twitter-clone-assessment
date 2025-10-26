import { UserService } from "../services/user-services.js";

import { BaseController } from "./base-controller.js";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "../interface.js";

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  public getOtherUsers = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId as string;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { data, pagination } = await this.userService.getOtherUsers({
        userId,
        page,
        limit,
      });

      this.successResponse(
        res,
        data,
        "Other users fetched successfully",
        StatusCodes.OK,
        pagination
      );
    } catch (error) {
      next(error);
    }
  };

  public updateUserAccountPassword = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId as string;
      const { newPassword } = req.body;

      const message = await this.userService.updateUserAccountPassword(
        userId,
        newPassword
      );

      this.successResponse(res, null, message, StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  };
}
