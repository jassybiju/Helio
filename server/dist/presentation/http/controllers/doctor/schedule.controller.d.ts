import type { ISetDoctorScheduleUseCase } from "#application/ports/use-cases/doctor/schedule/ISetDoctorScheduleUseCase.js";
import type { NextFunction, Request, Response } from "express";
import type { IGetDoctorScheduleUseCase } from "#application/ports/use-cases/doctor/schedule/IGetDoctorScheduleUseCase.js";
import type { IDeleteDoctorScheduleUseCase } from "#application/ports/use-cases/doctor/schedule/IDeleteDoctorScheduleUseCase.js";
export declare class DoctorScheduleController {
    private readonly _setSchedule;
    private readonly _getSchedule;
    private readonly _deleteSchedule;
    constructor(_setSchedule: ISetDoctorScheduleUseCase, _getSchedule: IGetDoctorScheduleUseCase, _deleteSchedule: IDeleteDoctorScheduleUseCase);
    setSchedule: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getSchedule: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=schedule.controller.d.ts.map