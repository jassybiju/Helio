import type { IRefreshTokenService } from "#application/ports/services/IRefreshTokenService.js";
export declare class CryptoRefreshTokenService implements IRefreshTokenService {
    /**
     * Handles generation adn secure hashing of refresh token
     *
     * Uses Crypto library for generation, hashing and verification
     */
    generateRefreshToken(): string;
    hash(token: string): string;
    compare(token: string, hash: string): boolean;
}
//# sourceMappingURL=CryptoRefreshTokenService.d.ts.map