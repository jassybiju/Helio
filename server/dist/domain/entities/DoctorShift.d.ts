import type { CONSULTATION_TYPE, DAY_OF_WEEK } from "#domain/common/enums/doctorShift.enum.js";
import type { Time } from "#domain/value-objects/Time.js";
export declare class DoctorShift {
    private readonly _id;
    private readonly _doctorId;
    private readonly _dayOfWeek;
    private readonly _startTime;
    private readonly _endTime;
    private readonly _consultationType;
    private readonly _location;
    private readonly _slotIntervalInMinutes;
    private readonly _capacityPerSlot;
    private readonly _createdAt;
    private readonly _isDeleted;
    constructor(_id: string, _doctorId: string, _dayOfWeek: DAY_OF_WEEK, _startTime: Time, _endTime: Time, _consultationType: CONSULTATION_TYPE, _location: string | null, _slotIntervalInMinutes: number, _capacityPerSlot: number, _createdAt: Date, _isDeleted?: boolean);
    /**
     * Return true if there is no Overlapping
     * @param shifts Array of DoctorShifts
     * @returns boolean
     */
    isNotOverLapping(shifts: DoctorShift[]): boolean;
    get startTime(): Time;
    get endTime(): Time;
    get dayOfWeek(): DAY_OF_WEEK;
    get slotIntervalInMinutes(): number;
    get capacityPerSlot(): number;
    get shiftId(): string;
    get doctorId(): string;
    get consultationType(): CONSULTATION_TYPE;
    get location(): string | null;
    get createdAt(): Date;
    get isDeleted(): boolean;
}
//# sourceMappingURL=DoctorShift.d.ts.map