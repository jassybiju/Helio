import { Router } from "express";
import { patientProfileRouter } from "./profile.routes.js";
import { patientAuthRouter } from "./auth.routes.js";
import { patientDoctorRouter } from "./doctor.routes.js";
import { patientAppointmentRouter } from "./appointment.routes.js";
import { patientLabRoutes } from "./lab.routes.js";
import { patientChatRouter } from "./chat.routes.js";
import { patientReviewRouter } from "./review.routes.js";
import { aiRouter } from "./ai.routes.js";
import { patientDashboardRoutes } from "./dashboard.routes.js";

export const patientRouter = Router();

patientRouter.use("/auth", patientAuthRouter);
patientRouter.use("/profile", patientProfileRouter);
patientRouter.use("/doctors", patientDoctorRouter);
patientRouter.use("/appointment", patientAppointmentRouter);
patientRouter.use("/lab", patientLabRoutes);
patientRouter.use("/chat", patientChatRouter);
patientRouter.use("/review", patientReviewRouter);
patientRouter.use("/ai", aiRouter);
patientRouter.use("/dashboard", patientDashboardRoutes);
