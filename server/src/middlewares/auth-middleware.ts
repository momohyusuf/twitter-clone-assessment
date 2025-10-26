import { Request, Response, NextFunction } from "express";

import { ErrorException } from "../utils/error.js";
import { StatusCodes } from "http-status-codes";
import { JWT } from "../utils/helper.js";

// authenticate user login session
const authenticationMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  //   step one check if token is provided
  if (!token) {
    throw ErrorException.unauthorized("Not authorized: No token provided");
  }

  //   step two verify jwt token
  const verifyToken = JWT.verifyToken(token);

  // check if user token is still valid

  if (!verifyToken) {
    throw ErrorException.unauthorized(
      "Not authorized: Invalid token or token has expired"
    );
  }
  //   @ts-ignore
  req.user = verifyToken;
  next();
};

export { authenticationMiddleware };
