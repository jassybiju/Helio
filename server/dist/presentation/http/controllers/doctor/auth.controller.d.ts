import type { IRegisterDoctorUseCase } from "#application/ports/use-cases/doctor/auth/IRegisterDoctorUseCase.js";
import type { NextFunction, Request, Response } from "express";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IVerifyOTPUseCase } from "#application/ports/use-cases/auth/IVerifyOTPUseCase.js";
import type { IResendOTPUseCase } from "#application/ports/use-cases/auth/IResendOTPUseCase.js";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
import type { IForgetPasswordUseCase } from "#application/ports/use-cases/auth/IForgetPasswordUseCase.js";
import type { IResetPasswordUseCase } from "#application/ports/use-cases/auth/IResetPasswordUseCase.js";
import type { IGoogleLoginUseCase } from "#application/ports/use-cases/auth/IGoogleLoginUseCase.js";
export declare class DoctorAuthController {
    private readonly _registerDoctorUseCase;
    private readonly _verifyOTPUseCase;
    private readonly _resendOTPUseCase;
    private readonly _loginUseCase;
    private readonly _forgetPasswordUseCase;
    private readonly _resetPasswordUseCase;
    private readonly _googleLoginUseCase;
    private readonly _logger;
    constructor(_registerDoctorUseCase: IRegisterDoctorUseCase, _verifyOTPUseCase: IVerifyOTPUseCase, _resendOTPUseCase: IResendOTPUseCase, _loginUseCase: ILoginUseCase, _forgetPasswordUseCase: IForgetPasswordUseCase, _resetPasswordUseCase: IResetPasswordUseCase, _googleLoginUseCase: IGoogleLoginUseCase, _logger: ILogger);
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns
     */
    register: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    verify_otp: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    resend_otp: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    /**
     * Doctor Login Controller validates req.body using zod and return user res
     * with AccessToken and refresh token as cookie
     *
     * @param req
     * @param res
     * @param next
     */
    login: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    forgetPasword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    resetPassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    googleLogin: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=auth.controller.d.ts.map