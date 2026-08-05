import { z } from "zod";
import { DAY_OF_WEEK, CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
export declare const setDoctorScheduleSchema: z.ZodObject<{
    dayOfWeek: z.ZodArray<z.ZodEnum<typeof DAY_OF_WEEK>>;
    startTime: z.ZodString;
    endTime: z.ZodString;
    consultationType: z.ZodEnum<typeof CONSULTATION_TYPE>;
    location: z.ZodOptional<z.ZodString>;
    slotIntervalInMinutes: z.ZodNumber;
    capacityPerSlot: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=schedule.schema.d.ts.map