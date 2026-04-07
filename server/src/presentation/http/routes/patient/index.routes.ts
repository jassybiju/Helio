import { Router } from "express";
import { patientProfileRouter } from "./profile.routes.ts";
import { patientAuthRouter } from "./auth.routes.ts";

export const patientRouter = Router();

patientRouter.use("/auth", patientAuthRouter);
patientRouter.use("/profile", patientProfileRouter);
