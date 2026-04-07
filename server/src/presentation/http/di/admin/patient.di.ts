import { GetAllPatientsUseCase } from "@application/use-cases/admin/patient/getAllPatients/GetAllPatientsUseCase.ts";
import { AdminPatientController } from "../../controllers/admin/patient.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoPatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { ToggleBlockPatientUseCase } from "@application/use-cases/admin/patient/toggleBlock/ToggleBlockPatientUseCase.ts";
import { GetPatientUseCase } from "@application/use-cases/admin/patient/getPatient/GetPatientUseCase.ts";

const loggerService = new PinoLoggerService();
const patientRepo = new MongoPatientRepository(loggerService);

const getAllPatientsUseCase = new GetAllPatientsUseCase(
  loggerService,
  patientRepo
);

const toggleBlockPatientUseCase = new ToggleBlockPatientUseCase(
  loggerService,
  patientRepo
);
const getPatientUsecase = new GetPatientUseCase(loggerService, patientRepo);
export const adminPatientController = new AdminPatientController(
  getAllPatientsUseCase,
  getPatientUsecase,
  toggleBlockPatientUseCase
);
