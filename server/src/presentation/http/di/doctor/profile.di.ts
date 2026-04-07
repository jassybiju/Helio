import { CompleteDoctorProfileUseCase } from "@application/use-cases/doctor/profile/CompleteDoctorProfileUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { LocalFileUploadService } from "@infrastructure/services/LocalFileUploadService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { DoctorProfileController } from "../../controllers/doctor/profile.controller.ts";

const loggerService = new PinoLoggerService();
const doctorRepo = new MongoDoctorRepository(loggerService);
const localFileUpload = new LocalFileUploadService();

const doctorProfileCompleteUseCase = new CompleteDoctorProfileUseCase(
  loggerService,
  doctorRepo,
  localFileUpload
);

export const doctorProfileController = new DoctorProfileController(
  doctorProfileCompleteUseCase
);
