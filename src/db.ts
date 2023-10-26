import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

mongoose
  .connect(process.env.DB_URL as string)
  .then(() => console.log("Database connected"))
  .catch((error: Error) => {
    console.error("Error:", error);
  });