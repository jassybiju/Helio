import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { patientChatController } from "../../di/patient/chat.di.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { sendChatSchema } from "../../schemas/chat.schema.ts";

export const patientChatRouter = Router();

patientChatRouter.use(authMiddleware);
patientChatRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));

patientChatRouter.post(
  "/:chatSessionId/",
  validate(sendChatSchema),
  patientChatController.sendMessage
);

patientChatRouter.get("/", patientChatController.getChatList);
patientChatRouter.get("/:chatSessionId", patientChatController.getChat);
