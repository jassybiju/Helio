export interface IPatientCancellationUseCase {
  execute(patientId: string, appointmentId: string): Promise<void>;
}
