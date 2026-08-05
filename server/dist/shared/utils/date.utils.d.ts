import { DAY_OF_WEEK } from "#domain/common/enums/doctorShift.enum.js";
import type { Time } from "#domain/value-objects/Time.js";
export declare function combineDateAndTime(date: Date, time: Time): Date;
export declare const jsToEnumDay: Record<number, DAY_OF_WEEK>;
export declare const dayMap: Record<DAY_OF_WEEK, number>;
/**
 * Generate the Date obj based on DAY_OF_WEEK
 * if today is tuesday and given day of monday it would return the date for next monday but if it given day of wednesday it would coming wednesday which is tommorow(respective of today which is tuesday)
 * @param dayOfWeek DAY_OF_WEEK
 * @returns Date in ist
 */
export declare function getNextDateForDay(dayOfWeek: DAY_OF_WEEK): Date;
export declare function getUTCRangeForISTDay(date: Date): {
    startUTC: Date;
    endUTC: Date;
};
/**
 * Converts IST to UTC
 * @param istDate Date
 * @returns UTC Date
 */
export declare function istToUtc(istDate: Date): Date;
/**
 * Converts UTC to IST
 * @param utcDate Date
 * @returns IST Date
 */
export declare function utcToIst(utcDate: Date): Date;
//# sourceMappingURL=date.utils.d.ts.map