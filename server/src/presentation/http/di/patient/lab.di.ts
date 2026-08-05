import { GetPatientLabReportUseCase } from "#application/use-cases/patient/appointments/lab/getLabReport/GetPatientLabReportUseCase.js";
import { PatientLabReportController } from "../../controllers/patient/lab.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { LabReportRepository } from "#infrastructure/database/repositories/LabReportRepository.js";
import { UploadPatientLabReportUseCase } from "#application/use-cases/patient/appointments/lab/uploadLabReport/UploadPatientLabReportUseCase.js";
import { CloudinaryFileUploadService } from "#infrastructure/services/CloudinaryFileUploadService.js";
const logger = PinoLoggerService.getInstance();
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
