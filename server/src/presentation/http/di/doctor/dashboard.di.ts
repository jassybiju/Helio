import { GetDoctorDashboardUseCase } from "#application/use-cases/doctor/dashboard/getDoctorDashboard/GetDoctorDashboardUseCase.js";
import { DoctorDashboardController } from "../../controllers/doctor/dashboard.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { WalletRepository } from "#infrastructure/database/repositories/WalletRepository.js";
import { WalletTransactionRepository } from "#infrastructure/database/repositories/WalletTransactionRepository.js";

const logger = PinoLoggerService.getInstance();
const doctorRepo = new MongoDoctorRepository(logger);
const appointmentRepo = new AppointmentRepository(logger);
const patientRepo = new PatientRepository(logger);
const walletRepo = new WalletRepository(logger);
const transactionRepo = new WalletTransactionRepository(logger);

const getDoctorDashboardUseCase = new GetDoctorDashboardUseCase(
  logger,
  doctorRepo,
  appointmentRepo,
  patientRepo,
  walletRepo,
  transactionRepo
);

export const doctorDashboardController = new DoctorDashboardController(
  getDoctorDashboardUseCase
);
