import { AppError } from "#shared/errors/AppError.js";
import { MESSAGE } from "#shared/constants/messages.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
export class GetAppointmentUseCase {
    _logger;
    _patientRepo;
    _appointmentRepo;
    _consultationRepo;
    _doctorRepo;
    constructor(_logger, _patientRepo, _appointmentRepo, _consultationRepo, _doctorRepo) {
        this._logger = _logger;
        this._patientRepo = _patientRepo;
        this._appointmentRepo = _appointmentRepo;
        this._consultationRepo = _consultationRepo;
        this._doctorRepo = _doctorRepo;
    }
    async execute(patientId, appointmentId) {
        this._logger.info("Get Appotinemnt Attempt", { appointmentId, patientId });
        const patient = await this._patientRepo.findById(patientId);
        if (!patient) {
            throw new AppError(MESSAGE.PATIENT_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        const appointment = await this._appointmentRepo.findById(appointmentId);
        if (!appointment) {
            throw new AppError("Appointment Not Found", HTTPStatus.NOT_FOUND);
        }
        if (appointment.patientId !== patient.id) {
            throw new AppError("Appointment Not of this user", HTTPStatus.BAD_REQUEST);
        }
        const doctor = await this._doctorRepo.findById(appointment.doctorId);
        if (!doctor) {
            throw new AppError(MESSAGE.DOCTOR_NOT_FOUND, HTTPStatus.NOT_FOUND);
        }
        const consultation = await this._consultationRepo.findByAppointmentId(appointment.id);
        let consultationDTO = null;
        if (consultation) {
            consultationDTO = {
                primaryDiagnosis: consultation.primaryDiagnosis,
                clinicalObservation: consultation.clinicalObservation,
                generalAdvice: consultation.generalAdvice,
                quickNote: consultation.quickNote,
                prescriptions: consultation.prescriptions.map((pres) => ({
                    name: pres.name,
                    timings: pres.timings,
                    durationInDays: pres.durationInDays,
                    foodTiming: pres.foodTiming,
                    instruction: pres.instruction,
                })),
                vitals: {
                    bloodPressure: consultation.vitals?.bloodPressure,
                    oxygenLevel: consultation.vitals?.oxygenLevel,
                    heartRate: consultation.vitals?.heartRate,
                    temperature: consultation.vitals?.temperature,
                    weight: consultation.vitals?.weight,
                    height: consultation.vitals?.height,
                },
            };
        }
        return {
            appointmentId: appointment.id,
            doctor: {
                id: doctor.id,
                name: doctor.fullName,
                specialization: doctor.specialization,
                profilePicture: null,
            },
            appointment: {
                id: appointment.id,
                startTime: appointment.startTime,
                endTime: appointment.endTime,
                consultationType: appointment.consultationType,
                consultationFee: appointment.consultationFee,
                platformFee: appointment.platformFee,
                totalAmount: appointment.totalAmount,
                status: appointment.status,
            },
            payment: {
                paymentStatus: appointment.paymentStatus,
                paymentId: appointment.paymentId,
            },
            consultation: consultationDTO,
            cancellationReason: appointment.cancellationReason,
            createdAt: appointment.createdAt,
        };
    }
}
//# sourceMappingURL=GetAppointmentUseCase.js.map