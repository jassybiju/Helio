import type { IGenerateFutureSlotsUseCase } from "@application/ports/use-cases/doctor/slot/IGenerateFutureSlotsUseCase.ts";
import { logger } from "@shared/utils/logger.utils.ts";
import cron from "node-cron";

export const startSlotGenerationJob = (
  generateFutureSlotUsecase: IGenerateFutureSlotsUseCase
) => {
  cron.schedule("0 0 * * *", async () => {
    logger.info("[CRON] : Slot Generation started");

    try {
      await generateFutureSlotUsecase.execute();
      logger.info("[CRON] Slot Generation completed ");
    } catch (error) {
      logger.error("[CRON] Slot Generation Failed ", error);
    }
  });
};
