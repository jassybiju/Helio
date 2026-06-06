import type { ILogger } from "@application/ports/services/ILogger.ts";
import pino from "pino";

export class PinoLoggerService implements ILogger {
  private readonly _logger;
  constructor() {
    // const filePath = path.join(process.cwd(), "logs");

    this._logger = pino(
      {
        level: process.env.LOG_LEVEL || "debug",
        // transport: {
        //   target: "pino-pretty",
        //   options: { colorize: true },
        // },
      },
      pino.multistream([
        {
          level: process.env.LOG_LEVEL || "debug",
          stream: pino.transport({
            target: "pino-pretty",
            options: { colorize: true },
          }),
        },
        // {
        //   stream: pino.destination({
        //     dest: filePath,
        //     sync: false,
        //     mkdir: true,
        //   }),
        //   level: "info",
        // },
      ])
    );
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
