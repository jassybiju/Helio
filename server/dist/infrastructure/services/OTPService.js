export class OTPService {
    generate() {
        let length = Number(process.env.PASSWORD_LENGTH || 6);
        return Math.floor(Math.random() * 10 ** length)
            .toString()
            .padStart(length, "0");
    }
}
//# sourceMappingURL=OTPService.js.map