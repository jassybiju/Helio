import { Router } from "express";
import { patientProfileController } from "../../di/patient/profile.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export const patientProfileRouter = Router();

patientProfileRouter.use(authMiddleware);
patientProfileRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientProfileRouter.patch(
  "/complete-profile",
  patientProfileController.completeProfile
);
