import { GetDoctorDashboardUseCase } from "@application/use-cases/doctor/dashboard/getDoctorDashboard/GetDoctorDashboardUseCase.ts";
import { DoctorDashboardController } from "../../controllers/doctor/dashboard.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { WalletRepository } from "@infrastructure/database/repositories/WalletRepository.ts";
import { WalletTransactionRepository } from "@infrastructure/database/repositories/WalletTransactionRepository.ts";

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
