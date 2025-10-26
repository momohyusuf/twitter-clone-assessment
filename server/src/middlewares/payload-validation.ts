import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult, matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

import { ErrorException } from "../utils/error.js";

export const payLoadValidation = (validations: any[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const removeDuplicateErrors = [
        ...new Map(
          errors.array().map((error: any) => [error.path, error])
        ).values(),
      ];
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json(ErrorException.ValidationError(removeDuplicateErrors));
    }

    req.body = matchedData(req);
    next();
  };
};
