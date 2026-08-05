import type { IGetDoctorDashboardUseCase } from "#application/ports/use-cases/doctor/dashboard/IGetDoctorDashboardUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class DoctorDashboardController {
    private readonly _getDoctorDashboard;
    constructor(_getDoctorDashboard: IGetDoctorDashboardUseCase);
    getDashboard: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=dashboard.controller.d.ts.map