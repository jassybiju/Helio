import type { OTP } from "@domain/entities/OTP.ts";

export interface IOTPRepository {
  save(otp: OTP): Promise<void>;
  findById(id: string): Promise<OTP | null>;
  findByIdAndContext(
    id: string,
    context: "patient" | "doctor"
  ): Promise<OTP | null>;
  delete(id: string): Promise<void>;
}
