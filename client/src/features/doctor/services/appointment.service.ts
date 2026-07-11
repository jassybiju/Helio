import { apiRequest } from "@/src/libs/axios.config";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import {
  APPOINTMENT_STATUS,
  CONSULTATION_TYPE,
} from "@/src/types/appointment.types";

export const doctorAppointmentService = {
  getAppointments: ({
    search,
    date,
    status,
    type,
    page,
    limit,
  }: {
    search?: string;
    date?: string;
    status?: APPOINTMENT_STATUS;
    type?: CONSULTATION_TYPE;
    page: number;
    limit: number;
  }) => {
    return apiRequest("/doctor/appointment", HTTP_METHOD.GET, null, {
      search,
      date,
      status,
      type,
      limit,
      page,
    }) as Promise<
      APIResponse<{
        data: APPOINTMENT_LIST[];
        pagination: { totalCount: number; page: number; limit: number };
      }>
    >;
  },
  getAppointment(id: string) {
    return apiRequest("/doctor/appointment/" + id, HTTP_METHOD.GET) as Promise<
      APIResponse<IDoctorViewAppointment>
    >;
  },
  startConsultation: (appointmentId: string) => {
    console.log(appointmentId);
    return apiRequest(
      `doctor/appointment/${appointmentId}/start`,
      HTTP_METHOD.POST,
    );
  },
  getTodayAppointment: () => {
    return apiRequest(`doctor/appointment/today`, HTTP_METHOD.GET) as Promise<
      APIResponse<IDoctorTodayAppointment>
    >;
  },
  skipConsultation : (appointmentId : string)=>{
    return apiRequest(`doctor/appointment/${appointmentId}/skip`, HTTP_METHOD.PATCH)
  }
};


export type APPOINTMENT_LIST = {
  id: string;
  patientName: string;
  time: Date;
  type: string;
  status: APPOINTMENT_STATUS;
  paymentStatus: string;
};

export interface IDoctorViewAppointment {
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

    startedAt: Date;
    endedAt: Date | null;
  } | null;
}

export type ITodayAppointmentCardDTO = {
  id: string;
  patient: {
    id: string;
    name: string;
    profilePicture?: string | null;
    age?: number | null;
    gender?: string | null;
  };
  queue : number;
  type: CONSULTATION_TYPE;
  status: APPOINTMENT_STATUS;
  time: Date;
};

export interface IDoctorTodayAppointment {
  stats: {
    total: number;
    completed: number;
    upcoming: number;
    skipped: number;
  };
  ongoing: ITodayAppointmentCardDTO[];
  skipped: ITodayAppointmentCardDTO[];
  upcoming : ITodayAppointmentCardDTO | undefined
}
