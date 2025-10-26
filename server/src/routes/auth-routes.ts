import { AuthController } from "../controllers/auth-controller.js";
import { Router } from "express";
import { body } from "express-validator";
import { payLoadValidation } from "../middlewares/payload-validation.js";
import { authenticationMiddleware } from "../middlewares/auth-middleware.js";

const authRouter = Router();
const authController = new AuthController();

// Registration route
authRouter.post(
  "/register",
  payLoadValidation([
    body("username")
      .isString()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage("Username must be between 3 and 30 characters"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]),
  authController.register
);

// Login route
authRouter.post(
  "/login",
  payLoadValidation([
    body("email")
      .trim()
      .toLowerCase()
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ]),
  authController.login
);

// Refresh user route
authRouter.get(
  "/refresh-user",
  authenticationMiddleware,
  authController.refreshUser
);

export { authRouter };
