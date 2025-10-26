import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export function globalErrorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "Failed",
    statusCode: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "An error occurred, please try again",
    error: err.error || "An error occurred, please try again",
  });
}
