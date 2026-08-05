import type { ICompleteDoctorProfileUseCase } from "#application/ports/use-cases/doctor/auth/ICompleteDoctorProfileUseCase.js";
import type { NextFunction, Request, Response } from "express";
import type { IGetDoctorProfileUseCase } from "#application/ports/use-cases/doctor/profile/IGetDoctorProfileUseCase.js";
import type { IUpdateDoctorFeeUseCase } from "#application/ports/use-cases/doctor/profile/IUpdateDoctorFeeUseCase.js";
import type { IUpdateDoctorProfileUseCase } from "#application/ports/use-cases/doctor/profile/IUpdateDoctorProfileUseCase.js";
import type { IChangeDoctorPasswordUseCase } from "#application/ports/use-cases/doctor/profile/IChangeDoctorPasswordUseCase.js";
import type { IDoctorUpdateProfilePictureUseCase } from "#application/ports/use-cases/doctor/profile/IUpdateProfilePictureUseCase.js";
export declare class DoctorProfileController {
    private readonly _completeProfile;
    private readonly _getDoctorProfile;
    private readonly _updateDoctorFee;
    private readonly _updateDoctorProfile;
    private readonly _changePassword;
    private readonly _updateProfilePic;
    constructor(_completeProfile: ICompleteDoctorProfileUseCase, _getDoctorProfile: IGetDoctorProfileUseCase, _updateDoctorFee: IUpdateDoctorFeeUseCase, _updateDoctorProfile: IUpdateDoctorProfileUseCase, _changePassword: IChangeDoctorPasswordUseCase, _updateProfilePic: IDoctorUpdateProfilePictureUseCase);
    updateProfilePic: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    completeProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getDoctor: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    updateDoctorFee: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    updateDoctorProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    changePassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=profile.controller.d.ts.map