import type { IOTPRepository } from "#application/ports/repositories/IOTPRepository.js";
import type { ILogger } from "#application/ports/services/ILogger.js";
import type { OTP } from "#domain/entities/OTP.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import type { OTPData } from "#shared/types/OTPData.js";
import { OTPMapper } from "../../../mappers/OTPMapper.js";
import { RedisBaseRepository } from "./RedisBaseRepository.js";

export class RedisOTPRepository
  extends RedisBaseRepository
  implements IOTPRepository
{
  constructor(private readonly _logger: ILogger) {
    super();
  }

  async save(otp: OTP): Promise<void> {
    try {
      const ttl =
        Math.floor(otp.expiresAt.getTime() / 1000) -
        Math.floor(Date.now() / 1000);

      await super.set(
        "otp:" + otp.id,
        OTPMapper.toPersistance(otp) as OTPData,
        ttl
      );
    } catch (error) {
      this._logger.error("Error saving otp", error as Error);
      throw new AppError("Error saving otp", HTTPStatus.INTERNAL_ERROR);
    }
  }

  async findById(id: string): Promise<OTP | null> {
    try {
      const otp = await super.get("otp:" + id);
      if (!otp) {
        return null;
      }
      return OTPMapper.toDomain(otp as OTPData, id);
    } catch (error) {
      this._logger.error("Error Getting OTP", error as Error);
      throw new AppError("Error getting otp", HTTPStatus.INTERNAL_ERROR);
    }
  }

  async findByIdAndContext(
    id: string,
    context: "patient" | "doctor"
  ): Promise<OTP | null> {
    const otpData = await this.findById(id);
    if (!otpData) {
      return null;
    }
    if (otpData.context !== context) {
      return null;
    }

    return otpData;
  }

  async delete(id: string): Promise<void> {
    try {
      await super.delete("otp:" + id);
    } catch (error) {
      this._logger.error("Error Deleting OTP", error as Error);
      throw new AppError("Error deleting otp", HTTPStatus.INTERNAL_ERROR);
    }
  }
}
