import User from "../models/userModel.js";

export const addBookToWishlist = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.wishlist.includes(bookId)) {
      user.wishlist.push(bookId);
      await user.save();
    }

    res.json({ message: "Book added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeBookFromWishlist = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    await user.save();

    res.json({
      message: "Book removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("wishlist");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
