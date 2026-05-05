export interface IRemoveSpecialtyUseCase {
  execute(id: string): Promise<void>;
}
