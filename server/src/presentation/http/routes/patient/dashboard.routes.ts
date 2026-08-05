import { Router } from "express";
import { patientDashboardController } from "../../di/patient/dashboard.di.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export const patientDashboardRoutes = Router();

patientDashboardRoutes.use(authMiddleware);
patientDashboardRoutes.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientDashboardRoutes.get("/", patientDashboardController.getDashboard);
