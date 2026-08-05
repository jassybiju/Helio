import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class GetWalletUseCase {
    _logger;
    _walletRepo;
    _transactionRepo;
    constructor(_logger, _walletRepo, _transactionRepo) {
        this._logger = _logger;
        this._walletRepo = _walletRepo;
        this._transactionRepo = _transactionRepo;
    }
    async execute(userId, input) {
        this._logger.info("Get Wallet attempt", { userId });
        const { page = 1, limit = 10, type, fromDate, toDate, order = "asc", } = input;
        const wallet = await this._walletRepo.findByUserId(userId);
        if (!wallet) {
            throw new AppError("Wallet Not Found", HTTPStatus.NOT_FOUND);
        }
        const { totalCount, transactions } = await this._transactionRepo.findAllWithFilters(wallet.id, {
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
//# sourceMappingURL=GetWalletUseCase.js.map