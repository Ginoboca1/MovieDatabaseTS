import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  title: String,
  director: String,
  genre: String,
  year: Number,
  rating: Number,
  imgURL: String,
});

export default model("Movie", movieSchema);