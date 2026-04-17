import { RegisterDoctorUseCase } from "@application/use-cases/doctor/auth/RegisterDoctorUseCase.ts";
import { DoctorValidator } from "@application/validators/DoctorValidator.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { RedisOTPRepository } from "@infrastructure/database/repositories/RedisOTPRepository.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { OTPService } from "@infrastructure/services/OTPService.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { DoctorAuthController } from "../../controllers/doctor/auth.controller.ts";
import { VerifyOTPUseCase } from "@application/use-cases/auth/VerifyOTPUseCase.ts";
import { ResendOTPUseCase } from "@application/use-cases/auth/ResendOTPUseCase.ts";
import { LoginDoctorUseCase } from "@application/use-cases/doctor/auth/LoginDoctorUseCase.ts";
import { RedisSessionRepository } from "@infrastructure/database/repositories/RedisSessionRepository.ts";
import { JWTAccessTokenService } from "@infrastructure/services/JWTAccessTokenService.ts";
import { CryptoRefreshTokenService } from "@infrastructure/services/CryptoRefreshTokenService.ts";
import { ForgetPasswordUseCase } from "@application/use-cases/auth/ForgetPasswordUseCase.ts";
import { RedisResetTokenService } from "@infrastructure/services/RedisResetTokenService.ts";
import { EmailService } from "@infrastructure/services/EmailService.ts";
import { ResetPasswordUseCase } from "@application/use-cases/auth/ResetPasswordUseCase.ts";
import { LocalFileUploadService } from "@infrastructure/services/LocalFileUploadService.ts";
import { GoogleLoginUseCase } from "@application/use-cases/auth/googleLogin/GoogleLoginUseCase.ts";
import { GoogleAuthService } from "@infrastructure/services/GoogleAuthService.ts";

const loggerService = new PinoLoggerService();
const bcryptPasswordService = new BcryptPasswordService();
const nanoidGenerator = new NanoidGenerator();
const otpService = new OTPService();
const localUploadService = new LocalFileUploadService();
const accessTokenService = new JWTAccessTokenService();
const refreshTokenService = new CryptoRefreshTokenService();
const resetTokenService = new RedisResetTokenService(loggerService);
const emailService = new EmailService();
const googleAuthService = new GoogleAuthService();

const doctorRepo = new MongoDoctorRepository(loggerService);
const patientRepo = new MongoPatientRepository(loggerService);
const otpRepo = new RedisOTPRepository(loggerService);
const refreshTokenRepo = new RedisSessionRepository(loggerService);

const doctorValidator = new DoctorValidator(doctorRepo, bcryptPasswordService);

const registerUsecase = new RegisterDoctorUseCase(
  loggerService,
  doctorValidator,
  nanoidGenerator,
  bcryptPasswordService,
  localUploadService,
  doctorRepo,
  otpRepo,
  otpService,
  emailService
);

const verifyDoctorUseCase = new VerifyOTPUseCase(
  loggerService,
  otpRepo,
  patientRepo,
  doctorRepo
);

const resendDoctorOTPUseCase = new ResendOTPUseCase(
  loggerService,
  otpRepo,
  otpService,
  emailService
);

const loginDoctorUseCase = new LoginDoctorUseCase(
  loggerService,
  doctorRepo,
  doctorValidator,
  accessTokenService,
  refreshTokenService,
  refreshTokenRepo
);

const forgetPasswordUseCase = new ForgetPasswordUseCase(
  loggerService,
  patientRepo,
  doctorRepo,
  resetTokenService,
  emailService
);

const resetPasswordUseCase = new ResetPasswordUseCase(
  loggerService,
  resetTokenService,
  patientRepo,
  doctorRepo,
  bcryptPasswordService
);

const googleLoginUseCase = new GoogleLoginUseCase(
  loggerService,
  googleAuthService,
  patientRepo,
  doctorRepo,
  nanoidGenerator,
  accessTokenService,
  refreshTokenService,
  refreshTokenRepo
);

export const doctorAuthController = new DoctorAuthController(
  registerUsecase,
  verifyDoctorUseCase,
  resendDoctorOTPUseCase,
  loginDoctorUseCase,
  forgetPasswordUseCase,
  resetPasswordUseCase,
  googleLoginUseCase,
  loggerService
);
