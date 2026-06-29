import { Router } from "express";
import { specialityController } from "../../di/specialty.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export const adminSpecialtyRouter = Router();

adminSpecialtyRouter.use(authMiddleware);
adminSpecialtyRouter.use(authorizeMiddleware(USER_ROLES.ADMIN));

adminSpecialtyRouter.post("/", specialityController.addSpecialty);
adminSpecialtyRouter.delete("/:id", specialityController.removeSpecialty);
adminSpecialtyRouter.get("/", specialityController.get);
