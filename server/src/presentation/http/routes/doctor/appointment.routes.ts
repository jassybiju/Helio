import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { doctorAppointmentController } from "../../di/doctor/appointment.di.ts";
import { doctorViewAllAppointmentSchema } from "../../schemas/doctor/appointment.schema.ts";
import { validate } from "../../middlewares/validation.middleware.ts";

export const doctorAppointmentRoutes = Router();

doctorAppointmentRoutes.use(authMiddleware);
doctorAppointmentRoutes.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorAppointmentRoutes.get(
  "/",
  validate(doctorViewAllAppointmentSchema),
  doctorAppointmentController.getAllAppointments
);
