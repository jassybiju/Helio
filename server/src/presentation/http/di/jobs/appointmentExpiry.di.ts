import { ExpiryAppointmentsUseCase } from "@application/use-cases/patient/appointments/expiryAppointments/ExpiryAppointmentsUseCase.ts";
import { AppointmentRepository } from "@infrastructure/database/repositories/AppointmentRepository.ts";

import { PinoLoggerService } from "@infrastructure/services/PinoLoggerService.ts";

const appointmentRepository = new AppointmentRepository();

const logger = new PinoLoggerService();

export const expireAppointmentsUseCase = new ExpiryAppointmentsUseCase(
  logger,
  appointmentRepository
);
