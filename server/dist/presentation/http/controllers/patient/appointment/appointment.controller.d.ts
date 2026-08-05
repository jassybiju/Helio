import type { ICreateAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/ICreateAppointmentUseCase.js";
import type { NextFunction, Request, Response } from "express";
import type { IGetAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/IGetAppointmentUseCase.js";
import type { ICheckoutAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/ICheckoutAppointmentUseCase.js";
import type { IGetAllAppointmentsUseCase } from "#application/ports/use-cases/patient/appointments/IGetAllAppointmentsUsecase.js";
import type { IVerifyAppointmentPaymentUseCase } from "#application/ports/use-cases/patient/appointments/IVerifyAppointmentPaymentUseCase.js";
import type { IGetPatientLiveQueueUseCase } from "#application/ports/use-cases/patient/appointments/IGetPatientLiveQueueUseCase.js";
import type { IGetRescheduledSlotsUseCase } from "#application/ports/use-cases/patient/appointments/cancellation/IGetRescheduledSlotsUseCase.js";
import type { IRespondPatientResheduleAppointmentUseCase } from "#application/ports/use-cases/patient/appointments/cancellation/IRespondPatientResheduleAppointmentUseCase.js";
import type { IRespondPatientCancelAndRefundAppointment } from "#application/ports/use-cases/patient/appointments/cancellation/IRespondPatientCancelAndRefundAppointment.js";
import type { IPatientCancellationUseCase } from "#application/ports/use-cases/patient/appointments/cancellation/IPatientCancellationUseCase.js";
import type { IPatientRescheduleUseCase } from "#application/ports/use-cases/patient/appointments/cancellation/IPatientRescheduleUseCase.js";
export declare class PatientAppointmentController {
    private readonly _createAppointment;
    private readonly _getAppointment;
    private readonly _checkout;
    private readonly _getAllAppointment;
    private readonly _liveQueue;
    private readonly _verifyPayment;
    private readonly _getRescheduleSlots;
    private readonly _rescheduleAppointment;
    private readonly _cancelAndRefundAppointment;
    private readonly _patientCancelAppointment;
    private readonly _patientRescheduleAppointment;
    constructor(_createAppointment: ICreateAppointmentUseCase, _getAppointment: IGetAppointmentUseCase, _checkout: ICheckoutAppointmentUseCase, _getAllAppointment: IGetAllAppointmentsUseCase, _liveQueue: IGetPatientLiveQueueUseCase, _verifyPayment: IVerifyAppointmentPaymentUseCase, _getRescheduleSlots: IGetRescheduledSlotsUseCase, _rescheduleAppointment: IRespondPatientResheduleAppointmentUseCase, _cancelAndRefundAppointment: IRespondPatientCancelAndRefundAppointment, _patientCancelAppointment: IPatientCancellationUseCase, _patientRescheduleAppointment: IPatientRescheduleUseCase);
    patientRescheduleAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    patientCancelAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    cancelAndRefundAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    rescheduleAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getRescheduleSlots: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    liveQueue: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    verifyPayment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    createAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    checkout: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=appointment.controller.d.ts.map