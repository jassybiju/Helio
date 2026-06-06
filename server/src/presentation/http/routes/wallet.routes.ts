import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { walletController } from "../di/wallet.di.ts";

export const walletRouter = Router();

walletRouter.use(authMiddleware);

walletRouter.get("/", walletController.getWallet);
walletRouter.post("/", walletController.addMoney);
walletRouter.post("/:transactionId", walletController.verifyAddMoney);
