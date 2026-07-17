import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IWalletRepository } from "@application/ports/repositories/IWalletRepository.ts";
import type { IWalletTransactionRepository } from "@application/ports/repositories/IWalletTransactionRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { IPaymentService } from "@application/ports/services/IPaymentService.ts";
import type { IUnitOfWork } from "@application/ports/services/IUnitOfWork.ts";
import {
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
} from "@domain/common/enums/wallet.enum.ts";
import type { Appointment } from "@domain/entities/Appointment.ts";
import { WalletTransaction } from "@domain/entities/WalletTransaction.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
