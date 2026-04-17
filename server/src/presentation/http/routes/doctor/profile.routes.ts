import { Router } from "express";
import { doctorProfileController } from "../../di/doctor/profile.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { documentUpload } from "@config/multer.config.ts";
import { checkBlockMiddleware } from "../../di/middleware.di.ts";

export const doctorProfileRouter = Router();

doctorProfileRouter.use(authMiddleware);
doctorProfileRouter.use(authorizeMiddleware(USER_ROLES.DOCTOR));
doctorProfileRouter.use(checkBlockMiddleware.handle);

doctorProfileRouter.patch(
  "/complete-profile",
  documentUpload.single("document"),
  doctorProfileController.completeProfile
);

doctorProfileRouter.get("/", doctorProfileController.getDoctor);
doctorProfileRouter.patch("/fee", doctorProfileController.updateDoctorFee);
