import { Router } from "express";
import { authController } from "../../di/patient/auth.di.ts";

export const patientAuthRouter = Router();

patientAuthRouter.post("/register", authController.register);
