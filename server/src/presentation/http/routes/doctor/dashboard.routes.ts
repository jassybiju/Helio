import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { doctorDashboardController } from "../../di/doctor/dashboard.di.ts";

export const doctorDashboardRoutes = Router();

doctorDashboardRoutes.use(authMiddleware);
doctorDashboardRoutes.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorDashboardRoutes.get("/", doctorDashboardController.getDashboard);
