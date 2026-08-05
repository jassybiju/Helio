import { Notification } from "#domain/entities/Notification.js";
export class NotificationService {
    _notificationRepo;
    _idGenerator;
    _realTimeNotifier;
    constructor(_notificationRepo, _idGenerator, _realTimeNotifier) {
        this._notificationRepo = _notificationRepo;
        this._idGenerator = _idGenerator;
        this._realTimeNotifier = _realTimeNotifier;
    }
    async notify(userId, role, heading, message) {
        const NOTIFICATION_ID = this._idGenerator.generate(process.env.NOTIFICATION_PREFIX);
        const notification = Notification.create({
            id: NOTIFICATION_ID,
            userId,
            role,
            heading,
            message,
        });
        await this._notificationRepo.create(notification);
        this._realTimeNotifier.emitToRoom(`user:${role}:${userId}`, "notification:new", {
            id: notification.id,
            heading: notification.heading,
            message: notification.message,
        });
    }
}
//# sourceMappingURL=NotificationService.js.map