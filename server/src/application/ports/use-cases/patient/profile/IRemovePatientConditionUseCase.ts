export interface IRemovePatientConditionUseCase {
  execute(patientId: string, conditionId: string): Promise<void>;
}
