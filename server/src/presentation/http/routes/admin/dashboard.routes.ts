import { Router } from "express";
import { validate } from "../../middlewares/validation.middleware.ts";
import { getAdminDashboardSchema } from "../../schemas/admin/dashboard.schema.ts";
import { adminDashboardController } from "../../di/admin/dashboard.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export const adminDashboardRoutes = Router();

adminDashboardRoutes.use(authMiddleware);
adminDashboardRoutes.use(authorizeMiddleware(USER_ROLES.ADMIN));

adminDashboardRoutes.get(
  "/",
  validate(getAdminDashboardSchema),
  adminDashboardController.get
);
