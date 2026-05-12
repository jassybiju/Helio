import type { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";

export interface IGetAppointmentDTO {
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  start_time: Date;
  end_time: Date;
  consultationType: CONSULTATION_TYPE;
  consultationFee: number;
  platformFee: number;
  status: APPOINTMENT_STATUS;
  totalFee: number;
}
