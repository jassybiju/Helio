export interface IRemoveLabReportUseCase {
  execute(
    doctorId: string,
    appointmentId: string,
    labId: string
  ): Promise<void>;
}
