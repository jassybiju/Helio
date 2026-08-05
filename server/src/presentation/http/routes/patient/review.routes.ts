import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { patientReviewController } from "../../di/patient/review.di.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { addReviewSchema } from "../../schemas/patient/review.schema.js";

export const patientReviewRouter = Router();

patientReviewRouter.use(authMiddleware);
patientReviewRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientReviewRouter.post(
  "/:doctorId",
  validate(addReviewSchema),
  patientReviewController.addReview
);
