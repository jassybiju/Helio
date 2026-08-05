import type {
  APPOINTMENT_STATUS,
  PAYMENT_STATUS,
} from "#domain/common/enums/appointment.enum.js";
import type { FOOD_TIMING } from "#domain/common/enums/consultation.enum.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";

export interface IPatientAppointmentPdfView {
  patient: {
    id: string;
    name: string;
    age: number | null;
    gender: string | null;
  };

  doctor: {
    id: string;
    name: string;
    specialty: string;
  };

  appointment: {
    id: string;
    date: string;
    startTime: string;
    endTime: string;

    status: APPOINTMENT_STATUS;

    consultationType: CONSULTATION_TYPE;

    consultationFee: number;
    platformFee: number;
    totalAmount: number;

    paymentStatus: PAYMENT_STATUS;
  };

  consultation?: {
    startedAt: string | null;
    endedAt: string | null;

    primaryDiagnosis: string | null;
    clinicalObservation: string | null;
    generalAdvice: string | null;
    quickNote: string | null;

    medicationPeriod: number | null;

    prescriptions: {
      name: string;
      foodTiming: FOOD_TIMING;
      timings: string;
      duration: string;
      instructions?: string | undefined;
    }[];

    vitals: {
      height?: number | undefined;
      weight?: number | undefined;
      temperature?: number | undefined;
      bloodPressure?: string | undefined;
      pulseRate?: number | undefined;
      spo2?: number | undefined;
    } | null;
  } | null;
}
