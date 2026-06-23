import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { doctorChatController } from "../../di/doctor/chat.di.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { doctorSendChatSchema } from "../../schemas/doctor/chat.schema.ts";

export const doctorChatRouter = Router();

doctorChatRouter.use(authMiddleware);
doctorChatRouter.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorChatRouter.post(
  "/:chatSessionId/",
  validate(doctorSendChatSchema),
  doctorChatController.sendMessage
);
