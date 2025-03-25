import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/pay",
        { cart }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="p-6 rounded bg-amber-100 space-y-4">
      {cart.length === 0 && <p className="text-center">Your cart is empty.</p>}

      <div className="flex flex-col gap-4">
        {cart.map((book) => (
          <div key={book._id} className="flex gap-4">
            <img
              src={book.image}
              alt={book.title}
              className="size-12 object-cover rounded-lg"
            />
            <div>
              <p className="text-lg">{book.title}</p>
              <p>₹{book.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(book._id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <button
          className="w-full bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 cursor-pointer"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartPage;
