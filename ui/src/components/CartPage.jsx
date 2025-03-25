import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/AuthContext";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const handleCheckout = async () => {
    try {
      const userId = user.id;
      const response = await axios.post(
        "http://localhost:5000/api/payments/pay",
        { cart, userId }
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
          <div key={book._id} className="flex gap-4 items-center">
            <img
              src={book.image}
              alt={book.title}
              className="size-12 object-cover rounded-lg"
            />
            <div className="flex grow justify-between items-center">
              <div>
                <p className="text-lg">{book.title}</p>
                <p>₹{book.price}</p>
              </div>

              <svg
                onClick={() => removeFromCart(book._id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-8 hover:bg-red-500 hover:text-white  hover:fill-red-500 rounded p-1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
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
