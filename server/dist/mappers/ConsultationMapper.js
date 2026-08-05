import { Consultation } from "#domain/entities/Consultation.js";
import { Prescription } from "#domain/value-objects/Prescription.js";
import { Vital } from "#domain/value-objects/Vitals.js";
export class ConsultationMapper {
    static toDomain(raw) {
        const vitals = raw.vitals
            ? new Vital(raw.vitals.blood_pressure ?? null, raw.vitals.oxygen_level ?? null, raw.vitals.heart_rate ?? null, raw.vitals.temperature ?? null, raw.vitals.weight ?? null, raw.vitals.height ?? null)
            : null;
        const prescription = raw.prescriptions
            ? raw.prescriptions.map((prescription) => new Prescription(prescription.name, prescription.food_timing, {
                morning: prescription.timings?.morning ?? false,
                afternoon: prescription.timings?.afternoon ?? false,
                night: prescription.timings?.night ?? false,
            }, prescription.duration_in_days, prescription.instructions))
            : [];
        return new Consultation(raw._id, raw.appointment_id, raw.doctor_id, raw.patient_id, vitals, raw.primary_diagnosis ?? null, raw.clinical_observation ?? null, raw.general_advice ?? null, raw.quick_note ?? null, raw.consultation_type, prescription, raw.medication_period ?? null, raw.started_at, raw.ended_at ?? null, raw.created_at);
    }
    static toPersistance(consultation) {
        const vitals = consultation.vitals;
        const prescription = consultation.prescriptions;
        return {
            _id: consultation.id,
            appointment_id: consultation.appointmentId,
            patient_id: consultation.patientId,
            doctor_id: consultation.doctorId,
            consultation_type: consultation.consultationType,
            primary_diagnosis: consultation.primaryDiagnosis,
            general_advice: consultation.generalAdvice,
            clinical_observation: consultation.clinicalObservation,
            quick_note: consultation.quickNote,
            prescriptions: prescription.map((pres) => ({
                name: pres.name,
                food_timing: pres.foodTiming,
                duration_in_days: pres.durationInDays,
                instructions: pres.instruction ?? null,
                timings: pres.timings,
            })),
            started_at: consultation.startedAt,
            ended_at: consultation.endedAt,
            created_at: consultation.createdAt,
            medication_period: consultation.medicationPeriod,
            vitals: vitals
                ? {
                    blood_pressure: vitals?.bloodPressure,
                    oxygen_level: vitals?.oxygenLevel,
                    heart_rate: vitals?.heartRate,
                    temperature: vitals?.temperature,
                    weight: vitals?.weight,
                    height: vitals?.height,
                }
                : null,
            is_deleted: false,
            free_follow_up_used: false,
        };
    }
}
//# sourceMappingURL=ConsultationMapper.js.map