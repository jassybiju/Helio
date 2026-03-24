import type { ISessionRepository } from "@application/ports/repositories/ISessionRepository.ts";
import { RedisBaseRepository } from "./RedisBaseRepository.ts";
import type { USER_ROLES } from "@shared/types/UserRoles.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class RedisSessionRepository
  extends RedisBaseRepository
  implements ISessionRepository
{
  constructor(private readonly _logger: ILogger) {
    super();
  }

  private getKey(id: string, context: USER_ROLES) {
    return `refresh:${id}:${context}`;
  }

  async storeRefreshToken(
    userId: string,
    role: USER_ROLES,
    token: string
  ): Promise<void> {
    try {
      const ttlSeconds = Number(process.env.JWT_REFRESH_VALID_SECS);
      console.log(ttlSeconds)
      await super.set(this.getKey(userId, role), token, ttlSeconds);
    } catch (error) {
      this._logger.error("Error saving refresh token", error as Error);
      throw new AppError(
        "Error saving refresh token",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async getRefreshToken(
    userId: string,
    role: USER_ROLES
  ): Promise<string | null> {
    try {
      const refreshToken = await super.get(this.getKey(userId, role));
      if (!refreshToken) {
        return null;
      }
      return refreshToken as string;
    } catch (error) {
      this._logger.error("Error getting refresh token", error);
      throw new AppError("Error getting refresh token", HTTPStatus.BAD_REQUEST);
    }
  }

  async deleteRefreshToken(userId: string, role: USER_ROLES): Promise<void> {
    try {
      await super.delete(this.getKey(userId, role));
    } catch (error) {
      this._logger.error("Error deleting refresh token", error);
      throw new AppError(
        "Error deleting refresh token",
        HTTPStatus.BAD_REQUEST
      );
    }
  }
}
