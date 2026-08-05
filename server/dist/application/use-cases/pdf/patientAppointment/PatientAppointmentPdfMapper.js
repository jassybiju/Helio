export class PatientAppointmentPdfMapper {
    static toView(appointment, patient, doctor, consultation) {
        return {
            patient: {
                id: patient.id,
                name: patient.fullName,
                age: patient.age,
                gender: patient.gender,
            },
            doctor: {
                id: doctor.id,
                name: doctor.fullName,
                specialty: doctor.specialization,
            },
            appointment: {
                id: appointment.id,
                date: this.formatDate(appointment.startTime),
                startTime: this.formatTime(appointment.startTime),
                endTime: this.formatTime(appointment.endTime),
                status: appointment.status,
                consultationType: appointment.consultationType,
                consultationFee: appointment.consultationFee,
                platformFee: appointment.platformFee,
                totalAmount: appointment.totalAmount,
                paymentStatus: appointment.paymentStatus,
            },
            consultation: consultation
                ? {
                    startedAt: consultation.startedAt
                        ? this.formatDateTime(consultation.startedAt)
                        : null,
                    endedAt: consultation.endedAt
                        ? this.formatDateTime(consultation.endedAt)
                        : null,
                    primaryDiagnosis: consultation.primaryDiagnosis,
                    clinicalObservation: consultation.clinicalObservation,
                    generalAdvice: consultation.generalAdvice,
                    quickNote: consultation.quickNote,
                    medicationPeriod: consultation.medicationPeriod,
                    prescriptions: consultation.prescriptions.map((p) => ({
                        name: p.name,
                        foodTiming: p.foodTiming,
                        timings: [
                            p.timings.morning && "Morning",
                            p.timings.afternoon && "Afternoon",
                            p.timings.night && "Night",
                        ]
                            .filter(Boolean)
                            .join(", "),
                        duration: `${p.durationInDays} days`,
                        instructions: p.instruction ?? undefined,
                    })),
                    vitals: consultation.vitals
                        ? {
                            height: consultation.vitals.height ?? undefined,
                            weight: consultation.vitals.weight ?? undefined,
                            temperature: consultation.vitals.temperature ?? undefined,
                            bloodPressure: consultation.vitals.bloodPressure ?? undefined,
                            pulseRate: consultation.vitals.heartRate ?? undefined,
                            spo2: consultation.vitals.oxygenLevel ?? undefined,
                        }
                        : null,
                }
                : null,
        };
    }
    static formatDate(date) {
        return new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
        }).format(date);
    }
    static formatTime(date) {
        return new Intl.DateTimeFormat("en-IN", {
            timeStyle: "short",
        }).format(date);
    }
    static formatDateTime(date) {
        return new Intl.DateTimeFormat("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
    }
}
//# sourceMappingURL=PatientAppointmentPdfMapper.js.map