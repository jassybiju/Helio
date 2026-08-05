export class Prescription {
    _name;
    _foodTiming;
    _timings;
    _durationInDays;
    _instruction;
    constructor(_name, _foodTiming, _timings, _durationInDays, _instruction) {
        this._name = _name;
        this._foodTiming = _foodTiming;
        this._timings = _timings;
        this._durationInDays = _durationInDays;
        this._instruction = _instruction;
        if (!this._timings.morning &&
            !this._timings.afternoon &&
            !this._timings.night) {
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
//# sourceMappingURL=Prescription.js.map