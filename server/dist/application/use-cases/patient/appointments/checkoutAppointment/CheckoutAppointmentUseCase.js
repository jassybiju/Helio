import { APPOINTMENT_STATUS, } from "#domain/common/enums/appointment.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class CheckoutAppointmentUseCase {
    _logger;
    _appointmentRepo;
    _paymentService;
    constructor(_logger, _appointmentRepo, _paymentService) {
        this._logger = _logger;
        this._appointmentRepo = _appointmentRepo;
        this._paymentService = _paymentService;
    }
    async execute(appointmentId, patientId, paymentType) {
        this._logger.info("Checkout Appointment Implementation", {
            appointmentId,
            paymentType,
        });
        const appointment = await this._appointmentRepo.findById(appointmentId);
        if (!appointment) {
            throw new AppError(MESSAGE.APPOINTMENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        if (appointment.patientId !== patientId) {
            throw new AppError(MESSAGE.APPOINTMENT_NOT_ACCESS, HTTPStatus.UNAUTHORIZED);
        }
        if (appointment.status === APPOINTMENT_STATUS.EXPIRED) {
            throw new AppError("Appointment Already expired", HTTPStatus.BAD_REQUEST);
        }
        if (appointment.status === APPOINTMENT_STATUS.CONFIRMED) {
            throw new AppError(MESSAGE.APPOINTMENT_ALREADY_PAID, HTTPStatus.BAD_REQUEST);
        }
        const paymentService = this._paymentService.getService(paymentType);
        return await paymentService.pay({
            appointment,
            patientId: appointment.patientId,
            amount: appointment.totalAmount,
        });
    }
}
//# sourceMappingURL=CheckoutAppointmentUseCase.js.map