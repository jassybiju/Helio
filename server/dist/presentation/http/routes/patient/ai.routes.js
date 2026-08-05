import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { checkBlockMiddleware } from "../../di/middleware.di.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { aiController } from "../../di/patient/ai.di.js";
import { aiChatBotSchema } from "../../schemas/patient/ai.schema.js";
export const aiRouter = Router();
aiRouter.use(authMiddleware);
aiRouter.use(authorizeMiddleware(USER_ROLES.PATIENT));
aiRouter.use(checkBlockMiddleware.handle);
aiRouter.post("/chat", validate(aiChatBotSchema), aiController.chat);
//# sourceMappingURL=ai.routes.js.map