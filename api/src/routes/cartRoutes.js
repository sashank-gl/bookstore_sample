import express from "express";
import {
  addBookToCart,
  removeBookFromCart,
  getCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/:userId/add", addBookToCart);
router.delete("/:userId/remove/:bookId", removeBookFromCart);
router.get("/:userId", getCart);

export default router;
