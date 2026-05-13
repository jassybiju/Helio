import { DoctorViewAllAppointmentMapper } from "@application/use-cases/doctor/appointment/doctorViewAllAppointment/DoctorViewAllAppointmentMapper.ts";
import { DoctorAppointmentController } from "../../controllers/doctor/appointment.controller.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";
import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";
import { DoctorViewAllAppointmentUseCase } from "@application/use-cases/doctor/appointment/doctorViewAllAppointment/DoctorViewAllAppointmentUseCase.ts";
import { MongoDoctorRepository } from "@infrastructure/database/repositories/MongoDoctorRepository.ts";

const loggerService = new PinoLoggerService();

const appointmentRepo = new AppointmentRepository();
const doctorRepo = new MongoDoctorRepository(loggerService);

const doctorViewAllAppointments = new DoctorViewAllAppointmentUseCase(
  loggerService,
  doctorRepo,
  appointmentRepo
);

export const doctorAppointmentController = new DoctorAppointmentController(
  doctorViewAllAppointments
);
