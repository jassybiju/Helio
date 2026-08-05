import { logger } from "#shared/utils/logger.utils.js";
import cron from "node-cron";
export const appointmentExpiryJob = (expiryAppointment) => {
    cron.schedule("* * * * *", async () => {
        try {
            await expiryAppointment.execute();
        }
        catch (error) {
            logger.error("Appointment expiry job failed", error);
        }
    });
};
//# sourceMappingURL=appointmentExpiry.job.js.map