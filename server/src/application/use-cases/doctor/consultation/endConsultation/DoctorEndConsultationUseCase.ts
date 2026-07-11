import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IChatSessionRepository } from "@application/ports/repositories/IChatSessionRepository.ts";
import type { IConsultationRepository } from "@application/ports/repositories/IConsultationRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IWalletRepository } from "@application/ports/repositories/IWalletRepository.ts";
import type { IWalletTransactionRepository } from "@application/ports/repositories/IWalletTransactionRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IUnitOfWork } from "@application/ports/services/IUnitOfWork.ts";
import type { IDoctorEndConsultationUseCase } from "@application/ports/use-cases/doctor/consultation/IDoctorEndConsultationUseCase.ts";
import { TRANSACTION_TYPE } from "@domain/common/enums/wallet.enum.ts";
import { ChatSession } from "@domain/entities/ChatSession.ts";
import { WalletTransaction } from "@domain/entities/WalletTransaction.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";

export class DoctorEndConsultationUseCase implements IDoctorEndConsultationUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _consultationRepo: IConsultationRepository,
    private readonly _chatSessionRepo: IChatSessionRepository,
    private readonly _idGenerator: IIDGenerator,
    private readonly _uow: IUnitOfWork,
    private readonly _transactionRepo: IWalletTransactionRepository,
    private readonly _walletRepo: IWalletRepository
  ) {}
  async execute(doctorId: string, appointmentId: string): Promise<void> {
    this._logger.info("Doctor End Consultation Attempt", {
      doctorId,
      appointmentId,
    });

    return await this._uow.execute(async (session) => {
      const doctorRepo = this._doctorRepo.withSession(session);
      const appointmentRepo = this._appointmentRepo.withSession(session);
      const consultationRepo = this._consultationRepo.withSession(session);
      const chatSessionRepo = this._chatSessionRepo.withSession(session);
      const walletRepo = this._walletRepo.withSession(session);
      const transactionRepo = this._transactionRepo.withSession(session);

      const doctor = await doctorRepo.findById(doctorId);
      if (!doctor) {
        throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
      }

      const appointment = await appointmentRepo.findById(appointmentId);
      if (!appointment) {
        throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
      }
      const consultation = await consultationRepo.findByAppointmentId(
        appointment.id
      );
      if (!consultation) {
        throw new NotFoundError("Consultation not found");
      }

      if (consultation.doctorId !== doctor.id) {
        throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
      }

      // checking if follow Up allowed. if allowed check if existing chat session exists if exists
      // update expires at else create new Session

      let chatSession = null;
      let shouldUpdateChatSession = false;
      if (consultation?.medicationPeriod && consultation.medicationPeriod > 0) {
        chatSession = await chatSessionRepo.findByPatientIdAndDoctorId(
          appointment.patientId,
          appointment.doctorId
        );

        if (!chatSession) {
          const chatSessionId = this._idGenerator.generate(
            process.env.CHAT_SES_PREFIX!
          );
          chatSession = ChatSession.create({
            id: chatSessionId,
            patientId: appointment.patientId,
            doctorId: appointment.doctorId,
            period: consultation.medicationPeriod,
          });
        } else {
          shouldUpdateChatSession = true;
          chatSession.updateExpiry(consultation.medicationPeriod);
        }
      }
      consultation.end();
      appointment.endConsultation();

      // ADDING PAYMENT TO DOCTOR WALLET
      const wallet = await walletRepo.findByUserId(doctor.id);
      if (!wallet) {
        throw new NotFoundError(MESSAGE.WALLET_NOT_FOUND);
      }

      const transactionId = this._idGenerator.generate(
        process.env.TRANSACTION_PREFIX!
      );
      const transaction = WalletTransaction.createTransaction({
        id: transactionId,
        walletId: wallet.id,
        amount: appointment.consultationFee,
        type: TRANSACTION_TYPE.CREDIT,
        description: `PAYMENT FOR APPOINTMENT OF ID ${appointment.id}`,
      });

      wallet.credit(appointment.consultationFee);

      const adminWallet = await walletRepo.findAdminWallet();

      if (!adminWallet) {
        throw new NotFoundError(MESSAGE.WALLET_NOT_FOUND);
      }

      adminWallet.credit(appointment.platformFee);
      const adminTransactionId = this._idGenerator.generate(
        process.env.TRANSACTION_PREFIX!
      );
      const adminTransaction = WalletTransaction.createTransaction({
        id: adminTransactionId,
        walletId: adminWallet.id,
        amount: appointment.platformFee,
        type: TRANSACTION_TYPE.CREDIT,
        description: `PAYMENT FOR APPOINTMENT OF ID ${appointment.id}`,
      });

      const operations = [
        consultationRepo.update(consultation),
        appointmentRepo.update(appointment),
        walletRepo.update(wallet),
        transactionRepo.create(transaction),
        walletRepo.update(adminWallet),
        transactionRepo.create(adminTransaction)
      ];

      if (chatSession) {
        operations.push(
          shouldUpdateChatSession
            ? chatSessionRepo.update(chatSession)
            : chatSessionRepo.create(chatSession)
        );
      }

      await Promise.all(operations);
    });
  }
}
