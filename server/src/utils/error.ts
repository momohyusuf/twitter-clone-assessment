import { StatusCodes } from "http-status-codes";

export class ErrorException extends Error {
  public static badRequest(message: string) {
    return {
      status: StatusCodes.BAD_REQUEST,
      message,
    };
  }

  public static unauthorized(message: string) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      message,
    };
  }

  public static forbidden(message: string) {
    return {
      status: StatusCodes.FORBIDDEN,
      message,
    };
  }

  public static notFound(message: string) {
    return {
      status: StatusCodes.NOT_FOUND,
      message,
    };
  }

  public static internalServerError(message: string) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message,
    };
  }

  public static ValidationError(errors: any[]) {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      message: "Validation Error",
      errors,
    };
  }
}
