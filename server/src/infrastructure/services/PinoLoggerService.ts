import type { ILogger } from "#application/ports/services/ILogger.js";
import pino from "pino";
import pretty from "pino-pretty";

export class PinoLoggerService implements ILogger {
  private readonly _logger;
  private static instance: PinoLoggerService;
  constructor() {
    // const filePath = path.join(process.cwd(), "logs");
    const transport = pino.transport({
      target: "pino-loki",
      options: {
        host: "http://loki:3100",
        basicAuth: {
          username: "username",
          password: "password",
        },
      },
      // transport: {
      //   target: "pino-pretty",
      //   options: { colorize: true },
      // },
    });
    this._logger = pino(transport);
  }

  public static getInstance(): PinoLoggerService {
    if (!PinoLoggerService.instance) {
      PinoLoggerService.instance = new PinoLoggerService();
    }

    return PinoLoggerService.instance;
  }

  info(
    message: string,
    meta?: Record<string, unknown> | unknown | string
  ): void {
    this._logger.info(meta, message);
  }

  error(
    message: string,
    meta?: Record<string, unknown> | unknown | string
  ): void {
    this._logger.error(meta, message);
  }

  debug(
    message: string,
    meta?: Record<string, unknown> | unknown | string
  ): void {
    this._logger.debug(meta, message);
  }
}
