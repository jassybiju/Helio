import { DAY_OF_WEEK } from "@domain/common/enums/doctorShift.enum.ts";
import type { Time } from "@domain/value-objects/Time.ts";

export function combineDateAndTime(date: Date, time: Time) {
  const d = new Date(date);
  d.setHours(time.hours, time.minutes, 0, 0);
  return d;
}

const dayMap: Record<DAY_OF_WEEK, number> = {
  [DAY_OF_WEEK.SUN]: 0,
  [DAY_OF_WEEK.MON]: 1,
  [DAY_OF_WEEK.TUE]: 2,
  [DAY_OF_WEEK.WED]: 3,
  [DAY_OF_WEEK.THUR]: 4,
  [DAY_OF_WEEK.FRI]: 5,
  [DAY_OF_WEEK.SAT]: 6,
};

export function getNextDatesForDay(dayOfWeek: DAY_OF_WEEK, n: number = 1) {
  const result: Date[] = [];

  const today = new Date();
  const todayDay = today.getDay();

  const targetDay = dayMap[dayOfWeek];
  let diff = targetDay - todayDay;

  if (diff <= 0) {
    diff += 7;
  }

  let nextDate = new Date(today);
  nextDate.setDate(today.getDate() + diff);

  for (let i = 0; i < n; i++) {
    result.push(new Date(nextDate));

    nextDate.setDate(nextDate.getDate() + 7);
  }

  return result;
}
