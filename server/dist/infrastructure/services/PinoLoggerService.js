import pino from "pino";
import pretty from "pino-pretty";
export class PinoLoggerService {
    _logger;
    static instance;
    constructor() {
        // const filePath = path.join(process.cwd(), "logs");
        this._logger = pino({
            level: process.env.LOG_LEVEL || "debug",
            // transport: {
            //   target: "pino-pretty",
            //   options: { colorize: true },
            // },
        }, pretty({ colorize: true })
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
    static getInstance() {
        if (!PinoLoggerService.instance) {
            PinoLoggerService.instance = new PinoLoggerService();
        }
        return PinoLoggerService.instance;
    }
    info(message, meta) {
        this._logger.info(meta, message);
    }
    error(message, meta) {
        this._logger.error(meta, message);
    }
    debug(message, meta) {
        this._logger.debug(meta, message);
    }
}
//# sourceMappingURL=PinoLoggerService.js.map