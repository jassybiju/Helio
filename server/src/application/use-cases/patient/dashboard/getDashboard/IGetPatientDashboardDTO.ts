export interface IGetPatientDashboardDTO {
  stats: {
    totalAppointments: number;
    completedAppointments: number;
    upcomingAppointments: number;
    cancelledAppointments: number;
  };
  vitals: {
    heartRate: string | null;
    bloodPressure: string | null;
    oxygenLevel: string | null;
    temperature: string | null;
    weight: string | null;
    height: string | null;
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
      validTill: Date | null;
      instructions: string | null;
    }[];
    fromAppointemnts: string;
  }[];
  nextAppointment: {
    doctorName: string;
    specialty: string;
    date: Date;
    appointmentId: string;
  } | null;
}
