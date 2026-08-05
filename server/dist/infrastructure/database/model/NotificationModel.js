import { USER_ROLES } from "#domain/common/enums/user-roles.enum.js";
import { model, Schema } from "mongoose";
const notificationSchema = new Schema({
    _id: { type: String, unique: true, required: true },
    user_id: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, required: true },
    heading: { type: String, required: true },
    message: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    created_at: { type: Date, required: true },
    is_deleted: { type: Boolean, default: false },
});
export const notificationModel = model("NotificationModel", notificationSchema);
//# sourceMappingURL=NotificationModel.js.map