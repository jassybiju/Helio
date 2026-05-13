import type { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";

export interface IDoctorViewAllAppointmentDTO {
  id: string;
  patientName: string;
  type: CONSULTATION_TYPE;
  status: APPOINTMENT_STATUS;
  time: Date;
}
