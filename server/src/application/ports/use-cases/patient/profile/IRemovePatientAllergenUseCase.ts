export interface IRemovePatientAllergenUseCase {
  execute(patientId: string, allergenId: string): Promise<void>;
}
