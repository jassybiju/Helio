import type { ILogger } from "#application/ports/services/ILogger.js";
import type { IResetTokenService } from "#application/ports/services/IResetTokenService.js";
import type { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { RedisBaseRepository } from "#infrastructure/database/repositories/RedisBaseRepository.js";
import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import crypto from "crypto";

export class RedisResetTokenService
  extends RedisBaseRepository
  implements IResetTokenService
{
  constructor(private readonly _logger: ILogger) {
    super();
  }

  private _key(token: string) {
    return `reset:${token}`;
  }

  async generate(
    userId: string,
    role: USER_ROLES,
    ttlSeconds: number
  ): Promise<string> {
    try {
      const token = crypto.randomBytes(32).toString("hex");
      await super.set(
        this._key(token),
        JSON.stringify({ userId, role }),
        ttlSeconds
      );
      return token;
    } catch (error) {
      this._logger.error("Error saving reset token", error as Error);
      throw new AppError("Error saving reset token", HTTPStatus.INTERNAL_ERROR);
    }
  }

  async verify(
    token: string
  ): Promise<{ userId: string; role: USER_ROLES } | null> {
    try {
      const data = await super.get<{ userId: string; role: USER_ROLES }>(
        this._key(token)
      );
      return JSON.parse(data as string) as { userId: string; role: USER_ROLES };
    } catch (error) {
      this._logger.error("Error verifying reset token", error as Error);
      throw new AppError(
        "Error verifying reset token",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async invalidate(token: string): Promise<void> {
    try {
      await super.delete(this._key(token));
    } catch (error) {
      this._logger.error("Error invalidating reset token", error as Error);
      throw new AppError(
        "Error invalidating reset token",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }
}
