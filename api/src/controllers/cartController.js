import User from "../models/userModel.js";

export const addBookToCart = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.cart.includes(bookId)) {
      user.cart.push(bookId);
      await user.save();
    }

    res.json({ message: "Book added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeBookFromCart = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.cart = user.cart.filter((id) => id.toString() !== bookId);
    await user.save();

    res.json({
      message: "Book removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("cart");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
