import type { IEmailService } from "#application/ports/services/IEmailService.js";
export declare class EmailService implements IEmailService {
    private _transport;
    constructor();
    sendEmail({ to, subject, body, }: {
        to: string;
        subject: string;
        body: string;
    }): Promise<void>;
}
//# sourceMappingURL=EmailService.d.ts.map