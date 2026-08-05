import { GetAdminDashboardUseCase } from "#application/use-cases/admin/dashboard/getDashboard/GetAdminDashboardUseCase.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { AdminDashboardController } from "../../controllers/admin/dashboard.controller.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { WalletTransactionRepository } from "#infrastructure/database/repositories/WalletTransactionRepository.js";
import { WalletRepository } from "#infrastructure/database/repositories/WalletRepository.js";

const logger = PinoLoggerService.getInstance();

const appointmentRepo = new AppointmentRepository(logger);
const patientRepo = new PatientRepository(logger);
const doctorRepo = new MongoDoctorRepository(logger);
const transactionRepo = new WalletTransactionRepository(logger);
const walletRepo = new WalletRepository(logger);
const getAdminDashboardUseCase = new GetAdminDashboardUseCase(
  logger,
  appointmentRepo,
  doctorRepo,
  patientRepo,
  transactionRepo,
  walletRepo
);

export const adminDashboardController = new AdminDashboardController(
  getAdminDashboardUseCase
);
