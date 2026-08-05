import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
import { PatientAppointmentPdfMapper } from "./PatientAppointmentPdfMapper.js";
import { PDF_TYPE } from "#shared/types/pdf.type.js";
export class GeneratePatientAppointmentPDFUseCase {
    _logger;
    _patientRepo;
    _doctorRepo;
    _consultationRepo;
    _appointmentRepo;
    _templateRenderer;
    _pdfGenerator;
    constructor(_logger, _patientRepo, _doctorRepo, _consultationRepo, _appointmentRepo, _templateRenderer, _pdfGenerator) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._doctorRepo = _doctorRepo;
        this._consultationRepo = _consultationRepo;
        this._appointmentRepo = _appointmentRepo;
        this._templateRenderer = _templateRenderer;
        this._pdfGenerator = _pdfGenerator;
    }
    async execute(request) {
        this._logger.info("Generate Patient Appointment DTO", { request });
        if (!request.resource_id) {
            throw new Error("RESOURCE ID REQUIRED");
        }
        const appointment = await this._appointmentRepo.findById(request.resource_id);
        if (!appointment) {
            throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
        }
        if (appointment.patientId !== request.currentUser.id) {
            throw new ForbiddenError(MESSAGE.APPOINTMENT_NOT_ACCESS);
        }
        const [patient, doctor, consultation] = await Promise.all([
            this._patientRepo.findById(appointment.patientId),
            this._doctorRepo.findById(appointment.doctorId),
            this._consultationRepo.findByAppointmentId(appointment.id),
        ]);
        if (!patient) {
            throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
        }
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const view = PatientAppointmentPdfMapper.toView(appointment, patient, doctor, consultation);
        const html = await this._templateRenderer.render(PDF_TYPE.PATIENT_APPOINTMENT, view);
        return this._pdfGenerator.generate(html);
    }
}
//# sourceMappingURL=GeneratePatientAppointmentPDFUseCase.js.map