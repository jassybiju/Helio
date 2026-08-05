export interface IDoctorStartConsultationUseCase {
    execute(doctorId: string, appointmentId: string): Promise<{
        consultationId: string;
    }>;
}
//# sourceMappingURL=IDoctorStartConsultationUseCase.d.ts.map