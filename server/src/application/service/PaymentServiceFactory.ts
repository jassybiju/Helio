import type { IPaymentService } from "@application/ports/services/IPaymentService.ts";
import type { IPaymentServiceFactory } from "@application/ports/services/IPaymentServiceFactory.ts";
import { PAYMENT_TYPE } from "@domain/common/enums/appointment.enum.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

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
