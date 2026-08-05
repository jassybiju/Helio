import { Router } from "express";
import { doctorScheduleController } from "../../di/doctor/schedule.di.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

export const doctorScheduleRouter = Router();

doctorScheduleRouter.use(authMiddleware);
doctorScheduleRouter.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorScheduleRouter.post("/", doctorScheduleController.setSchedule);
doctorScheduleRouter.get("/", doctorScheduleController.getSchedule);
doctorScheduleRouter.delete("/:shiftId", doctorScheduleController.delete);
