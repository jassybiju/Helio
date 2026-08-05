import { Router } from "express";
import { labController } from "../../di/patient/lab.di.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorizeMiddleware } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { documentUpload } from "#config/multer.config.js";
export const patientLabRoutes = Router();
patientLabRoutes.use(authMiddleware);
patientLabRoutes.use(authorizeMiddleware(USER_ROLES.PATIENT));
patientLabRoutes.get("/", labController.getLabReport);
patientLabRoutes.patch("/:reportId/upload", documentUpload.single("document"), labController.uploadReport);
//# sourceMappingURL=lab.routes.js.map