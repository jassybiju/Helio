import type { ICreateSpecialtyUseCase } from "#application/ports/use-cases/ICreateSpecialtyUseCase.js";
import type { IGetAllSpecialityUseCase } from "#application/ports/use-cases/IGetAllSpecialityUseCase.js";
import type { IGetSpecialityUsecase } from "#application/ports/use-cases/IGetSpecialityUsecase.js";
import type { IRemoveSpecialtyUseCase } from "#application/ports/use-cases/IRemoveSpecialtyUseCase.js";
import { type NextFunction, type Request, type Response } from "express";
export declare class SpecialtyController {
    private readonly _getSpecialtiesUseCase;
    private readonly _createSpecialtyUseCase;
    private readonly _removeSpecialtyUseCase;
    private readonly _getAllSpecialtyUseCase;
    constructor(_getSpecialtiesUseCase: IGetSpecialityUsecase, _createSpecialtyUseCase: ICreateSpecialtyUseCase, _removeSpecialtyUseCase: IRemoveSpecialtyUseCase, _getAllSpecialtyUseCase: IGetAllSpecialityUseCase);
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    get: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addSpecialty: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    removeSpecialty: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=speciality.controller.d.ts.map