import { GetPatientLabReportUseCase } from "@application/use-cases/patient/appointments/lab/getLabReport/GetPatientLabReportUseCase.ts";
import { PatientLabReportController } from "../../controllers/patient/lab.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { LabReportRepository } from "@infrastructure/database/repositories/LabReportRepository.ts";
import { UploadPatientLabReportUseCase } from "@application/use-cases/patient/appointments/lab/uploadLabReport/UploadPatientLabReportUseCase.ts";
import { CloudinaryFileUploadService } from "@infrastructure/services/CloudinaryFileUploadService.ts";
const logger = new PinoLoggerService();
const patientRepo = new PatientRepository(logger);
const labRepo = new LabReportRepository(logger);
const fileUpload = new CloudinaryFileUploadService();
const getAllLabReport = new GetPatientLabReportUseCase(
  logger,
  patientRepo,
  labRepo,
  fileUpload
);

const uploadLabReport = new UploadPatientLabReportUseCase(
  logger,
  patientRepo,
  labRepo,
  fileUpload
);
export const labController = new PatientLabReportController(
  getAllLabReport,
  uploadLabReport
);
