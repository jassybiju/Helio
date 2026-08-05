import { DAY_OF_WEEK } from "#domain/common/enums/doctorShift.enum.js";
import type { Time } from "#domain/value-objects/Time.js";

export function combineDateAndTime(date: Date, time: Time) {
  const istDate = new Date(date);

  istDate.setHours(time.hours, time.minutes, 0, 0);
  return new Date(istDate.getTime()); // convert to UTC safely
}

export const jsToEnumDay: Record<number, DAY_OF_WEEK> = {
  0: DAY_OF_WEEK.SUN,
  1: DAY_OF_WEEK.MON,
  2: DAY_OF_WEEK.TUE,
  3: DAY_OF_WEEK.WED,
  4: DAY_OF_WEEK.THU,
  5: DAY_OF_WEEK.FRI,
  6: DAY_OF_WEEK.SAT,
};

export const dayMap: Record<DAY_OF_WEEK, number> = {
  [DAY_OF_WEEK.SUN]: 0,
  [DAY_OF_WEEK.MON]: 1,
  [DAY_OF_WEEK.TUE]: 2,
  [DAY_OF_WEEK.WED]: 3,
  [DAY_OF_WEEK.THU]: 4,
  [DAY_OF_WEEK.FRI]: 5,
  [DAY_OF_WEEK.SAT]: 6,
};

/**
 * Generate the Date obj based on DAY_OF_WEEK
 * if today is tuesday and given day of monday it would return the date for next monday but if it given day of wednesday it would coming wednesday which is tommorow(respective of today which is tuesday)
 * @param dayOfWeek DAY_OF_WEEK
 * @returns Date in ist
 */
export function getNextDateForDay(dayOfWeek: DAY_OF_WEEK): Date {
  const now = new Date();

  // Convert current instant → IST components safely
  const istNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const todayDay = istNow.getDay();
  const targetDay = dayMap[dayOfWeek];

  let diff = targetDay - todayDay;
  if (diff < 0) diff += 7;

  istNow.setDate(istNow.getDate() + diff);

  // IMPORTANT: return as UTC instant representing IST wall clock
  return new Date(istNow.getTime());
}

export function getUTCRangeForISTDay(date: Date) {
  const istString = new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  const istDate = new Date(istString);

  const startIST = new Date(istDate);
  startIST.setHours(0, 0, 0, 0);

  const endIST = new Date(istDate);
  endIST.setHours(23, 59, 59, 999);

  return {
    startUTC: new Date(startIST.getTime()),
    endUTC: new Date(endIST.getTime()),
  };
}

/**
 * Converts IST to UTC
 * @param istDate Date
 * @returns UTC Date
 */
export function istToUtc(istDate: Date) {
  // istDate is a Date object representing IST
  const utcDate = new Date(istDate.getTime() - 5.5 * 60 * 60 * 1000);
  return utcDate;
}

/**
 * Converts UTC to IST
 * @param utcDate Date
 * @returns IST Date
 */
export function utcToIst(utcDate: Date) {
  const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);

  return istDate;
}
