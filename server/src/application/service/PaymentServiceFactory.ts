import type { IPaymentService } from "#application/ports/services/IPaymentService.js";
import type { IPaymentServiceFactory } from "#application/ports/services/IPaymentServiceFactory.js";
import { PAYMENT_TYPE } from "#domain/common/enums/appointment.enum.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";

export class PaymentServiceFactory implements IPaymentServiceFactory {
  constructor(
    private walletPaymentService: IPaymentService,
    private razorpayPaymentService: IPaymentService
  ) {}

  getService(type: PAYMENT_TYPE): IPaymentService {
    switch (type) {
      case PAYMENT_TYPE.RAZORPAY:
        return this.razorpayPaymentService;
      case PAYMENT_TYPE.WALLET:
        return this.walletPaymentService;

      default:
        throw new AppError("Invalid Payment type", HTTPStatus.INTERNAL_ERROR);
    }
  }
}
