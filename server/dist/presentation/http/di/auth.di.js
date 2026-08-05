import { GetMeUseCase } from "#application/use-cases/auth/get-me/GetMeUseCase.js";
import { AuthController } from "../controllers/auth.controller.js";
import { PatientGetMeHandler } from "#application/use-cases/auth/get-me/PatientGetMeHandler.js";
import { DoctorGetMeHandler } from "#application/use-cases/auth/get-me/DoctorGetMeHandler.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { AdminGetMeHandler } from "#application/use-cases/auth/get-me/AdminGetMeHandler.js";
import { RefreshTokenUseCase } from "#application/use-cases/auth/refreshToken/RefreshTokenUseCase.js";
import { RedisSessionRepository } from "#infrastructure/database/repositories/RedisSessionRepository.js";
import { CryptoRefreshTokenService } from "#infrastructure/services/CryptoRefreshTokenService.js";
import { JWTAccessTokenService } from "#infrastructure/services/JWTAccessTokenService.js";
import { LogoutUseCase } from "#application/use-cases/auth/logout/LogoutUseCase.js";
import { CloudinaryFileUploadService } from "#infrastructure/services/CloudinaryFileUploadService.js";
import { AdminRepository } from "#infrastructure/database/repositories/AdminRepository.js";
const loggerService = PinoLoggerService.getInstance();
const patientRepo = new PatientRepository(loggerService);
const doctorRepo = new MongoDoctorRepository(loggerService);
const sessionRepo = new RedisSessionRepository(loggerService);
const adminRepo = new AdminRepository();
const refreshTokenService = new CryptoRefreshTokenService();
const accessTokenService = new JWTAccessTokenService();
const fileUpload = new CloudinaryFileUploadService();
const doctorGetMeHandler = new DoctorGetMeHandler(doctorRepo, fileUpload);
const patientGetMeHandler = new PatientGetMeHandler(patientRepo, fileUpload);
const adminGetMeHandler = new AdminGetMeHandler(adminRepo);
const getMeUseCase = new GetMeUseCase(loggerService, [
    doctorGetMeHandler,
    patientGetMeHandler,
    adminGetMeHandler,
]);
const refreshUseCase = new RefreshTokenUseCase(loggerService, sessionRepo, refreshTokenService, accessTokenService);
const logoutUseCase = new LogoutUseCase(loggerService, refreshTokenService, sessionRepo);
export const authController = new AuthController(getMeUseCase, refreshUseCase, logoutUseCase);
//# sourceMappingURL=auth.di.js.map