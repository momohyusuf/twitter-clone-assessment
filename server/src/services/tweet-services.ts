import { PrismaClient } from "../generated/prisma/index.js";
import { ErrorException } from "../utils/error.js";
import { IPaginationResult } from "../interface.js";
import { EmailService } from "./email-service.js";
interface ICreateTweet {
  authorId: string;
  content: string;
  recipientIds?: string[];
}

interface IGetTweets {
  limit?: number;
  page?: number;
}

interface IGetUserFeedTweets {
  userId: string;
  limit?: number;
  page?: number;
}

interface ITweetWithAuthor {
  tweetId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    username: string;
  };
  images: {
    imageId: string;
    url: string;
    publicId: string;
  }[];
  _count: {
    sharedWith: number;
  };
}

export class TweetService {
  private prisma: PrismaClient;
  private emailService: EmailService;
  constructor() {
    this.prisma = new PrismaClient();
    this.emailService = new EmailService();
  }

  public async createTweet(tweet: ICreateTweet): Promise<ITweetWithAuthor> {
    const author = await this.prisma.user.findUnique({
      where: { userId: tweet.authorId },
    });

    if (!author) {
      throw ErrorException.notFound("Author not found");
    }

    if (tweet.recipientIds && tweet.recipientIds.includes(tweet.authorId)) {
      throw ErrorException.badRequest(
        "Author cannot be a recipient of their own tweet"
      );
    }

    // Validate recipients exist
    let recipients: { email: string; username: string }[] = [];
    if (tweet.recipientIds && tweet.recipientIds.length > 0) {
      recipients = await this.prisma.user.findMany({
        where: { userId: { in: tweet.recipientIds } },
        select: { email: true, username: true },
      });

      if (recipients.length !== tweet.recipientIds.length) {
        throw ErrorException.badRequest("One or more recipients not found");
      }
    }

    const newTweet = await this.prisma.tweet.create({
      data: {
        content: tweet.content,
        authorId: tweet.authorId,
        ...(tweet.recipientIds && tweet.recipientIds.length > 0
          ? {
              sharedWith: {
                create: tweet.recipientIds.map((recipientId) => ({
                  recipientId,
                })),
              },
            }
          : {}),
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        images: {
          select: {
            imageId: true,
            url: true,
            publicId: true,
          },
        },
        _count: {
          select: {
            sharedWith: true,
          },
        },
      },
    });

    /**
     * We will send email notifications HERE

    if (recipients.length > 0) {

      this.emailService
        .sendBulkTweetSharedNotifications(
          recipients,
          author.username,
          tweet.content,
          newTweet.tweetId
        )
        .catch((error) => {
          // Log error but don't fail the request
          console.error("Failed to send email notifications:", error);
        });
    }
     */
    return newTweet;
  }

  public async getAllTweets(
    params: IGetTweets
  ): Promise<IPaginationResult<ITweetWithAuthor>> {
    const { page = 1, limit = 10 } = params;

    const skip = (page - 1) * limit;

    const [tweets, total] = await Promise.all([
      this.prisma.tweet.findMany({
        include: {
          author: {
            select: {
              username: true,
            },
          },
          images: {
            select: {
              imageId: true,
              url: true,
              publicId: true,
            },
          },
          _count: {
            select: {
              sharedWith: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.tweet.count({}),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: tweets,
      pagination: {
        total,
        currentPage: page,
        totalPages,
        hasMore: page < totalPages,
      },
    };
  }

  public async getUserFeed(
    params: IGetUserFeedTweets
  ): Promise<IPaginationResult<ITweetWithAuthor>> {
    const { userId, page = 1, limit = 10 } = params;

    const skip = (page - 1) * limit;

    // Get tweet IDs from both sources
    const [ownTweets, sharedTweetRefs] = await Promise.all([
      this.prisma.tweet.findMany({
        where: { authorId: userId },
        select: { tweetId: true },
      }),
      this.prisma.shared.findMany({
        where: { recipientId: userId },
        select: { tweetRefId: true },
      }),
    ]);

    const ownTweetIds = ownTweets.map((t) => t.tweetId);
    const sharedTweetIds = sharedTweetRefs.map((s) => s.tweetRefId);
    const allTweetIds = [...new Set([...ownTweetIds, ...sharedTweetIds])];

    // Get total count
    const total = allTweetIds.length;

    // Get tweets
    const tweets = await this.prisma.tweet.findMany({
      where: { tweetId: { in: allTweetIds } },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        images: {
          select: {
            imageId: true,
            url: true,
            publicId: true,
          },
        },
        _count: {
          select: {
            sharedWith: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: tweets,
      pagination: {
        total,
        currentPage: page,
        totalPages,
        hasMore: page < totalPages,
      },
    };
  }
}
