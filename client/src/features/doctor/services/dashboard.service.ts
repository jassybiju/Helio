import { apiRequest } from "@/src/libs/axios.config"
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"

export const doctorDashboardService = {
    getDashboard : async()=>{
        return apiRequest(API_ENDPOINT.DOCTOR.DASHBOARD.BASE, HTTP_METHOD.GET, null, {period : 'WEEK'}) as Promise<APIResponse<IGetDoctorDashboardDTO>>
    }
}



export interface IGetDoctorDashboardDTO {
  summary: {
    todayAppointments: number;
    todaysCompletedAppointments: number;
    upcomingAppointments: number;
    totalAppointmentsCompleted: number;
    walletBalance: number;
  };
  bookingTrend: {
    period: "7d" | "30d" | "month" | "year";
    labels: string[];
    values: number[];
  };
  transactions: {
    id: string;
    date: string;
    type: string;
    descriptions: string;
  }[];
}
