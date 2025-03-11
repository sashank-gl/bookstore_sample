import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { cart } = req.body;

  try {
    console.log(`Payment initiated successfully for ${cart.length} books.`);

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
