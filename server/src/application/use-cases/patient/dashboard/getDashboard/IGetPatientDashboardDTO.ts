export interface IGetPatientDashboardDTO {
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
      validTill: Date;
      instructions: string;
    };
    fromAppointemnts: string;
  }[];
  nextAppointment: {
    doctorName: string;
    specialty: string;
    date: Date;
    appointmentId: string;
  } | null;
}
