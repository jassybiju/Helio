import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { patientDoctorController } from "../../di/patient/appointment/search.di.ts";

export const patientDoctorRouter = Router();

// patientDoctorRouter.use(authMiddleware);
// patientDoctorRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientDoctorRouter.get("/", patientDoctorController.searchDoctor);
patientDoctorRouter.get("/:doctorId/", patientDoctorController.getDoctorSlots);
