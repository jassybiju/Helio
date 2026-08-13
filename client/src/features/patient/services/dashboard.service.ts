import { apiRequest } from "@/src/libs/axios.config"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"

export const patientDashboardService = {
    getDashboard : ()=>{
        return apiRequest('/patient/dashboard',HTTP_METHOD.GET) as Promise<APIResponse<GetPatientDashboardDTO>>
    }
}

export interface GetPatientDashboardDTO {
  stats: {
    totalAppointments: number;
    completedAppointments: number;
    upcomingAppointments: number;
    cancelledAppointments: number;
  };
  vitals: {
    heartRate: string;
    bloodPressure: string;
    oxygenLevel: string;
    temperature: string;
    weight: string;
    height: string;
    fromAppointmentId: string;
    date: Date;
  };
  medications: {
    doctorName: string;
    prescription: {
      name: string;
      foodTiming: number;
      timing: { morning: boolean; afternoon: boolean; night: boolean };
      durationInDays: number;
      validTill: number | null;
      instructions: string | null;
    }[];
    fromAppointemnts: string;
  }[];
  nextAppointment: {
    doctorName: string;
    specialty: string;
    date: string;
    appointmentId: string;
  } | null;
}
