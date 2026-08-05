import type { Request, Response, NextFunction } from "express";
import type { ISearchDoctorUseCase } from "#application/ports/use-cases/patient/appointments/ISearchDoctorUseCase.js";
import type { IGetSlotUseCase } from "#application/ports/use-cases/patient/appointments/IGetSlotUseCase.js";
export declare class PatientDoctorController {
    private readonly _searchDoctorUseCase;
    private readonly _getSlotUseCase;
    constructor(_searchDoctorUseCase: ISearchDoctorUseCase, _getSlotUseCase: IGetSlotUseCase);
    searchDoctor: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getDoctorSlots: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=search.controller.d.ts.map