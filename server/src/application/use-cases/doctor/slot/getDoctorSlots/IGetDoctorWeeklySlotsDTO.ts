export interface IGetDoctorWeeklySlotsDTO {
  id: string;
  shiftId: string;
  doctorId: string;
  appointmentId: string | null;

  startTime: string;
  endTime: string;

  consultationType: string;
  status: string;

  createdAt: string;
}

export type IGroupedSlots = {
  shiftId: string;
  startTime: Date;
  endTime: Date;
  slots: Array<{ appointmentId: string | null; id: string; status: string }>;
};

export type IWeeklySlotsResponseDTO = Record<
  string,
  {
    shiftId: string;
    startTime: string;
    endTime: string;

    slots: Array<{
      id: string;
      appointmentId: string | null;
      status: string;
    }>;
  }[]
>;
