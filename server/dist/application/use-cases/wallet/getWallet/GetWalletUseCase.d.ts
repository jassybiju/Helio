import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IGetWalletInput, IGetWalletUseCase } from "#application/ports/use-cases/wallet/IGetWalletUseCase.js";
import type { WalletTransaction } from "#domain/entities/WalletTransaction.js";
export declare class GetWalletUseCase implements IGetWalletUseCase {
    private readonly _logger;
    private readonly _walletRepo;
    private readonly _transactionRepo;
    constructor(_logger: ILogger, _walletRepo: IWalletRepository, _transactionRepo: IWalletTransactionRepository);
    execute(userId: string, input: IGetWalletInput): Promise<{
        balance: number;
        transactions: WalletTransaction[];
        page: number;
        totalCount: number;
        limit: number;
    }>;
}
//# sourceMappingURL=GetWalletUseCase.d.ts.map