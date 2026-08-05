import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IAddMoneyUseCase } from "#application/ports/use-cases/wallet/IAddMoneyUseCase.js";
import { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type Razorpay from "razorpay";

export class AddMoneyUseCase implements IAddMoneyUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _walletRepo: IWalletRepository,
    private readonly _transactionRepo: IWalletTransactionRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _razorpay: Razorpay,
    private readonly _uow: IUnitOfWork
  ) {}
  async execute(
    userId: string,
    amount: number
  ): Promise<{
    transactionId: string;
    orderId: string;
    amount: number;
    currency: "INR";
  }> {
    // TODO : Add Atomicitiy HERE

    this._logger.info("Add money attempt", { userId, amount });
    return this._uow.execute(async (session) => {
      const walletRepo = this._walletRepo.withSession(session);
      const transactionRepo = this._transactionRepo.withSession(session);

      const wallet = await walletRepo.findByUserId(userId);

      if (!wallet) {
        throw new AppError("Wallet Not found", HTTPStatus.NOT_FOUND);
      }

      const TRAN_PREFIX = process.env.TRANSACTION_PREFIX!;

      const transaction = WalletTransaction.createTransaction({
        id: this._idGenerator.generate(TRAN_PREFIX),
        walletId: wallet.id,
        type: TRANSACTION_TYPE.CREDIT,
        amount,
        referenceId: null,
        description: `Amount add to wallet at ${new Date().toDateString()}`,
      });
      const order = await this._razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: transaction.id,
      });

      await transactionRepo.create(transaction);

      return {
        transactionId: transaction.id,
        orderId: order.id,
        amount: amount,
        currency: "INR",
      };
    });
  }
}
