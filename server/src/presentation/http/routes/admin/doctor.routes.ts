import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { adminDoctorController } from "../../di/admin/doctor.di.js";

export const adminDoctorRouter = Router();

adminDoctorRouter.use(authMiddleware);
adminDoctorRouter.use(authorizeMiddleware(USER_ROLES.ADMIN));

adminDoctorRouter.get("/", adminDoctorController.getAllDoctors);
adminDoctorRouter.get("/:doctorId", adminDoctorController.getDoctor);
adminDoctorRouter.patch(
  "/:doctorId/approval-status",
  adminDoctorController.changeDoctorApprovalStatus
);
adminDoctorRouter.patch("/:doctorId/status", adminDoctorController.toggleBlock);
