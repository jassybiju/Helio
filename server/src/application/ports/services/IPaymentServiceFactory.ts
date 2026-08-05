import type { PAYMENT_TYPE } from "#domain/common/enums/appointment.enum.js";
import type { IPaymentService } from "./IPaymentService.js";

export interface IPaymentServiceFactory {
  getService(type: PAYMENT_TYPE): IPaymentService;
}
