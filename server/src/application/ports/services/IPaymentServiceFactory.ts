import type { PAYMENT_TYPE } from "@domain/common/enums/appointment.enum.ts";
import type { IPaymentService } from "./IPaymentService.ts";

export interface IPaymentServiceFactory {
  getService(type: PAYMENT_TYPE): IPaymentService;
}
