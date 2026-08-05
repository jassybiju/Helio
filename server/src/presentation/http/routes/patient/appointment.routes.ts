import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { patientAppointmentController } from "../../di/patient/appointment/appointment.di.js";
import { validate } from "../../middlewares/validation.middleware.js";
import {
  checkoutSchema,
  rescheduleAppointmentSchema,
  verifyPaymentSchema,
} from "../../schemas/patient/appointment.schema.js";

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
patientAppointmentRouter.get(
  "/:appointmentId/live-queue",
  patientAppointmentController.liveQueue
);

patientAppointmentRouter.post(
  "/:appointmentId/checkout",
  validate(checkoutSchema),
  patientAppointmentController.checkout
);

patientAppointmentRouter.post(
  "/:appointmentId/verify",
  validate(verifyPaymentSchema),
  patientAppointmentController.verifyPayment
);
patientAppointmentRouter.get("/", patientAppointmentController.getAll);

patientAppointmentRouter.get(
  "/:appointmentId/reschedule-slots",
  patientAppointmentController.getRescheduleSlots
);
patientAppointmentRouter.post(
  "/:appointmentId/reschedule-response",
  validate(rescheduleAppointmentSchema),
  patientAppointmentController.rescheduleAppointment
);

patientAppointmentRouter.post(
  "/:appointmentId/cancel-response",
  patientAppointmentController.cancelAndRefundAppointment
);

patientAppointmentRouter.post(
  "/:appointmentId/cancel",
  patientAppointmentController.patientCancelAppointment
);
patientAppointmentRouter.post(
  "/:appointmentId/reschedule",
  validate(rescheduleAppointmentSchema),
  patientAppointmentController.patientRescheduleAppointment
);
