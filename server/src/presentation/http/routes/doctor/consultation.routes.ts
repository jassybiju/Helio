import { Router } from "express";
import { doctorConsultationController } from "../../di/doctor/consultation.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import {
  doctorAddPrescriptionSchema,
  doctorUpdateConsultationNotes,
  doctorUpdateVitalsSchema,
} from "../../schemas/doctor/consultation.schema.ts";

export const doctorConsultationRoutes = Router();

doctorConsultationRoutes.use(authMiddleware);
doctorConsultationRoutes.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorConsultationRoutes.get(
  "/:appointmentId/",
  doctorConsultationController.viewConsultation
);
doctorConsultationRoutes.patch(
  "/:appointmentId/end",
  doctorConsultationController.endConsultation
);

doctorConsultationRoutes.patch(
  "/:appointmentId/vitals",
  validate(doctorUpdateVitalsSchema),
  doctorConsultationController.updateVitals
);

doctorConsultationRoutes.post(
  "/:appointmentId/prescription",
  validate(doctorAddPrescriptionSchema),
  doctorConsultationController.addPrescription
);

doctorConsultationRoutes.delete(
  "/:appointmentId/prescription/:prescriptionName",
  doctorConsultationController.removePrescription
);

doctorConsultationRoutes.patch(
  "/:appointmentId/notes",
  validate(doctorUpdateConsultationNotes),
  doctorConsultationController.updateNotes
);

doctorConsultationRoutes.post(
  "/:appointmentId/test",
  doctorConsultationController.addTest
);

doctorConsultationRoutes.delete(
  "/:appointmentId/test/:testId",
  doctorConsultationController.removeTest
);
doctorConsultationRoutes.get(
  "/:appointmentId/history",
  doctorConsultationController.viewHistory
);
