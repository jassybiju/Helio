import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IMessageQueue } from "#application/ports/services/IMessageQueue.js";
export declare class BullMQMessageQueue implements IMessageQueue {
    private readonly _logger;
    constructor(_logger: ILogger);
    addJob(jobName: string, payload: unknown): Promise<string>;
}
//# sourceMappingURL=BullMQMessageQueue.d.ts.map