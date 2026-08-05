import type { IAddLabReportUseCase } from "#application/ports/use-cases/doctor/consultation/IAddLabReportUseCase.js";
import type { IAddPrescriptionUseCase } from "#application/ports/use-cases/doctor/consultation/IAddPrescriptionUseCase.js";
import type { IDoctorEndConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IDoctorEndConsultationUseCase.js";
import type { IDoctorViewConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IDoctorViewConsultationUseCase.js";
import type { IRemoveLabReportUseCase } from "#application/ports/use-cases/doctor/consultation/IRemoveLabReportUseCase.js";
import type { IRemovePrescriptionUseCase } from "#application/ports/use-cases/doctor/consultation/IRemovePrescriptionUseCase.js";
import type { IUpdateConsultationNotesUseCase } from "#application/ports/use-cases/doctor/consultation/IUpdateConsultationNotesUseCase.js";
import type { IUpdateVitalsConsultationUseCase } from "#application/ports/use-cases/doctor/consultation/IUpdateVitalsConsultationUseCase.js";
import type { IViewHistoryUseCase } from "#application/ports/use-cases/doctor/consultation/IViewHistoryUseCase.js";
import type { NextFunction, Request, Response } from "express";
export declare class ConsultationController {
    private readonly _endConsultation;
    private readonly _viewConsultation;
    private readonly _updateVitals;
    private readonly _addPrescription;
    private readonly _removePrescription;
    private readonly _updateNotes;
    private readonly _addTest;
    private readonly _removeTest;
    private readonly _viewHistory;
    constructor(_endConsultation: IDoctorEndConsultationUseCase, _viewConsultation: IDoctorViewConsultationUseCase, _updateVitals: IUpdateVitalsConsultationUseCase, _addPrescription: IAddPrescriptionUseCase, _removePrescription: IRemovePrescriptionUseCase, _updateNotes: IUpdateConsultationNotesUseCase, _addTest: IAddLabReportUseCase, _removeTest: IRemoveLabReportUseCase, _viewHistory: IViewHistoryUseCase);
    updateNotes: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    viewConsultation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    endConsultation: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    updateVitals: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    addPrescription: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    removePrescription: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    addTest: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    removeTest: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    viewHistory: (req: Request<{
        appointmentId: string;
    }, unknown, unknown, {
        page?: string;
        limit?: string;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=consultation.controller.d.ts.map