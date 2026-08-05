export class GetAllNotificationuseCase {
    _logger;
    _notificationRepo;
    constructor(_logger, _notificationRepo) {
        this._logger = _logger;
        this._notificationRepo = _notificationRepo;
    }
    async execute(userId, page, limit) {
        const { notifications, hasMore } = await this._notificationRepo.findAllByUserId(userId, limit, page);
        return {
            notifications: notifications.map((n) => ({
                id: n.id,
                heading: n.heading,
                message: n.message,
                isRead: n.isRead,
                createdAt: n.createdAt.toDateString(),
            })),
            page,
            limit,
            hasMore,
        };
    }
}
//# sourceMappingURL=GetAllNotificationuseCase.js.map