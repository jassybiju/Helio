import type { IGetAdminDashboardUseCase } from "#application/ports/use-cases/admin/IGetAdminDashboardUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class AdminDashboardController {
    private readonly _dashboardUseCase;
    constructor(_dashboardUseCase: IGetAdminDashboardUseCase);
    get: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=dashboard.controller.d.ts.map