import { MESSAGE } from "#shared/constants/messages.js";
import { ForbiddenError } from "#shared/errors/ForbiddenError.js";
import { NotFoundError } from "#shared/errors/NotFoundError.js";
export class DoctorViewConsultationUseCase {
    _logger;
    _doctorRepo;
    _patientRepo;
    _consultationRepo;
    _appointmentRepo;
    _labRepo;
    constructor(_logger, _doctorRepo, _patientRepo, _consultationRepo, _appointmentRepo, _labRepo) {
        this._logger = _logger;
        this._doctorRepo = _doctorRepo;
        this._patientRepo = _patientRepo;
        this._consultationRepo = _consultationRepo;
        this._appointmentRepo = _appointmentRepo;
        this._labRepo = _labRepo;
    }
    async execute(doctorId, appointmentId) {
        this._logger.info("Doctor view consultation attempt", {
            doctorId,
            appointmentId,
        });
        const doctor = await this._doctorRepo.findById(doctorId);
        if (!doctor) {
            throw new NotFoundError(MESSAGE.DOCTOR_NOT_FOUND);
        }
        const appointment = await this._appointmentRepo.findById(appointmentId);
        if (!appointment) {
            throw new NotFoundError(MESSAGE.APPOINTMENT_NOT_FOUND);
        }
        const consultation = await this._consultationRepo.findByAppointmentId(appointment.id);
        if (!consultation) {
            throw new NotFoundError(MESSAGE.CONSULTATION_NOT_FOUND);
        }
        if (doctor.id !== consultation.doctorId) {
            throw new ForbiddenError(MESSAGE.CONSULTATION_NOT_ACCESS);
        }
        const patient = await this._patientRepo.findById(consultation.patientId);
        if (!patient) {
            throw new NotFoundError(MESSAGE.PATIENT_NOT_FOUND);
        }
        // get consultations
        const prev_consultations = await this._consultationRepo.findLatestPatientConsultation(patient.id, consultation.id);
        // get lab reports
        const labReport = await this._labRepo.findByConsultationId(consultation.id);
        const previousVitals = prev_consultations?.vitals;
        const currentVitals = consultation.vitals;
        return {
            patient: {
                id: patient.id,
                name: patient.fullName,
                age: patient.age,
                allergens: patient.allergens.map((x) => x.name),
                condition: patient.conditions.map((x) => x.name),
                gender: patient.gender,
                blood_type: patient.bloodGroup,
                phone: patient.phone,
                email: patient.email,
            },
            appointment: {
                id: appointment.id,
                startTime: appointment.startTime,
                endTime: appointment.endTime,
            },
            previousVitals: {
                bloodPressure: previousVitals?.bloodPressure ?? null,
                oxygenLevel: previousVitals?.oxygenLevel ?? null,
                heartRate: previousVitals?.heartRate ?? null,
                temperature: previousVitals?.temperature ?? null,
                weight: previousVitals?.weight ?? null,
                height: previousVitals?.height ?? null,
            },
            currentVitals: {
                bloodPressure: currentVitals?.bloodPressure ?? null,
                oxygenLevel: currentVitals?.oxygenLevel ?? null,
                heartRate: currentVitals?.heartRate ?? null,
                temperature: currentVitals?.temperature ?? null,
                weight: currentVitals?.weight ?? null,
                height: currentVitals?.height ?? null,
            },
            primaryDiagnosis: consultation.primaryDiagnosis,
            clinicalObservation: consultation.clinicalObservation,
            generalAdvice: consultation.generalAdvice,
            quickNote: consultation.quickNote,
            consultationType: consultation.consultationType,
            prescriptions: consultation.prescriptions.map((pres) => ({
                name: pres.name,
                foodTiming: pres.foodTiming,
                timings: {
                    morning: pres.timings.morning,
                    afternoon: pres.timings.afternoon,
                    night: pres.timings.night,
                },
                durationInDays: pres.durationInDays,
                instructions: pres.instruction ?? null,
            })),
            labTest: labReport.map((lab) => ({
                id: lab.id,
                testName: lab.testName,
                instructions: lab.instructions,
            })),
            medicationPeriod: consultation.medicationPeriod,
        };
    }
}
//# sourceMappingURL=DoctorViewConsultationUseCase.js.map