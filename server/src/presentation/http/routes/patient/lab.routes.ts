import { Router } from "express";
import { labController } from "../../di/patient/lab.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { documentUpload } from "@config/multer.config.ts";

export const patientLabRoutes = Router();

patientLabRoutes.use(authMiddleware);
patientLabRoutes.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientLabRoutes.get("/", labController.getLabReport);
patientLabRoutes.patch(
  "/:reportId/upload",
  documentUpload.single("document"),
  labController.uploadReport
);
