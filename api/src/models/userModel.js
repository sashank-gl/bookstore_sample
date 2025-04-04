import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const User = mongoose.model("User", userSchema);

export default User;
