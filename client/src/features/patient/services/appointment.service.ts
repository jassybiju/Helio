import { apiRequest } from "@/src/libs/axios.config";
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants";
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types";
import {
  APPOINTMENT_STATUS,
  CONSULTATION_TYPE,
} from "@/src/types/appointment.types";

export interface IGetAllPatientAppointments {
  appointments: {
    id: string;

    doctor: {
      id: string;
      name: string;
      specialization: string;
      profilePicture: string | null;
    };

    appointment: {
      startTime: string;
      endTime: string;

      consultationType: string;

      status: string;
      paymentStatus: string;

      totalAmount: number;
    };

    consultation: {
      exists: boolean;
      completed: boolean;
    };

    hasLabReports: boolean;
  }[];
  cancelledAppointments: string[];
  totalCount: number;
  page: number;
  limit: number;
}

export interface IGetPatientAppointment {
  appointmentId: string;
  chatSessionId : string;
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
  consultation: {
    primaryDiagnosis: string | null;
    generalAdvice: string | null;
    quickNote: string | null;
    clinicalObservation: string | null;
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
  };

  payment: {
    paymentStatus: string;
    paymentId: string | null;
  };

  cancellationReason: string | null;

  createdAt: Date;
}

export interface IGetPatientLabReports {
  requested: {
    id: string;
    testName: string;
    instructions: string | null;
    requestedAt: Date;
    status: string;
    appointmentId: string;
  }[];

  uploaded: {
    reports: {
      id: string;
      testName: string;
      appointmentId: string;
      instructions: string | null;
      documentKey: string | null;
      remarks: string | null;
      requestedAt: Date;
      uploadedAt: Date | null;
      status: string;
    }[];
    totalCount: number;
    page: number;
    limit: number;
  };
}

export const appointmentService = {
  getCheckout: (id: string) => {
    return apiRequest("patient/appointment/" + id, HTTP_METHOD.GET) as Promise<
      APIResponse<{
        appointmentId: string;

        doctor: {
          id: string;
          name: string;
          specialization?: string | null;
          profilePicture?: string | null;
        };

        appointment: {
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

        cancellationReason: string | null;

        createdAt: Date;
      }>
    >;
  },

  postCheckout: (id: string, type: string) => {
    return apiRequest(
      API_ENDPOINT.PATIENT.APPOINTMENT.ID.CHECKOUT(id),
      HTTP_METHOD.POST,
      { type },
    );
  },
  verifyPayment(
    id: string,
    data: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    },
  ) {
    return apiRequest(
      API_ENDPOINT.PATIENT.APPOINTMENT.ID.VERIFY(id),
      HTTP_METHOD.POST,
      data,
    );
  },
  getAppointments: (data: {
    page: number;
    limit: number;
    status?: APPOINTMENT_STATUS;
  }) => {
    return apiRequest(
      API_ENDPOINT.PATIENT.APPOINTMENT.BASE,
      HTTP_METHOD.GET,
      null,
      data,
    ) as Promise<APIResponse<IGetAllPatientAppointments>>;
  },
  getAppointment: (id: string) => {
    return apiRequest(
      API_ENDPOINT.PATIENT.APPOINTMENT.ID.BASE(id),
      HTTP_METHOD.GET,
      null,
    ) as Promise<APIResponse<IGetPatientAppointment>>;
  },
  getLabReport: (data: { page: number; limit: number }) => {
    return apiRequest(
      API_ENDPOINT.PATIENT.LAB.BASE,
      HTTP_METHOD.GET,
      null,
      data,
    ) as Promise<APIResponse<IGetPatientLabReports>>;
  },
  uploadLabReport: (reportId: string, data: File) => {
    const formData = new FormData();
    formData.append("document", data);
    return apiRequest(
      API_ENDPOINT.PATIENT.LAB.UPLOAD(reportId),
      HTTP_METHOD.PATCH,
      formData,
    );
  },

  getLiveQueue: (id: string) => {
    return apiRequest(
      `/patient/appointment/${id}/live-queue`,
      HTTP_METHOD.GET,
    ) as Promise<
      APIResponse<{
        queueNumber: number;
        queueNumberOfOngoingAppointment: number;
        timeLeftSeconds: string;
        expectedTurnTime: string;
      }>
    >;
  },

  getRescheduleSlots(appointmentId: string) {
    return apiRequest(
      `/patient/appointment/${appointmentId}/reschedule-slots`,
      HTTP_METHOD.GET,
    ) as Promise<
      APIResponse<{
        slots: Record<
          string,
          {
            clinic: {
              slots: { time: string; status: string }[];
              location: string;
            };
            online: { slots: { time: string; status: string }[] };
          }
        >;
        doctor: { id: string; name: string; specialty: string | null };
      }>
    >;
  },

  rescheduleAppointment(
    appointmentId: string,
    data: {
      startTime: string;
      consultationType: "ONLINE" | "CLINIC";
    },
  ) {
    return apiRequest(
      `/patient/appointment/${appointmentId}/reschedule-response`,
      HTTP_METHOD.POST,
      data,
    );
  },

  cancelAndRefundAppointment(appointmentId: string) {
    return apiRequest(
      `/patient/appointment/${appointmentId}/cancel-response`,
      HTTP_METHOD.POST,
    );
  },
  cancelAppointment(appointmentId: string) {
    return apiRequest(
      `/patient/appointment/${appointmentId}/cancel`,
      HTTP_METHOD.POST,
    );
  },
  reschedulePatientAppointment(
    appointmentId: string,
    data: {
      startTime: string;
      consultationType: "ONLINE" | "CLINIC";
    },
  ) {
    return apiRequest(
      `/patient/appointment/${appointmentId}/reschedule`,
      HTTP_METHOD.POST,
      data,
    );
  },
};
