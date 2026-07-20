import type { IAppointmentRepository } from "@application/ports/repositories/IAppointmentRepository.ts";
import type { IDoctorRepository } from "@application/ports/repositories/IDoctorRepository.ts";
import type { IPatientRepository } from "@application/ports/repositories/IPatientRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IPDFGeneratorService } from "@application/ports/services/IPDFGeneratorService.ts";
import type { ITemplateRenderer } from "@application/ports/services/ITemplateRenderer.ts";
import type { IPdfRequestDTO } from "@application/ports/use-cases/pdf/IPdfRequestDTO.ts";
import type { IPdfUseCase } from "@application/ports/use-cases/pdf/IPdfUseCase.ts";
import { MESSAGE } from "@shared/constants/messages.ts";
import { ForbiddenError } from "@shared/errors/ForbiddenError.ts";
import { NotFoundError } from "@shared/errors/NotFoundError.ts";
import type { Readable } from "node:stream";
import { PatientAppointmentPdfMapper } from "./PatientInvoicePDFMapper.ts";
import { PDF_TYPE } from "@shared/types/pdf.type.ts";

export class GeneratePatientInvoicePDFUseCase implements IPdfUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _patientRepo: IPatientRepository,
    private readonly _appointmentRepo: IAppointmentRepository,
    private readonly _doctorRepo: IDoctorRepository,
    private readonly _templateRenderer: ITemplateRenderer,
    private readonly _pdfGenerator: IPDFGeneratorService
  ) {}
  async execute(request: IPdfRequestDTO): Promise<Readable> {
    this._logger.info("Get Appotinemnt PDF Attempt", { request });

    if (!request.resource_id) {
      throw new Error("RESOURCE ID REQUIRED");
    }
    const appointment = await this._appointmentRepo.findById(
      request.resource_id
    );

    if (!appointment) {
      throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
    }

    if (appointment.patientId !== request.currentUser.id) {
      throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
    }

    const [patient, doctor] = await Promise.all([
      this._patientRepo.findById(appointment.patientId),
      this._doctorRepo.findById(appointment.doctorId),
    ]);

    if (!patient) {
      throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
    }

    if (!doctor) {
      throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
    }

    const view = PatientAppointmentPdfMapper.toView(
      appointment,
      patient,
      doctor
    );

    const html = await this._templateRenderer.render(
      PDF_TYPE.PATIENT_INVOICE,
      view
    );

    return this._pdfGenerator.generate(html);
  }
}
