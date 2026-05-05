import { CreateAppointmentUseCase } from "@application/use-cases/patient/appointments/createAppointment/CreateAppointmentUseCase.ts";
import { PatientAppointmentController } from "../../controllers/patient/appointment/appointment.controller.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";
import { NanoidGenerator } from "@infrastructure/services/NanoidGenerator.ts";
import { DoctorShiftRepository } from "@infrastructure/database/repositories/DoctorShiftRepository.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";

const logger = new PinoLoggerService();
const idGenerator = new NanoidGenerator();

const doctorRepo = new MongoDoctorRepository(logger);
const doctorShiftRepo = new DoctorShiftRepository(logger);
const appointmentRepo = new AppointmentRepository();
const createAppointmentUseCase = new CreateAppointmentUseCase(
  logger,
  doctorRepo,
  doctorShiftRepo,
  appointmentRepo,
  idGenerator
);

export const patientAppointmentController = new PatientAppointmentController(
  createAppointmentUseCase
);
