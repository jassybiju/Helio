import type {
  ISessionRepository,
  SessionData,
} from "@application/ports/repositories/ISessionRepository.ts";
import { RedisBaseRepository } from "./RedisBaseRepository.ts";
import type { USER_ROLES } from "@domain/common/enums/user-roles.enum.ts";
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

  private _getTokenKey(token: string) {
    return `refresh:${token}`;
  }

  private _getUserSessionKey(userId: string): string {
    return `user_session:${userId}`;
  }

  /**
   * Saves the hashed refresh token in redis with key getTokenKey(hashedToken) also rotate refresh token by keeping an instance of user_session(userId) -> hashedToken
   * @param userId User Id of the user
   * @param role Role of the user
   * @param email Email of the user
   * @param hashedToken Hashed refresh token
   */
  async storeRefreshToken(
    userId: string,
    role: USER_ROLES,
    email: string,
    hashedToken: string
  ): Promise<void> {
    try {
      // ttl Seconds
      const ttlSeconds = Number(process.env.JWT_REFRESH_VALID_SECS);
      const existingHash = await super.get(this._getUserSessionKey(userId));

      // deletes old session
      if (existingHash) {
        await super.delete(this._getTokenKey(existingHash as string));
      }

      // saves refresh token and relation between user -> hashedToken
      await Promise.all([
        super.set(
          this._getTokenKey(hashedToken),
          JSON.stringify({ userId, role, email }),
          ttlSeconds
        ),
        super.set(this._getUserSessionKey(userId), hashedToken, ttlSeconds),
      ]);
    } catch (error) {
      this._logger.error("Error saving refresh token", error as Error);
      throw new AppError(
        "Error saving refresh token",
        HTTPStatus.INTERNAL_ERROR
      );
    }
  }

  async getRefreshToken(hashedToken: string): Promise<SessionData | null> {
    try {
      const refreshToken = (await super.get(
        this._getTokenKey(hashedToken)
      )) as string;
      if (!refreshToken) {
        return null;
      }
      return JSON.parse(refreshToken);
    } catch (error) {
      this._logger.error("Error getting refresh token", error);
      throw new AppError("Error getting refresh token", HTTPStatus.BAD_REQUEST);
    }
  }

  async deleteRefreshToken(hashedToken: string): Promise<void> {
    try {
      const session = await this.getRefreshToken(hashedToken);

      if (session) {
        await Promise.all([
          super.delete(this._getTokenKey(hashedToken)),
          super.delete(this._getUserSessionKey(session.userId)),
        ]);
      }
    } catch (error) {
      this._logger.error("Error deleting refresh token", error);
      throw new AppError(
        "Error deleting refresh token",
        HTTPStatus.BAD_REQUEST
      );
    }
  }
}
