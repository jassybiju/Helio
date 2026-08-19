import { SearchDoctorsUseCase } from "#application/use-cases/patient/appointments/searchDoctors/SearchDoctorsUseCase.js";
import { PatientDoctorController } from "../../../controllers/patient/appointment/search.controller.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { MongoDoctorRepository } from "#infrastructure/database/repositories/MongoDoctorRepository.js";
import { DoctorShiftRepository } from "#infrastructure/database/repositories/DoctorShiftRepository.js";
import { SlotGenerator } from "#application/service/SlotGenerator.js";
import { GetSlotUseCase } from "#application/use-cases/patient/appointments/getSlots/GetSlotUseCase.js";
import { DoctorBlockShiftRepository } from "#infrastructure/database/repositories/DoctorBlockShiftRepository.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { ReviewRepository } from "#infrastructure/database/repositories/ReviewRepository.js";
import { PatientRepository } from "#infrastructure/database/repositories/MongoPatientRepository.js";
import { S3FileUploadService } from "#infrastructure/services/S3FileUploadService.js";

const loggerService = PinoLoggerService.getInstance();
const slotGenerator = new SlotGenerator();

const doctorRepo = new MongoDoctorRepository(loggerService);
const doctorShiftRepo = new DoctorShiftRepository(loggerService);
const blockSlotRepo = new DoctorBlockShiftRepository(loggerService);
const appointmentRepo = new AppointmentRepository(loggerService);
const reviewRepo = new ReviewRepository(loggerService);
const patientRepo = new PatientRepository(loggerService);

const fileUpload = new S3FileUploadService();

const searchDoctorUseCase = new SearchDoctorsUseCase(
  loggerService,
  doctorShiftRepo,
  doctorRepo,
  slotGenerator,
  fileUpload
);
const getSlotsUseCase = new GetSlotUseCase(
  loggerService,
  doctorRepo,
  doctorShiftRepo,
  blockSlotRepo,
  slotGenerator,
  appointmentRepo,
  reviewRepo,
  patientRepo,
  fileUpload
);
export const patientDoctorController = new PatientDoctorController(
  searchDoctorUseCase,
  getSlotsUseCase
);
