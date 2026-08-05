import { Router } from "express";
import { doctorSlotController } from "../../di/doctor/slot.di.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
export const doctorSlotRouter = Router();
doctorSlotRouter.use(authMiddleware);
doctorSlotRouter.use(authorizeMiddleware(USER_ROLES.DOCTOR));
doctorSlotRouter.get("/", doctorSlotController.getSlots);
doctorSlotRouter.post("/block/", doctorSlotController.blockSlots);
doctorSlotRouter.get("/block/", doctorSlotController.getBlockSlot);
doctorSlotRouter.delete("/block/:blockId", doctorSlotController.deleteBlock);
//# sourceMappingURL=slot.routes.js.map