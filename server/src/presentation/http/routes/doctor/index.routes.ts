import { Router } from "express";
import { doctorAuthRouter } from "./auth.routes.ts";
import { doctorProfileRouter } from "./profile.routes.ts";
import { doctorVerificationRoutes } from "./verification.routes.ts";
import { doctorScheduleRouter } from "./schedule.routes.ts";

export const doctorRouter = Router();

doctorRouter.use("/auth", doctorAuthRouter);
doctorRouter.use("/profile", doctorProfileRouter);
doctorRouter.use("/verification", doctorVerificationRoutes);
doctorRouter.use("/schedule", doctorScheduleRouter);
