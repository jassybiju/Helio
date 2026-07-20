import { model, Schema, type InferSchemaType } from "mongoose";

const blockShiftSchema = new Schema({
  _id: { required: true, type: String, unique: true },
  doctor_id: { required: true, type: String },
  start_time: { required: true, type: Date },
  end_time: { required: true, type: Date },
  reason: { type: String },
  created_at: { required: true, type: Date },
  is_deleted: { default: false, type: Boolean },
});

export const blockShiftModel = model("BlockShiftModel", blockShiftSchema);

export type BlockShiftDoc = InferSchemaType<typeof blockShiftSchema>;
