import type { CONSULTATION_TYPE, DAY_OF_WEEK } from "#domain/common/enums/doctorShift.enum.js";
export type IGetDoctorScheduleDTO = {
    id: string;
    doctorId: string;
    dayOfWeek: DAY_OF_WEEK;
    startTime: string;
    endTime: string;
    consultationType: CONSULTATION_TYPE;
    location: string | null;
    slotIntervalInMinutes: number;
    capacityPerSlot: number;
    createdAt: string;
};
//# sourceMappingURL=IGetDoctorScheduleDTO.d.ts.map