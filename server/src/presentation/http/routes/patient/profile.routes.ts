import { Router } from "express";
import { patientProfileController } from "../../di/patient/profile.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { checkBlockMiddleware } from "../../di/middleware.di.ts";

export const patientProfileRouter = Router();

patientProfileRouter.use(authMiddleware);
patientProfileRouter.use(
  authorizeMiddleware(USER_ROLES.PATIENT),
  checkBlockMiddleware.handle
);

patientProfileRouter.get("/", patientProfileController.getPatient);
patientProfileRouter.patch(
  "/complete-profile",
  patientProfileController.completeProfile
);
patientProfileRouter.post("/allergen", patientProfileController.addAllergen);
patientProfileRouter.delete(
  "/allergen/:allergenId",
  patientProfileController.removeAllergen
);
patientProfileRouter.post("/condition", patientProfileController.addCondition);
patientProfileRouter.delete(
  "/condition/:conditionId",
  patientProfileController.removeCondition
);

patientProfileRouter.patch('/change-password', patientProfileController.changePassword)
patientProfileRouter.put('/', patientProfileController.updateProfile)