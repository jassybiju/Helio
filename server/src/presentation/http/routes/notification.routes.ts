import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { checkBlockMiddleware } from "../di/middleware.di.js";
import { notificationController } from "../di/notification.di.js";
import { getAllNotificationSchema } from "../schemas/notification.schema.js";
import { validate } from "../middlewares/validation.middleware.js";

export const notificationRouter = Router();

notificationRouter.use(authMiddleware);
notificationRouter.use(
  authorizeMiddleware([USER_ROLES.DOCTOR, USER_ROLES.PATIENT, USER_ROLES.ADMIN])
);
notificationRouter.use(checkBlockMiddleware.handle);

notificationRouter.get(
  "/",
  validate(getAllNotificationSchema),
  notificationController.getAll
);
