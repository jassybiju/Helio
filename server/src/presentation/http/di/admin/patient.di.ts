import { GetAllPatientsUseCase } from "@application/use-cases/admin/patient/getAllPatients/GetAllPatientsUseCase.ts";
import { AdminPatientController } from "../../controllers/admin/patient.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { ToggleBlockPatientUseCase } from "@application/use-cases/admin/patient/toggleBlock/ToggleBlockPatientUseCase.ts";
import { GetPatientUseCase } from "@application/use-cases/admin/patient/getPatient/GetPatientUseCase.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";

const loggerService = PinoLoggerService.getInstance();
const patientRepo = new PatientRepository(loggerService);
const appointmentRepo = new AppointmentRepository(loggerService);

const getAllPatientsUseCase = new GetAllPatientsUseCase(
  loggerService,
  patientRepo
);

const toggleBlockPatientUseCase = new ToggleBlockPatientUseCase(
  loggerService,
  patientRepo
);
const getPatientUsecase = new GetPatientUseCase(
  loggerService,
  patientRepo,
  appointmentRepo
);
export const adminPatientController = new AdminPatientController(
  getAllPatientsUseCase,
  getPatientUsecase,
  toggleBlockPatientUseCase
);
