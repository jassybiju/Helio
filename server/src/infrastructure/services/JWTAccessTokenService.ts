import type { IAccessTokenService } from "@application/ports/services/IAccessTokenService.ts";
import jwt from "jsonwebtoken";

export class JWTAccessTokenService implements IAccessTokenService {
  generateAccessToken(
    id: string,
    email: string,
    role: "doctor" | "patient" | "admin"
  ): string {
    const SECRET = process.env.JWT_SECRET_KEY!;
    const expiresIn = Number(process.env.JWT_ACCESS_VALID_SECS);
    const token = jwt.sign({ id, email, role }, SECRET, {
      expiresIn: expiresIn,
    });

    return token;
  }
}
