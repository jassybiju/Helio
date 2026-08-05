import { Router } from "express";
import { validate } from "../../middlewares/validation.middleware.js";
import { getAdminDashboardSchema } from "../../schemas/admin/dashboard.schema.js";
import { adminDashboardController } from "../../di/admin/dashboard.di.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export const adminDashboardRoutes = Router();

adminDashboardRoutes.use(authMiddleware);
adminDashboardRoutes.use(authorizeMiddleware(USER_ROLES.ADMIN));

adminDashboardRoutes.get(
  "/",
  validate(getAdminDashboardSchema),
  adminDashboardController.get
);
