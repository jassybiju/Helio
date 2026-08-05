import type { IResendOTPRequestDTO, IResendOTPResponseDTO } from "#application/dto/auth/IOTPDTO.js";
import type { IOTPRepository } from "#application/ports/repositories/IOTPRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IMessageQueue } from "#application/ports/services/IMessageQueue.js";
import type { IOTPService } from "#application/ports/services/IOTPService.js";
import type { IResendOTPUseCase } from "#application/ports/use-cases/auth/IResendOTPUseCase.js";
export declare class ResendOTPUseCase implements IResendOTPUseCase {
    private readonly _logger;
    private readonly _otpRepo;
    private readonly _otpService;
    private readonly _messageQueue;
    constructor(_logger: ILogger, _otpRepo: IOTPRepository, _otpService: IOTPService, _messageQueue: IMessageQueue);
    execute(input: IResendOTPRequestDTO): Promise<IResendOTPResponseDTO>;
}
//# sourceMappingURL=ResendOTPUseCase.d.ts.map