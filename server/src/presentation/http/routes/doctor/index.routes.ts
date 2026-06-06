import { Router } from "express";
import { doctorAuthRouter } from "./auth.routes.ts";
import { doctorProfileRouter } from "./profile.routes.ts";
import { doctorVerificationRoutes } from "./verification.routes.ts";
import { doctorScheduleRouter } from "./schedule.routes.ts";
import { doctorSlotRouter } from "./slot.routes.ts";
import { doctorAppointmentRoutes } from "./appointment.routes.ts";
import { doctorConsultationRoutes } from "./consultation.routes.ts";

export const doctorRouter = Router();

doctorRouter.use("/auth", doctorAuthRouter);
doctorRouter.use("/profile", doctorProfileRouter);
doctorRouter.use("/verification", doctorVerificationRoutes);
doctorRouter.use("/schedule", doctorScheduleRouter);
doctorRouter.use("/slot", doctorSlotRouter);
doctorRouter.use("/appointment", doctorAppointmentRoutes);
doctorRouter.use("/consultation", doctorConsultationRoutes);
