import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IConsultationRepository } from "#application/ports/repositories/IConsultationRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPDFGeneratorService } from "#application/ports/services/IPDFGeneratorService.js";
import type { ITemplateRenderer } from "#application/ports/services/ITemplateRenderer.js";
import type { IPdfRequestDTO } from "#application/ports/use-cases/pdf/IPdfRequestDTO.js";
import type { IPdfUseCase } from "#application/ports/use-cases/pdf/IPdfUseCase.js";
import type { Readable } from "stream";
export declare class GeneratePatientAppointmentPDFUseCase implements IPdfUseCase {
    private readonly _logger;
    private readonly _patientRepo;
    private readonly _doctorRepo;
    private readonly _consultationRepo;
    private readonly _appointmentRepo;
    private readonly _templateRenderer;
    private readonly _pdfGenerator;
    constructor(_logger: ILogger, _patientRepo: IPatientRepository, _doctorRepo: IDoctorRepository, _consultationRepo: IConsultationRepository, _appointmentRepo: IAppointmentRepository, _templateRenderer: ITemplateRenderer, _pdfGenerator: IPDFGeneratorService);
    execute(request: IPdfRequestDTO): Promise<Readable>;
}
//# sourceMappingURL=GeneratePatientAppointmentPDFUseCase.d.ts.map