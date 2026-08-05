import type { IOTPService } from "#application/ports/services/IOTPService.js";

export class OTPService implements IOTPService {
  generate(): string {
    let length = Number(process.env.PASSWORD_LENGTH || 6);
    return Math.floor(Math.random() * 10 ** length)
      .toString()
      .padStart(length, "0");
  }
}
