export class Result<T> {
  public isSuccess: boolean;
  public error: string | undefined;
  private _value: T | undefined;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        "Invalid Operation :Result cant be successful and contain an error"
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        "Invalid Operation : A Failing result needs to contain an error message"
      );
    }
    this.error = error;
    this.isSuccess = isSuccess;
    this._value = value;
    Object.freeze(this);
  }

  public getValue() {
    if (!this.isSuccess) {
      throw new Error("Can't retrieve value from a failed result");
    }
    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error?: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any[]> {
    for (let result of results) {
      if (!result.isSuccess) {
        return result;
      }
    }
    return Result.ok<any>();
  }
}
