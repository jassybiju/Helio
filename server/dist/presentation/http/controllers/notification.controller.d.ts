import type { IGetAllNotificationUseCase } from "#application/ports/use-cases/notification/IGetAllNotificationUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class NotificationController {
    private readonly _getAllNotifications;
    constructor(_getAllNotifications: IGetAllNotificationUseCase);
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=notification.controller.d.ts.map