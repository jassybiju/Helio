import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPaymentServiceFactory } from "#application/ports/services/IPaymentServiceFactory.js";
import type { ICheckoutAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/ICheckoutAppointmentUseCase.js";
import {
  APPOINTMENT_STATUS,
  type PAYMENT_TYPE,
} from "#domain/common/enums/appointment.enum.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class CheckoutAppointmentUseCase implements ICheckoutAppointmentUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _paymentService: IPaymentServiceFactory
  ) {}
  async execute(
    appointmentId: string,
    patientId: string,
    paymentType: PAYMENT_TYPE
  ): Promise<{ success: true } | { orderId: string }> {
    this._logger.info("Checkout Appointment Implementation", {
      appointmentId,
      paymentType,
    });

    const appointment = await this._appointmentRepo.findById(appointmentId);

    if (!appointment) {
      throw new AppError(MESSAGE.APPOINTMENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
    }

    if (appointment.patientId !== patientId) {
      throw new AppError(
        MESSAGE.APPOINTMENT_NOT_ACCESS,
        HTTPStatus.UNAUTHORIZED
      );
    }

    if (appointment.status === APPOINTMENT_STATUS.EXPIRED) {
      throw new AppError("Appointment Already expired", HTTPStatus.BAD_REQUEST);
    }

    if (appointment.status === APPOINTMENT_STATUS.CONFIRMED) {
      throw new AppError(
        MESSAGE.APPOINTMENT_ALREADY_PAID,
        HTTPStatus.BAD_REQUEST
      );
    }

    const paymentService = this._paymentService.getService(paymentType);

    return await paymentService.pay({
      appointment,
      patientId: appointment.patientId,
      amount: appointment.totalAmount,
    });
  }
}
