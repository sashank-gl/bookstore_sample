import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { cart, userId } = req.body;

  try {
    console.log(`Payment initiated successfully for ${cart.length} books.`);

    // Calculate total price
    const totalPrice = cart.reduce((acc, book) => acc + book.price, 0);

    // Create a new order
    const newOrder = new Order({
      user: userId,
      books: cart.map((book) => ({
        book: book._id,
        quantity: 1, // Assuming each book has a quantity of 1 for now
      })),
      totalPrice,
      status: "Pending",
    });

    await newOrder.save();
    console.log("Order saved in database:", newOrder);

    // Remove ordered books from the user's cart
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: { $in: cart.map((book) => book._id) } },
    });

    console.log("Items removed from cart successfully.");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((book) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: book.title,
          },
          unit_amount: Math.round(book.price * 100),
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
};
