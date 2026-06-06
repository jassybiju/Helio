export interface IGetPatientLiveQueueUseCase {
  execute(
    appointmentId: string,
    patientId: string
  ): Promise<
    | {
        queueNumber: number;
        queueNumberOfOngoingAppointment: number;
        timeLeftSeconds: string;
      }
    | string
  >;
}
