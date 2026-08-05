import { GetPatientDashboardUseCase } from "#application/use-cases/patient/dashboard/getDashboard/GetPatientDashboardUseCase.js";
import { PatientDashboardController } from "../../controllers/patient/dashboard.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";

const logger = new PinoLoggerService();
const patientRepo = new PatientRepository(logger);
const appointmentRepo = new AppointmentRepository(logger);

const getPatientDashboardUseCase = new GetPatientDashboardUseCase(
  logger,
  patientRepo,
  appointmentRepo
);

export const patientDashboardController = new PatientDashboardController(
  getPatientDashboardUseCase
);
