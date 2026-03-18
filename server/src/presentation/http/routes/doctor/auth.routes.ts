import { Router } from "express";
import { documentUpload } from "@config/multer.config.ts";
import { doctorAuthController } from "../../di/doctor/auth.di.ts";

export const doctorAuthRouter = Router();

doctorAuthRouter.post(
  "/register",
  documentUpload.single("document"),
  doctorAuthController.register
);
