import { CompleteDoctorProfileUseCase } from "@application/use-cases/doctor/profile/CompleteDoctorProfileUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { LocalFileUploadService } from "@infrastructure/services/LocalFileUploadService.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { DoctorProfileController } from "../../controllers/doctor/profile.controller.ts";
import { GetDoctorProfileUseCase } from "@application/use-cases/doctor/profile/getDoctorProfile/GetDoctorProfileUseCase.ts";
import { UpdateDoctorFeeUseCase } from "@application/use-cases/doctor/profile/updateDoctorFee/UpdateDoctorFeeUseCase.ts";

const loggerService = new PinoLoggerService();
const doctorRepo = new MongoDoctorRepository(loggerService);
const localFileUpload = new LocalFileUploadService();

const doctorProfileCompleteUseCase = new CompleteDoctorProfileUseCase(
  loggerService,
  doctorRepo,
  localFileUpload
);
const doctorGetProfileUseCase = new GetDoctorProfileUseCase(
  loggerService,
  doctorRepo
);
const doctorUpdateFeeUseCase = new UpdateDoctorFeeUseCase(
  loggerService,
  doctorRepo
);
export const doctorProfileController = new DoctorProfileController(
  doctorProfileCompleteUseCase,
  doctorGetProfileUseCase,
  doctorUpdateFeeUseCase
);
