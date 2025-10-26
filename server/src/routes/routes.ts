import { Router } from "express";
import { authRouter } from "./auth-routes.js";
import { tweetRouter } from "./tweet-routes.js";
import { userRouter } from "./users-routes.js";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/tweets", tweetRouter);
routes.use("/users", userRouter);

export { routes };
