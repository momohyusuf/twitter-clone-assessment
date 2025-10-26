import { Router } from "express";
import { TweetController } from "../controllers/tweet-controller.js";
import { body } from "express-validator";

import { payLoadValidation } from "../middlewares/payload-validation.js";
import { authenticationMiddleware } from "../middlewares/auth-middleware.js";
import validator from "validator";
const tweetRouter = Router();
const tweetController = new TweetController();

tweetRouter.get(
  "/",
  authenticationMiddleware,
  payLoadValidation([
    body("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100"),
    body("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
  ]),
  tweetController.getAllTweets
);

// Create a new tweet
tweetRouter.post(
  "/create",
  authenticationMiddleware,
  payLoadValidation([
    body("content")
      .isString()
      .trim()
      .isLength({ min: 1, max: 280 })
      .withMessage("Tweet content must be between 1 and 280 characters"),
    body("recipientIds")
      .optional()
      .custom((value) => {
        for (const id of value) {
          if (!validator.isUUID(id)) {
            throw new Error(`Invalid user ID: ${id}`);
          }
        }
        return true;
      })
      .isArray({ min: 1, max: 10 })
      .withMessage("Recipients must be an array of user IDs"),
  ]),
  tweetController.createTweet
);

// Get user feed
tweetRouter.get(
  "/feed",
  authenticationMiddleware,
  payLoadValidation([
    body("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100"),
    body("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
  ]),
  tweetController.getUserFeed
);

export { tweetRouter };
