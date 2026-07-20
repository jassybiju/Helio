import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { patientReviewController } from "../../di/patient/review.di.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { addReviewSchema } from "../../schemas/patient/review.schema.ts";

export const patientReviewRouter = Router();

patientReviewRouter.use(authMiddleware);
patientReviewRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientReviewRouter.post(
  "/:doctorId",
  validate(addReviewSchema),
  patientReviewController.addReview
);
