import express, {} from "express";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
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
export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(morgan("dev"));
app.use(cors({
    credentials: true,
    origin: (origin, cb) => {
        if (!origin)
            return cb(null, true);
        const allowedDomains = ["localhost:3000", "helixo.com"];
        const isAllowed = allowedDomains.some((domain) => {
            return origin.endsWith(domain);
        });
        if (isAllowed) {
            cb(null, true);
        }
        else {
            cb(new Error("not allowed by cors"));
        }
    },
}));
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
app.use((req, res, _next) => {
    return res.status(HTTPStatus.NOT_FOUND).json(errorResponse("No Endpoint"));
});
app.use((err, req, res, _next) => {
    const logger = PinoLoggerService.getInstance();
    if (err instanceof Error) {
        logger.error(err.message, err);
    }
    else {
        logger.error("unknown error", err);
    }
    if (err instanceof Object && "statusCode" in err) {
        return res.status(err.statusCode || 500).json(errorResponse(err.message));
    }
    return res
        .status(HTTPStatus.INTERNAL_ERROR)
        .json(errorResponse("Unkown error"));
});
//# sourceMappingURL=app.js.map