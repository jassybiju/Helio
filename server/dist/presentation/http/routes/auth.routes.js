import { Router } from "express";
import { authController } from "../di/auth.di.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { checkBlockMiddleware } from "../di/middleware.di.js";
export const authRouter = Router();
authRouter.get("/get-me", authMiddleware, checkBlockMiddleware.handle, authController.getMe);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);
//# sourceMappingURL=auth.routes.js.map