import { RegisterPatientUseCase } from "#application/use-cases/patient/auth/RegisterPatientUseCase.js";
import { PatientAuthController } from "../../controllers/patient/auth.controller.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { BcryptPasswordService } from "#infrastructure/services/BcryptPasswordService.js";
import { NanoidGenerator } from "#infrastructure/services/NanoidGenerator.js";
import { OTPService } from "#infrastructure/services/OTPService.js";
import { RedisOTPRepository } from "#infrastructure/database/repositories/RedisOTPRepository.js";
import { VerifyOTPUseCase } from "#application/use-cases/auth/VerifyOTPUseCase.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { ResendOTPUseCase } from "#application/use-cases/auth/ResendOTPUseCase.js";
import { LoginPatientUseCase } from "#application/use-cases/patient/auth/LoginPatientUseCase.js";
import { JWTAccessTokenService } from "#infrastructure/services/JWTAccessTokenService.js";
import { CryptoRefreshTokenService } from "#infrastructure/services/CryptoRefreshTokenService.js";
import { RedisSessionRepository } from "#infrastructure/database/repositories/RedisSessionRepository.js";
import { PatientValidator } from "#application/validators/PatientValidator.js";
import { ResetPasswordUseCase } from "#application/use-cases/auth/ResetPasswordUseCase.js";
import { RedisResetTokenService } from "#infrastructure/services/RedisResetTokenService.js";
import { EmailService } from "#infrastructure/services/EmailService.js";
import { ForgetPasswordUseCase } from "#application/use-cases/auth/ForgetPasswordUseCase.js";
import { GoogleAuthService } from "#infrastructure/services/GoogleAuthService.js";
import { GoogleLoginUseCase } from "#application/use-cases/auth/googleLogin/GoogleLoginUseCase.js";
import { WalletRepository } from "#infrastructure/database/repositories/WalletRepository.js";
import { BullMQMessageQueue } from "#infrastructure/services/BullMQMessageQueue.js";

const loggerService = PinoLoggerService.getInstance();
const bcryptPasswordService = new BcryptPasswordService();
const nanoidGenerator = new NanoidGenerator();
const otpService = new OTPService();
const accessTokenService = new JWTAccessTokenService();
const refreshTokenService = new CryptoRefreshTokenService();
const resetTokenService = new RedisResetTokenService(loggerService);
const emailService = new EmailService();
const googleAuthService = new GoogleAuthService();
const messageQueue = new BullMQMessageQueue(loggerService);

const sessionRepo = new RedisSessionRepository(loggerService);
const patientRepo = new PatientRepository(loggerService);
const doctorRepo = new MongoDoctorRepository(loggerService);
const otpRepo = new RedisOTPRepository(loggerService);
const walletRepo = new WalletRepository(loggerService);

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
  otpRepo,
  emailService
);
const verifyPatientUseCase = new VerifyOTPUseCase(
  loggerService,
  otpRepo,
  patientRepo,
  doctorRepo,
  walletRepo,
  nanoidGenerator
);
const resendPatientOTPUseCase = new ResendOTPUseCase(
  loggerService,
  otpRepo,
  otpService,
  messageQueue
);
const loginPatientUseCase = new LoginPatientUseCase(
  loggerService,
  patientRepo,
  patientValidator,
  accessTokenService,
  refreshTokenService,
  sessionRepo
);
const resetPasswordUseCase = new ResetPasswordUseCase(
  loggerService,
  resetTokenService,
  patientRepo,
  doctorRepo,
  bcryptPasswordService
);
const forgetPasswordUseCase = new ForgetPasswordUseCase(
  loggerService,
  patientRepo,
  doctorRepo,
  resetTokenService,
  messageQueue
);

const googleLoginUseCase = new GoogleLoginUseCase(
  loggerService,
  googleAuthService,
  patientRepo,
  doctorRepo,
  nanoidGenerator,
  accessTokenService,
  refreshTokenService,
  sessionRepo,
  walletRepo
);

export const authController = new PatientAuthController(
  registerPatientUseCase,
  resendPatientOTPUseCase,
  verifyPatientUseCase,
  loginPatientUseCase,
  forgetPasswordUseCase,
  resetPasswordUseCase,
  googleLoginUseCase
);
