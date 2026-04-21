import { Router } from "express";
import { doctorScheduleController } from "../../di/doctor/schedule.di.ts";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.ts";
import { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
import { authMiddleware } from "../../middlewares/auth.middleware.ts";

export const doctorScheduleRouter = Router();

doctorScheduleRouter.use(authMiddleware);
doctorScheduleRouter.use(authorizeMiddleware(USER_ROLES.DOCTOR));

doctorScheduleRouter.post("/", doctorScheduleController.setSchedule);
doctorScheduleRouter.get("/", doctorScheduleController.getSchedule);
