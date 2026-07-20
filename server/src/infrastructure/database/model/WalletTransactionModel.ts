import { model, Schema, type InferSchemaType } from "mongoose";

const walletTransactionSchema = new Schema({
  _id: { type: String, required: true },

  wallet_id: { type: String, required: true },

  type: {
    type: String,
    enum: ["CREDIT", "DEBIT"], // match TRANSACTION_TYPE
    required: true,
  },

  amount: {
    type: Number,
    required: true,
    min: 0,
  },

  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED"], // match TRANSACTION_STATUS
    required: true,
    default: "PENDING",
  },

  reference_id: {
    type: String,
    default: null,
  },

  description: {
    type: String,
    default: null,
  },

  created_at: { type: Date, required: true },
  is_deleted: { type: Boolean, default: false },
});

export const walletTransactionModel = model(
  "WalletTransactionModel",
  walletTransactionSchema
);

export type WalletTransactionDoc = InferSchemaType<
  typeof walletTransactionSchema
>;
