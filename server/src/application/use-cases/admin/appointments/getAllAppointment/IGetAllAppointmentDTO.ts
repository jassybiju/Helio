import type {
  APPOINTMENT_STATUS,
  PAYMENT_STATUS,
} from "#domain/common/enums/appointment.enum.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";

export type IGetAllAppointmentInput = {
  search?: string | undefined;
  status?: APPOINTMENT_STATUS | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

export type IGetAllAppointmentDTO = {
  appointments: {
    id: string;
    patientName: string;
    doctorName: string;
    specialty: string;
    type: CONSULTATION_TYPE;
    status: APPOINTMENT_STATUS;
    paymentStatus: PAYMENT_STATUS;
  }[];
  totalCount: number;
  page: number;
  limit: number;
};
