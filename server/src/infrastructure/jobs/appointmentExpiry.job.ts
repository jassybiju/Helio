import type { IExpiryAppointmentsUseCase } from "#application/ports/use-cases/patient/appointments/IExpiryAppointmentsUseCase.js";
import { logger } from "#shared/utils/logger.utils.js";
import cron from "node-cron";

export const appointmentExpiryJob = (
  expiryAppointment: IExpiryAppointmentsUseCase
) => {
  cron.schedule("* * * * *", async () => {
    try {
      await expiryAppointment.execute();
    } catch (error) {
      logger.error("Appointment expiry job failed", error);
    }
  });
};
