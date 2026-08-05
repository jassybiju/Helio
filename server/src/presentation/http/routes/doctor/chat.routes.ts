import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { doctorChatController } from "../../di/doctor/chat.di.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { sendChatSchema } from "../../schemas/chat.schema.js";

export const doctorChatRouter = Router();

doctorChatRouter.use(authMiddleware);
doctorChatRouter.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorChatRouter.post(
  "/:chatSessionId/",
  validate(sendChatSchema),
  doctorChatController.sendMessage
);

doctorChatRouter.get("/", doctorChatController.getChatList);
doctorChatRouter.get("/:chatSessionId", doctorChatController.getChat);
