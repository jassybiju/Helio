import type { IFetchByStartingCharacterUseCase } from "#application/ports/use-cases/admin/IFetchByStartingCharacterUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class FetchPatientController {
    private readonly _fetchPatientByStartingChar;
    constructor(_fetchPatientByStartingChar: IFetchByStartingCharacterUseCase);
    fetchPatientByStartingChar: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=fetchPatient.controller.d.ts.map