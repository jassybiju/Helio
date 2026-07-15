import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { checkBlockMiddleware } from "../../di/middleware.di.ts";
import { validate } from "../../middlewares/validation.middleware.ts";
import { aiController } from "../../di/patient/ai.di.ts";
import { aiChatBotSchema } from "../../schemas/patient/ai.schema.ts";

export const aiRouter = Router();

aiRouter.use(authMiddleware);
aiRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));
aiRouter.use(checkBlockMiddleware.handle);

aiRouter.post("/chat", validate(aiChatBotSchema), aiController.chat);
