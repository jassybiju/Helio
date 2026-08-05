import { z } from "zod";
import {
  DAY_OF_WEEK,
  CONSULTATION_TYPE,
} from "#domain/common/enums/doctorShift.enum.js";

// HH:mm format validator
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const setDoctorScheduleSchema = z
  .object({
    dayOfWeek: z.array(z.enum(DAY_OF_WEEK)),

    startTime: z.string().regex(timeRegex, "Invalid time format (HH:mm)"),
    endTime: z.string().regex(timeRegex, "Invalid time format (HH:mm)"),

    consultationType: z.enum(CONSULTATION_TYPE),

    location: z.string().optional(),

    slotIntervalInMinutes: z
      .number()
      .int()
      .min(5, "Minimum 5 minutes")
      .max(120, "Maximum 2 hours"),

    capacityPerSlot: z
      .number()
      .int()
      .min(1, "At least 1 patient per slot")
      .max(10, "Too many patients per slot"),
  })
  .refine(
    (data) => {
      return data.endTime > data.startTime;
    },
    {
      message: "endTime must be greater than startTime",
      path: ["endTime"],
    }
  )
  .refine(
    (data) => {
      if (data.consultationType === CONSULTATION_TYPE.CLINIC) {
        return !!data.location;
      }
      return true;
    },
    {
      message: "Location is required for clinic consultation",
      path: ["location"],
    }
  );
