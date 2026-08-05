import type { IAppointmentRepository } from "#application/ports/repositories/IAppointmentRepository.js";
import type { IDoctorRepository } from "#application/ports/repositories/IDoctorRepository.js";
import type { IPatientRepository } from "#application/ports/repositories/IPatientRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IPDFGeneratorService } from "#application/ports/services/IPDFGeneratorService.js";
import type { ITemplateRenderer } from "#application/ports/services/ITemplateRenderer.js";
import type { IPdfRequestDTO } from "#application/ports/use-cases/pdf/IPdfRequestDTO.js";
import type { IPdfUseCase } from "#application/ports/use-cases/pdf/IPdfUseCase.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import type { Readable } from "node:stream";
import { PatientAppointmentPdfMapper } from "./PatientInvoicePDFMapper.js";
import { PDF_TYPE } from "#shared/types/pdf.type.js";

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
