export interface ISkipDoctorAppointmentUseCase {
  execute(doctorId: string, appointmentId: string): Promise<void>;
}
