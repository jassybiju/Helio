import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { doctorAppointmentController } from "../../di/doctor/appointment.di.js";
import { doctorViewAllAppointmentSchema } from "../../schemas/doctor/appointment.schema.js";
import { validate } from "../../middlewares/validation.middleware.js";
export const doctorAppointmentRoutes = Router();
doctorAppointmentRoutes.use(authMiddleware);
doctorAppointmentRoutes.use(authorizeMiddleware(USER_ROLES.DOCTOR));
doctorAppointmentRoutes.get("/", validate(doctorViewAllAppointmentSchema), doctorAppointmentController.getAllAppointments);
doctorAppointmentRoutes.get("/today", doctorAppointmentController.getTodaysAppointment);
doctorAppointmentRoutes.post("/:appointmentId/start", doctorAppointmentController.startConsultation);
doctorAppointmentRoutes.get("/:appointmentId", doctorAppointmentController.getAppointment);
doctorAppointmentRoutes.patch("/:appointmentId/skip", doctorAppointmentController.skipAppointment);
//# sourceMappingURL=appointment.routes.js.map