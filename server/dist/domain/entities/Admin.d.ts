import { Email } from "#domain/value-objects/Email.js";
export declare class Admin {
    private readonly _id;
    private readonly _email;
    private readonly _passwordHash;
    constructor(_id: string, _email: Email, _passwordHash: string);
    static create(id: string, email: string, password: string): Admin;
    get passwordHash(): string;
    get id(): string;
    get email(): Email;
}
//# sourceMappingURL=Admin.d.ts.map