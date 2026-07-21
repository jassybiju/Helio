import { ExpiryAppointmentsUseCase } from "@application/use-cases/patient/appointments/expiryAppointments/ExpiryAppointmentsUseCase.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";

import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";

const logger = PinoLoggerService.getInstance();
const appointmentRepository = new AppointmentRepository(logger);

export const expireAppointmentsUseCase = new ExpiryAppointmentsUseCase(
  logger,
  appointmentRepository
);
