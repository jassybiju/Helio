import type { IGetVerificationDetailsUseCase } from "#application/ports/use-cases/doctor/verification/IGetVerificationDetailsUseCase.js";
import type { IResubmitVerificationUseCase } from "#application/ports/use-cases/doctor/verification/IResubmitVerificationUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class DoctorVerificationController {
    private readonly _getVerificationDetailsUseCase;
    private readonly _resubmitVerificationUseCase;
    constructor(_getVerificationDetailsUseCase: IGetVerificationDetailsUseCase, _resubmitVerificationUseCase: IResubmitVerificationUseCase);
    getVerificationDetails: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    resubmitVerification: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=verification.controller.d.ts.map