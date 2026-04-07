import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { adminDoctorController } from "../../di/admin/doctor.di.ts";

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
