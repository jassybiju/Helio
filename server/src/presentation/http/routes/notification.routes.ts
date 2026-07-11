import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { checkBlockMiddleware } from "../di/middleware.di.ts";
import { notificationController } from "../di/notification.di.ts";
import { getAllNotificationSchema } from "../schemas/notification.schema.ts";
import { validate } from "../middlewares/validation.middleware.ts";

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
