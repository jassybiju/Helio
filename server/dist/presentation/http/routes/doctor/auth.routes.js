import { Router } from "express";
import { documentUpload } from "#config/multer.config.js";
import { doctorAuthController } from "../../di/doctor/auth.di.js";
export const doctorAuthRouter = Router();
doctorAuthRouter.post("/register", documentUpload.single("document"), doctorAuthController.register);
doctorAuthRouter.post("/verify-otp", doctorAuthController.verify_otp);
doctorAuthRouter.post("/resend-otp", doctorAuthController.resend_otp);
doctorAuthRouter.post("/login", doctorAuthController.login);
doctorAuthRouter.post("/forget-password", doctorAuthController.forgetPasword);
doctorAuthRouter.post("/reset-password", doctorAuthController.resetPassword);
doctorAuthRouter.post("/google", doctorAuthController.googleLogin);
//# sourceMappingURL=auth.routes.js.map