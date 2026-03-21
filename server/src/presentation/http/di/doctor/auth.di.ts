import { RegisterDoctorUseCase } from "@application/use-cases/doctor/auth/RegisterDoctorUseCase.ts";
import { DoctorValidator } from "@application/validators/DoctorValidator.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { RedisOTPRepository } from "@infrastructure/database/repositories/RedisOTPRepository.ts";
import { BcryptPasswordService } from "@infrastructure/services/BcryptPasswordService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { OTPService } from "@infrastructure/services/OTPService.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { S3FileUploadService } from "@infrastructure/services/S3FileUploadService.ts";
import { DoctorAuthController } from "../../controllers/doctor/auth.controller.ts";
import { VerifyOTPUseCase } from "@application/use-cases/VerifyOTPUseCase.ts";
import { ResendOTPUseCase } from "@application/use-cases/ResendOTPUseCase.ts";

const loggerService = new PinoLoggerService();
const bcryptPasswordService = new BcryptPasswordService();
const nanoidGenerator = new NanoidGenerator();
const otpService = new OTPService();
const s3FileUploadService = new S3FileUploadService();

const doctorRepo = new MongoDoctorRepository(loggerService);
const patientRepo = new MongoPatientRepository(loggerService);
const otpRepo = new RedisOTPRepository(loggerService);

const doctorValidator = new DoctorValidator(doctorRepo);

const registerUsecase = new RegisterDoctorUseCase(
  loggerService,
  doctorValidator,
  nanoidGenerator,
  bcryptPasswordService,
  s3FileUploadService,
  doctorRepo,
  otpRepo,
  otpService
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
  otpService
);

export const doctorAuthController = new DoctorAuthController(
  registerUsecase,
  verifyDoctorUseCase,
  resendDoctorOTPUseCase,
  loggerService
);
