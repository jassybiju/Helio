import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { adminPatientController } from "../../di/admin/patient.di.js";

export const adminPatientRouter = Router();
adminPatientRouter.use(authMiddleware);
adminPatientRouter.use(authorizeMiddleware(USER_ROLES.ADMIN));

adminPatientRouter.get("", adminPatientController.getAllPatients);
adminPatientRouter.get("/:patientId", adminPatientController.getPatient);
adminPatientRouter.patch("/:userId/status", adminPatientController.toggleBlock);
