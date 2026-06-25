import { SearchDoctorsUseCase } from "@application/use-cases/patient/appointments/searchDoctors/SearchDoctorsUseCase.ts";
import { PatientDoctorController } from "../../../controllers/patient/appointment/search.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { DoctorShiftRepository } from "@infrastructure/database/repositories/DoctorShiftRepository.ts";
import { SlotGenerator } from "@application/service/SlotGenerator.ts";
import { GetSlotUseCase } from "@application/use-cases/patient/appointments/getSlots/GetSlotUseCase.ts";
import { DoctorBlockShiftRepository } from "@infrastructure/database/repositories/DoctorBlockShiftRepository.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { ReviewRepository } from "@infrastructure/database/repositories/ReviewRepository.ts";
import { PatientRepository } from "@infrastructure/database/repositories/MongoPatientRepository.ts";

const loggerService = new PinoLoggerService();
const slotGenerator = new SlotGenerator();

const doctorRepo = new MongoDoctorRepository(loggerService);
const doctorShiftRepo = new DoctorShiftRepository(loggerService);
const blockSlotRepo = new DoctorBlockShiftRepository(loggerService);
const appointmentRepo = new AppointmentRepository(loggerService);
const reviewRepo = new ReviewRepository(loggerService);
const patientRepo = new PatientRepository(loggerService);
const searchDoctorUseCase = new SearchDoctorsUseCase(
  loggerService,
  doctorShiftRepo,
  doctorRepo,
  slotGenerator
);
const getSlotsUseCase = new GetSlotUseCase(
  loggerService,
  doctorRepo,
  doctorShiftRepo,
  blockSlotRepo,
  slotGenerator,
  appointmentRepo,
  reviewRepo,
  patientRepo
);
export const patientDoctorController = new PatientDoctorController(
  searchDoctorUseCase,
  getSlotsUseCase
);
