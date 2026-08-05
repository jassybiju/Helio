import { APPOINTMENT_STATUS, PAYMENT_STATUS, } from "#domain/common/enums/appointment.enum.js";
import { TRANSACTION_TYPE } from "#domain/common/enums/wallet.enum.js";
import { WalletTransaction } from "#domain/entities/WalletTransaction.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class PatientAppointmentCancellationUseCase {
    _logger;
    _patientRepo;
    _appointmentRepo;
    _walletRepo;
    _transactionRepo;
    _idGenerator;
    _uow;
    constructor(_logger, _patientRepo, _appointmentRepo, _walletRepo, _transactionRepo, _idGenerator, _uow) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._appointmentRepo = _appointmentRepo;
        this._walletRepo = _walletRepo;
        this._transactionRepo = _transactionRepo;
        this._idGenerator = _idGenerator;
        this._uow = _uow;
    }
    async execute(patientId, appointmentId) {
        this._logger.info("Patient Appointment Cacnel", {
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
            if (appointment.status !== APPOINTMENT_STATUS.CONFIRMED) {
                throw new ConflictError("Only confirmed appointments cna be cancelled");
            }
            if (appointment.paymentStatus !== PAYMENT_STATUS.PAID) {
                throw new ConflictError("Only paid appointments can be refunded");
            }
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            // const fakeDate = date
            // fakeDate.setDate(fakeDate.getDate() + 2)
            const appointmentDate = new Date(appointment.startTime);
            appointmentDate.setHours(0, 0, 0, 0);
            if (appointmentDate <= date) {
                throw new ConflictError("Cant cancel on appointment day");
            }
            appointment.cancelByPatientComplete();
            const wallet = await walletRepo.findByUserId(patient.id);
            if (!wallet) {
                throw new NotFoundError("WAllet not found");
            }
            wallet.credit(appointment.totalAmount);
            const TRANSACTION_PREFIX = process.env.TRANSACTION_PREFIX;
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
//# sourceMappingURL=PatientAppointmentCancellationUseCase.js.map