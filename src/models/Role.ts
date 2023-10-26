import { Schema, model } from "mongoose";

const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["admin", "moderator", "user"],// Enumeración de roles permitidos
    },
  },
  {
    versionKey: false,
  }
);
export default model("Role", roleSchema);