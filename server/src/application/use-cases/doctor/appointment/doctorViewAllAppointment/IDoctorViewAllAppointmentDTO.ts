import type { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";

export interface IDoctorViewAllAppointmentDTO {
  id: string;
  patientName: string;
  queueNumber: number;
  type: CONSULTATION_TYPE;
  status: APPOINTMENT_STATUS;
  time: Date;
}
