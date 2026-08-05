import type { IPaymentService } from "#application/ports/services/IPaymentService.js";
import type { IPaymentServiceFactory } from "#application/ports/services/IPaymentServiceFactory.js";
import { PAYMENT_TYPE } from "#domain/common/enums/appointment.enum.js";
export declare class PaymentServiceFactory implements IPaymentServiceFactory {
    private walletPaymentService;
    private razorpayPaymentService;
    constructor(walletPaymentService: IPaymentService, razorpayPaymentService: IPaymentService);
    getService(type: PAYMENT_TYPE): IPaymentService;
}
//# sourceMappingURL=PaymentServiceFactory.d.ts.map