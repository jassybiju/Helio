import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { generatePdfSchema } from "../schemas/pdf.schema.js";
import { pdfController } from "../di/pdf.di.js";
export const pdfRouter = Router();
pdfRouter.use(authMiddleware);
pdfRouter.post("/", validate(generatePdfSchema), pdfController.generate);
//# sourceMappingURL=pdf.routes.js.map