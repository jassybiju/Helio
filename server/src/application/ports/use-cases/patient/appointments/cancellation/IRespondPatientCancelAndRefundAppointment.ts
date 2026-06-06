export interface IRespondPatientCancelAndRefundAppointment {
  execute(patientId: string, appointmentId: string): Promise<void>;
}
