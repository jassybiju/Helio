export interface IAddLabReportUseCase {
  execute(
    doctorId: string,
    appointmentId: string,
    input: {
      testName: string;
      instructions: string;
    }
  ): Promise<void>;
}
