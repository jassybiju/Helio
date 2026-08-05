import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { IWalletRepository } from "#application/ports/repositories/IWalletRepository.js";
import type { IWalletTransactionRepository } from "#application/ports/repositories/IWalletTransactionRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IUnitOfWork } from "#application/ports/services/IUnitOfWork.js";
import type { IRespondPatientCancelAndRefundAppointment } from "#application/ports/use-cases/patient/appointments/cancellation/IRespondPatientCancelAndRefundAppointment.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import type { IIDGenerator } from "#application/ports/services/IIDGenerator.js";
import { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
import {
  APPOINTMENT_STATUS,
  PAYMENT_STATUS,
} from "#domain/common/enums/appointment.enum.js";

export class RespondPatientCancelAndRefundAppointmentUseCase implements IRespondPatientCancelAndRefundAppointment {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _walletRepo: IWalletRepository,
    private readonly _transactionRepo: IWalletTransactionRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _uow: IUnitOfWork
  ) {}
  async execute(patientId: string, appointmentId: string): Promise<void> {
    this._logger.info("Respond Patient Cancel and Refund Attempt", {
      patientId,
      appointmentId,
    });

    return this._uow.execute(async (session) => {
      const patientRepo = this._patientRepo.withSession(session);
      const appointmentRepo = this._appointmentRepo.withSession(session);
      const walletRepo = this._walletRepo.withSession(session);
      const transactionRepo = this._transactionRepo.withSession(session);

      const patient = await patientRepo.findById(patientId);
      if (!patient) {
        throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
      }

      const appointment = await appointmentRepo.findById(appointmentId);
      if (!appointment) {
        throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
      }

      if (appointment.patientId !== patient.id) {
        throw new ConflictError(MESSAGE.APPOINTMENT_NOT_ACCESS);
      }

      if (
        appointment.status !== APPOINTMENT_STATUS.DOCTOR_CANCELLATION_REQUESTED
      ) {
        throw new ConflictError(
          "Appointment is not waiting for patient response"
        );
      }

      if (appointment.paymentStatus !== PAYMENT_STATUS.PAID) {
        throw new ConflictError("Only paid appointments can be refunded");
      }
      appointment.cancelByDoctorComplete();

      const wallet = await walletRepo.findByUserId(patient.id);

      if (!wallet) {
        throw new NotFoundError("WAllet not found");
      }
      wallet.credit(appointment.totalAmount);

      const TRANSACTION_PREFIX = process.env.TRANSACTION_PREFIX!;
      const transactionId = this._idGenerator.generate(TRANSACTION_PREFIX);
      const transaction = WalletTransaction.createTransaction({
        id: transactionId,
        walletId: wallet.id,
        amount: appointment.totalAmount,
        type: TRANSACTION_TYPE.CREDIT,
        description: `REFUND FROM APPOINTEMNT ${appointment.id}`,
      });

      await Promise.all([
        walletRepo.update(wallet),
        transactionRepo.create(transaction),
        appointmentRepo.update(appointment),
      ]);
    });
  }
}
