import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import { routes } from "./routes/routes.js";
import { globalErrorHandler } from "./middlewares/error-handler.js";

const app = express();

const PORT = process.env.PORT || 3002;

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());

// Health status
app.use("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", routes);

app.use(globalErrorHandler);
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
