import type { FOOD_TIMING } from "#domain/common/enums/consultation.enum.js";
export declare class Prescription {
    private _name;
    private _foodTiming;
    private _timings;
    private _durationInDays;
    private _instruction?;
    constructor(_name: string, _foodTiming: FOOD_TIMING, _timings: {
        morning: boolean;
        afternoon: boolean;
        night: boolean;
    }, _durationInDays: number, _instruction?: string | null | undefined);
    get name(): string;
    get foodTiming(): FOOD_TIMING;
    get timings(): {
        morning: boolean;
        afternoon: boolean;
        night: boolean;
    };
    get durationInDays(): number;
    get instruction(): string | null | undefined;
}
//# sourceMappingURL=Prescription.d.ts.map