import { CreateAppointmentUseCase } from "@application/use-cases/patient/appointments/createAppointment/CreateAppointmentUseCase.ts";
import { PatientAppointmentController } from "../../../controllers/patient/appointment/appointment.controller.ts";
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
import { GetAllAppointmentUseCase } from "@application/use-cases/patient/appointments/getAllAppointments/GetAllAppointmentUseCase.ts";
import { ConsultationRepository } from "@infrastructure/database/repositories/ConsultationRepository.ts";
import { LabReportRepository } from "@infrastructure/database/repositories/LabReportRepository.ts";
import { razorpay } from "@config/razorpay.config.ts";
import { VerifyAppointmentPaymentUseCase } from "@application/use-cases/patient/appointments/verifyPayment/VerifyAppointmentPaymentUseCase.ts";
import { GetPatientLiveQueueUseCase } from "@application/use-cases/patient/appointments/getLiveQueue/GetPatientLiveQueueUseCase.ts";
import { GetRescheduledSlotsUseCase } from "@application/use-cases/patient/appointments/cancellation/getResheduledSlots/GetRescheduledSlotsUseCase.ts";
import { DoctorBlockShiftRepository } from "@infrastructure/database/repositories/DoctorBlockShiftRepository.ts";
import { SlotGenerator } from "@application/service/SlotGenerator.ts";
import { RespondPatientResheduleAppointmentUseCase } from "@application/use-cases/patient/appointments/cancellation/reschedule/RespondPatientResheduleAppointmentUseCase.ts";
import { RespondPatientCancelAndRefundAppointmentUseCase } from "@application/use-cases/patient/appointments/cancellation/cancelAndRefundResponse/RespondPatientCancelAndRefundUseCase.ts";
import { PatientAppointmentCancellationUseCase } from "@application/use-cases/patient/appointments/cancellation/patientCancel/PatientAppointmentCancellationUseCase.ts";

const logger = new PinoLoggerService();
const idGenerator = new NanoidGenerator();

const doctorRepo = new MongoDoctorRepository(logger);
const doctorShiftRepo = new DoctorShiftRepository(logger);
const blockShiftRepo = new DoctorBlockShiftRepository(logger);
const appointmentRepo = new AppointmentRepository(logger);
const patientRepo = new PatientRepository(logger);
const walletRepo = new WalletRepository(logger);
const transactionRepo = new WalletTransactionRepository(logger);
const consultationRepo = new ConsultationRepository(logger);
const labRepo = new LabReportRepository(logger);

const slotService = new SlotGenerator();

const uow = new MongoUnitOfWork();

const walletService = new WalletPaymentService(
  walletRepo,
  appointmentRepo,
  transactionRepo,
  idGenerator,
  uow
);

const razorpayService = new RazorpayPaymentService(razorpay);

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
  consultationRepo,
  doctorRepo
);

// implement razorpay service
const checkout = new CheckoutAppointmentUseCase(
  logger,
  appointmentRepo,
  new PaymentServiceFactory(walletService, razorpayService)
);

const getAll = new GetAllAppointmentUseCase(
  logger,
  patientRepo,
  appointmentRepo,
  doctorRepo,
  consultationRepo,
  labRepo
);
const verifyPayment = new VerifyAppointmentPaymentUseCase(
  logger,
  appointmentRepo
);

const liveQueue = new GetPatientLiveQueueUseCase(
  logger,
  patientRepo,
  appointmentRepo
);

const getRescheduleSlots = new GetRescheduledSlotsUseCase(
  logger,
  patientRepo,
  doctorRepo,
  appointmentRepo,
  doctorShiftRepo,
  blockShiftRepo,
  slotService
);

const rescheduleAppointment = new RespondPatientResheduleAppointmentUseCase(
  logger,
  appointmentRepo,
  patientRepo,
  doctorRepo,
  doctorShiftRepo,
  idGenerator,
  uow
);

const cancelAndRefundAppointment =
  new RespondPatientCancelAndRefundAppointmentUseCase(
    logger,
    patientRepo,
    appointmentRepo,
    walletRepo,
    transactionRepo,
    idGenerator,
    uow
  );
const cancelAppointment = new PatientAppointmentCancellationUseCase(
  logger,
  patientRepo,
  appointmentRepo,
  walletRepo,
  transactionRepo,
  idGenerator,
  uow
);
export const patientAppointmentController = new PatientAppointmentController(
  createAppointmentUseCase,
  getAppointment,
  checkout,
  getAll,
  liveQueue,
  verifyPayment,
  getRescheduleSlots,
  rescheduleAppointment,
  cancelAndRefundAppointment,
  cancelAppointment
);
