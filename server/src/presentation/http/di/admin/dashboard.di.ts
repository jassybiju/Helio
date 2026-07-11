import { GetAdminDashboardUseCase } from "@application/use-cases/admin/dashboard/getDashboard/GetAdminDashboardUseCase.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { AdminDashboardController } from "../../controllers/admin/dashboard.controller.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";

const logger = PinoLoggerService.getInstance();

const appointmentRepo = new AppointmentRepository(logger);
const patientRepo = new PatientRepository(logger);
const doctorRepo = new MongoDoctorRepository(logger);

const getAdminDashboardUseCase = new GetAdminDashboardUseCase(
  logger,
  appointmentRepo,
  doctorRepo,
  patientRepo
);

export const adminDashboardController = new AdminDashboardController(
  getAdminDashboardUseCase
);
