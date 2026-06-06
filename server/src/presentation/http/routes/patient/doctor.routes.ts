import { Router } from "express";
import { patientDoctorController } from "../../di/patient/appointment/search.di.ts";
import { optionalAuthMiddleware } from "../../middlewares/optionalAuth.middleware.ts";

export const patientDoctorRouter = Router();

// patientDoctorRouter.use(authMiddleware);
// patientDoctorRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));
patientDoctorRouter.use(optionalAuthMiddleware);

patientDoctorRouter.get("/", patientDoctorController.searchDoctor);
patientDoctorRouter.get("/:doctorId/", patientDoctorController.getDoctorSlots);
