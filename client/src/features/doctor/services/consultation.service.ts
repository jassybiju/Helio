import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
export type ConsultationHistoryDetail = {
  type: string;

    data: {
      consultationId: string;

      doctor: {
        id: string;
        name: string;
      };

      appointment: {
        date: string;
        startTime: string;
        endTime: string;
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
        pulse?: number | null;
        temperature?: number | null;
        spo2?: number | null;
        height?: number | null;
        weight?: number | null;
      } | null;

      prescriptions: {
        name: string;
        dosage: string;
        frequency: string;
        durationInDays: number;
        instruction?: string | null;
      }[];

      followUp: {
        medicationPeriod: number | null;
        freeFollowUpValidUntil: string | null;
        freeFollowUpUsed: boolean;
      };

      timestamps: {
        startedAt: string;
        endedAt: string | null;
        createdAt: string;
      };
    };
};

export type LabHistoryDetail = {
  type: string;

  data: {
    labReportId: string;
    testName: string;
    instructions: string | null;
    status: string;
    remarks: string | null;
    requestedAt: string;
    uploadedAt: string | null;
    documentKey: string | null;
  };
};

export interface IDOCTOR_VIEW_CONSULTATION {
  patient: {
    id: string;
    name: string;
    age: number | null;
    gender: string | null;
    blood_type: string | null;
    phone: string | null;
    email: string;
    condition: string[];
    allergens: string[];
  };
  previousVitals: {
    bloodPressure: string | null;
    oxygenLevel: number | null;
    heartRate: number | null;
    temperature: number | null;
    weight: number | null;
    height: number | null;
  };
  currentVitals: {
    bloodPressure: string | null;
    oxygenLevel: number | null;
    heartRate: number | null;
    temperature: number | null;
    weight: number | null;
    height: number | null;
  };
  primaryDiagnosis: string | null;
  clinicalObservation: string | null;
  generalAdvice: string | null;
  quickNote: string | null;
  consultationType: string | null;
  prescriptions: {
    name: string;
    foodTiming: 0 | 1;
    timings: { morning: boolean; afternoon: boolean; night: boolean };
    durationInDays: number;
    instruction: string | null;
  }[];

  medicationPeriod: number | null;
}

export const doctorConsultationService = {
  viewConsultation: (id: string) => {
    return apiRequest("/doctor/consultation/" + id, HTTP_METHOD.GET) as Promise<
      APIResponse<IDOCTOR_VIEW_CONSULTATION>
    >;
  },
  endConsultation: (id: string) => {
    return apiRequest(`/doctor/consultation/${id}/end`, HTTP_METHOD.PATCH);
  },
  updateVitals: (
    id: string,
    data: {
      bloodPressure: string | null;
      oxygenLevel: number | null;
      temperature: number | null;
      weight: number | null;
      height: number | null;
      heartRate: number | null;
    },
  ) => {
    return apiRequest(
      `/doctor/consultation/${id}/vitals`,
      HTTP_METHOD.PATCH,
      data,
    );
  },
  updateNotes: (
    id: string,
    data: {
      clinicalObservations: string | null;
      quickNote: string | null;
      medicationDuration: number | null;
      generalAdvice: string | null;
      primaryDiagnosis: string | null;
    },
  ) => {
    return apiRequest(
      `/doctor/consultation/${id}/notes`,
      HTTP_METHOD.PATCH,
      data,
    );
  },
  addPrescription: (
    id: string,
    data: {
      name: string;
      foodTiming: 0 | 1;
      timings: { morning: boolean; afternoon: boolean; night: boolean };
      durationInDays: number;
      instruction: string | null;
    },
  ) => {
    return apiRequest(
      `/doctor/consultation/${id}/prescription`,
      HTTP_METHOD.POST,
      data,
    );
  },
  removePrescription: (id: string, name: string) => {
    return apiRequest(
      `/doctor/consultation/${id}/prescription/${name}`,
      HTTP_METHOD.DELETE,
    );
  },
  addTest(id: string, data: { testName: string; instructions: string }) {
    return apiRequest(
      `/doctor/consultation/${id}/test`,
      HTTP_METHOD.POST,
      data,
    );
  },
  removeTest(id: string, testId: string) {
    return apiRequest(
      `/doctor/consultation/${id}/test/${testId}`,
      HTTP_METHOD.DELETE,
    );
  },
  viewHistory(id: string) {
    return apiRequest(
      `/doctor/consultation/${id}/history`,
      HTTP_METHOD.GET,
    ) as Promise<
      APIResponse<{
        consultation: ConsultationHistoryDetail['data'][];
        labReport: LabHistoryDetail['data'][];
      }>
    >;
  },
};
