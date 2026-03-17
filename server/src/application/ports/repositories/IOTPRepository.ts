import type { OTP } from "@domain/entities/OTP.ts";

export interface IOTPRepository {
  save(otp: OTP): Promise<void>;
}
