import { PAYMENT_TYPE } from "#domain/common/enums/appointment.enum.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class PaymentServiceFactory {
    walletPaymentService;
    razorpayPaymentService;
    constructor(walletPaymentService, razorpayPaymentService) {
        this.walletPaymentService = walletPaymentService;
        this.razorpayPaymentService = razorpayPaymentService;
    }
    getService(type) {
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
//# sourceMappingURL=PaymentServiceFactory.js.map