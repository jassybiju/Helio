import { RegisterPatientUseCase } from "@application/use-cases/patient/auth/RegisterPatientUseCase.ts";
import { PatientAuthController } from "../../controllers/patient/auth.controller.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { OTPService } from "@infrastructure/services/OTPService.ts";
import { RedisOTPRepository } from "@infrastructure/database/repositories/RedisOTPRepository.ts";
import { VerifyOTPUseCase } from "@application/use-cases/auth/VerifyOTPUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { ResendOTPUseCase } from "@application/use-cases/auth/ResendOTPUseCase.ts";
import { LoginPatientUseCase } from "@application/use-cases/patient/auth/LoginPatientUseCase.ts";
import { JWTAccessTokenService } from "@infrastructure/services/JWTAccessTokenService.ts";
import { CryptoRefreshTokenService } from "@infrastructure/services/CryptoRefreshTokenService.ts";
import { RedisSessionRepository } from "@infrastructure/database/repositories/RedisSessionRepository.ts";
import { PatientValidator } from "@application/validators/PatientValidator.ts";

const loggerService = new PinoLoggerService();
const bcryptPasswordService = new BcryptPasswordService();
const nanoidGenerator = new NanoidGenerator();
const otpService = new OTPService();
const accessTokenService = new JWTAccessTokenService();
const refreshTokenService = new CryptoRefreshTokenService();

const sessionRepo = new RedisSessionRepository(loggerService);
const patientRepo = new MongoPatientRepository(loggerService);
const doctorRepo = new MongoDoctorRepository(loggerService);
const otpRepo = new RedisOTPRepository(loggerService);

const patientValidator = new PatientValidator(
  patientRepo,
  bcryptPasswordService
);

const registerPatientUseCase = new RegisterPatientUseCase(
  patientValidator,
  patientRepo,
  bcryptPasswordService,
  nanoidGenerator,
  loggerService,
  otpService,
  otpRepo
);
const verifyPatientUseCase = new VerifyOTPUseCase(
  loggerService,
  otpRepo,
  patientRepo,
  doctorRepo
);
const resendPatientOTPUseCase = new ResendOTPUseCase(
  loggerService,
  otpRepo,
  otpService
);
const loginPatientUseCase = new LoginPatientUseCase(
  loggerService,
  patientRepo,
  patientValidator,
  accessTokenService,
  refreshTokenService,
  sessionRepo
);

export const authController = new PatientAuthController(
  registerPatientUseCase,
  resendPatientOTPUseCase,
  verifyPatientUseCase,
  loginPatientUseCase
);
