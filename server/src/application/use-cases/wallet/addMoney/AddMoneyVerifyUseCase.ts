import type { IWalletRepository } from "@application/ports/repositories/IWalletRepository.ts";
import type { IWalletTransactionRepository } from "@application/ports/repositories/IWalletTransactionRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type {
  AddMoneyVerifyInput,
  IAddMoneyVerifyUseCase,
} from "@application/ports/use-cases/wallet/IAddMoneyVerifyUseCase.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import { PaymentError } from "@shared/errors/PaymentError.ts";
import crypto from "crypto";

export class AddMoneyVerifyUseCase implements IAddMoneyVerifyUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _wallet: IWalletRepository,
    private readonly _transactionRepo: IWalletTransactionRepository
  ) {}
  async execute(data: AddMoneyVerifyInput): Promise<void> {
    this._logger.info("Verify Add Money Payment UseCase", {
      transaction_id: data.transactionId,
      paymentId: data.razorpay_payment_id,
    });

    const transaction = await this._transactionRepo.findById(
      data.transactionId
    );

    if (!transaction) {
      throw new NotFoundError("Transaction Not Foudn");
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(data.razorpay_signature),
      Buffer.from(generatedSignature)
    );

    if (!isValid) {
      throw new PaymentError("Invalid Payment Signature");
    }

    transaction.paymentSuccessful();
    const wallet = await this._wallet.findByUserId(data.userId);

    if (!wallet) {
      throw new NotFoundError("Wallet Not Found");
    }

    wallet.credit(transaction.amount);

    await this._wallet.update(wallet);
    await this._transactionRepo.update(transaction);
  }
}
