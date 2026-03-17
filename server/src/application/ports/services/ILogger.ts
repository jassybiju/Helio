export interface ILogger {
  info(
    message: string,
    meta?: Record<string, unknown> | unknown | string
  ): void;
  debug(
    message: string,
    meta?: Record<string, unknown> | unknown | string
  ): void;
  error(
    message: string,
    meta?: Record<string, unknown> | unknown | string
  ): void;
}
