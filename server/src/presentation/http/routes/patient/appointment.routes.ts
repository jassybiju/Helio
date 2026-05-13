import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { patientAppointmentController } from "../../di/patient/appointment/appointment.di.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { checkoutSchema } from "../../schemas/patient/appointment.schema.ts";

export const patientAppointmentRouter = Router();

patientAppointmentRouter.use(authMiddleware);
patientAppointmentRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientAppointmentRouter.post(
  "/",
  patientAppointmentController.createAppointment
);

patientAppointmentRouter.get(
  "/:appointmentId",
  patientAppointmentController.getAppointment
);

patientAppointmentRouter.post(
  "/:appointmentId/checkout",
  validate(checkoutSchema),
  patientAppointmentController.checkout
);
