import { Router } from "express";
import { doctorProfileController } from "../../di/doctor/profile.di.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { documentUpload, imageUpload } from "#config/multer.config.js";
import { checkBlockMiddleware } from "../../di/middleware.di.js";
export const doctorProfileRouter = Router();
doctorProfileRouter.use(authMiddleware);
doctorProfileRouter.use(authorizeMiddleware(USER_ROLES.DOCTOR));
doctorProfileRouter.use(checkBlockMiddleware.handle);
doctorProfileRouter.patch("/complete-profile", documentUpload.single("document"), doctorProfileController.completeProfile);
doctorProfileRouter.get("/", doctorProfileController.getDoctor);
doctorProfileRouter.put("/", doctorProfileController.updateDoctorProfile);
doctorProfileRouter.patch("/fee", doctorProfileController.updateDoctorFee);
doctorProfileRouter.patch("/change-password", doctorProfileController.changePassword);
doctorProfileRouter.patch("/picture", imageUpload.single("avatar"), doctorProfileController.updateProfilePic);
//# sourceMappingURL=profile.routes.js.map