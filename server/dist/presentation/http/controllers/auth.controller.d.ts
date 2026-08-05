import type { IGetMeUseCase } from "#application/ports/use-cases/auth/IGetMeUseCase.js";
import type { ILogoutUseCase } from "#application/ports/use-cases/auth/ILogoutUseCase.js";
import type { IRefreshTokenUseCase } from "#application/ports/use-cases/auth/IRefreshTokenUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class AuthController {
    private readonly _getMe;
    private readonly _refreshTokenUseCase;
    private readonly _logoutUseCase;
    constructor(_getMe: IGetMeUseCase, _refreshTokenUseCase: IRefreshTokenUseCase, _logoutUseCase: ILogoutUseCase);
    getMe: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    refresh: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    logout: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=auth.controller.d.ts.map