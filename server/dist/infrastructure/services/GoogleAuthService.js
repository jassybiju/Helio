import { AppError } from "#shared/errors/AppError.js";
import { HTTPStatus } from "#shared/types/HTTPStatus.js";
import { OAuth2Client } from "google-auth-library";
export class GoogleAuthService {
    _client;
    constructor() {
        this._client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    async verifyCredentials(credentials) {
        const ticket = await this._client.verifyIdToken({
            idToken: credentials,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload)
            throw new AppError("Invalid Google Credentials", HTTPStatus.BAD_REQUEST);
        return {
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        };
    }
}
//# sourceMappingURL=GoogleAuthService.js.map