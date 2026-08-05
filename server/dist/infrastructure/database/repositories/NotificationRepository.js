import { BaseRepository } from "./BaseRepository.js";
import { notificationModel, } from "../model/NotificationModel.js";
import { NotificationMapper } from "../../../mappers/NotificationMapper.js";
import { Notification } from "#domain/entities/Notification.js";
export class NotificationRepository extends BaseRepository {
    _logger;
    constructor(_logger, session) {
        super(notificationModel, session);
        this._logger = _logger;
    }
    withSession(session) {
        return new NotificationRepository(this._logger, session);
    }
    create(notification) {
        return super.create(notification, NotificationMapper.toPersistance);
    }
    findById(id) {
        return super.findById(id, NotificationMapper.toDomain);
    }
    update(notification) {
        return super.update(notification, notification.id, NotificationMapper.toPersistance);
    }
    delete(id) {
        return super.delete(id);
    }
    async findAllByUserId(userId, limit, page) {
        const skip = Math.max(0, (page - 1) * limit);
        const pipeline = [
            { $match: { user_id: userId } },
            { $sort: { created_at: -1, _id: -1 } },
            { $skip: skip },
            { $limit: limit + 1 },
        ];
        const docs = await super.aggregate(pipeline);
        // this._logger.debug("docs",{docs,pipeline})
        return {
            notifications: docs.slice(0, limit).map(NotificationMapper.toDomain),
            hasMore: docs.length > limit,
        };
    }
}
//# sourceMappingURL=NotificationRepository.js.map