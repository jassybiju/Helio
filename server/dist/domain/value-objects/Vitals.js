export class Vital {
    _bloodPressure;
    _oxygenLevel;
    _heartRate;
    _temperature;
    _weight;
    _height;
    constructor(_bloodPressure, _oxygenLevel, _heartRate, _temperature, _weight, _height) {
        this._bloodPressure = _bloodPressure;
        this._oxygenLevel = _oxygenLevel;
        this._heartRate = _heartRate;
        this._temperature = _temperature;
        this._weight = _weight;
        this._height = _height;
    }
    get bloodPressure() {
        return this._bloodPressure;
    }
    get oxygenLevel() {
        return this._oxygenLevel;
    }
    get heartRate() {
        return this._heartRate;
    }
    get temperature() {
        return this._temperature;
    }
    get weight() {
        return this._weight;
    }
    get height() {
        return this._height;
    }
}
//# sourceMappingURL=Vitals.js.map