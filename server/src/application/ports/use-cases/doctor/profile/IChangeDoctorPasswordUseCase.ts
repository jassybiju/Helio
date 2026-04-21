export interface IChangeDoctorPasswordUseCase {
  execute(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void>;
}
