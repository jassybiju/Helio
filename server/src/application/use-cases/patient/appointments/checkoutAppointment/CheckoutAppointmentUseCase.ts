import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IPaymentServiceFactory } from "@application/ports/services/IPaymentServiceFactory.ts";
import type { ICheckoutAppointmentUseCase } from "@application/ports/use-cases/patient/appointments/ICheckoutAppointmentUseCase.ts";
import {
  APPOINTMENT_STATUS,
  type PAYMENT_TYPE,
} from "@domain/common/enums/appointment.enum.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
