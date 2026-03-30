export interface IToggleBlockPatientUseCase {
  execute(userId: string): Promise<void>;
}
