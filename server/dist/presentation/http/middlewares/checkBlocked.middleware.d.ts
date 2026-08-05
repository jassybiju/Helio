import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { NextFunction, Request, Response } from "express";
export declare class CheckBlockMiddleware {
    private readonly _patientRepo;
    private readonly _doctorRepo;
    constructor(_patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository);
    handle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=checkBlocked.middleware.d.ts.map