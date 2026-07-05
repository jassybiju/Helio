export interface ICreateAdminUseCase {
  execute(email: string, password: string): Promise<void>;
}
