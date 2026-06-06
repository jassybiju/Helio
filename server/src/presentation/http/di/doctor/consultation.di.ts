import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { ConsultationController } from "../../controllers/doctor/consultation.controller.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";
import { ConsultationRepository } from "@infrastructure/database/repositories/ConsultationRepository.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { DoctorViewConsultationUseCase } from "@application/use-cases/doctor/consultation/viewConsultation/DoctorViewConsultationUseCase.ts";
import { DoctorEndConsultationUseCase } from "@application/use-cases/doctor/consultation/endConsultation/DoctorEndConsultationUseCase.ts";
import { MongoUnitOfWork } from "@infrastructure/database/unitOfWork/MongoUnitOfWork.ts";
import { DoctorUpdateVitalsUseCase } from "@application/use-cases/doctor/consultation/updateVitals/DoctorUpdateVitalsUseCase.ts";
import { DoctorAddPrescriptionUseCase } from "@application/use-cases/doctor/consultation/prescription/DoctorAddPrescriptionUseCase.ts";
import { DoctorRemovePrescriptionUseCase } from "@application/use-cases/doctor/consultation/prescription/DoctorRemovePrescriptionUseCase.ts";
import { DoctorUpdateConsultationNotesUseCase } from "@application/use-cases/doctor/consultation/updateNotes/DoctorUpdateConsultationNotesUseCase.ts";
import { DoctorAddLabReportUseCase } from "@application/use-cases/doctor/consultation/labReport/DoctorAddLabReportUseCase.ts";
import { LabReportRepository } from "@infrastructure/database/repositories/LabReportRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { DoctorRemoveLabReportUseCase } from "@application/use-cases/doctor/consultation/labReport/DoctorRemoveLabReportUseCase.ts";
import { DoctorViewHistoryUseCase } from "@application/use-cases/doctor/consultation/viewHistory/DoctorViewHistoryUseCase.ts";

const loggerService = new PinoLoggerService();
const idGenerator = new NanoidGenerator();

const appointmentRepo = new AppointmentRepository(loggerService);
const doctorRepo = new MongoDoctorRepository(loggerService);
const patientRepo = new PatientRepository(loggerService);
const consultationRepo = new ConsultationRepository(loggerService);
const labRepo = new LabReportRepository(loggerService);
const uow = new MongoUnitOfWork();

const endConsultation = new DoctorEndConsultationUseCase(
  loggerService,
  doctorRepo,
  appointmentRepo,
  consultationRepo,
  uow
);
const updateVitals = new DoctorUpdateVitalsUseCase(
  loggerService,
  doctorRepo,
  consultationRepo,
  appointmentRepo
);
const viewConsultation = new DoctorViewConsultationUseCase(
  loggerService,
  doctorRepo,
  patientRepo,
  consultationRepo,
  appointmentRepo,
  labRepo
);

const addPrescription = new DoctorAddPrescriptionUseCase(
  loggerService,
  doctorRepo,
  consultationRepo,
  appointmentRepo
);

const removePrescription = new DoctorRemovePrescriptionUseCase(
  loggerService,
  doctorRepo,
  consultationRepo,
  appointmentRepo
);
const updateNotes = new DoctorUpdateConsultationNotesUseCase(
  loggerService,
  doctorRepo,
  consultationRepo,
  appointmentRepo
);
const addTest = new DoctorAddLabReportUseCase(
  loggerService,
  doctorRepo,
  appointmentRepo,
  consultationRepo,
  labRepo,
  idGenerator
);
const removeTest = new DoctorRemoveLabReportUseCase(
  loggerService,
  doctorRepo,
  appointmentRepo,
  labRepo
);
const viewHistory = new DoctorViewHistoryUseCase(
  loggerService,
  doctorRepo,
  consultationRepo,
  appointmentRepo,
  labRepo
);
export const doctorConsultationController = new ConsultationController(
  endConsultation,
  viewConsultation,
  updateVitals,
  addPrescription,
  removePrescription,
  updateNotes,
  addTest,
  removeTest,
  viewHistory
);
