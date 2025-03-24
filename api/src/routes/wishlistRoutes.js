import express from "express";
import {
  addBookToWishlist,
  removeBookFromWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/:userId/add", addBookToWishlist);
router.post("/:userId/remove", removeBookFromWishlist);
router.get("/:userId", getWishlist);

export default router;
