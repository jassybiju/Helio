import type { ILogger } from "@application/ports/services/ILogger.ts";
import pino from "pino";
import pretty from "pino-pretty";

export class PinoLoggerService implements ILogger {
  private readonly _logger;
  private static instance: PinoLoggerService;
  constructor() {
    // const filePath = path.join(process.cwd(), "logs");
    console.log("ININTAILED");
    this._logger = pino(
      {
        level: process.env.LOG_LEVEL || "debug",
        // transport: {
        //   target: "pino-pretty",
        //   options: { colorize: true },
        // },
      },
      pretty({ colorize: true })
      // pino.multistream([
      //   {
      //     level: process.env.LOG_LEVEL || "debug",
      //     stream: pino.transport({
      //       target: "pino-pretty",
      //       options: { colorize: true },
      //     }),
      //   },
      // {
      //   stream: pino.destination({
      //     dest: filePath,
      //     sync: false,
      //     mkdir: true,
      //   }),
      //   level: "info",
      // },
      // ])
    );
  }

  public static getInstance(): PinoLoggerService {
    console.log("ININTAILED");

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
