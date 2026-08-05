import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { AddMoneyVerifyInput, IAddMoneyVerifyUseCase } from "#application/ports/use-cases/wallet/IAddMoneyVerifyUseCase.js";
export declare class AddMoneyVerifyUseCase implements IAddMoneyVerifyUseCase {
    private readonly _logger;
    private readonly _wallet;
    private readonly _transactionRepo;
    constructor(_logger: ILogger, _wallet: IWalletRepository, _transactionRepo: IWalletTransactionRepository);
    execute(data: AddMoneyVerifyInput): Promise<void>;
}
//# sourceMappingURL=AddMoneyVerifyUseCase.d.ts.map