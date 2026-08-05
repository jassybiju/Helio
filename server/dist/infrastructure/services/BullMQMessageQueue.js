import { notificationQueue } from "#config/bullmq.config.js";
export class BullMQMessageQueue {
    _logger;
    constructor(_logger) {
        this._logger = _logger;
    }
    async addJob(jobName, payload) {
        const res = await notificationQueue.add(jobName, payload);
        this._logger.info("Add TO Queue", `${res.id}hh`);
        return res.id;
    }
}
//# sourceMappingURL=BullMQMessageQueue.js.map