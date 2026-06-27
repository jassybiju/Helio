import { GetMeUseCase } from "@application/use-cases/auth/get-me/GetMeUseCase.ts";
import { AuthController } from "../controllers/auth.controller.ts";
import { PatientGetMeHandler } from "@application/use-cases/auth/get-me/PatientGetMeHandler.ts";
import { DoctorGetMeHandler } from "@application/use-cases/auth/get-me/DoctorGetMeHandler.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { AdminGetMeHandler } from "@application/use-cases/auth/get-me/AdminGetMeHandler.ts";
import { RefreshTokenUseCase } from "@application/use-cases/auth/refreshToken/RefreshTokenUseCase.ts";
import { RedisSessionRepository } from "@infrastructure/database/repositories/RedisSessionRepository.ts";
import { CryptoRefreshTokenService } from "@infrastructure/services/CryptoRefreshTokenService.ts";
import { JWTAccessTokenService } from "@infrastructure/services/JWTAccessTokenService.ts";
import { LogoutUseCase } from "@application/use-cases/auth/logout/LogoutUseCase.ts";
import { CloudinaryFileUploadService } from "@infrastructure/services/CloudinaryFileUploadService.ts";

const loggerService = new PinoLoggerService();

const patientRepo = new PatientRepository(loggerService);
const doctorRepo = new MongoDoctorRepository(loggerService);
const sessionRepo = new RedisSessionRepository(loggerService);

const refreshTokenService = new CryptoRefreshTokenService();
const accessTokenService = new JWTAccessTokenService();
const fileUpload = new CloudinaryFileUploadService()

const doctorGetMeHandler = new DoctorGetMeHandler(doctorRepo,fileUpload);
const patientGetMeHandler = new PatientGetMeHandler(patientRepo,fileUpload);
const adminGetMeHandler = new AdminGetMeHandler();
const getMeUseCase = new GetMeUseCase(loggerService, [
  doctorGetMeHandler,
  patientGetMeHandler,
  adminGetMeHandler,
]);

const refreshUseCase = new RefreshTokenUseCase(
  loggerService,
  sessionRepo,
  refreshTokenService,
  accessTokenService
);

const logoutUseCase = new LogoutUseCase(
  loggerService,
  refreshTokenService,
  sessionRepo
);

export const authController = new AuthController(
  getMeUseCase,
  refreshUseCase,
  logoutUseCase
);
