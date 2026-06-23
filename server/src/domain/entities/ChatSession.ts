import { CHAT_SESSION_STATUS } from "@domain/common/enums/chat.enum.ts";

export class ChatSession {
  constructor(
    private readonly _id: string,
    private readonly _patientId: string,
    private readonly _doctorId: string,

    private _status: CHAT_SESSION_STATUS,

    private _expiresAt: Date,
    private _updatedAt: Date,

    private readonly _createdAt: Date
  ) {}

  updateExpiry(period: number) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + period);

    this._expiresAt = expiresAt;
    this._status = CHAT_SESSION_STATUS.ACTIVE;
    this._updatedAt = new Date();
  }

  static create({
    id,
    patientId,
    doctorId,
    period,
  }: {
    id: string;
    patientId: string;
    doctorId: string;
    period: number;
  }) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + period);
    return new ChatSession(
      id,
      doctorId,
      patientId,
      CHAT_SESSION_STATUS.ACTIVE,
      expiresAt,
      new Date(),
      new Date()
    );
  }

  get id() {
    return this._id;
  }

  get patientId() {
    return this._patientId;
  }

  get doctorId() {
    return this._doctorId;
  }
  get status() {
    return this._status;
  }
  get expiresAt() {
    return this._expiresAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get createdAt() {
    return this._createdAt;
  }
}
