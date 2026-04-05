import { Router } from "express";
import { doctorVerificationController } from "../../di/doctor/verification.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export const doctorVerificationRoutes = Router();

doctorVerificationRoutes.use(authMiddleware);
doctorVerificationRoutes.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorVerificationRoutes.get(
  "",
  doctorVerificationController.getVerificationDetails
);
