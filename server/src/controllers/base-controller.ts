import { StatusCodes } from "http-status-codes";
import { Response } from "express";

export class BaseController {
  protected successResponse(
    res: Response,
    data: any,
    message = "Success",
    status = StatusCodes.OK,
    metaData?: any
  ) {
    return res.status(status).json({
      status,
      message,
      data,
      ...(metaData && { metaData }),
    });
  }

  protected errorResponse(
    res: Response,
    message: string,
    status = StatusCodes.BAD_REQUEST
  ) {
    return res.status(status).json({
      status,
      message,
    });
  }
}
