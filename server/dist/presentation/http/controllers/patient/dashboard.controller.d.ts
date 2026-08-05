import type { IGetPatientDashboardUseCase } from "#application/ports/use-cases/patient/dashboard/IGetPatientDashboardUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class PatientDashboardController {
    private readonly _getDashboard;
    constructor(_getDashboard: IGetPatientDashboardUseCase);
    getDashboard: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=dashboard.controller.d.ts.map