import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  roles: [
    {
      ref: "Role",
      type: Schema.Types.ObjectId,
    },
  ],
});

//Metodo estatico encargado de encriptar la password y generar un hash
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

//Metodo encargado de comparar la contraseña guardada en la db y la que escribe el usuario al momento de logearse
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
