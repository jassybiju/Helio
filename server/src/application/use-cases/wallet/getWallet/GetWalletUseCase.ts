import type { IWalletRepository } from "@application/ports/repositories/IWalletRepository.ts";
import type { IWalletTransactionRepository } from "@application/ports/repositories/IWalletTransactionRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type {
  IGetWalletInput,
  IGetWalletUseCase,
} from "@application/ports/use-cases/wallet/IGetWalletUseCase.ts";
import type { WalletTransaction } from "@domain/entities/WalletTransaction.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
    console.log(wallet.balance);
    return { balance: wallet.balance, transactions, totalCount, limit, page };
  }
}
