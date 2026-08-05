import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { doctorDashboardController } from "../../di/doctor/dashboard.di.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { getDoctorDashboardSchema } from "../../schemas/doctor/dashboard.schema.js";
export const doctorDashboardRoutes = Router();
doctorDashboardRoutes.use(authMiddleware);
doctorDashboardRoutes.use(authorizeMiddleware(USER_ROLES.DOCTOR));
doctorDashboardRoutes.get("/", validate(getDoctorDashboardSchema), doctorDashboardController.getDashboard);
//# sourceMappingURL=dashboard.routes.js.map