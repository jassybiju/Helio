export interface IDoctorViewHistoryDTO {
  history: (
    | {
        type: string;
        consultationId: string;
        date: Date;
        doctor: {
          id: string;
          name: string;
        };

        appointment: {
          date: Date;
          startTime: Date;
          endTime: Date;
          consultationType: string;
          status: string;
        };

        diagnosis: {
          primaryDiagnosis: string | null;
          clinicalObservation: string | null;
          generalAdvice: string | null;
          quickNote: string | null;
        };

        vitals: {
          bloodPressure?: string | null;
          heartRate?: number | null;
          temperature?: number | null;
          oxygenLevel?: number | null;
          height?: number | null;
          weight?: number | null;
        } | null;

        prescriptions: {
          name: string;
          foodTiming: number;
          timings: { morning: boolean; afternoon: boolean; night: boolean };
          durationInDays: number;
          instruction?: string | null;
        }[];

        followUp: {
          medicationPeriod: number | null;
          freeFollowUpValidUntil: string | null;
          freeFollowUpUsed: boolean;
        };

        timestamps: {
          startedAt: Date;
          endedAt: Date | null;
          createdAt: Date;
        };
      }
    | {
        type: string;
        id: string;
        date: Date;
        testName: string;
        instructions: string | null;
        status: string;
        requestedAt: Date;
        uploadedAt: Date | null;
        documentKey: string | null;
      }
  )[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
  };
}
