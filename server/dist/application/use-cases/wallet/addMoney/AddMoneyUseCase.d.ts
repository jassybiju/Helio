import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IAddMoneyUseCase } from "#application/ports/use-cases/wallet/IAddMoneyUseCase.js";
import type Razorpay from "razorpay";
export declare class AddMoneyUseCase implements IAddMoneyUseCase {
    private readonly _logger;
    private readonly _walletRepo;
    private readonly _transactionRepo;
    private readonly _idGenerator;
    private readonly _razorpay;
    private readonly _uow;
    constructor(_logger: ILogger, _walletRepo: IWalletRepository, _transactionRepo: IWalletTransactionRepository, _idGenerator: IIDGenerator, _razorpay: Razorpay, _uow: IUnitOfWork);
    execute(userId: string, amount: number): Promise<{
        transactionId: string;
        orderId: string;
        amount: number;
        currency: "INR";
    }>;
}
//# sourceMappingURL=AddMoneyUseCase.d.ts.map