import type { APPOINTMENT_STATUS } from "#domain/common/enums/appointment.enum.js";
import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";

export interface IGetAppointmentDTO {
  appointmentId: string;

  doctor: {
    id: string;
    name: string;
    specialization?: string | null;
    profilePicture?: string | null;
  };

  appointment: {
    id: string;
    startTime: Date;
    endTime: Date;

    consultationType: CONSULTATION_TYPE;

    consultationFee: number;
    platformFee: number;
    totalAmount: number;

    status: APPOINTMENT_STATUS;
  };

  payment: {
    paymentStatus: string;
    paymentId: string | null;
  };
  consultation: {
    primaryDiagnosis: string | null;
    clinicalObservation: string | null;
    generalAdvice: string | null;
    quickNote: string | null;
    prescriptions: {
      name: string;
      timings: {
        morning: boolean;
        afternoon: boolean;
        night: boolean;
      };
      durationInDays: number;
      foodTiming: number;
      instruction: string | null | undefined;
    }[];
    vitals: {
      bloodPressure: string | null | undefined;
      oxygenLevel: number | null | undefined;
      heartRate: number | null | undefined;
      temperature: number | null | undefined;
      weight: number | null | undefined;
      height: number | null | undefined;
    };
  } | null;

  cancellationReason: string | null;

  createdAt: Date;
}
