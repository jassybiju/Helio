import type { FOOD_TIMING } from "@domain/common/enums/consultation.enum.ts";

export class Prescription {
  constructor(
    private _name: string,

    private _foodTiming: FOOD_TIMING,

    private _timings: {
      morning: boolean;
      afternoon: boolean;
      night: boolean;
    },

    private _durationInDays: number,

    private _instruction?: string | null
  ) {
    if (
      !this._timings.morning &&
      !this._timings.afternoon &&
      !this._timings.night
    ) {
      throw new Error("At least one timing required");
    }
  }

  get name() {
    return this._name;
  }
  get foodTiming() {
    return this._foodTiming;
  }
  get timings() {
    return this._timings;
  }
  get durationInDays() {
    return this._durationInDays;
  }
  get instruction() {
    return this._instruction;
  }
}
