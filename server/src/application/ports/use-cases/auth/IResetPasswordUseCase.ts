export interface IResetPasswordUseCase {
  execute({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }): Promise<void>;
}
