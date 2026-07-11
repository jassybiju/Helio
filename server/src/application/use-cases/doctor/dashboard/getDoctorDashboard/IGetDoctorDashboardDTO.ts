import type { BOOKING_PERIOD } from "@domain/common/enums/appointment.enum.ts";

export interface IGetDoctorDashboardDTO {
  summary: {
    todayAppointments: number;
    todaysCompletedAppointments: number;
    upcomingAppointments: number;
    totalAppointmentsCompleted: number;
    walletBalance: number;
  };
  bookingTrend: {
    period: BOOKING_PERIOD;
    labels: string[];
    values: number[];
  };
  transactions: {
    id: string;
    date: string;
    type: string;
    description: string;
  }[];
}
