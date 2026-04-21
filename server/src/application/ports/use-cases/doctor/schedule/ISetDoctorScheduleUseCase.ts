import type {
  CONSULTATION_TYPE,
  DAY_OF_WEEK,
} from "@domain/common/enums/doctorShift.enum.ts";

export type IDoctorScheduleInput = {
  dayOfWeek: DAY_OF_WEEK;
  startTime: string;
  endTime: string;
  consultationType: CONSULTATION_TYPE;
  location?: string;
  slotIntervalInMinutes: number;
  capacityPerSlot: number;
};

export interface ISetDoctorScheduleUseCase {
  execute(doctorId: string, input: IDoctorScheduleInput): Promise<void>;
}
