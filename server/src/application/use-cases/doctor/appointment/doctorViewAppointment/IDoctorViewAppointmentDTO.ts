export interface IDoctorViewAppointmentDTO {
  id: string;

  patientId: string;
  patientName: string;

  startTime: string;
  endTime: string;

  consultationType: string;

  consultationFee: number;
  platformFee: number;
  totalAmount: number;

  status: string;
  paymentStatus: string;

  cancellationReason: string | null;

  paymentId: string | null;

  createdAt: string;
  chatSessionId: string | null;

  consultation: {
    id: string;

    vitals: {
      bloodPressure: string | null;
      oxygenLevel: number | null;
      heartRate: number | null;
      temperature: number | null;
      weight: number | null;
      height: number | null;
    } | null;

    notes: {
      primaryDiagnosis: string | null;
      clinicalObservation: string | null;
      generalAdvice: string | null;
      quickNote: string | null;
    };

    prescriptions: {
      name: string;
      foodTiming: number;

      timings: {
        morning: boolean;
        afternoon: boolean;
        night: boolean;
      };

      durationInDays: number;

      instruction: string | null;
    }[];
    medicationPeriod: number | null;
    startedAt: Date;
    endedAt: Date | null;
  } | null;
}
