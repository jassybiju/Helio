import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { adminAppointmentController } from "../../di/admin/appointment.di.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { adminAppointmentSchema } from "../../schemas/admin/appointment.schema.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

export const adminAppointmentRouter = Router();

adminAppointmentRouter.use(authMiddleware);
adminAppointmentRouter.use(authorizeMiddleware(USER_ROLES.ADMIN));

adminAppointmentRouter.get(
  "/",
  validate(adminAppointmentSchema),
  adminAppointmentController.getAll
);
