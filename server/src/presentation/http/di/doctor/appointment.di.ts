import { CreateAppointmentUseCase } from "@application/use-cases/patient/appointments/createAppointment/CreateAppointmentUseCase.ts";
import { PatientAppointmentController } from "../../controllers/patient/appointment/appointment.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { DoctorShiftRepository } from "@infrastructure/database/repositories/DoctorShiftRepository.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { GetAppointmentUseCase } from "@application/use-cases/patient/appointments/getAppointment/GetAppointmentUseCase.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { CheckoutAppointmentUseCase } from "@application/use-cases/patient/appointments/checkoutAppointment/CheckoutAppointmentUseCase.ts";
import { PaymentServiceFactory } from "@application/service/PaymentServiceFactory.ts";
import { WalletPaymentService } from "@infrastructure/services/WalletPaymentService.ts";
import { WalletRepository } from "@infrastructure/database/repositories/WalletRepository.ts";
import { WalletTransactionRepository } from "@infrastructure/database/repositories/WalletTransactionRepository.ts";
import { MongoUnitOfWork } from "@infrastructure/database/unitOfWork/MongoUnitOfWork.ts";
import { RazorpayPaymentService } from "@infrastructure/services/RazorpayPaymentService.ts";

const logger = new PinoLoggerService();
const idGenerator = new NanoidGenerator();

const doctorRepo = new MongoDoctorRepository(logger);
const doctorShiftRepo = new DoctorShiftRepository(logger);
const appointmentRepo = new AppointmentRepository();
const patientRepo = new PatientRepository(logger);
const walletRepo = new WalletRepository(logger);
const transactionRepo = new WalletTransactionRepository(logger);
const uow = new MongoUnitOfWork();

const walletService = new WalletPaymentService(
  walletRepo,
  appointmentRepo,
  transactionRepo,
  idGenerator,
  uow
);
const razorpayService = new RazorpayPaymentService();

const createAppointmentUseCase = new CreateAppointmentUseCase(
  logger,
  doctorRepo,
  doctorShiftRepo,
  appointmentRepo,
  idGenerator
);

const getAppointment = new GetAppointmentUseCase(
  logger,
  patientRepo,
  appointmentRepo,
  doctorRepo
);

// implement razorpay service
const checkout = new CheckoutAppointmentUseCase(
  logger,
  appointmentRepo,
  new PaymentServiceFactory(walletService, razorpayService)
);

export const patientAppointmentController = new PatientAppointmentController(
  createAppointmentUseCase,
  getAppointment,
  checkout
);
