import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { doctorChatController } from "../../di/doctor/chat.di.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { sendChatSchema } from "../../schemas/chat.schema.ts";

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
