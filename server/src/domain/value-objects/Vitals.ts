export class Vital {
  constructor(
    private readonly _bloodPressure: string | null,
    private readonly _oxygenLevel: number | null,
    private readonly _heartRate: number | null,
    private readonly _temperature: number | null,
    private readonly _weight: number | null,
    private readonly _height: number | null
  ) {}

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
