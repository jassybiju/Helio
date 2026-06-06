export interface IUpdateVitalsConsultationUseCase {
  execute(
    doctorId: string,
    consultationId: string,
    data: {
      bloodPressure: string | null;
      oxygenLevel: number | null;
      heartRate: number | null;
      temperature: number | null;
      weight: number | null;
      height: number | null;
    }
  ): Promise<void>;
}
