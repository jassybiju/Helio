import type { IOTPRepository } from "#application/ports/repositories/IOTPRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { OTP } from "#domain/entities/OTP.js";
import { RedisBaseRepository } from "./RedisBaseRepository.js";
export declare class RedisOTPRepository extends RedisBaseRepository implements IOTPRepository {
    private readonly _logger;
    constructor(_logger: ILogger);
    save(otp: OTP): Promise<void>;
    findById(id: string): Promise<OTP | null>;
    findByIdAndContext(id: string, context: "patient" | "doctor"): Promise<OTP | null>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=RedisOTPRepository.d.ts.map