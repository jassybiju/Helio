import { ExpiryAppointmentsUseCase } from "#application/use-cases/patient/appointments/expiryAppointments/ExpiryAppointmentsUseCase.js";
import { AppointmentRepository } from "#infrastructure/database/repositories/AppointmentRepository.js";

import { PinoLoggerService } from "#infrastructure/services/PinoLoggerService.js";

const logger = PinoLoggerService.getInstance();
const appointmentRepository = new AppointmentRepository(logger);

export const expireAppointmentsUseCase = new ExpiryAppointmentsUseCase(
  logger,
  appointmentRepository
);
