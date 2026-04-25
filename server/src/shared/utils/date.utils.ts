import { DAY_OF_WEEK } from "@domain/common/enums/doctorShift.enum.ts";
import type { Time } from "@domain/value-objects/Time.ts";

export function combineDateAndTime(date: Date, time: Time) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // treat input as IST wall-clock time
  const utcDate = new Date(
    Date.UTC(year, month, day, time.hours - 5, time.minutes - 30, 0, 0)
  );

  console.log("UTC stored:", utcDate);
  return utcDate;
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

const dayMap: Record<DAY_OF_WEEK, number> = {
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
 * @returns Date
 */
export function getNextDateForDay(dayOfWeek: DAY_OF_WEEK): Date {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const todayDay = today.getDay();

  const targetDay = dayMap[dayOfWeek];
  let diff = targetDay - todayDay;

  if (diff < 0) {
    diff += 7;
  }

  let nextDate = new Date(today);
  nextDate.setDate(today.getDate() + diff);

  return nextDate;
}
