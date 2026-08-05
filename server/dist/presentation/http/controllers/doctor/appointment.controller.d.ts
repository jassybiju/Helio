import type { IDoctorStartConsultationUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorStartConsultationUseCase.js";
import type { IDoctorViewAllAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorViewAllAppointmentUseCase.js";
import type { IDoctorViewAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorViewAppointmentUseCase.js";
import type { IDoctorViewTodaysAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/IDoctorViewTodaysAppointmentUseCase.js";
import type { ISkipDoctorAppointmentUseCase } from "#application/ports/use-cases/doctor/appointment/ISkipDoctorAppointmentUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class DoctorAppointmentController {
    private readonly _getAllAppointments;
    private readonly _getAppointment;
    private readonly _startConsultation;
    private readonly _viewTodaysAppointment;
    private readonly _skipAppointment;
    constructor(_getAllAppointments: IDoctorViewAllAppointmentUseCase, _getAppointment: IDoctorViewAppointmentUseCase, _startConsultation: IDoctorStartConsultationUseCase, _viewTodaysAppointment: IDoctorViewTodaysAppointmentUseCase, _skipAppointment: ISkipDoctorAppointmentUseCase);
    getTodaysAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllAppointments: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    startConsultation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    skipAppointment: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=appointment.controller.d.ts.map