import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IMessageQueue } from "#application/ports/services/IMessageQueue.js";
import { notificationQueue } from "#config/bullmq.config.js";

export class BullMQMessageQueue implements IMessageQueue {
  constructor(private readonly _logger: ILogger) {}
  async addJob(jobName: string, payload: unknown): Promise<string> {
    const res = await notificationQueue.add(jobName, payload);
    this._logger.info("Add TO Queue", `${res.id}hh`);
    return res.id!;
  }
}
