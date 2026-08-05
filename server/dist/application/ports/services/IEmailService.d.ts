export interface IEmailService {
    sendEmail({ to, subject, body, }: {
        to: string;
        subject: string;
        body: string;
    }): Promise<void>;
}
//# sourceMappingURL=IEmailService.d.ts.map