export interface IRefreshTokenService {
  generateRefreshToken(): string;
  hash(token: string): string;
  compare(token: string, hash: string): boolean;
}
