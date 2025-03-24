import express from "express";
import {
  addBookToWishlist,
  removeBookFromWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/:userId/add", addBookToWishlist);
router.delete("/:userId/remove/:bookId", removeBookFromWishlist);
router.get("/:userId", getWishlist);

export default router;
