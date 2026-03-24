import { Router } from "express";
import { authController } from "../../di/patient/auth.di.ts";

export const patientAuthRouter = Router();

patientAuthRouter.post("/register", authController.register);
patientAuthRouter.post("/verify-otp", authController.verify_otp);
patientAuthRouter.post("/resend-otp", authController.resend_otp);
patientAuthRouter.post('/login', authController.login)
