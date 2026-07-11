import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { generatePdfSchema } from "../schemas/pdf.schema.ts";
import { pdfController } from "../di/pdf.di.ts";

export const pdfRouter = Router();

pdfRouter.use(authMiddleware);

pdfRouter.post("/", validate(generatePdfSchema), pdfController.generate);
