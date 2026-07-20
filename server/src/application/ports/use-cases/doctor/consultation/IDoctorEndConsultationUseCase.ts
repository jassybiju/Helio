export interface IDoctorEndConsultationUseCase {
  execute(doctorId: string, consultationId: string): Promise<void>;
}
