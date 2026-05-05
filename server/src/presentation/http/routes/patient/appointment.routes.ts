import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { patientAppointmentController } from "../../di/doctor/appointment.di.ts";

export const patientAppointmentRouter = Router();

patientAppointmentRouter.use(authMiddleware);
patientAppointmentRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientAppointmentRouter.post(
  "/",
  patientAppointmentController.createAppointment
);
