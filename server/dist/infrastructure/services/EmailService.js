import nodemailer from "nodemailer";
export class EmailService {
    _transport;
    constructor() {
        this._transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendEmail({ to, subject, body, }) {
        await this._transport.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text: body,
        });
    }
}
//# sourceMappingURL=EmailService.js.map