import { Router } from "express";
import { adminAuthController } from "../../di/admin/auth.di.js";
export const adminAuthRouter = Router();
adminAuthRouter.post("/login", adminAuthController.login);
//# sourceMappingURL=auth.routes.js.map