import { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class AddMoneyUseCase {
    _logger;
    _walletRepo;
    _transactionRepo;
    _idGenerator;
    _razorpay;
    _uow;
    constructor(_logger, _walletRepo, _transactionRepo, _idGenerator, _razorpay, _uow) {
        this._logger = _logger;
        this._walletRepo = _walletRepo;
        this._transactionRepo = _transactionRepo;
        this._idGenerator = _idGenerator;
        this._razorpay = _razorpay;
        this._uow = _uow;
    }
    async execute(userId, amount) {
        // TODO : Add Atomicitiy HERE
        this._logger.info("Add money attempt", { userId, amount });
        return this._uow.execute(async (session) => {
            const walletRepo = this._walletRepo.withSession(session);
            const transactionRepo = this._transactionRepo.withSession(session);
            const wallet = await walletRepo.findByUserId(userId);
            if (!wallet) {
                throw new AppError("Wallet Not found", HTTPStatus.NOT_FOUND);
            }
            const TRAN_PREFIX = process.env.TRANSACTION_PREFIX;
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
//# sourceMappingURL=AddMoneyUseCase.js.map