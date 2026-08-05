import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type {
  IGetWalletInput,
  IGetWalletUseCase,
} from "#application/ports/use-cases/wallet/IGetWalletUseCase.js";
import type { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class GetWalletUseCase implements IGetWalletUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _walletRepo: IWalletRepository,
    private readonly _transactionRepo: IWalletTransactionRepository
  ) {}
  async execute(
    userId: string,
    input: IGetWalletInput
  ): Promise<{
    balance: number;
    transactions: WalletTransaction[];
    page: number;
    totalCount: number;
    limit: number;
  }> {
    this._logger.info("Get Wallet attempt", { userId });
    const {
      page = 1,
      limit = 10,
      type,
      fromDate,
      toDate,
      order = "asc",
    } = input;
    const wallet = await this._walletRepo.findByUserId(userId);

    if (!wallet) {
      throw new AppError("Wallet Not Found", HTTPStatus.NOT_FOUND);
    }

    const { totalCount, transactions } =
      await this._transactionRepo.findAllWithFilters(wallet.id, {
        page,
        limit,
        type,
        fromDate,
        toDate,
        order,
      });
    return { balance: wallet.balance, transactions, totalCount, limit, page };
  }
}
