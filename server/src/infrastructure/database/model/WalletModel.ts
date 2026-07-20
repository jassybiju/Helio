import { model, Schema, type InferSchemaType } from "mongoose";

const walletSchema = new Schema({
  _id: { type: String, required: true },

  user_id: { type: String, required: true, unique: true },

  user_role: {
    type: String,
    enum: ["admin", "patient", "doctor"], // match your USER_ROLES enum
    required: true,
  },

  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  is_deleted: { type: Boolean, default: false },
});

walletSchema.pre("save", function (): void {
  this.updated_at = new Date();
});

walletSchema.index({ user_id: 1 }, { unique: true });

export const walletModel = model("WalletModel", walletSchema);

export type WalletDoc = InferSchemaType<typeof walletSchema>;
