import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import type { AppError } from "#shared/errors/AppError.js";
import { errorResponse } from "#shared/utils/apiReponse.utils.js";
import cors from "cors";
import { authRouter } from "./presentation/http/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { adminAuthRouter } from "./presentation/http/routes/admin/auth.routes.js";
import { adminPatientRouter } from "./presentation/http/routes/admin/patient.routes.js";
import { adminDoctorRouter } from "./presentation/http/routes/admin/doctor.routes.js";
import { doctorRouter } from "./presentation/http/routes/doctor/index.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { patientRouter } from "./presentation/http/routes/patient/index.routes.js";
import { specialityController } from "./presentation/http/di/specialty.di.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { adminSpecialtyRouter } from "./presentation/http/routes/admin/specialty.routes.js";
import { walletRouter } from "./presentation/http/routes/wallet.routes.js";
import { expireAppointmentsUseCase } from "./presentation/http/di/jobs/appointmentExpiry.di.js";
import { appointmentExpiryJob } from "#infrastructure/jobs/appointmentExpiry.job.js";
import { pdfRouter } from "./presentation/http/routes/pdf.routes.js";
import { notificationRouter } from "./presentation/http/routes/notification.routes.js";
import { adminDashboardRoutes } from "./presentation/http/routes/admin/dashboard.routes.js";
import client from "prom-client";
import responseTime from "response-time";

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Prometheus SetUp
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

app.use(morgan("dev"));

const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.use(
  cors({
    credentials: true,
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      if (!origin) {
        cb(null, true);
      }
      if (allowedOrigins.has(origin)) {
        return cb(null, true);
      }

      return cb(new Error("not allowed by cors"));
    },
  })
);

const reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "This tells how much time is taken by req and res",
  labelNames: ["method", "route", "status_code"],
  buckets: [1, 50, 100, 200, 500, 1000],
});

app.use(
  responseTime((req: Request, res: Response, time) => {
    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const api = "/v1/api/";

app.use("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();

  res.send(metrics);
});

app.use(`${api}admin/auth`, adminAuthRouter);
app.use(`${api}auth`, authRouter);

app.use(`${api}admin/patient`, adminPatientRouter);
app.use(`${api}admin/specialty`, adminSpecialtyRouter);
app.use(`${api}admin/doctor`, adminDoctorRouter);
app.use(`${api}admin/dashboard`, adminDashboardRoutes);

app.use(`${api}doctor`, doctorRouter);
app.use(`${api}patient`, patientRouter);
app.get(`${api}specialty`, specialityController.getAll);

app.use(`${api}wallet`, walletRouter);
app.use(`${api}pdf`, pdfRouter);
app.use(`${api}notification`, notificationRouter);

app.get("/health", (req, res) => {
  res.json({ health_status: "API is healthy" });
});

appointmentExpiryJob(expireAppointmentsUseCase);

app.use((req: Request, res: Response, _next: NextFunction) => {
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
