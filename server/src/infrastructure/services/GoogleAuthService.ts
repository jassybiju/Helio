import type { IGoogleAuthService } from "@application/ports/services/IGoogleAuthService.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";
import { OAuth2Client } from "google-auth-library";

export class GoogleAuthService implements IGoogleAuthService {
  private _client: OAuth2Client;
  constructor() {
    this._client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyCredentials(credentials: string): Promise<{
    googleId: string;
    email: string;
    name: string;
    picture: string;
  }> {
    const ticket = await this._client.verifyIdToken({
      idToken: credentials,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload();
    if (!payload)
      throw new AppError("Invalid Google Credentials", HTTPStatus.BAD_REQUEST);

    return {
      googleId: payload.sub,
      email: payload.email!,
      name: payload.name!,
      picture: payload.picture!,
    };
  }
}
