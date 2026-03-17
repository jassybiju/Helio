import type { IOTPRepository } from "@application/ports/repositories/IOTPRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { redisClient } from "@config/redis.config.ts";
import type { OTP } from "@domain/entities/OTP.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import type { OTPData } from "@shared/types/OTPData.ts";
import { OTPMapper } from "../../../mappers/OTPMapper.ts";

export class RedisOTPRepository implements IOTPRepository {
  constructor(private readonly _logger: ILogger) {}

  async save(otp: OTP): Promise<void> {
    try {
      const ttl =
        Math.floor(otp.expiresAt.getTime() / 1000) -
        Math.floor(Date.now() / 1000);

      await redisClient.setEx(
        "otp:" + otp.id,
        ttl,
        JSON.stringify(OTPMapper.toPersistance(otp) as OTPData)
      );
    } catch (error) {
      this._logger.error("Error saving otp", error as Error);
      throw new AppError("Error saving otp", HTTPStatus.INTERNAL_ERROR);
    }
  }
}
