import "dotenv/config";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

interface ITweetSharedEmail {
  to: string;
  recipientUsername: string;
  senderUsername: string;
  tweetContent: string;
  tweetId: string;
}

interface IEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class EmailService {
  private fromEmail: string;
  private appUrl: string;

  constructor() {
    this.fromEmail = process.env.RESEND_FROM_EMAIL || "test@example.com";
    this.appUrl = process.env.APP_URL || "http://localhost:5173";
  }

  public async sendTweetSharedNotification(
    params: ITweetSharedEmail
  ): Promise<IEmailResponse> {
    try {
      const tweetUrl = `${this.appUrl}/tweets/${params.tweetId}`;

      const { data, error } = await resend.emails.send({
        from: this.fromEmail,
        to: params.to,
        subject: `${params.senderUsername} shared a tweet with you`,
        html: this.getTweetSharedTemplate(
          params.recipientUsername,
          params.senderUsername,
          params.tweetContent,
          tweetUrl
        ),
      });

      if (error) {
        console.error("Error sending tweet shared notification:", error);
        return { success: false, error: error.message };
      }

      return { success: true, messageId: data?.id };
    } catch (error: any) {
      console.error("Error sending tweet shared notification:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send bulk emails (e.g., when sharing with multiple users)
   */
  public async sendBulkTweetSharedNotifications(
    recipients: {
      email: string;
      username: string;
    }[],
    senderUsername: string,
    tweetContent: string,
    tweetId: string
  ): Promise<IEmailResponse[]> {
    const promises = recipients.map((recipient) =>
      this.sendTweetSharedNotification({
        to: recipient.email,
        recipientUsername: recipient.username,
        senderUsername,
        tweetContent,
        tweetId,
      })
    );

    return Promise.all(promises);
  }

  /**
   * Tweet shared notification HTML template
   */
  private getTweetSharedTemplate(
    recipientUsername: string,
    senderUsername: string,
    tweetContent: string,
    tweetUrl: string
  ): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #1da1f2;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: #f5f8fa;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .tweet {
              background-color: white;
              padding: 20px;
              border-left: 4px solid #1da1f2;
              margin: 20px 0;
              border-radius: 5px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #1da1f2;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Tweet Shared With You! 📨</h1>
            </div>
            <div class="content">
              <h2>Hi ${recipientUsername},</h2>
              <p><strong>@${senderUsername}</strong> shared a tweet with you:</p>
              <div class="tweet">
                <p>${tweetContent}</p>
              </div>
              <a href="${tweetUrl}" class="button">View Tweet</a>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
