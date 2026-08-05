import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { patientChatController } from "../../di/patient/chat.di.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { sendChatSchema } from "../../schemas/chat.schema.js";

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
