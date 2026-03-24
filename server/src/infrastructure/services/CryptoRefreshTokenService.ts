import type { IRefreshTokenService } from "@application/ports/services/IRefreshTokenService.ts";
import crypto from "crypto";

export class CryptoRefreshTokenService implements IRefreshTokenService {
  /**
   * Handles generation adn secure hashing of refresh token
   *
   * Uses Crypto library for generation, hashing and verification
   */
  generateRefreshToken(): string {
    const TOKEN_LENGTH = Number(process.env.REFRESH_TOKEN_LENGTH || 40);
    return crypto.randomBytes(TOKEN_LENGTH).toString("hex");
  }
  hash(token: string): string {
    const SECRET = process.env.REFRESH_TOKEN_SECRET!;
    console.log(SECRET);

    return crypto.createHmac("sha256", SECRET).update(token).digest("hex");
  }
  compare(token: string, hash: string): boolean {
    const hashed = this.hash(token);
    return crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(hash));
  }
}
