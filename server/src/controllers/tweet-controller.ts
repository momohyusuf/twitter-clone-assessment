import { TweetService } from "../services/tweet-services.js";
import { BaseController } from "./base-controller.js";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "../interface.js";
export class TweetController extends BaseController {
  private tweetService: TweetService;

  constructor() {
    super();
    this.tweetService = new TweetService();
  }

  public createTweet = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorId = req.user?.userId;
      console.log(req.body);

      const tweetData = req.body;
      const newTweet = await this.tweetService.createTweet({
        ...tweetData,
        authorId,
      });
      this.successResponse(
        res,
        newTweet,
        "Tweet created successfully",
        StatusCodes.CREATED
      );
    } catch (error) {
      next(error);
    }
  };

  public getUserFeed = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.userId;
      const { limit, page } = req.query;
      const { data, pagination } = await this.tweetService.getUserFeed({
        userId: userId as string,
        limit: Number(limit) || 20,
        page: Number(page) || 1,
      });
      this.successResponse(
        res,
        data,
        "User tweets fetched successfully",
        StatusCodes.OK,
        pagination
      );
    } catch (error) {
      next(error);
    }
  };

  public getAllTweets = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit, page } = req.query;
      const { data, pagination } = await this.tweetService.getAllTweets({
        limit: Number(limit) || 20,
        page: Number(page) || 1,
      });
      this.successResponse(
        res,
        data,
        "All tweets fetched successfully",
        StatusCodes.OK,
        pagination
      );
    } catch (error) {
      next(error);
    }
  };
}
