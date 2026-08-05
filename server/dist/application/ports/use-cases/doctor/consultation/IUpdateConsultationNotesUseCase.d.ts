export interface IUpdateConsultationNotesUseCase {
    execute(doctorId: string, appointmentId: string, data: {
        clinicalObservations: string;
        primaryDiagnosis: string;
        generalAdvice: string;
        quickNote: string;
        medicationDuration: number;
    }): Promise<void>;
}
//# sourceMappingURL=IUpdateConsultationNotesUseCase.d.ts.map