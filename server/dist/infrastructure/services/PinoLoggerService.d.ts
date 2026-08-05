import type { ILogger } from "#application/ports/services/ILogger.js";
export declare class PinoLoggerService implements ILogger {
    private readonly _logger;
    private static instance;
    constructor();
    static getInstance(): PinoLoggerService;
    info(message: string, meta?: Record<string, unknown> | unknown | string): void;
    error(message: string, meta?: Record<string, unknown> | unknown | string): void;
    debug(message: string, meta?: Record<string, unknown> | unknown | string): void;
}
//# sourceMappingURL=PinoLoggerService.d.ts.map