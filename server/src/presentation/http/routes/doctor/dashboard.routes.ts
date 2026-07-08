import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { doctorDashboardController } from "../../di/doctor/dashboard.di.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { getDoctorDashboardSchema } from "../../schemas/doctor/dashboard.schema.ts";

export const doctorDashboardRoutes = Router();

doctorDashboardRoutes.use(authMiddleware);
doctorDashboardRoutes.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorDashboardRoutes.get(
  "/",
  validate(getDoctorDashboardSchema),
  doctorDashboardController.getDashboard
);
