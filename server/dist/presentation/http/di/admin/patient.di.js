import { GetAllPatientsUseCase } from "#application/use-cases/admin/patient/getAllPatients/GetAllPatientsUseCase.js";
import { AdminPatientController } from "../../controllers/admin/patient.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { ToggleBlockPatientUseCase } from "#application/use-cases/admin/patient/toggleBlock/ToggleBlockPatientUseCase.js";
import { GetPatientUseCase } from "#application/use-cases/admin/patient/getPatient/GetPatientUseCase.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { CloudinaryFileUploadService } from "#infrastructure/services/CloudinaryFileUploadService.js";
const loggerService = PinoLoggerService.getInstance();
const patientRepo = new PatientRepository(loggerService);
const appointmentRepo = new AppointmentRepository(loggerService);
const fileUpload = new CloudinaryFileUploadService();
const getAllPatientsUseCase = new GetAllPatientsUseCase(loggerService, patientRepo, fileUpload);
const toggleBlockPatientUseCase = new ToggleBlockPatientUseCase(loggerService, patientRepo);
const getPatientUsecase = new GetPatientUseCase(loggerService, patientRepo, appointmentRepo);
export const adminPatientController = new AdminPatientController(getAllPatientsUseCase, getPatientUsecase, toggleBlockPatientUseCase);
//# sourceMappingURL=patient.di.js.map