import type { CONSULTATION_TYPE } from "#domain/common/enums/doctorShift.enum.js";
export declare class DoctorSlot {
    private readonly _shiftId;
    private readonly _doctorId;
    private readonly _startTime;
    private readonly _endTime;
    private readonly _consultationType;
    private _capacity;
    private _bookedCount;
    private readonly _location?;
    constructor(_shiftId: string, _doctorId: string, _startTime: Date, _endTime: Date, _consultationType: CONSULTATION_TYPE, _capacity?: number, _bookedCount?: number, _location?: string | null | undefined);
    overlaps(start: Date, end: Date): boolean;
    setCapacity(capacity: number): void;
    setBookedCount(count: number): void;
    incrementBookedCount(): void;
    get availableCount(): number;
    get isAvailable(): boolean;
    get capacity(): number;
    get bookedCount(): number;
    get shiftId(): string;
    get doctorId(): string;
    get startTime(): Date;
    get endTime(): Date;
    get consultationType(): CONSULTATION_TYPE;
    get location(): string | null | undefined;
}
//# sourceMappingURL=DoctorSlot.d.ts.map