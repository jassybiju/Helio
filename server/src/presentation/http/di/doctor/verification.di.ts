import { GetVerificationDetailsUseCase } from "@application/use-cases/doctor/verification/getVerificationDetails/GetVerificationDetailsUseCase.ts";
import { DoctorVerificationController } from "../../controllers/doctor/verification.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { ResubmitVerificationUseCase } from "@application/use-cases/doctor/verification/resubmitVerification/ResubmitVerificationUseCase.ts";
import { CloudinaryFileUploadService } from "@infrastructure/services/CloudinaryFileUploadService.ts";

const loggerService = new PinoLoggerService();
const doctorRepo = new MongoDoctorRepository(loggerService);
const fileService = new CloudinaryFileUploadService();

const getVerificationDetailsUseCase = new GetVerificationDetailsUseCase(
  loggerService,
  doctorRepo,
  fileService
);
const resubmitVerificationUseCase = new ResubmitVerificationUseCase(
  loggerService,
  doctorRepo,
  fileService
);
export const doctorVerificationController = new DoctorVerificationController(
  getVerificationDetailsUseCase,
  resubmitVerificationUseCase
);
