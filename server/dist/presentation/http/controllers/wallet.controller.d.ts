import type { IGetWalletUseCase } from "#application/ports/use-cases/wallet/IGetWalletUseCase.js";
import type { NextFunction, Request, Response } from "express";
import type { IAddMoneyUseCase } from "#application/ports/use-cases/wallet/IAddMoneyUseCase.js";
import type { IAddMoneyVerifyUseCase } from "#application/ports/use-cases/wallet/IAddMoneyVerifyUseCase.js";
export declare class WalletController {
    private readonly _getWalletUseCase;
    private readonly _addMoneyUseCase;
    private readonly _verifyAddMoney;
    constructor(_getWalletUseCase: IGetWalletUseCase, _addMoneyUseCase: IAddMoneyUseCase, _verifyAddMoney: IAddMoneyVerifyUseCase);
    verifyAddMoney: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getWallet: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    addMoney: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=wallet.controller.d.ts.map