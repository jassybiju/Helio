export interface IAddPatientConditionUseCase {
  execute(patientId: string, condition: string): Promise<void>;
}
