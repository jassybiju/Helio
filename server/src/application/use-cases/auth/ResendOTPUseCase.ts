import type {
  IResendOTPRequestDTO,
  IResendOTPResponseDTO,
} from "@application/dto/auth/IOTPDTO.ts";
import type { IOTPRepository } from "@application/ports/repositories/IOTPRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { IMessageQueue } from "@application/ports/services/IMessageQueue.ts";
import type { IOTPService } from "@application/ports/services/IOTPService.ts";
import type { IResendOTPUseCase } from "@application/ports/use-cases/auth/IResendOTPUseCase.ts";
import { OTP } from "@domain/entities/OTP.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class ResendOTPUseCase implements IResendOTPUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _otpRepo: IOTPRepository,
    private readonly _otpService: IOTPService,
    private readonly _messageQueue: IMessageQueue
  ) {}
  async execute(input: IResendOTPRequestDTO): Promise<IResendOTPResponseDTO> {
    const { id } = input;
    this._logger.info("Resending otp of id ", id);

    // getting previous otp
    const otpData = await this._otpRepo.findById(id);

    // if no otp throw error
    if (!otpData) {
      throw new AppError("OTP Instance expired", HTTPStatus.BAD_REQUEST);
    }

    // if otp is still valid throw error
    if (!otpData.hasExpired()) {
      throw new AppError("OTP is still valid, wait", HTTPStatus.BAD_REQUEST);
    }

    // if otp resend count reached
    const OTP_RESEND_LIMIT = Number(process.env.OTP_RESEND_LIMIT || 3);
    if (otpData.resendCount >= OTP_RESEND_LIMIT) {
      throw new AppError(
        "OTP resend limit reached try again",
        HTTPStatus.BAD_REQUEST
      );
    }

    this._otpRepo.delete(id);

    // creating new otp
    const otp = this._otpService.generate();

    const newOTP = OTP.create({
      id,
      otp,
      email: otpData.email,
      purpose: otpData.purpose,
      context: otpData.context,
    });
    newOTP.incrementResendAttempts();
    // saving otp
    await this._otpRepo.save(newOTP);

    // sending otp
    await this._messageQueue.addJob(`RESEND:${otpData.email}`, {
      to: otpData.email.value,
      subject: "Your OTP For the helixo",
      body: `Your OTP is ${newOTP.code}`,
    });
    //response
    return {
      otp_sent: true,
      invalidAt: String(newOTP.invalidAt.getTime()),
      id: newOTP.id,
    };
  }
}
