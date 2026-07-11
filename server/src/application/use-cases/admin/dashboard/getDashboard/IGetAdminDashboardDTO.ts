export interface IGetAdminDashboardDTO {
  statistics: {
    totalDoctors: number;
    totalPatients: number;
    totalAppointments: number;
    completedAppointments: number;
    upcomingAppointments: number;
    todayAppointments: number;
    totalRevenue: number;
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
