import { Router } from "express";
import { documentUpload } from "@config/multer.config.ts";
import { doctorAuthController } from "../../di/doctor/auth.di.ts";

export const doctorAuthRouter = Router();

doctorAuthRouter.post(
  "/register",
  documentUpload.single("document"),
  doctorAuthController.register
);

doctorAuthRouter.post("/verify-otp", doctorAuthController.verify_otp);
doctorAuthRouter.post("/resend-otp", doctorAuthController.resend_otp);
