import { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
import { ChatSession } from "#domain/entities/ChatSession.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DoctorEndConsultationUseCase {
    _logger;
    _doctorRepo;
    _appointmentRepo;
    _consultationRepo;
    _chatSessionRepo;
    _idGenerator;
    _uow;
    _transactionRepo;
    _walletRepo;
    constructor(_logger, _doctorRepo, _appointmentRepo, _consultationRepo, _chatSessionRepo, _idGenerator, _uow, _transactionRepo, _walletRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._appointmentRepo = _appointmentRepo;
        this._consultationRepo = _consultationRepo;
        this._chatSessionRepo = _chatSessionRepo;
        this._idGenerator = _idGenerator;
        this._uow = _uow;
        this._transactionRepo = _transactionRepo;
        this._walletRepo = _walletRepo;
    }
    async execute(doctorId, appointmentId) {
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
            const consultation = await consultationRepo.findByAppointmentId(appointment.id);
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
                chatSession = await chatSessionRepo.findByPatientIdAndDoctorId(appointment.patientId, appointment.doctorId);
                if (!chatSession) {
                    const chatSessionId = this._idGenerator.generate(process.env.CHAT_SES_PREFIX);
                    chatSession = ChatSession.create({
                        id: chatSessionId,
                        patientId: appointment.patientId,
                        doctorId: appointment.doctorId,
                        period: 2,
                    });
                }
                else {
                    shouldUpdateChatSession = true;
                    chatSession.updateExpiry(2);
                }
            }
            consultation.end();
            appointment.endConsultation();
            // ADDING PAYMENT TO DOCTOR WALLET
            const wallet = await walletRepo.findByUserId(doctor.id);
            if (!wallet) {
                throw new NotFoundError(MESSAGE.WALLET_NOT_FOUND);
            }
            const transactionId = this._idGenerator.generate(process.env.TRANSACTION_PREFIX);
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
            const adminTransactionId = this._idGenerator.generate(process.env.TRANSACTION_PREFIX);
            const adminTransaction = WalletTransaction.createTransaction({
                id: adminTransactionId,
                walletId: adminWallet.id,
                amount: appointment.platformFee,
                type: TRANSACTION_TYPE.CREDIT,
                description: `PAYMENT FOR APPOINTMENT OF ID ${appointment.id}`,
            });
            adminTransaction.paymentSuccessful();
            const operations = [
                consultationRepo.update(consultation),
                appointmentRepo.update(appointment),
                walletRepo.update(wallet),
                transactionRepo.create(transaction),
                walletRepo.update(adminWallet),
                transactionRepo.create(adminTransaction),
            ];
            if (chatSession) {
                operations.push(shouldUpdateChatSession
                    ? chatSessionRepo.update(chatSession)
                    : chatSessionRepo.create(chatSession));
            }
            await Promise.all(operations);
        });
    }
}
//# sourceMappingURL=DoctorEndConsultationUseCase.js.map