import { Router } from "express";
import { patientProfileRouter } from "./profile.routes.ts";
import { patientAuthRouter } from "./auth.routes.ts";
import { patientDoctorRouter } from "./doctor.routes.ts";
import { patientAppointmentRouter } from "./appointment.routes.ts";
import { patientLabRoutes } from "./lab.routes.ts";
import { patientChatRouter } from "./chat.routes.ts";
import { patientReviewRouter } from "./review.routes.ts";
import { aiRouter } from "./ai.routes.ts";

export const patientRouter = Router();

patientRouter.use("/auth", patientAuthRouter);
patientRouter.use("/profile", patientProfileRouter);
patientRouter.use("/doctors", patientDoctorRouter);
patientRouter.use("/appointment", patientAppointmentRouter);
patientRouter.use("/lab", patientLabRoutes);
patientRouter.use("/chat", patientChatRouter);
patientRouter.use("/review", patientReviewRouter);
patientRouter.use("/ai", aiRouter);
