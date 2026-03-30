import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { adminPatientController } from "../../di/admin/patient.di.ts";

export const adminPatientRouter = Router();
adminPatientRouter.use(authMiddleware);
adminPatientRouter.use(authorizeMiddleware(USER_ROLES.ADMIN));

adminPatientRouter.get("", adminPatientController.getAllPatients);
