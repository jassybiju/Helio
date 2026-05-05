import { Router } from "express";
import { doctorSlotController } from "../../di/doctor/slot.di.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";

export const doctorSlotRouter = Router();

doctorSlotRouter.use(authMiddleware);
doctorSlotRouter.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorSlotRouter.get("/", doctorSlotController.getSlots);
doctorSlotRouter.post("/block/", doctorSlotController.blockSlots);
doctorSlotRouter.get("/block/", doctorSlotController.getBlockSlot);
