import { DoctorAppointmentController } from "../../controllers/doctor/appointment.controller.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { DoctorViewAllAppointmentUseCase } from "@application/use-cases/doctor/appointment/doctorViewAllAppointment/DoctorViewAllAppointmentUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { DoctorViewAppointmentUseCase } from "@application/use-cases/doctor/appointment/doctorViewAppointment/DoctorViewAppointmentUseCase.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { DoctorStartConsultationUseCase } from "@application/use-cases/doctor/appointment/startConsultation/DoctorStartConsultationUseCase.ts";
import { ConsultationRepository } from "@infrastructure/database/repositories/ConsultationRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { MongoUnitOfWork } from "@infrastructure/database/unitOfWork/MongoUnitOfWork.ts";
import { DoctorViewTodaysAppointmentUseCase } from "@application/use-cases/doctor/appointment/doctorViewTodaysAppointment/DoctorViewTodaysAppointmentUseCase.ts";
import { CloudinaryFileUploadService } from "@infrastructure/services/CloudinaryFileUploadService.ts";
import { SkipDoctorAppointmentUseCase } from "@application/use-cases/doctor/appointment/skipAppointment/SkipDoctorAppointmentUseCase.ts";

const loggerService = new PinoLoggerService();

const appointmentRepo = new AppointmentRepository(loggerService);
const doctorRepo = new MongoDoctorRepository(loggerService);
const patientRepo = new PatientRepository(loggerService);
const consultationRepo = new ConsultationRepository(loggerService);
const idGenerator = new NanoidGenerator();
const fileUpload = new CloudinaryFileUploadService();
const uow = new MongoUnitOfWork();
const doctorViewAllAppointments = new DoctorViewAllAppointmentUseCase(
  loggerService,
  doctorRepo,
  appointmentRepo
);
const doctorViewAppointment = new DoctorViewAppointmentUseCase(
  loggerService,
  doctorRepo,
  appointmentRepo,
  patientRepo,
  consultationRepo
);
const startConsultation = new DoctorStartConsultationUseCase(
  loggerService,
  doctorRepo,
  appointmentRepo,
  consultationRepo,
  idGenerator,
  uow
);

const viewTodaysAppointment = new DoctorViewTodaysAppointmentUseCase(
  loggerService,
  doctorRepo,
  patientRepo,
  appointmentRepo,
  fileUpload
);
const skipAppointment = new SkipDoctorAppointmentUseCase(
  loggerService,
  doctorRepo,
  appointmentRepo
);

export const doctorAppointmentController = new DoctorAppointmentController(
  doctorViewAllAppointments,
  doctorViewAppointment,
  startConsultation,
  viewTodaysAppointment,
  skipAppointment
);
