export declare class Time {
    private readonly value;
    private readonly _hours;
    private readonly _mins;
    constructor(value: string);
    toMinutes(): number;
    /**
     * Return true if this time is before other
     * @param other Time Object
     * @returns Boolean
     */
    isBefore(other: Time): boolean;
    /**
     * Return true if this time is after other
     * @param other Time Object
     * @returns Boolean
     */
    isAfter(other: Time): boolean;
    addMinutes(mins: number): Time;
    get hours(): number;
    get minutes(): number;
    /**
     *
     * @returns String representation to the time eg : HH:MM
     */
    toString(): string;
    clone(): Time;
    toDate(date: Date): Date;
}
//# sourceMappingURL=Time.d.ts.map