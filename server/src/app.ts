import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { patientAuthRouter } from "./presentation/http/routes/patient/auth.schema.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import type { AppError } from "@shared/errors/AppError.ts";
import { errorResponse } from "@shared/utils/apiReponse.utils.ts";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/auth/patient", patientAuthRouter);

app.get("/health", (req, res) => {
  console.log("Api is health");
  res.json({ health_status: "API is healthy" });
});

app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
  const logger = new PinoLoggerService();
  logger.error(err.message, err);

  res.status(err.statusCode || 500).json(errorResponse(err.message));
});
