export interface IToggleBlockDoctorUseCase {
  execute(userId: string): Promise<void>;
}
