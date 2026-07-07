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
