import { UserController } from "../controllers/user-controller.js";
import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth-middleware.js";
import { query, body } from "express-validator";
import { payLoadValidation } from "../middlewares/payload-validation.js";

const userRouter = Router();
const userController = new UserController();

// Route to get other users with pagination
userRouter.get(
  "/others",
  authenticationMiddleware,
  payLoadValidation([
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100"),
  ]),
  userController.getOtherUsers
);

userRouter.patch(
  "/update-password",
  authenticationMiddleware,
  payLoadValidation([
    body("newPassword").isString().withMessage("New password is required"),
  ]),
  userController.updateUserAccountPassword
);

export { userRouter };
