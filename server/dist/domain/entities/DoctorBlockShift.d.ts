export declare class DoctorBlockShift {
    private readonly _id;
    private readonly _doctorId;
    private readonly _startTime;
    private readonly _endTime;
    private readonly _reason;
    private readonly _createdAt;
    constructor(_id: string, _doctorId: string, _startTime: Date, _endTime: Date, _reason: string | null, _createdAt: Date);
    /**
     * Returns true if there is no overlapping
     * @param blockShifts Array of BlockShifts
     * @returns boolean
     */
    isNotOverlapping(blockShifts: DoctorBlockShift[]): boolean;
    get id(): string;
    get startTime(): Date;
    get doctorId(): string;
    get endTime(): Date;
    get reason(): string | null;
    get createdAt(): Date;
}
//# sourceMappingURL=DoctorBlockShift.d.ts.map