import type { APPOINTMENT_STATUS } from "@domain/common/enums/appointment.enum.ts";
import type { CONSULTATION_TYPE } from "@domain/common/enums/doctorShift.enum.ts";

export type ITodayAppointmentCardDTO = {
  id: string;
  patient: {
    id: string;
    name: string;
    profilePicture?: string | null;
    age?: number | null;
    gender?: string | null;
  };
  queue: number;
  type: CONSULTATION_TYPE;
  status: APPOINTMENT_STATUS;
  time: Date;
};

export interface IDoctorViewTodaysAppointmentDTO {
  stats: {
    total: number;
    completed: number;
    upcoming: number;
    skipped: number;
  };
  ongoing: ITodayAppointmentCardDTO[];
  skipped: ITodayAppointmentCardDTO[];
  next: ITodayAppointmentCardDTO;
}
