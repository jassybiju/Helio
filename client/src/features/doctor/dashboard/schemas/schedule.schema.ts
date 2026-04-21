import z from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export enum DAY_OF_WEEK {
  "MON" = "MON",
  "TUE" = "TUE",
  WED = "WED",
  THUR = "THUR",
  FRI = "FRI",
  SAT = "SAT",
  SUN = "SUN",
}

export const setDoctorScheduleSchema = z
  .object({
    dayOfWeek: z.enum(DAY_OF_WEEK),

    startTime: z.string().regex(timeRegex, "Invalid time format (HH:mm)"),
    endTime: z.string().regex(timeRegex, "Invalid time format (HH:mm)"),

    consultationType: z.enum(["ONLINE", "CLINIC"]),

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
    },
  )
  .refine(
    (data) => {
      if (data.consultationType === "CLINIC") {
        return !!data.location;
      }
      return true;
    },
    {
      message: "Location is required for clinic consultation",
      path: ["location"],
    },
  );

export type SetDoctorScheduleFormData = z.infer<typeof setDoctorScheduleSchema>;
