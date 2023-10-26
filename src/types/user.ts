import mongoose from "mongoose";

declare module "mongoose" {
  interface Model<T> {
    comparePassword(
      password: string,
      receivedPassword: string
    ): Promise<boolean>;
  }
}

declare module "mongoose" {
  interface Model<T> {
    encryptPassword(password: string): Promise<string>;
  }
}

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  roles: Types.ObjectId[] | IRole[];
}