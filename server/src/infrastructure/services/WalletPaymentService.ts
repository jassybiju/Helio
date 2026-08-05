import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import type { IPaymentService } from "#application/ports/services/IPaymentService.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
import type { Appointment } from "#domain/entities/Appointment.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class WalletPaymentService implements IPaymentService {
  constructor(
    private readonly _walletRepo: IWalletRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _transactionRepo: IWalletTransactionRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _uow: IUnitOfWork
  ) {}
  async pay(data: {
    appointment: Appointment;
    patientId: string;
    amount: number;
  }): Promise<{ success: true } | { orderId: string }> {
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
      const TRANSACTION_ID = this._idGenerator.generate(
        process.env.TRANSACTION_PREFIX!
      );
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
