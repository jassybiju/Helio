import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { model, now, Schema } from "mongoose";
export const chatMessageSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    chat_session_id: { type: String, required: true },
    sender_id: { type: String, required: true },
    sender_role: { type: String, required: true, enum: USER_ROLES },
    message: { type: String, required: true },
    created_at: { type: Date, default: now },
    read_at: { type: Date },
    is_deleted: { type: Boolean, default: false },
});
export const chatMessageModel = model("ChatMessageModel", chatMessageSchema);
//# sourceMappingURL=ChatMessageModel.js.map