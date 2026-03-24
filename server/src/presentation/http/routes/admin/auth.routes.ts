import { Router } from "express";
import { adminAuthController } from "../../di/admin/auth.di.ts";

export const adminAuthRouter = Router()

adminAuthRouter.post('login',adminAuthController.login)