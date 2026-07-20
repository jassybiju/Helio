import { apiRequest } from "@/src/libs/axios.config"
import { API_ENDPOINT } from "@/src/types/api-endpoints.constants"
import { APIResponse, HTTP_METHOD } from "@/src/types/API.types"

export const adminDashboardService = {
    getDashboard : async(period : string)=>{
        return apiRequest(API_ENDPOINT.ADMIN.DASHBOARD.BASE, HTTP_METHOD.GET, null, {period }) as Promise<APIResponse<IGetAdminDashboardDTO>>
    }
}


export interface IGetAdminDashboardDTO {
      statistics: {
    totalDoctors: number;
    totalPatients: number;
    totalAppointments: number;
    completedAppointments: number;
    upcomingAppointments: number;
    todayAppointments: number;
    totalRevenue: number;
    pendingDoctorApprovals: number;
  };

  appointmentAnalytics: {
    labels: string[];
    appointments: number[];
  };

  revenueAnalytics: {
    labels: string[];
    platformRevenue: number[];
    consultationRevenue: number[];
  };

  appointmentStatusDistribution: {
    confirmed: number;
    ongoing: number;
    completed: number;
    cancelled: number;
    noShow: number;
    expired: number;
  };
  userGrowth: {
    labels: string[];
    doctors: number[];
    patients: number[];
  };
}