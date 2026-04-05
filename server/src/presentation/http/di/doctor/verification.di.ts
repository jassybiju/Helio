import { GetVerificationDetailsUseCase } from "@application/use-cases/doctor/verification/GetVerificationDetailsUseCase.ts";
import { DoctorVerificationController } from "../../controllers/doctor/verification.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { LocalFileUploadService } from "@infrastructure/services/LocalFileUploadService.ts";

const loggerService = new PinoLoggerService();
const doctorRepo = new MongoDoctorRepository(loggerService);
const fileService = new LocalFileUploadService();

const getVerificationDetailsUseCase = new GetVerificationDetailsUseCase(
  loggerService,
  doctorRepo,
  fileService
);

export const doctorVerificationController = new DoctorVerificationController(
  getVerificationDetailsUseCase
);
