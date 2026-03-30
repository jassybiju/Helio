import { Router } from "express";
import { authController } from "../di/auth.di.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { checkBlockMiddleware } from "../middlewares/checkBlocked.middleware.ts";

export const authRouter = Router();

authRouter.get(
  "/get-me",
  authMiddleware,
  checkBlockMiddleware,
  authController.getMe
);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);
