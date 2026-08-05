import type { IGetAllDoctorsUseCase } from "#application/ports/use-cases/admin/doctor/IGetAllDoctorsUseCase.js";
import type { NextFunction, Request, Response } from "express";
import type { IChangeDoctorApprovalStatusUseCase } from "#application/ports/use-cases/admin/doctor/IChangeDoctorApprovalStatusUseCase.js";
import type { IGetDoctorUseCase } from "#application/ports/use-cases/admin/doctor/IGetDoctorUseCase.js";
import type { IToggleBlockDoctorUseCase } from "#application/ports/use-cases/admin/doctor/IToggleBlockDoctorUseCase.js";
export declare class AdminDoctorController {
    private readonly _getAllDoctorUseCase;
    private readonly _getDoctorUseCase;
    private readonly _changeDoctorApprovalStatusUseCase;
    private readonly _toggleBlockDoctorUseCase;
    constructor(_getAllDoctorUseCase: IGetAllDoctorsUseCase, _getDoctorUseCase: IGetDoctorUseCase, _changeDoctorApprovalStatusUseCase: IChangeDoctorApprovalStatusUseCase, _toggleBlockDoctorUseCase: IToggleBlockDoctorUseCase);
    getDoctor: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllDoctors: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    changeDoctorApprovalStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    toggleBlock: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=doctor.controller.d.ts.map