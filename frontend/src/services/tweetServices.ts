import api from "./api";

interface ICreateTweet {
  content: string;
  recipientIds?: string[];
}
export class TweetService {
  static async fetchTweets() {
    const response = await api.get("/tweets");
    return response.data;
  }

  static async postTweet({ content, recipientIds }: ICreateTweet) {
    const response = await api.post("/tweets/create", {
      content,
      recipientIds,
    });
    return response.data;
  }

  static async getTweets(url: string) {
    const response = await api.get(url);
    return response.data;
  }

  static async getUserFeed(url: string) {
    const response = await api.get(url);
    return response.data;
  }
}
