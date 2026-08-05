import { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class WalletPaymentService {
    _walletRepo;
    _appointmentRepo;
    _transactionRepo;
    _idGenerator;
    _uow;
    constructor(_walletRepo, _appointmentRepo, _transactionRepo, _idGenerator, _uow) {
        this._walletRepo = _walletRepo;
        this._appointmentRepo = _appointmentRepo;
        this._transactionRepo = _transactionRepo;
        this._idGenerator = _idGenerator;
        this._uow = _uow;
    }
    async pay(data) {
        const { appointment, patientId } = data;
        const payableAmount = appointment.totalAmount;
        // creating session
        return await this._uow.execute(async (session) => {
            // adding session to repos
            const walletRepo = this._walletRepo.withSession(session);
            const appointmentRepo = this._appointmentRepo.withSession(session);
            const transactionRepo = this._transactionRepo.withSession(session);
            // finding wallet of the patient
            const wallet = await walletRepo.findByUserId(patientId);
            if (!wallet) {
                throw new AppError("Wallet Not Found", HTTPStatus.NOT_FOUND);
            }
            // checking if wallet has enough balance
            if (wallet.balance < payableAmount) {
                throw new AppError("Insufficient Balance", HTTPStatus.BAD_REQUEST);
            }
            wallet.debit(payableAmount);
            // updating wallet
            await walletRepo.update(wallet);
            // creating transaction
            const TRANSACTION_ID = this._idGenerator.generate(process.env.TRANSACTION_PREFIX);
            const transaction = WalletTransaction.createTransaction({
                id: TRANSACTION_ID,
                walletId: wallet.id,
                amount: appointment.totalAmount,
                type: TRANSACTION_TYPE.DEBIT,
                description: `AMOUNT PAID FOR APPOINTMENT ${appointment.id}`,
            });
            transaction.paymentSuccessful();
            await transactionRepo.create(transaction);
            // updating appointment
            appointment.paymentCompleted();
            await appointmentRepo.update(appointment);
            return {
                success: true,
            };
        });
    }
}
//# sourceMappingURL=WalletPaymentService.js.map