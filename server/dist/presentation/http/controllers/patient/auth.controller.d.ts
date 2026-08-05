import type { NextFunction, Request, Response } from "express";
import type { IRegisterPatientUseCase } from "#application/ports/use-cases/patient/auth/IRegisterPatientUseCase.js";
import type { IVerifyOTPUseCase } from "#application/ports/use-cases/auth/IVerifyOTPUseCase.js";
import type { IResendOTPUseCase } from "#application/ports/use-cases/auth/IResendOTPUseCase.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import type { IForgetPasswordUseCase } from "#application/ports/use-cases/auth/IForgetPasswordUseCase.js";
import type { IResetPasswordUseCase } from "#application/ports/use-cases/auth/IResetPasswordUseCase.js";
import type { IGoogleLoginUseCase } from "#application/ports/use-cases/auth/IGoogleLoginUseCase.js";
export declare class PatientAuthController {
    private readonly _registerPatientUseCase;
    private readonly _resendOTPUseCase;
    private readonly _verifyOTPUseCase;
    private readonly _loginPatientUseCase;
    private readonly _forgetPasswordUseCase;
    private readonly _resetPasswordUseCase;
    private readonly _googleLoginUseCase;
    constructor(_registerPatientUseCase: IRegisterPatientUseCase, _resendOTPUseCase: IResendOTPUseCase, _verifyOTPUseCase: IVerifyOTPUseCase, _loginPatientUseCase: ILoginUseCase, _forgetPasswordUseCase: IForgetPasswordUseCase, _resetPasswordUseCase: IResetPasswordUseCase, _googleLoginUseCase: IGoogleLoginUseCase);
    register: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    verify_otp: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    resend_otp: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    login: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    forgetPassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    googleLogin: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=auth.controller.d.ts.map