import crypto from "crypto";
export class CryptoRefreshTokenService {
    /**
     * Handles generation adn secure hashing of refresh token
     *
     * Uses Crypto library for generation, hashing and verification
     */
    generateRefreshToken() {
        const TOKEN_LENGTH = Number(process.env.REFRESH_TOKEN_LENGTH || 40);
        return crypto.randomBytes(TOKEN_LENGTH).toString("hex");
    }
    hash(token) {
        const SECRET = process.env.REFRESH_TOKEN_SECRET;
        return crypto.createHmac("sha256", SECRET).update(token).digest("hex");
    }
    compare(token, hash) {
        const hashed = this.hash(token);
        return crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(hash));
    }
}
//# sourceMappingURL=CryptoRefreshTokenService.js.map