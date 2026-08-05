import { CHAT_SESSION_STATUS } from "#domain/common/enums/chat.enum.js";
export declare class ChatSession {
    private readonly _id;
    private readonly _patientId;
    private readonly _doctorId;
    private _status;
    private _expiresAt;
    private _updatedAt;
    private readonly _createdAt;
    constructor(_id: string, _patientId: string, _doctorId: string, _status: CHAT_SESSION_STATUS, _expiresAt: Date, _updatedAt: Date, _createdAt: Date);
    updateExpiry(period: number): void;
    isExpired(): boolean;
    static create({ id, patientId, doctorId, period, }: {
        id: string;
        patientId: string;
        doctorId: string;
        period: number;
    }): ChatSession;
    get id(): string;
    get patientId(): string;
    get doctorId(): string;
    get status(): CHAT_SESSION_STATUS;
    get expiresAt(): Date;
    get updatedAt(): Date;
    get createdAt(): Date;
}
//# sourceMappingURL=ChatSession.d.ts.map