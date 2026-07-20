import { CHAT_SESSION_STATUS } from "@domain/common/enums/chat.enum.ts";
import { model, Schema, type InferSchemaType } from "mongoose";

const chatSessionSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  patient_id: { type: String, required: true },
  doctor_id: { type: String, required: true },
  status: { type: String, required: true, enum: CHAT_SESSION_STATUS },
  expires_at: { type: Date },
  updated_at: { type: Date },
  created_at: { type: Date },
  is_deleted: { type: Boolean, default: false },
});

export const chatSessionModel = model("ChatSessionModel", chatSessionSchema);

export type ChatSessionRaw = InferSchemaType<typeof chatSessionSchema>;
