import { RegisterPatientUseCase } from "@application/use-cases/patient/auth/RegisterPatientUseCase.ts";
import { PatientAuthController } from "../../controllers/patient/auth.controller.ts";
import { PatientValidator } from "@application/validators/PatientValidator.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { OTPService } from "@infrastructure/services/OTPService.ts";
import { RedisOTPRepository } from "@infrastructure/database/repositories/RedisOTPRepository.ts";
import { VerifyOTPUseCase } from "@application/use-cases/VerifyOTPUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { ResendOTPUseCase } from "@application/use-cases/ResendOTPUseCase.ts";

const loggerService = new PinoLoggerService();
const bcryptPasswordService = new BcryptPasswordService();
const nanoidGenerator = new NanoidGenerator();
const otpService = new OTPService();

const patientRepo = new MongoPatientRepository(loggerService);
const doctorRepo = new MongoDoctorRepository(loggerService);
const otpRepo = new RedisOTPRepository(loggerService);

const registerPatientUseCase = new RegisterPatientUseCase(
  new PatientValidator(patientRepo),
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

export const authController = new PatientAuthController(
  registerPatientUseCase,
  resendPatientOTPUseCase,
  verifyPatientUseCase
);
