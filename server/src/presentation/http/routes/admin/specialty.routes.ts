import { Router } from "express";
import { specialityController } from "../../di/specialty.di.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";

export const adminSpecialtyRouter = Router();

adminSpecialtyRouter.use(authMiddleware);
adminSpecialtyRouter.use(authorizeMiddleware(USER_ROLES.ADMIN));

adminSpecialtyRouter.post("/", specialityController.addSpecialty);
adminSpecialtyRouter.delete("/:id", specialityController.removeSpecialty);
adminSpecialtyRouter.get("/", specialityController.get);
