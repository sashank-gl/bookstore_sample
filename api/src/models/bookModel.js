import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  price: Number,
  image: String,
});

const Book = mongoose.model("Book", bookSchema, "Books");

export default Book;
