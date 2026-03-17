import type { IOTPRepository } from "@application/ports/repositories/IOTPRepository.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type { OTP } from "@domain/entities/OTP.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class RedisOTPRepository implements IOTPRepository{
  constructor(
    private readonly _logger: ILogger
  ){}
  async save(otp: OTP): Promise<void> {
    try {
        
    } catch (error) {
      this._logger.error("Error saving otp", error as Error)
      throw new AppError('Error saving otp', HTTPStatus.INTERNAL_ERROR)
    }
  } 
}