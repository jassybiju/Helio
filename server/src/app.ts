import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import type { AppError } from "@shared/errors/AppError.ts";
import { errorResponse } from "@shared/utils/apiReponse.utils.ts";
import cors from "cors";
import { authRouter } from "./presentation/http/routes/auth.routes.ts";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { adminAuthRouter } from "./presentation/http/routes/admin/auth.routes.ts";
import { adminPatientRouter } from "./presentation/http/routes/admin/patient.routes.ts";
import { adminDoctorRouter } from "./presentation/http/routes/admin/doctor.routes.ts";
import { doctorRouter } from "./presentation/http/routes/doctor/index.routes.ts";
import path from "path";
import { fileURLToPath } from "url";
import { patientRouter } from "./presentation/http/routes/patient/index.routes.ts";
import { specialityController } from "./presentation/http/di/specialty.di.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { adminSpecialtyRouter } from "./presentation/http/routes/admin/specialty.routes.ts";
import { walletRouter } from "./presentation/http/routes/wallet.routes.ts";
import { expireAppointmentsUseCase } from "./presentation/http/di/jobs/appointmentExpiry.di.ts";
import { appointmentExpiryJob } from "@infrastructure/jobs/appointmentExpiry.job.ts";

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("dev"));

app.use(
  cors({
    credentials: true,
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      const allowedDomains = ["localhost:3000", "helixo.com:3000"];

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

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const api = "/v1/api/";

app.use(`${api}admin/auth`, adminAuthRouter);
app.use(`${api}auth`, authRouter);

app.use(`${api}admin/patient`, adminPatientRouter);
app.use(`${api}admin/specialty`, adminSpecialtyRouter);
app.use(`${api}admin/doctor`, adminDoctorRouter);

app.use(`${api}doctor`, doctorRouter);
app.use(`${api}patient`, patientRouter);
app.get(`${api}specialty`, specialityController.getAll);

app.use(`${api}wallet`, walletRouter);

app.get("/health", (req, res) => {
  console.log("Api is health");
  res.json({ health_status: "API is healthy" });
});

appointmentExpiryJob(expireAppointmentsUseCase);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(HTTPStatus.NOT_FOUND).json(errorResponse("No Endpoint"));
});

app.use((err: AppError, req: Request, res: Response, _next: NextFunction) => {
  const logger = PinoLoggerService.getInstance();

  if (err instanceof Error) {
    logger.error(err.message, err);
  } else {
    logger.error("unknown error", err);
  }

  if (err instanceof Object && "statusCode" in err) {
    return res.status(err.statusCode || 500).json(errorResponse(err.message));
  }

  return res
    .status(HTTPStatus.INTERNAL_ERROR)
    .json(errorResponse("Unkown error"));
});
