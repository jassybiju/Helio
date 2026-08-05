import { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ConflictError } from "#shared/errors/ConflictError.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { PaymentError } from "#shared/errors/PaymentError.js";
import crypto from "crypto";
export class VerifyAppointmentPaymentUseCase {
    _logger;
    _appointmentRepo;
    constructor(_logger, _appointmentRepo) {
        this._logger = _logger;
        this._appointmentRepo = _appointmentRepo;
    }
    async execute(data) {
        this._logger.info("Verify Appointment Payment UseCase", {
            appointmentId: data.appointmentId,
            paymentId: data.razorpay_payment_id,
        });
        const appointment = await this._appointmentRepo.findById(data.appointmentId);
        if (!appointment) {
            throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
        }
        if (appointment.patientId !== data.patientId) {
            throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
        }
        if (appointment.status === APPOINTMENT_STATUS.CONFIRMED) {
            throw new ConflictError(MESSAGE.APPOINTMENT_ALREADY_PAID);
        }
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
            .digest("hex");
        const isValid = crypto.timingSafeEqual(Buffer.from(data.razorpay_signature), Buffer.from(generatedSignature));
        if (!isValid) {
            throw new PaymentError("Invalid Payment Signature");
        }
        appointment.paymentCompleted(data.razorpay_payment_id);
        await this._appointmentRepo.update(appointment);
    }
}
//# sourceMappingURL=VerifyAppointmentPaymentUseCase.js.map