import type { IEmailService } from "#application/ports/services/IEmailService.js";
import nodemailer from "nodemailer";

export class EmailService implements IEmailService {
  private _transport: nodemailer.Transporter;

  constructor() {
    this._transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async sendEmail({
    to,
    subject,
    body,
  }: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void> {
    await this._transport.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text: body,
    });
  }
}
