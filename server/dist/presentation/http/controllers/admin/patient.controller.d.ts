import type { IGetAllPatientsUseCase } from "#application/ports/use-cases/admin/patient/IGetAllPatientsUseCase.js";
import type { NextFunction, Request, Response } from "express";
import type { IToggleBlockPatientUseCase } from "#application/ports/use-cases/admin/patient/IToggleBlockPatientUseCase.js";
import type { IGetPatientUseCase } from "#application/ports/use-cases/admin/patient/IGetPatientUseCase.js";
export declare class AdminPatientController {
    private readonly _getAllPatientUsecase;
    private readonly _getPatientUseCase;
    private readonly _toggleBlockPatientUseCase;
    constructor(_getAllPatientUsecase: IGetAllPatientsUseCase, _getPatientUseCase: IGetPatientUseCase, _toggleBlockPatientUseCase: IToggleBlockPatientUseCase);
    getAllPatients: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getPatient: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    toggleBlock: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=patient.controller.d.ts.map