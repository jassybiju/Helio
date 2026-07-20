import { model, Schema } from "mongoose";

const adminSchema = new Schema({
  _id: { type: String },
  email: { type: String },
  passwordHash: { type: String },
});

export const AdminModel = model("AdminModel", adminSchema);
