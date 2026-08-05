import type { NextFunction, Request, Response } from "express";
import type { ILoginUseCase } from "#application/ports/use-cases/auth/ILoginUseCase.js";
export declare class AdminAuthController {
    private readonly _loginUsecase;
    constructor(_loginUsecase: ILoginUseCase);
    login: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=auth.controller.d.ts.map