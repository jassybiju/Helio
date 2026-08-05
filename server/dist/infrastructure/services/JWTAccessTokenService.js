import jwt from "jsonwebtoken";
export class JWTAccessTokenService {
    generateAccessToken(id, email, role) {
        const SECRET = process.env.JWT_SECRET_KEY;
        const expiresIn = Number(process.env.JWT_ACCESS_VALID_SECS);
        const token = jwt.sign({ id, email, role }, SECRET, {
            expiresIn: expiresIn,
        });
        return token;
    }
}
//# sourceMappingURL=JWTAccessTokenService.js.map