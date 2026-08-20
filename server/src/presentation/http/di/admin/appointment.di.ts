import { GetAllAppointmentUseCase } from "#application/use-cases/admin/appointments/getAllAppointment/GetAllAppointmentUseCase.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";
import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";
import { AdminAppointmentController } from "../../controllers/admin/appointment.controller.js";

const logger = new PinoLoggerService();
const appointmentRepo = new AppointmentRepository(logger);

const getAllUseCase = new GetAllAppointmentUseCase(logger, appointmentRepo);

export const adminAppointmentController = new AdminAppointmentController(
  getAllUseCase
);
