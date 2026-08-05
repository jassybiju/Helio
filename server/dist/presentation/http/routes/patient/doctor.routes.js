import { Router } from "express";
import { patientDoctorController } from "../../di/patient/appointment/search.di.js";
import { optionalAuthMiddleware } from "../../middlewares/optionalAuth.middleware.js";
export const patientDoctorRouter = Router();
// patientDoctorRouter.use(authMiddleware);
// patientDoctorRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));
patientDoctorRouter.use(optionalAuthMiddleware);
patientDoctorRouter.get("/", patientDoctorController.searchDoctor);
patientDoctorRouter.get("/:doctorId/", patientDoctorController.getDoctorSlots);
//# sourceMappingURL=doctor.routes.js.map