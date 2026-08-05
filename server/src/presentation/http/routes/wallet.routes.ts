import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { walletController } from "../di/wallet.di.js";

export const walletRouter = Router();

walletRouter.use(authMiddleware);

walletRouter.get("/", walletController.getWallet);
walletRouter.post("/", walletController.addMoney);
walletRouter.post("/:transactionId", walletController.verifyAddMoney);
