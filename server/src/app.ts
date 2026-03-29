import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { patientAuthRouter } from "./presentation/http/routes/patient/auth.routes.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import type { AppError } from "@shared/errors/AppError.ts";
import { errorResponse } from "@shared/utils/apiReponse.utils.ts";
import { doctorAuthRouter } from "./presentation/http/routes/doctor/auth.routes.ts";
import cors from "cors";
import { authRouter } from "./presentation/http/routes/auth.routes.ts";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { adminAuthRouter } from "./presentation/http/routes/admin/auth.routes.ts";

export const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    credentials: true,
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      const allowedDomains = ["localhost:3000", "helixo.local:3000"];

      const isAllowed = allowedDomains.some((domain) => {
        return origin.endsWith(domain);
      });
      if (isAllowed) {
        cb(null, true);
      } else {
        cb(new Error("not allowed by cors"));
      }
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/v1/api/auth/patient", patientAuthRouter);
app.use("/v1/api/auth/doctor", doctorAuthRouter);
app.use("/v1/api/auth/admin", adminAuthRouter);
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/refresh", (req, res, next) => {
  res.json("error");
});

app.get("/health", (req, res) => {
  console.log("Api is health");
  res.json({ health_status: "API is healthy" });
});

app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
  const logger = new PinoLoggerService();
  logger.error(err.message, err);

  res.status(err.statusCode || 500).json(errorResponse(err.message));
});
