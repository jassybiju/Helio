import type { IGetPatientLabReportUseCase } from "#application/ports/use-cases/patient/appointments/IGetPatientLabReportUseCase.js";
import type { IUploadPatientLabReportUseCase } from "#application/ports/use-cases/patient/appointments/IUploadPatientLabReportUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class PatientLabReportController {
    private readonly _getLabReport;
    private readonly _uploadLabReport;
    constructor(_getLabReport: IGetPatientLabReportUseCase, _uploadLabReport: IUploadPatientLabReportUseCase);
    getLabReport: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    uploadReport: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=lab.controller.d.ts.map