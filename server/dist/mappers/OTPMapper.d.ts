import { OTP } from "#domain/entities/OTP.js";
import type { OTPData } from "#shared/types/OTPData.js";
export declare class OTPMapper {
    static toPersistance(otp: OTP): OTPData;
    static toDomain(raw: OTPData, verificationId: string): OTP;
}
//# sourceMappingURL=OTPMapper.d.ts.map