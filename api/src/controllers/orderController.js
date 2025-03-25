import Order from "../models/orderModel.js";

export const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate("books.book");
    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error retrieving user orders:", error);
    res.status(500).json({ error: error.message });
  }
};
