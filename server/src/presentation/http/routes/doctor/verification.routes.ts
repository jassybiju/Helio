import { Router } from "express";
import { doctorVerificationController } from "../../di/doctor/verification.di.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { documentUpload } from "#config/multer.config.js";
import { checkBlockMiddleware } from "../../di/middleware.di.js";

export const doctorVerificationRoutes = Router();

doctorVerificationRoutes.use(authMiddleware);
doctorVerificationRoutes.use(authorizeMiddleware(USER_ROLES.DOCTOR));
doctorVerificationRoutes.use(checkBlockMiddleware.handle);

doctorVerificationRoutes.get(
  "",
  doctorVerificationController.getVerificationDetails
);
doctorVerificationRoutes.patch(
  "/resubmit",
  documentUpload.single("document"),
  doctorVerificationController.resubmitVerification
);
