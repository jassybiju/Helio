import { type NextFunction, type Request, type Response } from "express";
import type { ICompletePatientProfileUseCase } from "#application/ports/use-cases/patient/profile/ICompletePatientProfileUseCase.js";
import type { IGetPatientProfileUseCase } from "#application/ports/use-cases/patient/profile/IGetPatientProfileUseCase.js";
import type { IAddPatientAllergenUseCase } from "#application/ports/use-cases/patient/profile/IAddPatientAllergenUseCase.js";
import type { IRemovePatientAllergenUseCase } from "#application/ports/use-cases/patient/profile/IRemovePatientAllergenUseCase.js";
import type { IAddPatientConditionUseCase } from "#application/ports/use-cases/patient/profile/IAddPatientConditionUseCase.js";
import type { IRemovePatientConditionUseCase } from "#application/ports/use-cases/patient/profile/IRemovePatientConditionUseCase.js";
import type { IChangePatientPasswordUseCase } from "#application/ports/use-cases/patient/profile/IChangePatientPasswordUseCase.js";
import type { IUpdatePatientProfileUseCase } from "#application/ports/use-cases/patient/profile/IUpdatePatientProfileUseCase.js";
import type { IPatientUpdateProfilePictureUseCase } from "#application/ports/use-cases/patient/profile/IUpdateProfilePictureUseCase.js";
export declare class PatientProfileController {
    private readonly _completeProfile;
    private readonly _getPatientProfile;
    private readonly _addPatientAllergen;
    private readonly _removePatientAllergen;
    private readonly _addPatientCondition;
    private readonly _removePatientCondition;
    private readonly _changePassword;
    private readonly _updatePatientProfile;
    private readonly _updatePatientProfilePic;
    constructor(_completeProfile: ICompletePatientProfileUseCase, _getPatientProfile: IGetPatientProfileUseCase, _addPatientAllergen: IAddPatientAllergenUseCase, _removePatientAllergen: IRemovePatientAllergenUseCase, _addPatientCondition: IAddPatientConditionUseCase, _removePatientCondition: IRemovePatientConditionUseCase, _changePassword: IChangePatientPasswordUseCase, _updatePatientProfile: IUpdatePatientProfileUseCase, _updatePatientProfilePic: IPatientUpdateProfilePictureUseCase);
    updateProfilePic: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    completeProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getPatient: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    addAllergen: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    removeAllergen: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    addCondition: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    removeCondition: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    changePassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    updateProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=profile.controller.d.ts.map